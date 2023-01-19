require("dotenv").config();
// const dotenv = require("dotenv");
// dotenv.config({path: '.env'});
// dotenv.config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const PORT = 4000; // replace 5000 by 4000
const DB_URI = process.env.MONGO_URI;

// setting routes -
// const productRoutes = require('./routes/productRoutes.js');

// db connection -
mongoose
  .connect(DB_URI, {
    // process.env.MONGO_URI
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to the database!");
    app.listen(PORT, () => {
      // console.log("listening on port: 4000");
      console.log(`Listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
  });

// setting ejs engine template for frontend -
app.set("view engine", "ejs");

// testing api
app.get("/test", (req, res) => {
  // res.send("Testing API!!...");
  res.json("Testing..");
});

app.get("/welcome", (req, res) => {
  res.send("Hello ALL!!");
  // res.json({message: 'Hello All!'});
  // res.json(<h1>Hello All! </h1>) - Error
  // res.json("Hello All!");
});

app.get("/home", (req, res) => {
  res.render("home", { title: "Home Page" });
});

// calling routes
// app.use('/product', productRouter.router);

// Only Backend-Postman =>
app.use("/api/product", require("./routes/productRoutes.js"));
app.use("/api/category", require("./routes/categoryRoutes.js"));

// Frontend =>
app.use("/product", require("./routes/frontend/productRoutes.js"));
app.use("/category", require("./routes/frontend/categoryRoutes.js"));

// listening to port..
// app.listen(PORT, () => {
//   console.log(`Listening on ${PORT}`);
// });
