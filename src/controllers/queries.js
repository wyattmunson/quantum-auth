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
    WHERE mealref = $1`,

  // WORKOUT QUERIES
  createWorkout: `INSERT INTO
    workouts (workoutid, workouttime, userref, starttime)
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
  getWorkoutByUser: `SELECT * 
    FROM workouts
    WHERE userref = $1
    ORDER BY starttime DESC`,
  addExercise: `INSERT INTO
    exercises (exerciseid, exercisename, reps, weight, workoutref)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
  endExercise: `UPDATE workouts
    SET endtime = $1
    WHERE workoutid = $2
    RETURNING *`,
  getLastWorkout: `SELECT *
      FROM workouts
      WHERE userref = $1
      ORDER BY starttime DESC LIMIT 1`,
  exerciseByWorkout: `SELECT *
    FROM exercises
    WHERE workoutref = $1`,
  deleteWorkout: `DELETE
    FROM workouts
    WHERE workoutid = $1
    RETURNING *`
};
