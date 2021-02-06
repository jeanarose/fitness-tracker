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

// TODO: ADD PUT AND DELETE ROUTES
// NOT SURE IF THESE ARE CORRECT
router.put("api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate({_id: req.params.id}).then((foundWorkout) => {
    res.json(foundWorkout);
  });
});

router.put("api/workouts/:id", (req, res) => {
  Workout.findByIdAndDelete({_id: req.params.id}).then((foundWorkout) => {
    res.json(foundWorkout);
  });
});


module.exports = router;
