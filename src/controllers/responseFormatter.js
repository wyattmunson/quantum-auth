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

// let awe = {
//   mealitemid: "071accf6-f9a2-41a6-a677-6ba9eaa36994",
//   mealref: "cd99b11f-a34e-46bb-84e9-afaea4cc5123",
//   itemname: "Eggs",
//   qty: "3",
//   qtytype: "units",
//   createddate: "2018-12-31T01:46:57.166Z",
//   updateddate: null
// };

// let response = rows[0];
//   response.mealId = response.mealid;
//   delete response.mealid;
//   response.userId = response.userref;
//   delete response.userref;
//   response.mealType = response.mealtype;
//   delete response.mealtype;
//   response.createdDate = response.createddate;
//   delete response.createddate;
//   response.updatedDate = response.updateddate;
//   delete response.updateddate;
//   response.mealTime = response.mealtiume;
//   delete response.mealtime;
//   return rows;

// "mealid"
// "userref"
// "mealtime"
// "mealtype"
// "createddate"
// "updateddate"
