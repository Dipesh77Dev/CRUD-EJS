const express = require("express");
const router = express.Router();

const Category = require("../../models/categorySchema.js");
const upload = require("../../middleware/filehelper.js");

router.get("/getCategory", async (req, res) => {
  try {
    const getCategory = await Category.find({});
    res.render("category_list", {
      title: "Category List",
      categories: getCategory,
    });
    // res.send({
    //   message: "Got all Categories succesfully...",
    //   getCategory,
    // });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.post("/addCategory", upload.single("imageData"), async (req, res) => {
  try {
    const addCategory = await Category.create({
      categoryId: req.body.categoryId,
      categoryName: req.body.categoryName,
      categoryDescription: req.body.categoryDescription,
      categoryImage: req.file.path,
      // categoryImage: req.body.categoryImage,
    });
    res.send({
      addCategory,
      message: "Category has been added successfully...",
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.get("/getCategoryById/:id", async (req, res) => {
  try {
    const getCategoryById = await Category.findById(req.params.id);
    res.send({
      message: "Got Category by their id...",
      getCategoryById,
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.patch("/updateCategory/:id", async (req, res) => {
  try {
    const updateCategoryById = await Category.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send({
      updateCategoryById,
      message: "Category has been updated successfully...",
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.delete("/deleteCategory/:id", async (req, res) => {
  try {
    const deleteCategoryById = await Category.findByIdAndRemove(req.params.id);
    // res.send({
    //   deleteCategoryById,
    //   message: "Category has been removed successfully...",
    // });
    if (err) {
      res.json({ error: err });
    } else {
      res.send({ message: "Category has been removed successfully..." });
    }
    res.redirect('/home');
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.delete("/deleteAllCategory", async (req, res) => {
  try {
    const deleteAllCategory = await Category.deleteMany({});
    res.send({
      message: "All Category has been removed successfully...",
      deleteAllCategory,
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

module.exports = router;
