const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
This is the get route for my user_exercise table.
 */
router.get("/user_exercise", (req, res) => {
  console.log("this is req.body", req.body);
  const QUERYTEXT = `SELECT * FROM "user_exercise";`;
  pool
    .query(QUERYTEXT)
    .then((results) => {
      console.log("this is results", results);
      res.send(results.rows);
    })
    .catch((error) => {
      console.log("error in user_exercise GET ROUTE line 16", error);
      res.sendStatus(500);
    });
});
// This is our get route for the workout template.
router.get("/workout_template", (req, res) => {
  const QUERYTEXT = `SELECT * FROM "workouts";`;
  pool
    .query(QUERYTEXT)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      console.log("error in workout_template GET ROUTE line 29", error);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
// this is the post Route for the user exercise table.
router.post("/user_exercise", (req, res) => {
  console.log(req.body);
  const QUERYTEXT = `INSERT INTO "user_exercise" ("workout_id", "sets", "previous","weight","reps","completed_at","completed" )
  VALUES ($1,$2,$3,$4,$5,$6,$7);`;

  pool
    .query(QUERYTEXT, [
      req.body.workout_id,
      req.body.sets,
      req.body.previous,
      req.body.weight,
      req.body.reps,
      req.body.completed_at,
      req.body.completed,
    ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error with user_exercise POST line 54", error);
    });
  // POST route code here
});

module.exports = router;
