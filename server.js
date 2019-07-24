import express from "express";
import dotenv from "dotenv";
import "babel-polyfill";
import Notes from "./src/controllers/Notes";
import User from "./src/controllers/User";
import Meal from "./src/controllers/Meal";
import Auth from "./src/middleware/Auth";
import Workout from "./src/controllers/Workout";
import Transactions from "./src/controllers/Transactions";
import Trips from "./src/controllers/Trips";
import Events from "./src/controllers/Events";
import { greenText, redText, underline, cyanText } from "./src/utils/colors";

const app = express();

app.use(express.json());

// I love it - CORS solution
app.use((req, res, next) => {
  console.log("INFO: Request recieved");
  // res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.append("Allow", "GET,PUT,POST,DELETE,OPTIONS,HEAD");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  res.append("Access-Control-Allow-Headers", "x-access-token");
  next();
});

// Healthcheck endpoint
app.get("/", (req, res) => {
  return res.status(200).send({ message: "I can't take another 199 of these!" });
});

///////////////
// ENDPOINTS //
///////////////

// NOTES ROUTES
app.post("/api/v1/notes", Auth.validateToken, Notes.create);
app.get("/api/v1/notes", Notes.getAll);
app.get("/api/v1/notes/byuser", Notes.getUserNotes);
app.get("/api/v1/notes/:id", Notes.getOne);
app.put("/api/v1/notes/:id", Notes.update);
app.delete("/api/v1/notes/:id", Notes.delete);
app.post("/api/v1/notes/filter", Notes.filterNotes);

// USER ROUTES
app.post("/api/v1/users", User.create);
app.post("/api/v1/users/login", User.login);
app.get("/api/v1/users/me", Auth.validateToken, User.getMe);
app.delete("/api/v1/users/me", Auth.validateToken, User.delete);

// MEALS ROUTES
app.post("/api/v1/meals", Meal.create);
app.get("/api/v1/meals/byuser", Meal.getByUser);
app.get("/api/v1/meals/withitems", Meal.getMealWithItem);
app.post("/api/v1/meals/item", Meal.addItemToMeal);

// WOKROUT ROUTES
app.post("/api/v1/workout", Workout.create);
app.get("/api/v1/workout", Workout.getByUser);
app.post("/api/v1/exercises", Workout.createExercise);
app.post("/api/v1/workout/end", Workout.endWorkout);
app.get("/api/v1/workout/latest", Workout.getLastWorkout);
app.get("/api/v1/workout/withexercise", Workout.getWorkoutWithExercises);
app.delete("/api/v1/workout", Workout.deleteWorkout);

// TRAANS
app.get("/api/v1/trans", Transactions.listTrans);
app.post("/api/v1/trans", Transactions.create);
app.post("/api/v1/trans/lineitem", Transactions.addLineItem);
// app.post("/api/v1/trans/close", Transactions.closeTrans);
app.post("/api/v1/trans/close", Transactions.close);
app.get("/api/v1/trans/byid", Transactions.getTransById);

// TRIPS
app.post("/api/v1/trips", Trips.create);
app.get("/api/v1/trips/mine", Trips.getMyTrips);
app.get("/api/v1/trips/mine/event", Trips.getMyTripsWithEvents);

app.post("/api/v1/event", Events.create);
app.post("/api/v1/eventbytrip", Events.getEventById);
app.get("/api/v1/events/mine", Events.getEventById);
app.delete("/api/v1/event", Events.delete);

app.listen(5151);
console.log(underline("QUANTUM AUTH"));
console.log("qAuth API:", greenText("ONLINE"));
console.log("INFO: QA listening on port:", cyanText(5151));
