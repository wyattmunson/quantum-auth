import moment from "moment";
import uuidv4 from "uuid/v4";
import jwt from "jsonwebtoken";
import db from "../db";
import queries from "./queries";
import { greenText, redText } from "../utils/colors";

const Trip = {
  async create(req, res) {
    // Get userId from token
    const token = req.headers["x-access-token"];
    const decodeToken = await jwt.verify(token, process.env.SECRET);

    const values = [
      uuidv4(),
      decodeToken.userId,
      req.body.name,
      req.body.cities,
      req.body.startDate,
      req.body.endDate || null
    ];

    try {
      const { data } = await db.query(queries.createTrip, values);
      console.log(greenText("201"), "POST /api/v1/trips");
      return res.status(201).send({ data });
    } catch (error) {
      console.log(error);
      console.log("HERE !!!");
      return res.status(400).send(error);
    }
  },

  async getMyTrips(req, res) {
    const token = req.headers["x-access-token"];
    const decodeToken = await jwt.verify(token, process.env.SECRET);

    const values = [decodeToken.userId];

    try {
      const { rows } = await db.query(queries.getUserTrip, [decodeToken.userId]);
      console.log(greenText("200"), "GET /api/v1/trips/mine");
      return res.status(200).send({ rows });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },

  async getMyTripsWithEvents(req, res) {
    const token = req.headers["x-access-token"];
    const decodeToken = await jwt.verify(token, process.env.SECRET);

    const values = [decodeToken.userId];

    try {
      const { rows } = await db.query(queries.getUserTripWithEvent, [decodeToken.userId]);
      //   const

      console.log(greenText("200"), "GET /api/v1/trips/mine/withevents");
      return res.status(200).send({ rows });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
};

function bunch(input) {
  const result = [];
  for (let item in input) {
    if (input[item]) {
    }
  }
}

// const tokenDecrypter = token => {

//     return
// }

export default Trip;
