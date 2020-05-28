const { Schema, model } = require("mongoose");

const comment = new Schema({
  image_id: Schema.ObjectId,
  email: String,
  name: String,
  gravatar: String,
  comment: String,
  timestamp: { type: Date, default: Date.now() },
});

module.exports = model("Comment", comment);
