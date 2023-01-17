const express = require("express");
const router = express.Router();

const Product = require("../models/productSchema");

// @route   GET product/getProducts
// @desc    Get all products
// @access  Public
router.get("/getProducts", async (req, res) => {
  try {
    const getProducts = await Product.find({});
    // if (getProducts<0) {
    //   res.send({ message: "Plz add some products" });
    //   // return res.status(404).json({})
    // } else {
    //   res.send({
    //     message: "Got all Products succesfully...",
    //     getProducts,
    //   });
    // }
    res.send({
      message: "Got all Products succesfully...",
      getProducts,
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   POST product/addProduct
// @desc    Add all products
// @access  Public
router.post("/addProduct", async (req, res) => {
  try {
    const addProduct = await Product.create({
      category: req.body.category,
      productId: req.body.productId,
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      productPrice: req.body.productPrice,
      productImage: req.body.productImage,
    });
    res.send({
      addProduct,
      message: "Product has been added successfully...",
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   GET product/getProductById
// @desc    Get product by id
// @access  Public
router.get("/getProductById/:id", async (req, res) => {
  try {
    const getProductById = await Product.findById(req.params.id);
    res.send({
      message: "Got Product by their id...",
      getProductById,
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   PATCH product/updateProduct
// @desc    update product by id
// @access  Public
router.patch("/updateProduct/:id", async (req, res) => {
  try {
    const updateProductById = await Product.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send({
      updateProductById,
      message: "Product has been updated successfully...",
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   DELETE product/deleteProduct
// @desc    delete product by id
// @access  Public
router.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const deleteProductById = await Product.findByIdAndRemove(req.params.id);
    res.send({
      deleteProductById,
      message: "Product has been removed successfully...",
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// @route   DELETE product/deleteAllProduct
// @desc    delete all product
// @access  Public
router.delete("/deleteAllProduct", async (req, res) => {
  try {
    const deleteAllProduct = await Product.deleteMany({});
    res.send({
      message: "All Product has been removed successfully...",
      deleteAllProduct,
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = router;
