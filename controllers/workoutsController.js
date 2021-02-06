var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var Workout = require("../models/Workout");

// Create all our routes and set up logic within those routes where required.
router.get("/api/workouts", function (req, res) {
  Workout.find().then((allWorkouts) => {
    res.json(allWorkouts);
  });
});

router.post("/api/workouts", function (req, res) {
  Workout.create(req.body).then((newWorkout) => {
    res.json(newWorkout);
  });
});

// TODO: ABSTRACT THESE workouts ROUTES OUT INTO A CONTROLLER

// app.get("/api/workouts", (req, res) => {
//   Workout.find().then((allWorkouts) => {
//     res.json(allWorkouts);
//   });
// });

// app.post("/api/workouts", (req, res) => {});

// TODO: ADD PUT AND DELETE ROUTES

module.exports = router;
