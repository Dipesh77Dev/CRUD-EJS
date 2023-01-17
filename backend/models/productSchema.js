const mongoose = require("mongoose");

// const { ObjectId } = mongoose.Schema.Types; - type: ObjectId

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
      type: Array, // String
      // required: true
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
