module.exports = {
  test: "test",
  selectAllNotes: `SELECT * FROM notes;`,
  selectNoteById: `SELECT * FROM notes WHERE noteid=$1;`,
  createNote: `INSERT INTO
    notes (noteid, userid, notecontent, noteheader, createddate, modifieddate, notetype)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`,
  updateNote: `UPDATE notes
    SET userid=$1, notecontent=$2, noteheader=$3, createddate=$4
    WHERE noteid=$5
    RETURNING *`,
  deleteNotes: `DELETE FROM notes WHERE noteid=$1 RETURNING *`,

  // USER QUERIES
  selectUserByEmail: `SELECT * FROM users WHERE email = $1`,
  selectUserById: `SELECT userid, email, firstname, lastname, createddate 
    FROM users 
    WHERE userid = $1`,
  createUser: `INSERT INTO users (userid, email, password, firstname, lastname, createddate)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
  deleteUser: `DELETE FROM users WHERE userid=$1 RETURNING *`,

  // MEAL QUERIES
  createMeal: `INSERT INTO
    meals (mealid, mealtime, mealtype, createddate, userref)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
  addItemToMeal: `INSERT INTO
    mealitems (mealitemid, mealref, itemname, qty, qtytype, createddate)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
  getMealByUser: `SELECT * 
    FROM meals
    WHERE userref = $1`,
  getItemsByMeal: `SELECT *
    FROM mealitems
    WHERE mealref = $1`
};
