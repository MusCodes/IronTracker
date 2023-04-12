const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET / - get all workouts
router.get("/", rejectUnauthenticated, (req, res) => {
  const QUERYTEXT = ` SELECT
  "workouts"."id",
  "workouts"."created_at",
  "workouts"."template_id",
  (SELECT coalesce(json_agg(exercises),'[]'::json) FROM "exercises" WHERE "exercises"."template_id"= "template"."id") as exercises,
  (SELECT coalesce(json_agg(workout_exercises),'[]'::json) FROM "workout_exercises" WHERE "workout_exercises"."workout_id"= "workouts"."id") as workout_exercises
FROM
  "workouts"
  JOIN "template" ON "workouts"."template_id" = "template"."id";
`;
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

// POST / - create a new workout by template_id
router.post("/", rejectUnauthenticated, (req, res) => {
  //  Returning * and send result.rows[0] back via res.send
  console.log(req.body);
  const QUERYTEXT = `INSERT INTO "workouts" ("created_at", "template_id")
  VALUES (now(), $1) RETURNING *;`;

  pool
    .query(QUERYTEXT, [req.body.template_id])
    .then((result) => {
      const workout = result.rows[0];
      res.status(201).send(workout);
    })
    .catch((error) => {
      console.log("error with exercises", error);
    });
});

//DELETE
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  console.log("This is id", id);
  const QUERYTEXT = 'DELETE FROM "workout_exercises" WHERE workout_id=$1;';
  const SQLTEXT = 'DELETE FROM "workouts" WHERE id=$1;';
  pool.query(QUERYTEXT, [id]).then(() => {
    console.log("workout Deleted at id of ", id);
    res.sendStatus(204);
  });
  pool
    .query(SQLTEXT, [id])
    .then(() => {
      console.log("exercise workout_id Deleted at id of ", id);
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log("error in workout delete", error);
    });
});

module.exports = router;
