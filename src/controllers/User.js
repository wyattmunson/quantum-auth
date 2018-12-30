import moment from "moment";
import uuidv4 from "uuid/v4";
import db from "../db";
import Helper from "./Helper";
import { redText, greenText } from "../utils/colors";
import queries from "./queries";
import jwt from "jsonwebtoken";

const User = {
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

    // const { data } = await db.query(queries.createUser, values);
    // console.log("DATA", { data });

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

  async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: "Emaill and password required" });
    }
    if (!Helper.validateEmail) {
      return res.status(400).send({ message: "That's not a valid email" });
    }
    try {
      const { rows } = await db.query(queries.selectUserByEmail, [
        req.body.email
      ]);
      if (!rows[0]) {
        return res.status(400).send({ message: "That's not a valid login" });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).send({ message: "That's not a valid login" });
      }
      const token = Helper.issueToken(rows[0].userid);
      return res.status(200).send({ token });
    } catch (err) {
      console.log("CATCH ALL ERROR:\n", err);
      return res.status(400).send(err);
    }
  },

  async getMe(req, res) {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(400).send({ message: "Must include token" });
    }
    console.log("GET ME HIT");
    try {
      const decodeToken = await jwt.verify(token, process.env.SECRET);
      const queryText = `SELECT * FROM users WHERE userid=$1`;
      const { rows } = await db.query(queryText, [decodeToken.userId]);
      if (!rows[0]) {
        return res.status(400).send({ message: "Token invalid" });
      }
      console.log("GET ME HIT");
      console.log("ROWS:", { rows });
      return res.status(200).send({ rows });
    } catch (error) {
      console.log(redText("400"), error);
      return res.status(400).send(error);
    }
  },

  async delete(req, res) {
    try {
      const { data } = await db.query(queries.deleteUser, [req.user.userid]);
      if (!data[0]) {
        return res.status(400).send({ message: "No such user" });
      }
      return res.sendStatus(204);
    } catch (err) {
      return res.status(400).send(err);
    }
  }
};

export default User;
