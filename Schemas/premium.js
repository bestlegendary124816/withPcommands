const { model, Schema } = require("mongoose");

let Premium = new Schema({
  UserID: String,
});

module.exports = model("Premium", Premium);
