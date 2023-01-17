const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    categoryId: Number,
    categoryName: {
      type: String,
      required: true,
    },
    categoryDescription: {
      type: String,
      // required: true,
    },
    categoryImage:{
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', CategorySchema);

// We will get error if we keep CategoryId and in routes if we give categoryId.

// date_added : {
//   type : Date,
//   default : Date.now
// },