const mongoose = require("mongoose");

// const { ObjectId }= mongoose.Schema.Types;
const SchemaObjectId = mongoose.Schema.Types.ObjectId;

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
      // type: ObjectId,
      type: SchemaObjectId, // type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", ProductSchema);
