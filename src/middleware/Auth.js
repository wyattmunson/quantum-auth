import jwt from "jsonwebtoken";
import db from "../db";

const Auth = {
  async validateToken(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(400).send({ message: "Token missing from header" });
    }
    try {
      const decodeToken = await jwt.verify(token, process.env.SECRET);
      const queryText = `SELECT * FROM users WHERE userid=$1`;
      const { rows } = await db.query(queryText, [decodeToken.userId]);
      if (!rows[0]) {
        return res.status(400).send({ message: "Token invalid" });
      }
      req.user = { userid: decodeToken.userId };
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
};

export default Auth;
