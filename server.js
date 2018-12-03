import express from "express";
import dotenv from "dotenv";
import "babel-polyfill";
import Notes from "./src/controllers/Notes";
import User from "./src/controllers/User";
import Auth from "./src/middleware/Auth";
import { greenText, redText, underline, cyanText } from "./src/utils/colors";
import { SIGUNUSED } from "constants";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ message: "I can't take another 199 of these!" });
});

// NOTES ROUTES
app.post("/api/v1/notes", Auth.validateToken, Notes.create);
app.get("/api/v1/notes", Notes.getAll);
app.get("/api/v1/notes/:id", Notes.getOne);
app.put("/api/v1/notes/:id", Notes.update);
app.delete("/api/v1/notes/:id", Notes.delete);

// USER ROUTE
app.post("/api/v1/users", User.create);
app.post("/api/v1/users/login", User.login);
app.delete("/api/v1/users/me", Auth.validateToken, User.delete);

app.listen(5151);
console.log(underline("QUANTUM AUTH"));
console.log("qAuth API:", greenText("ONLINE"));
console.log("INFO: QA listening on port:", cyanText(5151));
