const express = require("express");
const mongoose = require("mongoose");
const Workout = require("./models/Workout");

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

app.use(express.static("public"));

// TODO: ABSTRACT THESE workouts ROUTES OUT INTO A CONTROLLER

app.get("/api/workouts", (req, res) => {
  Workout.find().then((allWorkouts) => {
    res.json(allWorkouts);
  });
});

app.post("/api/workouts", (req, res) => {
  Workout.create(req.body).then((newWorkout) => {
    res.json(newWorkout);
  });
});

// TODO: ADD PUT AND DELETE ROUTES

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
