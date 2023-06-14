const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// This GETS ALL EXERCISES.
router.get("/", (req, res) => {
  console.log("this is req.body", req.body);
  const QUERYTEXT = `SELECT * FROM "exercises";`;
  pool
    .query(QUERYTEXT)
    .then((results) => {
      console.log("this is results", results);
      res.send(results.rows);
    })
    .catch((error) => {
      console.log("error in EXERCJSE GET ROUTE line ", error);
      res.sendStatus(500);
    });
});

// POST / - create a new exercise by template_id
router.post("/:template_id", rejectUnauthenticated, (req, res) => {
  const id = req.params.template_id;
  const name = req.body.name;

  const QUERYTEXT = `INSERT INTO "exercises" ("name", "template_id")
  VALUES ($1, $2);`;

  pool
    .query(QUERYTEXT, [name, id])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error with exercises", error);
    });
});

// this post route is for the default exercises
router.post("/", rejectUnauthenticated, (req, res) => {
  

  const QUERYTEXT = `INSERT INTO "exercises" ("name", "template_id", id)
  VALUES ($1, $2, $3);`;

  pool
    .query(QUERYTEXT, [req.body.name, req.body.id, req.body.template_id])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error with exercises", error);
    });
});
// DELETE /:id - delete a exercise by its id
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  console.log("THIS IS ID", id);
  const QUERYTEXT = `DELETE FROM "workout_exercises" WHERE exercise_id=$1;`;
  const QUERYTEXT2 = `DELETE FROM "exercises" WHERE id =$1;`;
  pool
    .query(QUERYTEXT, [id])
    .then(() => {
      pool
        .query(QUERYTEXT2, [id])
        .then(() => {
          console.log("set deleted at id of", id);
          res.sendStatus(204);
        })
        .catch((error) => {
          console.log("error in deleting", error);
        });
    })
    .catch((error) => {
      console.log("error in deleting", error);
    });
});

//UPDATES EXERCISENAME

router.put("/:id", rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const QUERYTEXT = `UPDATE "exercises"
    SET "name" = $1
    WHERE id = $2;`;

  pool
    .query(QUERYTEXT, [name, id])
    .then(() => {
      console.log("exercise Name updated successfully.");
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error in updating exercise name", error);
      res.sendStatus(500);
    });
});

// route to a exercise by template id
router.get("/:template_id", (req, res) => {
  console.log("this is req.body", req.body);
  const id = req.params.template_id;
  const QUERYTEXT = `SELECT * FROM "exercises" WHERE "template_id"=$1;`;
  pool
    .query(QUERYTEXT, [id])
    .then((results) => {
      console.log("this is results", results);
      res.send(results.rows);
    })
    .catch((error) => {
      console.log("error in EXERCJSE GET ROUTE line ", error);
      res.sendStatus(500);
    });
});
module.exports = router;
