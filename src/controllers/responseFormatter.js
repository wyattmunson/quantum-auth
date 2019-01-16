export const formatGetMe = rows => {
  let response = rows[0];
  response["firstName"] = response["firstname"];
  delete response["firstname"];
  response["lastName"] = response["lastname"];
  delete response["lastname"];
  response["userId"] = response["userid"];
  delete response["userid"];
  response["createdDate"] = response["createddate"];
  delete response["createddate"];
  return response;
};

export const formatCreateMeal = rows => {
  let response = rows[0];
  response["mealType"] = response["mealtype"];
  delete response["mealtype"];
  response["mealId"] = response["mealid"];
  delete response["mealid"];
  response["userId"] = response["userref"];
  delete response["userref"];
  response["mealTime"] = response["mealtime"];
  delete response["mealtime"];
  response["createdDate"] = response["createddate"];
  delete response["createddate"];
  response["updateDate"] = response["updateddate"];
  delete response["updateddate"];
  return response;
};

export const formatAddMealItem = rows => {
  let response = rows[0];
  response["mealItemId"] = response["mealitemid"];
  delete response.mealitemid;
  response.mealId = response.mealref;
  delete response.mealref;
  response.itemName = response.itemname;
  delete response.itemname;
  response.qtyType = response.qtytype;
  delete response.qtytype;
  response.createdDate = response.createddate;
  delete response.createddate;
  response.updatedDate = response.updateddate;
  delete response.updateddate;
  return response;
};

// ITERATE OVER ARRAY
export const formatGetMeal = rows => {
  for (let item of rows) {
    item.mealId = item.mealid;
    delete item.mealid;
    item.userId = item.userref;
    delete item.userref;
    item.mealType = item.mealtype;
    delete item.mealtype;
    item.createdDate = item.createddate;
    delete item.createddate;
    item.updatedDate = item.updateddate;
    delete item.updateddate;
    item.mealTime = item.mealtiume;
    delete item.mealtime;
  }
  return rows;
};

// FORMAT MEAL ITEM - iterates over array
export const formatMealItem = rows => {
  for (let item of rows) {
    item.mealItemId = item.mealitemid;
    delete item.mealitemid;
    item.mealref = item.mealId;
    delete item.mealref;
    item.itemName = item.itemname;
    delete item.itemname;
    item.qtyType = item.qtytype;
    delete item.qtytype;
    item.createdDate = item.createddate;
    delete item.createddate;
    item.updatedDate = item.updateddate;
    delete item.updateddate;
  }
  return rows;
};

// FORMAT CREATE WORKOUT
export const formatCreateWorkout = rows => {
  let response = rows[0];
  response.workoutId = response.workoutid;
  delete response.workoutid;
  response.workoutDate = response.workouttime;
  delete response.workouttime;
  response.userId = response.userref;
  delete response.userref;
  return response;
};

export const formatWorkoutList = rows => {
  for (let item of rows) {
    item.workoutId = item.workoutid;
    delete item.workoutid;
    item.workoutDate = item.workouttime;
    delete item.workouttime;
    item.userId = item.userref;
    delete item.userref;
    item.startTime = item.starttime;
    delete item.starttime;
    item.endTime = item.endtime;
    delete item.endtime;
  }
  return rows;
};

export const formatExerciseList = rows => {
  for (let item of rows) {
    item.workoutId = item.workoutref;
    delete item.workoutref;
    item.exerciseName = item.exercisename;
    delete item.exercisename;
    item.exerciseId = item.exerciseid;
    delete item.exerciseid;
  }
  return rows;
};

export const formatNotes = rows => {
  for (let item of rows) {
    item.createdDate = item.createddate;
    delete item.createddate;
    item.dueDate = item.duedate;
    delete item.duedate;
    item.modifiedDate = item.modifieddate;
    delete item.modifieddate;
    item.noteContent = item.notecontent;
    delete item.notecontent;
    item.noteHeader = item.noteheader;
    delete item.noteheader;
    item.noteId = item.noteid;
    delete item.noteid;
    item.noteType = item.notetype;
    delete item.notetype;
    item.userId = item.userid;
    delete item.userid;
  }
  return rows;
};

export const formatTrans = rows => {
  let item = rows[0];
  item.transId = item.transid;
  delete item.transid;
  item.userId = item.userref;
  delete item.userref;
  item.createdDate = item.createddate;
  delete item.createddate;
  item.updatedDate = item.updateddate;
  delete item.updateddate;
  item.closeDate = item.closedate;
  delete item.closedate;
  item.transTotal = item.transtotal;
  delete item.transtotal;
  return item;
};

export const formatTransList = rows => {
  for (let item of rows) {
    item.transId = item.transid;
    delete item.transid;
    item.userId = item.userref;
    delete item.userref;
    item.createdDate = item.createddate;
    delete item.createddate;
    item.updatedDate = item.updateddate;
    delete item.updateddate;
    item.closeDate = item.closedate;
    delete item.closedate;
    item.transTotal = item.transtotal;
    delete item.transtotal;
  }
  return rows;
};

export const formatLineItem = rows => {
  let item = rows[0];
  item.lineItemId = item.lineitemid;
  delete item.lineitemid;
  item.transId = item.transref;
  delete item.transref;
  return item;
};

export const formatLineItemList = rows => {
  for (let item of rows) {
    item.lineItemId = item.lineitemid;
    delete item.lineitemid;
    item.transId = item.transref;
    delete item.transref;
  }
  return rows;
};
