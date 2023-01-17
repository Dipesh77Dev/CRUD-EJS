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
  .connect(DB_URI, { // process.env.MONGO_URI
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

// testing api
app.get("/test", (req, res) => {
  res.send("Testing API!!...");
});

// calling routes
// app.use('/product', productRouter.router);
app.use('/api/product', require('./routes/productRoutes.js'));
app.use('/api/category', require('./routes/categoryRoutes.js'));

// listening to port..
// app.listen(PORT, () => {
//   console.log(`Listening on ${PORT}`);
// });
