import moment from "moment";
import uuidv4 from "uuid/v4";
import jwt from "jsonwebtoken";
import db from "../db";
import queries from "./queries";
import { greenText, redText } from "../utils/colors";
import { formatNotes } from "./responseFormatter";

const Note = {
  // CREATE NTOE
  async create(req, res) {
    // Get userId from token
    const token = req.headers["x-access-token"];
    const decodeToken = await jwt.verify(token, process.env.SECRET);

    const values = [
      uuidv4(),
      decodeToken.userId,
      req.body.noteContent,
      req.body.noteHeader,
      moment(new Date()),
      moment(new Date()),
      req.body.noteType,
      req.body.dueDate || null
    ];

    try {
      const { data } = await db.query(queries.createNote, values);
      console.log(greenText("200"), "POST /api/v1/notes");
      return res.status(201).send({ data });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },

  // GET ALL NOTES
  async getAll(req, res) {
    try {
      const { data } = await db.query(queries.selectAllNotes);
      console.log(greenText("200"), "GET /api/v1/notes ");
      return res.status(200).send({ data });
    } catch (error) {
      console.log(redText("400"), "GET /api/v1/notes - Error Below:\n", error);
      return res.status(400).send(error);
    }
  },

  // GET NOTE BY ID
  async getOne(req, res) {
    try {
      const { data } = await db.query(queries.selectNoteById, [req.params.id]);
      if (!data[0]) {
        return res.status(404).send({ message: "No such note" });
      }
      console.log(greenText("200"), `GET /api/v1/notes/${[req.params.id]}`);
      return res.status(200).send({ data });
    } catch (error) {
      console.log(
        redText("400"),
        `GET /api/v1/notes${[req.params.id]} - Error below:\n`,
        error
      );
      return res.status(400).send(error);
    }
  },

  // GET NOTE BY USERID
  async getUserNotes(req, res) {
    // Get userId from token
    const token = req.headers["x-access-token"];
    try {
      const decodeToken = await jwt.verify(token, process.env.SECRET);
      if (!decodeToken) {
        return res.status(401).send({ message: "Token expired" });
      }
      const queryText = `SELECT * FROM notes WHERE userid=$1`;
      const { rows } = await db.query(queryText, [decodeToken.userId]);
      if (!rows[0]) {
        console.log(redText(404), "POST /api/v1/notes/byuser");
        return res.status(404).send({ message: "No notes found" });
      }
      console.log(greenText(200), "POST /api/v1/notes/byuser");
      return res.status(200).send(formatNotes(rows));
    } catch (error) {
      console.log(redText("400"), error);
      return res.status(400).send(error);
    }
  },

  // THIS IS NOT USED
  async getNotesType(req, res) {
    // console.log("GET NOTES BY USER HIT");
    // Get userId from token
    const token = req.headers["x-access-token"];
    const decodeToken = await jwt.verify(token, process.env.SECRET);
    console.log("DECODED TOKEN:", decodeToken.userId);
    try {
      const queryText = `SELECT * FROM notes WHERE userid=$1 AND notetype='note'`;
      const { rows } = await db.query(queryText, [decodeToken.userId]);
      if (!rows[0]) {
        // console.log(redText(404), "POST /api/v1/notes/byuser");
        return res.status(404).send({ message: "No notes found" });
      }
      console.log(greenText(200), "GET /api/v1/notes/notes");
      return res.status(200).send(formatNotes(rows));
    } catch (error) {
      console.log(redText("400"), error);
      return res.status(400).send(error);
    }
  },

  // GET NOTES BY USER ID FILTERED BY NOTE TYPE
  async filterNotes(req, res) {
    // Get userId from token
    const token = req.headers["x-access-token"];
    const decodeToken = await jwt.verify(token, process.env.SECRET);

    try {
      const queryText = queries.getNoteByType;
      const { rows } = await db.query(queryText, [
        decodeToken.userId,
        req.body.noteType
      ]);
      if (!rows[0]) {
        console.log(redText(404), "POST /api/v1/notes/filter");
        return res.status(404).send({ message: "No notes found" });
      }
      console.log(greenText(200), "POST /api/v1/notes/filter");
      return res.status(200).send(formatNotes(rows));
    } catch (error) {
      console.log(redText("400"), error);
      return res.status(400).send(error);
    }
  },

  //   UPDATE NOTE
  async update(req, res) {
    try {
      const { data } = await db.query(queries.selectNoteById, [req.params.id]);
      if (!data[0]) {
        return res.status(404).send({ message: "No such note" });
      }
      const values = [
        req.body.userId || data[0].userid,
        req.body.noteContent || data[0].notecontent,
        req.body.noteHeader || data[0].noteheader,
        moment(new Date()),
        req.params.id
      ];
      const response = await db.query(queries.updateNote, values);
      console.log(greenText("200"), `PUT /api/v1/notes/${[req.params.id]}`);
      return res.status(200).send(response.data[0]);
    } catch (err) {
      console.log(
        redText("400"),
        `PUT /api/v1/notes/${[req.params.id]} - Error below\n`,
        err
      );
      return res.status(400).send(err);
    }
  },

  //   DELTE NOTE
  async delete(req, res) {
    try {
      const { rows } = await db.query(queries.deleteNotes, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: "No such note" });
      }
      console.log(greenText("204"), `DELETE /api/v1/notes/${[req.params.id]}`);
      return res.sendStatus(204);
    } catch (error) {
      console.log(
        redText("400"),
        `DELETE /api/v1/notes/${[req.params.id]} - Error below`,
        error
      );
      return res.status(400).send(error);
    }
  }
};

export default Note;
