const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    CategoryId: String,
    CategoryName: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model('Category', CategorySchema);