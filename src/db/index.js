import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  // host: process.env.RDS_HOSTNAME,
  // user: process.env.RDS_USERNAME,
  // password: process.env.RDS_PASSWORD,
  // port: process.env.RDS_PORT,
  // database: process.env.RDS_DB_NAME
  connectionString: process.env.DATABASE_URL
});

export default {
  query(text, params) {
    // console.log("CONNECTION STRING", process.env.DATABASE_URL);
    console.log("INFO: DB transaction initiated");
    return new Promise((resolve, reject) => {
      pool
        .query(text, params)
        .then(res => {
          console.log("INFO: DB transaction success");
          resolve(res);
        })
        .catch(err => {
          console.log("ERR : DB transaction failed:", err);
          reject(err);
        });
    });
  }
};
