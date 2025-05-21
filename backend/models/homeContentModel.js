const mongoose = require("mongoose");

const homeContentSchema = new mongoose.Schema({
  headline: { type: String, required: true },
  imageUrls: [{ type: String, required: true }]
});

module.exports = mongoose.model("HomeContent", homeContentSchema);
