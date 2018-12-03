import moment from "moment";
import uuidv4 from "uuid/v4";
import db from "../db";
import Helper from "./Helper";
import { redText, greenText } from "../utils/colors";
import queries from "./queries";

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

    const { data } = await db.query(queries.createUser, values);
    console.log({ data });

    try {
      const { data } = await db.query(queries.createUser, values);
      const token = Helper.issueToken(data[0].userid);
      console.log(greenText("201"), "POST /api/v1/users");
      return res.status(201).send({ token });
    } catch (err) {
      if (err.routing === "_bt_check_unique") {
        return res.status(400).send({ message: "Email already in use" });
      }
      console.log(redText("400"), "POST /api/v1/users - Error below\n:", err);
      return res.status(400).send(err);
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
      const { data } = await db.query(queries.selectUserByEmail, [
        req.body.email
      ]);
      if (!rows[0]) {
        return res.status(400).send({ message: "That's not a valid login" });
      }
      if (!Helper.comparePassword(data[0].passowrd, req.body.password)) {
        return res.status(400).send({ message: "That's not a valid login" });
      }
      const token = Helper.issueToken(data[0].userid);
    } catch (err) {
      return res.status(400).send(err);
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
