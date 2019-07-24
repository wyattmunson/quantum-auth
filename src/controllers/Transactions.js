import uuidv4 from "uuid/v4";
import db from "../db";
import queries from "./queries";
import moment from "moment";
import jwt from "jsonwebtoken";
import {
  formatTrans,
  formatLineItem,
  formatTransList,
  formatLineItemList
} from "./responseFormatter";
import { redText, greenText } from "../utils/colors";
import dotenv from "dotenv";

dotenv.config();

console.log(moment(new Date()));

const Transactions = {
  async create(req, res) {
    const token = req.headers["x-access-token"];
    console.log("PROCESS ENV", process.env.SECRET);

    try {
      const decodeToken = await jwt.verify(token, process.env.SECRET);
      const values = [decodeToken.userId, req.body.createdDate, uuidv4()];

      const { rows } = await db.query(queries.createTrans, values);
      return res.status(201).send(formatTrans(rows));
    } catch (err) {
      console.log("400 POST /api/v1/trans");
      console.log(err);
      return res.status(400).send({ error: err });
    }
  },

  async addLineItem(req, res) {
    const values = [
      uuidv4(),
      req.body.transId,
      req.body.price,
      req.body.units || 1,
      req.body.item,
      req.body.price * (req.body.units || 1)
    ];

    console.log("TOTAL", req.body.price * req.body.units);

    try {
      const { rows } = await db.query(queries.addLineItem, values);
      return res.status(201).send(formatLineItem(rows));
    } catch (err) {
      console.log(redText(400), "POST /api/v1/trans/lineitem");
      return res.status(400).send(err);
    }
  },

  async listTrans(req, res) {
    // const values = [];
    try {
      const { rows } = await db.query(queries.getTrans);
      console.log(greenText(200), "GET /api/v1/trans");
      //   console.log("ROWS", rows);
      return res.status(200).send(formatTransList(rows));
    } catch (err) {
      console.log(redText(400), "GET /api/v1/trans");
      return res.status(400).send({ message: "400 error", error: err });
    }
  },

  async getTransById(req, res) {
    const values = [req.query.transId];
    try {
      const { rows } = await db.query(queries.getTransById, values);

      let trans = formatTrans(rows);
      if (1 === 1) {
        const { rows } = await db.query(queries.getLineItemsByTrans, values);
        // console.log(rows);
        let lineItems = formatLineItemList(rows);
        trans.lineItems = lineItems;
      }

      console.log(greenText(200), "GET /api/v1/trans/byid");
      return res.status(200).send(trans);
    } catch (err) {
      console.log(
        redText(400),
        "GET /api/v1/trans?transId=",
        req.query.transId,
        err
      );
      return res.status(400).send(err);
    }
  },

  async close(req, res) {
    try {
      // Look for line items in trans
      const { rows } = await db.query(queries.getLineItemsByTrans, [
        req.body.transId
      ]);
      let lineItems = formatLineItemList(rows);

      if (lineItems.length > 0) {
        let transTotal = 0;
        for (let item of lineItems) {
          transTotal = transTotal + parseFloat(item.total);
        }
        let closedValues = [req.body.closeDate, req.body.transId, transTotal];
        const { rows } = await db.query(queries.closeTrans, closedValues);
        let closedTrans = formatTrans(rows);
        return res.status(200).send(closedTrans);
      } else {
        // NO LINE ITEMS
        // TODO: Delete trans
        let closeValues = [req.body.closeDate, req.body.transId, 0];
        const { rows } = await db.query(queries.closeTrans, closeValues);
        console.log(greenText(200), "POST /api/v1/trans/close");
        return res.status(200).send({ message: "No list items. Closed." });
      }

      return res.status(200).send(formatLineItemList(rows));
    } catch (err) {
      console.log(redText(400), "POST /api/v1/trans/close\n", err);
      return res.status(400).send({ error: err });
    }
  },

  async closeTrans(req, res) {
    const values = [req.body.closeDate, req.body.transId];
    try {
      const { rows } = await db.query(queries.getLineItemsByTrans, [
        req.body.transId
      ]);
      let lineItems = rows;
      console.log(lineItems);

      if (lineItems.length === 0) {
        // Delete transaction
        console.log("NO ROWS RETURNED");
        try {
          const { rows } = await db.query(queries.deleteTrans, [
            req.body.transId
          ]);
          return res.status(200).send({ message: "No line items, deleted" });
        } catch (err) {
          return res.status(400).send(err);
        }
      } else {
        // const { rows } = await db.query(queries.closeTrans, values);
        console.log("LINEITEMS", lineItems);
        let total = 0;
        for (let item in lineItems) {
          total = total + item.total;
        }
        try {
          let closedValues = [req.body.closeDate, req.body.transId, total];
          const { rows } = await db.query(queries.closeTrans, closedValues);
          let closedTrans = rows;
          return res.status(200).send(formatTrans(closedTrans));
        } catch (err) {
          return res.status(400).send({ messagae: "error" });
        }
      }

      //   return res.status(200).send(formatTrans(closedTrans));
      return res.status(200).send({ message: "test" });
    } catch (err) {
      console.log(redText(400), "POST /api/v1/trans/close\n", err);
      return res.status(400).send(err);
    }
  }
};

export default Transactions;
