const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route template
 */
router.get("/user_exercise", (req, res) => {
  const QUERYTEXT = `SELECT * FROM "user_exercise";`;
  pool
    .query(QUERYTEXT)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      console.log("error in GET line 12", error);
      res.sendStatus(500);
    });
  // GET route code here
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
