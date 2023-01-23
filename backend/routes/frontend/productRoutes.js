const express = require("express");
const router = express.Router();

const Product = require("../../models/productSchema.js");
const upload = require("../../middleware/filehelper.js");

// Getting addProduct Form -
router.get("/addProduct", (req, res) => {
  res.render("add_product", { title: "Add Product Form" });
});

// add product -
// router.post("/addProduct", upload.single("imageData"), async (req, res) => {
//   try {
//     const addProduct = await Product.create({
//       category: req.body.category,
//       productId: req.body.productId,
//       productName: req.body.productName,
//       productDescription: req.body.productDescription,
//       productPrice: req.body.productPrice,
//       // productImage: req.file.path,
//     });
//     res.send({
//       addProduct,
//       message: "Product has been added successfully...",
//     });
//     // res.redirect("/test");
//   } catch (err) {
//     res.status(400).send({ error: err });
//   }
// });

router.post("/addProduct", (req, res) => {
  const product = new Product({
    productId: req.body.productId,
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productPrice: req.body.productPrice,
    category: req.body.category,
    // productImage: req.file.path,
  });

  product
    .save(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.json({ message: err.message, type: "danger" });
    });
});

// get products by pagination -
router.get("/getProducts", async (req, res) => {
  try {
    // pagination -
    const { page = 1, limit = 5 } = req.query;
    const getProducts = await Product.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate({
        path: "category",
        select: ["categoryName", "categoryId"],
      });
    // res.send({
    //   message: "Got all Products with pagination succesfully...",
    //   getProducts,
    // });
    res.render("product_list", {
      title: "Product List",
      products: getProducts,
      // "products": getProducts,
    });
    // res.redirect('/product_list');
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// get products without pagination -
router.get("/getAllProducts", async (req, res) => {
  try {
    const getAllProducts = await Product.find();
    // res.send({
    //   message: "Got all Products succesfully...",
    //   getAllProducts,
    // });
    res.render("product_list", {
      title: "Product List",
      products: getAllProducts,
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// get product by id -
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

// update product by id -
router.get("/updateProduct/:id", async (req, res) => {
  try {
    const updateProductById = await Product.findByIdAndUpdate(
      req.params.id,
      // req.body
    );
    res.send({
      updateProductById,
      message: "Product has been updated successfully...",
    });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});
// if(err){
//   res.redirect('/productsList');
// } else{
//   if (product == null){
//       res.redirect('/productsList');
//   } else{
//       res.render('edit_product', { title: "Edit Product Page", product: product});
//   }
// }

// Update product by post
router.post("/updateProducts/:id", async (req, res) => {
  try {
    const updateProductsById = await Product.findByIdAndUpdate({
      category: req.body.category,
      productId: req.body.productId,
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      productPrice: req.body.productPrice,
      // productImage: req.file.path,
    });
    res.send({
      updateProductsById,
      message: "Product has been added successfully...",
    });
    // res.redirect("/test");
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// if(err){
//   res.json({ message: err.message, type: "danger"});
// } else{
//   req.session.message = {
//       type : "success",
//       message : "Product Updated Successfully!!!",
//   };
//   res.redirect('/productsList');
// }

// delete product by id -
router.get("/deleteProduct/:id", async (req, res) => {
  try {
    const deleteProductById = await Product.findByIdAndRemove(req.params.id);
    res.send({
      deleteProductById,
      message: "Product has been removed successfully...",
    });
    // res.redirect("/product_list");
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// delete all product -
router.get("/deleteAllProduct", async (req, res) => {
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
