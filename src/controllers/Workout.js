import moment from "moment";
import uuidv4 from "uuid/v4";
import db from "../db";
import jwt from "jsonwebtoken";
import queries from "./queries";
import {
  formatCreateWorkout,
  formatWorkoutList,
  formatExerciseList
} from "./responseFormatter";
import { greenText, redText } from "../utils/colors";
import { decode } from "punycode";

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

    const values = [
      uuidv4(),
      req.body.workoutDate,
      decodeToken.userId,
      req.body.startTime
    ];
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
    let { exerciseName, reps, weight, workoutId } = req.body;
    if (weight !== null && reps === null) {
      return res
        .status(400)
        .send({ message: "Must include reps if specifying weight" });
    }
    const values = [uuidv4(), exerciseName, reps, weight, workoutId];

    try {
      const { rows } = await db.query(queries.addExercise, values);
      console.log(greenText(200), "POST /aapi/v1/workout/exercises");
      return res.status(201).send(rows[0]);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ message: "Bad syntax or request" });
    }
  },

  async endWorkout(req, res) {
    const values = [req.body.endTime, req.body.workoutId];
    try {
      const { rows } = await db.query(queries.endExercise, values);
      console.log(greenText(200), "POST /api/v1/workout/end");
      return res.status(200).send(rows);
    } catch (err) {
      console.log(redText(400), "POST /api/v1/workouts/end");
      return res.status(400).send({ message: "err:", err });
    }
  },

  async getLastWorkout(req, res) {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(400).send({ message: "Need token" });
    }
    try {
      const decodeToken = await jwt.verify(token, process.env.SECRET);
      const { rows } = await db.query(queries.getLastWorkout, [
        decodeToken.userId
      ]);
      return res.status(200).send(formatWorkoutList(rows));
    } catch (err) {
      console.log(redText(400), "POST /api/v1/workout/latest", err);
      return res.status(400).send({ error: err });
    }
  },

  async getWorkoutWithExercises(req, res) {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(400).send({ message: "NO TOKEN" });
    }
    try {
      const decodeToken = await jwt.verify(token, process.env.SECRET);
      const { rows } = await db.query(queries.getWorkoutByUser, [
        decodeToken.userId
      ]);
      formatWorkoutList(rows);
      let exerciseList = rows;

      for (let item of rows) {
        const { workoutId } = item;
        const { rows } = await db.query(queries.exerciseByWorkout, [workoutId]);

        formatExerciseList(rows);
        let exerciseItemList = rows;
        let obj = exerciseList.find(x => x.workoutId === item.workoutId);
        obj.exerciseItems = exerciseItemList;
      }
      console.log(greenText(200), "POST /api/v1/workout/withexercise");
      return res.status(200).send({ rows });
    } catch (err) {
      console.log(err);
      return res.status(400).send({ error: err });
    }
  },

  async deleteWorkout(req, res) {
    try {
      const { rows } = await db.query(queries.deleteWorkout, [
        req.query.workoutId
      ]);
      if (!rows[0]) {
        return res.status(404).send({ message: "No rows found" });
      }
      return res.sendStatus(204);
    } catch (err) {
      console.log(redText(400), "DELETE /api/v1/workout");
      return res.status(400).send({ error: err });
    }
  }
};

export default Workout;
