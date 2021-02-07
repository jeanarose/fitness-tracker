var express = require("express");
var router = express.Router();
const path = require("path");
const PUBLIC_DIR = path.resolve("./", "public");
var Workout = require("../models/Workout");


router.get("/exercise", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR + "/exercise.html"));
});

router.get("/stats", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR + "/stats.html"));
});

router.get("/api/workouts", function (req, res) {
  Workout.find().then((allWorkouts) => {
    res.json(allWorkouts);
  });
});

// Needs to be changed.
router.post("/api/workouts", function (req, res) {
  Workout.create(req.body).then((newWorkout) => {
    res.json(newWorkout);
  });
});

// db.students.update({name: "Steve"}, {$push: {"hobbies":"Extreme Basketweaving"}})
// Needs to be changed.
router.put("/api/workouts/:id", (req, res) => {
  const id = req.params.id;
  Workout.findByIdAndUpdate(id, { $push: {exercises: req.body} }).then((updatedWorkout) => {
    res.json(updatedWorkout);
  });
});

router.delete("/api/workouts/:id", (req, res) => {
  const id = req.params.id;
  Workout.findByIdAndDelete(id).then((response) => {
    res.json(response);
  });
});

module.exports = router;
