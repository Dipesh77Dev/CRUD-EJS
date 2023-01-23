const express = require("express");
const router = express.Router();

const Category = require("../../models/categorySchema.js");
const upload = require("../../middleware/filehelper.js");

// Getting addCategory Form
router.get("/addCategory", (req, res) => {
  res.render("add_category", { title: "Add Category FORM" }); // taking variable from ejs file
});

// adding data -
// router.post("/addCategory", upload.single("imageData"), async (req, res) => {
//   try {
//     const addCategory = await Category.create({
//       categoryId: req.body.categoryId,
//       categoryName: req.body.categoryName,
//       categoryDescription: req.body.categoryDescription,
//       // categoryImage: req.file.path,
//       // categoryImage: req.body.categoryImage,
//     });
//     res.send({
//       addCategory,
//       message: "Category has been added successfully...",
//     });
//     // res.redirect("/home");
//   } catch (err) {
//     res.status(400).send({ error: err });
//   }
// });

// insert Category
// router.post("/addCategory", (req, res) => {
//   const addCategory = new Category({
//     categoryId: req.body.categoryId,
//     categoryName: req.body.categoryName,
//     categoryDescription: req.body.categoryDescription,
//   });
//   addCategory.save((err) => {
//     if (err) {
//       res.json({ message: err.message, type: "danger" });
//     } else {
//       // req.session.message = {
//       //   type: "success",
//       //   message: "Category added successfully!!!",
//       // };
//       res.send({
//               addCategory,
//               message: "Category has been added successfully...",
//             });
//       // res.redirect("/getCategory");
//     }
//   });
// });

router.post("/addCategory", (req, res) => {
  const addCategory = new Category(req.body);
  addCategory.save()
  .then((result)=>{
    console.log(addCategory);
     res.redirect('/getCategory');
  })
  .catch((err)=>{
     console.log(err)
  });
});

// Get Category List -
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

// Get Category By Id -
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

// Update or edit Category -
router.get("/updateCategory/:id", async (req, res) => {
  try {
    const updateCategoryById = await Category.findByIdAndUpdate(
      req.params.id,
      // req.body
      (err, category) => {
        if (err) {
          res.redirect("/");
        } else {
          if (category == null) {
            res.redirect("/getCategory");
          } else {
            res.render("edit_category", {
              title: "Edit Category Page",
              category: category,
            });
          }
        }
      }
    );
    // res.send({
    //   updateCategoryById,
    //   message: "Category has been updated successfully...",
    // });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// Update category by post
router.post("/updateCategorys/:id", (req, res) => {
  let id = req.params.id;
  Category.findByIdAndUpdate(
    id,
    {
      catName: req.body.catName,
      catDescription: req.body.catDescription,
    },
    (err, result) => {
      if (err) {
        res.json({ message: err.message, type: "danger" });
      } else {
        req.session.message = {
          type: "success",
          message: "Category Updated Successfully!!!",
        };
        res.redirect("/categoryList");
      }
    }
  );
});

router.get("/deleteCategory/:id", async (req, res) => {
  try {
    const deleteCategoryById = await Category.findByIdAndRemove(req.params.id);
    res.send({
      deleteCategoryById,
      message: "Category has been removed successfully...",
    });
    // if (err) {
    //   res.json({ error: err });
    // } else {
    //   res.send({ message: "Category has been removed successfully..." });
    // }
    // res.redirect("/home");
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.get("/deleteAllCategory", async (req, res) => {
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
