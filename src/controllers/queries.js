module.exports = {
  test: "test",
  selectAllNotes: `SELECT * FROM notes;`,
  selectNoteById: `SELECT * FROM notes WHERE noteid=$1;`,
  createNote: `INSERT INTO
    notes (noteid, userid, notecontent, noteheader, createddate, modifieddate, notetype, duedate)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
  updateNote: `UPDATE notes
    SET userid=$1, notecontent=$2, noteheader=$3, createddate=$4
    WHERE noteid=$5
    RETURNING *`,
  deleteNotes: `DELETE FROM notes WHERE noteid=$1 RETURNING *`,

  getNotesDesc: `SELECT *
    FROM notes 
    WHERE userid=$1
    ORDER BY createddate DESC`,

  getNoteByType: `SELECT * 
    FROM notes
    WHERE userid=$1 AND notetype=$2
    ORDER BY createddate DESC`,

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
    RETURNING *`,

  // TRANSACTIONS
  createTrans: `INSERT INTO 
      trans (userref, createddate, transid)
      VALUES ($1, $2, $3)
      RETURNING *`,
  addLineItem: `INSERT INTO
    lineitem (lineitemid, transref, price, units, item, total)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
  closeTrans: `UPDATE trans
    SET closedate = $1, updateddate = $1, transtotal = $3
    WHERE transid = $2
    RETURNING *`,
  getTrans: `SELECT * 
    FROM trans
    ORDER BY createddate DESC
    `,
  getTransById: `SELECT *
    FROM trans
    WHERE transid=$1`,
  getLineItemsByTrans: `SELECT *
    FROM lineitem
    WHERE transref=$1`,
  deleteTrans: `DELETE
    FROM trans
    WHERE transid=$1`,

  // TRIP QUERIES
  createTrip: `INSERT INTO
    trips (tripid, userid, name, cities, startdate, enddate)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
  getUserTrip: `SELECT *
    FROM trips
    WHERE userid=$1`,
  getUserTripWithEvent: `SELECT a.userid userid, a.tripid tripid, a.name tripname, b.trip tripid, b.eventid eventid, b.type triptype, b.icon icon, b.startdate startdate, b.enddate enddate, b.title title, b.subtext subtext
    FROM trips a
    LEFT JOIN events b ON a.tripid = b.trip
    WHERE a.userid=$1`,

  // EVENT QUERIES
  createEvent: `INSERT INTO
    events (eventid, trip, type, icon, startdate, enddate, title, subtext)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
  getEventById: `SELECT *
    FROM events
    WHERE trip=$1`,
  deleteEvent: `DELETE
    FROM events
    WHERE eventid=$1
    RETURNING *`
};
