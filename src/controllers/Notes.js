import moment from "moment";
import uuidv4 from "uuid/v4";
import db from "../db";
import queries from "./queries";
import { greenText, redText } from "../utils/colors";

const Note = {
  // CREATE NTOE
  async create(req, res) {
    const queryText = `INSERT INTO
        notes (noteid, userid, notecontent, noteheader, createddate, modifieddate)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`;

    const values = [
      uuidv4(),
      req.body.userId,
      req.body.noteContent,
      req.body.noteHeader,
      moment(new Date()),
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(queryText, values);
      console.log(greenText("200"), "POST /api/v1/notes");
      return res.status(201).send({ rows });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },

  // GET ALL NOTES
  async getAll(req, res) {
    try {
      const { rows } = await db.query(queries.selectAllNotes);
      console.log(greenText("200"), "GET /api/v1/notes ");
      return res.status(200).send({ rows });
    } catch (error) {
      console.log(redText("400"), "GET /api/v1/notes - Error Below:\n", error);
      return res.status(400).send(error);
    }
  },

  // GET NOTE BY ID
  async getOne(req, res) {
    const getOneQuery = `SELECT * FROM notes WHERE noteid=$1`;
    try {
      const { rows } = await db.query(getOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: "No such note" });
      }
      console.log(greenText("200"), `GET /api/v1/notes/${[req.params.id]}`);
      return res.status(200).send({ rows });
    } catch (error) {
      console.log(
        redText("400"),
        `GET /api/v1/notes${[req.params.id]} - Error below:\n`,
        error
      );
      return res.status(400).send(error);
    }
  },

  async update(req, res) {
    try {
      const { rows } = await db.query(queries.selectNoteById, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({ message: "No such note" });
      }
      const values = [
        req.body.userId || rows[0].userid,
        req.body.noteContent || rows[0].notecontent,
        req.body.noteHeader || rows[0].noteheader,
        moment(new Date()),
        req.params.id
      ];
      const response = await db.query(queries.updateNote, values);
      console.log(greenText("200"), `PUT /api/v1/notes/${[req.params.id]}`);
      return res.status(200).send(response.rows[0]);
    } catch (err) {
      console.log(
        redText("400"),
        `PUT /api/v1/notes/${[req.params.id]} - Error below\n`,
        err
      );
      return res.status(400).send(err);
    }
  },

  async delete(req, res) {
    try {
      const { rows } = await db.query(queries.deleteNotes, [req.params.id]);
      if (!rows[0]) {
        return res.stats(404).send({ message: "No such note" });
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
