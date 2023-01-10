const { model, Schema } = require("mongoose");

let welcomeSchema = new Schema({
  Guild: String,
  Channel: String,
  DM: Boolean,
  DMMessage: Object,
  Content: Boolean,
  Embed: Boolean,
});

module.exports = model("Welcome", welcomeSchema);
