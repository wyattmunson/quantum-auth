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
