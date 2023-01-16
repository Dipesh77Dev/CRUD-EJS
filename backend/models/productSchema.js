const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productId: Number,
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      maxlength: 20,
    },
    productPrice: {
      type: Number,
    },
    productImage: {
      type: Array,
      // required: true
    },
    // category: {
    //   type: ObjectId,
    //   ref: "Category",
    //   // required: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
