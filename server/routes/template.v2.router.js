const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET / - get all templates (should probably get exercises too)
// JOIN exercises on template_id, then add json_agg to SELECT and GROUP_BY template.id
router.get(`/`,rejectUnauthenticated, (req, res) => {
  console.log("templates body", req.body);
  const querytext = `SELECT *,
  (SELECT coalesce(json_agg(exercises),'[]'::json) FROM "exercises" WHERE "exercises"."template_id"= "template"."id") as exercises,
  (SELECT COUNT(*) FROM "exercises" WHERE "exercises"."template_id" = "template"."id") as exercise_count
FROM "template" WHERE user_id=$1;`;

  pool
    .query(querytext,[req.user.id])
    .then((results) => {
      console.log("this is results", results);
      res.send(results.rows);
    })
    .catch((error) => {
      console.log("Error in template get route", error);
      res.sendStatus(500);
    });
});


//VIEW A SPECIFIC TEMPLATE AND ITS EXERCISES This DOES NOT show the workout_log
router.get(`/template/:id`,rejectUnauthenticated, (req, res) => {
  console.log("template specific exercises", req.body);
  const id=req.params.id
  const querytext = `SELECT * ,
  (SELECT coalesce(json_agg(exercises),'[]'::json) 
   FROM "exercises" WHERE "exercises"."template_id"= "template"."id") as exercises, 
  (SELECT count(*) 
   FROM "workouts" WHERE "workouts"."template_id"= "template"."id") as workout_count
  FROM "template" WHERE ID= $1 ;`;

  pool
    .query(querytext,[id])
    .then((results) => {
      console.log("this is results", results);
      res.send(results.rows);
    })
    .catch((error) => {
      console.log("Error in template get route", error);
      res.sendStatus(500);
    });
});

//This get returns  a specific templateName with corrponding exerciseName and workouts 
router.get(`/:id`,rejectUnauthenticated, (req, res) => {
  console.log("this is req.body", req.body);
  const id= req.params.id;
  const QUERYTEXT = `SELECT t.id AS "id", t.name AS "templateName", e.name AS "exerciseName", 
  json_agg(json_build_object('we_id', we.id,'sets', we.sets, 'weight', we.weight, 'reps', we.reps)) AS "Exercise"
FROM template t
JOIN exercises e ON e.template_id = t.id
JOIN workout_exercises we ON we.exercise_id = e.id
JOIN workouts w ON w.template_id = t.id
WHERE t.id = $1
GROUP BY t.id, t.name, e.name;`;
  pool
    .query(QUERYTEXT,[id])
    .then((results) => {
      console.log("this is results", results);
      res.send(results.rows);
    })
    .catch((error) => {
      console.log("error in template GET ROUTE ", error);
      res.sendStatus(500);
    });
});


//GET ALL TEMPLATE
router.get("/template",rejectUnauthenticated, (req, res) => {
  console.log("this is req.body", req.body);
  const QUERYTEXT = `SELECT * FROM "template";`;
  pool
    .query(QUERYTEXT)
    .then((results) => {
      console.log("this is results", results);
      res.send(results.rows);
    })
    .catch((error) => {
      console.log("error in template GET ROUTE ", error);
      res.sendStatus(500);
    });
});

// POST /
router.post("/",rejectUnauthenticated, (req, res) => {
  // req.body: { name: 'leg day' }
  console.log(req.body);
  const QUERYTEXT = `INSERT INTO "template" ("name",user_id ) VALUES ($1,$2);`;

  pool
    .query(QUERYTEXT, [req.body.name,req.body.user_id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error with user_exercise POST line 54", error);
    });
});

// DELETE /:id
router.delete("/:id",rejectUnauthenticated, (req, res) => {
  const id = req.params.id;

  console.log("THIS IS ID", id);

  const QUERYTEXT = `DELETE FROM "template" WHERE id = $1;`;
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

// PUT /:id
router.put("/",rejectUnauthenticated, (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const QUERYTEXT = `UPDATE "template"
    SET "name" = $1
    WHERE id = $2;`;

  pool
    .query(QUERYTEXT, [name, id])
    .then(() => {
      console.log("Workout template updated successfully.");
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error in updating Workout Template line 122", error);
      res.sendStatus(500);
    });
});


module.exports = router;
