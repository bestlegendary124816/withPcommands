const { model, Schema } = require("mongoose");

let RemoveSchema = new Schema({
  Guild: String,
  Channel: String,
});

module.exports = model("Remove", RemoveSchema);
