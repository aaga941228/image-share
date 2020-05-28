const { Schema, model } = require("mongoose");
const path = require("path");

const imageSchema = new Schema({
  uniqueId: String,
  title: String,
  description: String,
  filename: String,
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now() },
});

module.exports = model("Image", imageSchema);
