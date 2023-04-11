const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// //GET FOR WORKOUT_EXERCISES.
// router.get("/:id", (req, res) => {
//   console.log("this is req.body", req.body);
//   const id= req.params.id
//   const QUERYTEXT = ` SELECT e.id, e.name, w.sets, w.weight, w.reps, workouts.created_at
//   FROM "exercises" as e 
//   JOIN "workout_exercises" as w ON w.exercise_id = e.id 
//   JOIN workouts ON workouts.id = w.workout_id 
//   JOIN template t ON t.id = e.template_id 
//   WHERE t.id = $1
//   ORDER BY w.sets ASC;`
//   pool
//     .query(QUERYTEXT,[id])
//     .then((results) => {
//       console.log("this is results", results);
//       res.send(results.rows);
//     })
//     .catch((error) => {
//       console.log("error in workout_exercises GET ROUTE ", error);
//       res.sendStatus(500);
//     });
// });
//

//GET FOR WORKOUT_EXERCISES.
router.get("/", (req, res) => {
  console.log("this is req.body", req.body);
  
  const QUERYTEXT = `SELECT * FROM "workout_exercises"`
  pool
    .query(QUERYTEXT)
    .then((results) => {
      console.log("this is results", results);
      res.send(results.rows);
    })
    .catch((error) => {
      console.log("error in workout_exercises GET ROUTE ", error);
      res.sendStatus(500);
    });
});

// update for workout_log by exercise_id
router.put("/exercise_log/:exercise_id", rejectUnauthenticated, (req, res) => {
  const id = req.params.exercise_id;
  const sets = req.body.sets;
  const weight = req.body.weight;
  const reps = req.body.reps;
  const QUERYTEXT = `
      UPDATE "workout_exercises"
      SET "sets" = $1,
          "weight" = $2,
          "reps" = $3
      WHERE exercise_id = $4;
    `;

  pool
    .query(QUERYTEXT, [sets, weight, reps, id])
    .then((result) => {
      console.log("Workout template updated successfully.");
      console.log("THIS IS REASASDJASLKDJAL", result);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error in updating Workout Template:", error.message);
      res.status(500).json({ error: "Failed to update workout template." });
    });
});

// post for workout_log

router.post("/", rejectUnauthenticated, (req, res) => {
  console.log(req.body);
  const QUERYTEXT = `INSERT INTO "workout_exercises" ("exercise_id", "workout_id", "sets", "weight","reps")
    VALUES ($1,$2,$3,$4,$5) ;`;

  pool
    .query(QUERYTEXT, [
      req.body.exercise_id,
      req.body.workout_id,
      req.body.sets,
      req.body.weight,
      req.body.reps,
    ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error with user_exercise POST line 54", error);
    });
});
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  const sets = req.body.sets;
  const weight = req.body.weight;
  const reps = req.body.reps;
  const QUERYTEXT = `
        UPDATE "workout_exercises"
        SET "sets" = $1,
            "weight" = $2,
            "reps" = $3
        WHERE id = $4;
      `;

  pool
    .query(QUERYTEXT, [sets, weight, reps, id])
    .then((result) => {
      console.log("Workout template updated successfully.");
      console.log("THIS IS xxxxxxxxxxxx", result);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error in updating Workout Template:", error.message);
      res.status(500).json({ error: "Failed to update workout template." });
    });
});

// delete by workout id
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const id = req.params.id;

  console.log("THIS IS ID", id);

  const QUERYTEXT = `DELETE FROM "workout_exercises" WHERE id = $1;`;
  pool
    .query(QUERYTEXT, [id])
    .then(() => {
      console.log("set deleted at id of", id);
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log("error in deleting set line 91", error);
    });
});

module.exports = router;
