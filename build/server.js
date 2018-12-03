"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

require("babel-polyfill");

var _Notes = require("./src/controllers/Notes");

var _Notes2 = _interopRequireDefault(_Notes);

var _User = require("./src/controllers/User");

var _User2 = _interopRequireDefault(_User);

var _Auth = require("./src/middleware/Auth");

var _Auth2 = _interopRequireDefault(_Auth);

var _colors = require("./src/utils/colors");

var _constants = require("constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.json());

app.get("/", function (req, res) {
  return res.status(200).send({ message: "I can't take another 199 of these!" });
});

// NOTES ROUTES
app.post("/api/v1/notes", _Auth2.default.validateToken, _Notes2.default.create);
app.get("/api/v1/notes", _Notes2.default.getAll);
app.get("/api/v1/notes/:id", _Notes2.default.getOne);
app.put("/api/v1/notes/:id", _Notes2.default.update);
app.delete("/api/v1/notes/:id", _Notes2.default.delete);

// USER ROUTE
app.post("/api/v1/users", _User2.default.create);
app.post("/api/v1/users/login", _User2.default.login);
app.delete("/api/v1/users/me", _Auth2.default.validateToken, _User2.default.delete);

app.listen(5151);
console.log((0, _colors.underline)("QUANTUM AUTH"));
console.log("qAuth API:", (0, _colors.greenText)("ONLINE"));
console.log("INFO: QA listening on port:", (0, _colors.cyanText)(5151));