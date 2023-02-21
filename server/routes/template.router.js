const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
This is the get route for my user_exercise table.
 */
router.get("/user_exercise", (req, res) => {
  const QUERYTEXT = `SELECT * FROM "user_exercise";`;
  pool
    .query(QUERYTEXT)
    .then((results) => {
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
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
