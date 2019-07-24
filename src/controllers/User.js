import moment from "moment";
import uuidv4 from "uuid/v4";
import db from "../db";
import Helper from "./Helper";
import { redText, greenText } from "../utils/colors";
import queries from "./queries";
import jwt from "jsonwebtoken";
import { formatGetMe } from "./responseFormatter";

const User = {
  /////////////////
  // CREATE USER //
  /////////////////
  async create(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: "Missing email or password" });
    }
    if (!Helper.validateEmail(req.body.email)) {
      return res.status(400).send({ message: "Email is not valid" });
    }
    const hashedPassword = Helper.hashPassword(req.body.password);

    const values = [
      uuidv4(),
      req.body.email,
      hashedPassword,
      req.body.firstName || null,
      req.body.lastName || null,
      moment(new Date())
    ];
    console.log("VALUES", values);

    try {
      // This must be called rows or it won't work
      const { rows } = await db.query(queries.createUser, values);
      const token = Helper.issueToken(rows[0].userid);
      console.log(greenText("201"), "POST /api/v1/users");
      return res.status(201).send({ token });
    } catch (err) {
      if (err.routing === "_bt_check_unique") {
        return res.status(400).send({ message: "Email already in use" });
      }
      console.log(redText("400"), "POST /api/v1/users - Error below\n:", err);
      return res.status(400).send("400 - Could not add record");
    }
  },

  ///////////
  // LOGIN //
  ///////////
  async login(req, res) {
    // Validate request body has email and password
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: "Emaill and password required" });
    }
    // Valid email using REGEX
    if (!Helper.validateEmail) {
      return res.status(400).send({ message: "That's not a valid email" });
    }
    try {
      const { rows } = await db.query(queries.selectUserByEmail, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({ message: "That's not a valid login" });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ message: "That's not a valid login" });
      }
      const token = Helper.issueToken(rows[0].userid);
      console.log(greenText(200), "POST /api/v1/users/login");
      return res.status(200).send({ token });
    } catch (err) {
      console.log("CATCH ALL ERROR:\n", err);
      return res.status(400).send(err);
    }
  },

  ////////////
  // GET ME //
  ////////////
  async getMe(req, res) {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(400).send({ message: "Must include token" });
    }
    try {
      const decodeToken = await jwt.verify(token, process.env.SECRET);
      const { rows } = await db.query(queries.selectUserById, [decodeToken.userId]);
      if (!rows[0]) {
        return res.status(400).send({ message: "Token invalid" });
      }
      // Format opbject keys to camelCase
      formatGetMe(rows);

      console.log(greenText(200), "GET /api/v1/users/me");
      return res.status(200).send(rows[0]);
    } catch (error) {
      console.log(redText("400"), error);
      return res.status(400).send(error);
    }
  },

  ////////////
  // DELETE //
  ////////////
  async delete(req, res) {
    try {
      const { data } = await db.query(queries.deleteUser, [req.user.userid]);
      if (!data[0]) {
        return res.status(400).send({ message: "No such user" });
      }
      return res.sendStatus(204);
    } catch (error) {
      console.log(req.user.userid);
      console.log(redText("400"), error);
      return res.status(400).send(error);
    }
  }
};

export default User;

//\
// \\
//   \\
//======\

// \\       //\ //\
//  \\ //\ // \\/ \\
//   \\/ \\/       \\
