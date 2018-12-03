import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ message: "I can't take another 199 of these!" });
});

app.listen(5151);
console.log("INFO: QA listening on port:", 5151);
