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
