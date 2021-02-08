// Dependencies
const express = require("express");
const router = express.Router();
const path = require("path");
const PUBLIC_DIR = path.resolve("./", "public");
const Workout = require("../models/Workout");

// HTML ROUTES
router.get("/exercise", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR + "/exercise.html"));
});

router.get("/stats", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR + "/stats.html"));
});

// API ROUTES

router.get("/api/workouts", function (req, res) {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ]).then((allWorkouts) => {
    res.json(allWorkouts);
  });
});

// Use one more method between the .aggregate and the .then
// sort
// limit
// give back the most recent seven
// aggregate.append({ $project: { field: 1 }}, { $limit: 2 });

router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
    { $sort: { date: 1 } },
    { $limit: 7 }
  ]).then((allWorkouts) => {
    res.json(allWorkouts);
  });
});

router.post("/api/workouts", function (req, res) {
  Workout.create(req.body).then((newWorkout) => {
    res.json(newWorkout);
  });
});

router.put("/api/workouts/:id", (req, res) => {
  const id = req.params.id;
  Workout.findByIdAndUpdate(id, { $push: { exercises: req.body } }).then(
    (updatedWorkout) => {
      res.json(updatedWorkout);
    }
  );
});

router.delete("/api/workouts/:id", (req, res) => {
  const id = req.params.id;
  Workout.findByIdAndDelete(id).then((response) => {
    res.json(response);
  });
});

// Export file
module.exports = router;
