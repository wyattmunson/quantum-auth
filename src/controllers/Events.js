import moment from "moment";
import uuidv4 from "uuid/v4";
import jwt from "jsonwebtoken";
import db from "../db";
import queries from "./queries";
import { greenText, redText } from "../utils/colors";

const Event = {
  async create(req, res) {
    const values = [
      uuidv4(),
      req.body.trip,
      req.body.type,
      req.body.icon,
      req.body.startdate,
      req.body.enddate,
      req.body.title,
      req.body.subtext
    ];

    try {
      const { data } = await db.query(queries.createEvent, values);
      console.log(greenText("201"), "POST /api/v1/trips");
      return res.status(201).send({ data });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async getEventById(req, res) {
    // const token = req.headers["x-access-token"]
    console.log(req.body.trip);
    console.log(req.body);
    try {
      const { rows } = await db.query(queries.getEventById, [req.body.trip]);
      console.log(greenText("200"), "POST /api/v1/events");
      return res.status(200).send({ rows });
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  async delete(req, res) {
    try {
      const { rows } = await db.query(queries.deleteEvent, [req.body.eventid]);
      if (!rows[0]) {
        return res.status(400).send({ message: "No such event" });
      }
      console.log(greenText("204"), "DELETE /api/v1/events");
      return res.status(204).send(rows);
    } catch (error) {
      console.log(redText("400"), "DELETE /api/v1/events");
      console.log(error);
      return res.status(400).send(error);
    }
  }
};

// await function test(thing) {
//   console.log(test)
// }

// function decodeToken(token) {
//   try {
//     const decodeToken = await jwt.verify(token, process.env.SECRET);
//     return decodeToken.userId;
//   } catch (error) {
//     return error;
//   }
// }

export default Event;
