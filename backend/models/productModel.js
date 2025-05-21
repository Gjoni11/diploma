const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: String,
    type: String,
    description: String,
    price: Number,
    imageUrls: [String], // <-- kjo duhet të jetë, jo "images"
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
