import express from "express";
import dotenv from "dotenv";
import "babel-polyfill";
import Notes from "./src/controllers/Notes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ message: "I can't take another 199 of these!" });
});

// ROUTES
app.post("/api/v1/notes", Notes.create);
app.get("/api/v1/notes", Notes.getAll);
app.get("/api/v1/notes/:id", Notes.getOne);
app.put("/api/v1/notes/:id", Notes.update);
app.delete("/api/v1/notes/:id", Notes.delete);

app.listen(5151);
console.log("INFO: QA listening on port:", 5151);
