import moment from "moment";
import uuidv4 from "uuid/v4";
import db from "../db";
import jwt from "jsonwebtoken";
import queries from "./queries";
import { formatCreateWorkout, formatWorkoutList } from "./responseFormatter";
import { greenText, redText } from "../utils/colors";

const Workout = {
  async create(req, res) {
    const token = req.headers["x-access-token"];
    // CHECK FOR TOKEN
    if (!token) {
      return res.status(400).send({ message: "Token required" });
    }
    // CHECK FOR WORKOUT DATE
    if (!req.body.workoutDate) {
      return res.status(400).send({ message: "Workout date required " });
    }
    const decodeToken = await jwt.verify(token, process.env.SECRET);

    const values = [uuidv4(), req.body.workoutDate, decodeToken.userId];
    try {
      const { rows } = await db.query(queries.createWorkout, values);
      console.log(greenText(201), "POST /api/v1/workout");
      return res.status(201).send(formatCreateWorkout(rows));
    } catch (err) {
      console.log(redText(400), "POST /api/v1/workout\n", err);
      return res.status(400).send("400 - Could not add recrod");
    }
  },

  async getByUser(req, res) {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(400).send({ message: "Token required, please. " });
    }
    const decodeToken = await jwt.verify(token, process.env.SECRET);

    try {
      const { rows } = await db.query(queries.getWorkoutByUser, [
        decodeToken.userId
      ]);

      // If no results for that user ID
      if (!rows[0]) {
        return res.status(404).send({
          message: `No workouts found with this user ID: ${decodeToken.userId}`
        });
      }
      console.log(greenText(200), "GET /api/v1/workout");
      return res.status(200).send(formatWorkoutList(rows));
    } catch (err) {
      console.log(redText(400), "POST /api/v1/workout\n", err);
      return res
        .status(400)
        .send({ message: "Bad request or malformed syntax" });
    }
  },

  async createExercise(req, res) {
    let { exerciseName, reps, weight } = req.body;
    if (weight !== null && reps === null) {
      return res
        .status(400)
        .send({ message: "Must include reps if specifying weight" });
    }
    const values = [uuidv4(), exerciseName, reps, weight];

    try {
      const { rows } = await db.query(queries.addExercise, values);
      return res.status(201).send(rows[0]);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: "Bad syntax or request" });
    }
  }
};

export default Workout;
