import express from "express";
import dotenv from "dotenv";
import "babel-polyfill";
import Notes from "./src/controllers/Notes";
import User from "./src/controllers/User";
import Meal from "./src/controllers/Meal";
import Auth from "./src/middleware/Auth";
import { greenText, redText, underline, cyanText } from "./src/utils/colors";

const app = express();

app.use(express.json());

// I love it - CORS solution
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // res.append("Allow", "GET,PUT,POST,DELETE,OPTIONS,HEAD");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  res.append("Access-Control-Allow-Headers", "x-access-token");
  next();
});

// Healthcheck endpoint
app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ message: "I can't take another 199 of these!" });
});

// NOTES ROUTES
app.post("/api/v1/notes", Auth.validateToken, Notes.create);
app.get("/api/v1/notes", Notes.getAll);
app.get("/api/v1/notes/byuser", Notes.getUserNotes);
app.get("/api/v1/notes/:id", Notes.getOne);
app.put("/api/v1/notes/:id", Notes.update);
app.delete("/api/v1/notes/:id", Notes.delete);

// USER ROUTE
app.post("/api/v1/users", User.create);
app.post("/api/v1/users/login", User.login);
app.get("/api/v1/users/me", Auth.validateToken, User.getMe);
app.delete("/api/v1/users/me", Auth.validateToken, User.delete);

// MEALS ROUTE
app.post("/api/v1/meals", Meal.create);
app.get("/api/v1/meals/byuser", Meal.getByUser);
app.get("/api/v1/meals/withitems", Meal.getMealWithItem);
app.post("/api/v1/meals/item", Meal.addItemToMeal);

app.listen(5151);
console.log(underline("QUANTUM AUTH"));
console.log("qAuth API:", greenText("ONLINE"));
console.log("INFO: QA listening on port:", cyanText(5151));
