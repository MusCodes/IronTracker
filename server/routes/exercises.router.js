const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// POST / - create a new exercise by template_id
router.post("/",rejectUnauthenticated, (req, res) => {
  // req.body: { template_id: 1 } 
  console.log(req.body);
  const QUERYTEXT = `INSERT INTO "exercises" ("name", "template_id")
  VALUES ($1, $2);`;

  pool
    .query(QUERYTEXT, [
      req.body.name,
      req.body.template_id
    ])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error with exercises", error);
    });
});

// DELETE /:id - delete a given exercise id
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  console.log("THIS IS ID", id);
  const QUERYTEXT = `DELETE FROM "exercises" WHERE id = $1;`;
  pool
    .query(QUERYTEXT, [id])
    .then(() => {
      console.log("set deleted at id of", id);
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log("error in deleting", error);
    });
});


//UPDATES EXERCISENAME

router.put("/:id",rejectUnauthenticated, (req, res) => {
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
module.exports = router;
