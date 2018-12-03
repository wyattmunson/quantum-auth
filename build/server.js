"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.json());

app.get("/", function (req, res) {
  return res.status(200).send({ message: "I can't take another 199 of these!" });
});

app.listen(5151);
console.log("INFO: QA listening on port:", 5151);