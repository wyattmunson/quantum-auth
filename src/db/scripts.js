// CREATE NOTES TABLE
const createNotesTable = () => {
  return `CREATE TABLE IF NOT EXISTS
    notes (
        noteid UUID PRIMARY KEY,
        userid UUID,
        notecontent VARCHAR(255),
        noteheader VARCHAR(64),
        createddate TIMESTAMP WITH TIME ZONE,
        modifieddate TIMESTAMP WITH TIME ZONE
    );`;
};

// CREATE USERS TABLE
const createUsersTable = () => {
  return `CREATE TABLE IF NOT EXISTS
    users (
        userid UUID PRIMARY KEY,
        email VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        firstname VARCHAR(128),
        lastname VARCHAR(128),
        createddate TIMESTAMP WITH TIME ZONE,
        modifieddate TIMESTAMP WITH TIME ZONE
    )`;
};

// DELETE USERS TABLE
const deleteUsersTable = () => {
  return `DROP TABLE IF EXISTS users;`;
};

// DELETE NOTES TABLE
const deleteNotesTable = () => {
  return `DELETE TABLE IF EXISTS notes;`;
};

module.exports = {
  createNotesTable,
  createUsersTable,
  deleteUsersTable,
  deleteNotesTable
};
