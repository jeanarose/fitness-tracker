var express = require("express");
var router = express.Router();
const path = require("path");
const PUBLIC_DIR = path.resolve("./", "public");
// const publicPath = path.join(PUBLIC_DIR, "exercise.html");

// Import the model (cat.js) to use its database functions.
var Workout = require("../models/Workout");

// Create all our routes and set up logic within those routes where required.
router.get("/api/workouts", function (req, res) {
  Workout.find().then((allWorkouts) => {
    res.json(allWorkouts);
  });
});

// router.get("/exercise?id=:id", (req, res) => {
//   Workout.findById({id: req.params.id}).then((foundWorkout) => {
//     res.json(foundWorkout);
//   });
// });

router.get("/exercise", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR + "/exercise.html"));
});

router.post("/api/workouts", function (req, res) {
  Workout.create(req.body).then((newWorkout) => {
    res.json(newWorkout);
  });
});

// // TODO: ADD PUT AND DELETE ROUTES
// // NOT SURE IF THESE ARE CORRECT
// router.put("api/workouts/:id", (req, res) => {
//   Workout.findByIdAndUpdate({ _id: req.params.id }).then((foundWorkout) => {
//     res.json(foundWorkout);
//   });
// });

// router.put("api/workouts/:id", (req, res) => {
//   Workout.findByIdAndDelete({ _id: req.params.id }).then((foundWorkout) => {
//     res.json(foundWorkout);
//   });
// });

module.exports = router;
