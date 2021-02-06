const express = require("express");
const mongoose = require("mongoose");
const Workout = require("./models/Workout");
const routes = require("./controllers/workoutsController.js");

const app = express();

const PORT = process.env.PORT || 8080;

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/fitness-tracker",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongoose successfully connected.");
});

connection.on("error", (err) => {
  console.log("Mongoose connection error: " + err);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
