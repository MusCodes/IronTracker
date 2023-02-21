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
});

//Workout Template Post Route.
router.post("/workout_template", (req, res) => {
  console.log(req.body);
  const QUERYTEXT = `INSERT INTO "workouts" ("user_id", "template_name", "created_at")
  VALUES ($1,$2,$3);`;

  pool
    .query(QUERYTEXT, [
      req.body.user_id,
      req.body.template_name,
      req.body.created_at,
    ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error with user_exercise POST line 54", error);
    });
});

//DELETE a set on user_exercise
router.delete("/user_exercise/:id", (req, res) => {
  const id = req.params.id;

  console.log("THIS IS ID", id);

  const QUERYTEXT = `DELETE FROM "user_exercise" WHERE id = $1;`;
  pool
    .query(QUERYTEXT, [id])
    .then((response) => {
      console.log("set deleted at id of", id);
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log("error in deleting set line 91", error);
    });
});

//DELETE ROUTE FOR DELETING A TEMPLATE.
router.delete("/workout_template/:id", (req, res) => {
  const id = req.params.id;
  console.log("This is id", id);
  const QUERYTEXT = `DELETE FROM "workouts" WHERE id=$1;`;
  pool
    .query(QUERYTEXT, [id])
    .then(() => {
      console.log("Template Deleted at id of ", id);
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log("error in deleting template line 109", error);
    });
});

// Update TemplateName
router.put("/workout_template/:id", (req, res) => {
  const id = req.params.id;
  const template_name = req.body.template_name;
  const QUERYTEXT = `UPDATE "workouts"
    SET "template_name" = $1
    WHERE id = $2;`;

  pool
    .query(QUERYTEXT, [template_name, id])
    .then(() => {
      console.log("Workout template updated successfully.");
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error in updating Workout Template line 122", error);
      res.sendStatus(500);
    });
});

// Update reps/sets on user_exercise table.
router.put("/user_exercise/:id", (req, res) => {
  const id = req.params.id;
  const weight = req.body.weight;
  const reps = req.body.reps;
  const QUERYTEXT = `UPDATE "user_exercise"
  SET "weight" = $1, "reps" = $2
  WHERE id = $3;`;
  pool
    .query(QUERYTEXT, [weight, reps, id])
    .then(() => {
      console.log("Updated weight and reps successfully");
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("error in updating weight/reps line 144", error);
    });
});

module.exports = router;
