require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const PORT = 5000;
const DB_URI = process.env.MONGO_URI;

// db connection -
mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Database Connected!!"))
  .catch((err) => console.log(err));

// testing api
app.get("/test", (req, res) => {
  res.send("Testing API!!...");
});

// listening to port..
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
