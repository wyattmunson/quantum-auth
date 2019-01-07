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
    );`;
};

const createMealsTable = () => {
  return `CREATE TABLE IF NOT EXISTS
    meals (
      mealid UUID PRIMARY KEY,
      userref UUID REFERENCES users (userid),
      mealtime TIMESTAMP WITH TIME ZONE,
      mealtype VARCHAR(128),
      createddate TIMESTAMP WITH TIME ZONE,
      updateddate TIMESTAMP WITH TIME ZONE
    );`;
};

const createMealItemTable = () => {
  return `CREATE TABLE IF NOT EXISTS
      mealitems (
      mealitemid UUID PRIMARY KEY,
      mealref UUID REFERENCES meals(mealid),
      itemname VARCHAR(255),
      qty VARCHAR(64),
      qtytype VARCHAR(64),
      createddate TIMESTAMP WITH TIME ZONE,
      updateddate TIMESTAMP WITH TIME ZONE
    );`;
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
  deleteNotesTable,
  createMealsTable,
  createMealItemTable
};
