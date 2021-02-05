const express = require("express");
const mongoose = require("mongoose");
// const Exercise = require("./models/Exercise");

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

// TODO: ABSTRACT THESE exercises ROUTES OUT INTO A CONTROLLER

// app.get("/api/exercises", (req, res) => {
//   Exercise.find().then((allExercises) => {
//     res.json(allExercises);
//   });
// });

// app.post("/api/exercises", (req, res) => {
//   Exercise.create(req.body).then((newExercise) => {
//     res.json(newExercise);
//   });
// });

// TODO: ADD PUT AND DELETE ROUTES

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
