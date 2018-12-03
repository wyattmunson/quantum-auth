const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  database: process.env.RDS_DB_NAME
});

pool.on("connect", () => {
  console.log("DB connection esatblished");
});

// Create tables
const createTables = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      notes (
          noteid UUID PRIMARY KEY,
          userid UUID,
          notecontent VARCHAR(255),
          noteheader VARCHAR(64),
          createddate TIMESTAMP WITH TIME ZONE,
          modifieddate TIMESTAMP WITH TIME ZONE
      );`;

  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

// DROP TABLES
const dropTables = () => {
  const queryText = "DROP TABLE IF EXISTS notes";

  pool
    .query(queryText)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

pool.on("remove", () => {
  console.log("INFO: Client removed, exiting process.");
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables
};

require("make-runnable");
