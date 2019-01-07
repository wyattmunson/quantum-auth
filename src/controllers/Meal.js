import moment from "moment";
import uuidv4 from "uuid/v4";
import db from "../db";
import jwt from "jsonwebtoken";
import Helper from "./Helper";
import queries from "./queries";
import { redText, greenText } from "../utils/colors";
import { formatCreateMeal, formatAddMealItem } from "./responseFormatter";

const Meal = {
  async create(req, res) {
    //

    // GET userId from token
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(400).send({ message: "token not provided" });
    }
    const decodeToken = await jwt.verify(token, process.env.SECRET);

    const values = [
      uuidv4(),
      req.body.mealTime || moment(new Date()),
      req.body.mealType || null,
      moment(new Date()),
      decodeToken.userId
    ];

    try {
      const { rows } = await db.query(queries.createMeal, values);
      formatCreateMeal(rows);
      return res.status(201).send(rows[0]);
    } catch (err) {
      console.log(redText("400"), err);
      return res.status(400).send("400 - Could not add record");
    }
  },

  // GET BY USER
  async getByUser(req, res) {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(400).send({ message: "No token in header" });
    }
    // TRY/CATCH CALL TO POSTGRES
    try {
      const decodeToken = await jwt.verify(token, process.env.SECRET);
      const { rows } = await db.query(queries.getMealByUser, [
        decodeToken.userId
      ]);
      if (!rows[0]) {
        return res.status(404).send({ message: "No meals found" });
      }
      return res.status(200).send({ rows });
    } catch (err) {
      console.log(redText("400"), err);
      return res.status(400).send({ message: err });
    }
  },

  async getMealWithItem(req, res) {
    const token = req.headers["x-access-token"];
    console.log("REQUEST HEADER:", req.headers);
    if (!token) {
      return res.status(400).send({ message: "No token in header" });
    }
    // TRY/CATCH CALL TO POSTGRES
    try {
      const decodeToken = await jwt.verify(token, process.env.SECRET);
      console.log(decodeToken);
      const { rows } = await db.query(queries.getMealByUser, [
        decodeToken.userId
      ]);
      let mealList = rows;

      for (let item of mealList) {
        console.log(item);
        const { mealid } = item;
        const { rows } = await db.query(queries.getItemsByMeal, [mealid]);
        console.log("INTERNAL ROWS:", rows);
        let mealItemList = rows;
        let obj = mealList.find(x => x.mealid === item.mealid);
        obj.mealItem = mealItemList;
      }
      if (!rows[0]) {
        return res.status(404).send({ message: "No meals found" });
      }
      return res.status(200).send({ rows });
    } catch (err) {
      console.log(redText("400"), err);
      return res.status(400).send({ message: "400 error - see logs" });
    }
  },

  async addItemToMeal(req, res) {
    if (!req.body.mealId) {
      console.log(redText(400), "POST /api/v1/meals/item - MEALID NULL");
      return res.status(400).send({ message: "Must include mealId" });
    }
    const values = [
      uuidv4(),
      req.body.mealId,
      req.body.itemName,
      req.body.qty,
      req.body.qtyType,
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(queries.addItemToMeal, values);
      formatAddMealItem(rows);
      return res.status(201).send(rows[0]);
    } catch (err) {
      console.log(redText(200), err);
      return res.status(400).send(err);
    }
  }
};

export default Meal;
