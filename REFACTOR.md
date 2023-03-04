# Notes on Refactor

## Database
   A template is a collection of exercises that can be used to
   ensure a user can do the same workout multiple times
   eg: Leg Day, Upper Body Day, etc.
   Templates
      - id (integer)
      - name (text)
      - user_id (foreign key)

   Exercises are specific activities that belong to a template
   eg: Leg Press, Chest Press, etc.
   Exercises
      - id (integer)
      - name (text)
      - template_id (foreign key)

   A Workout is a specific session that the user creates when
   they actually do a particular template. They record the date,
   weights, and reps for that day.
   Workouts
      - id (integer)
      - created_at (timestamp)
      
   A Exercise_workouts is the specific information user inputs to track their exercises.
   Many exercises can belong to the same workout
   example: weight and reps of a certain exercise.
   Exercises_Workouts (technically this is your workout log)
      - id (integer)
      - exercise_id (foreign key)
      - workout_id (forgein key)
      - weight (int)
      - sets (int)
      - reps (int)

## Routes
   /templates
      - [x]GET / to view all templates
      -[x] GET /:id to view a specific template (show workouts and exercises)
      - [?]POST / to create templates
      -[x] PUT /:id to update templates
      - [x]DELETE /:id to delete template

   /exercises
      - [x]POST / to add an exercise to a template by id (in body)
      - [x]DELETE /:id to delete an exercise
      -[x] PUT /:id to update (stretch)
      - [x]GET / to get all exercises
      -[x] GET /:template_id to get all exercises by template id
   
   /workouts
      - [x]POST / to create a new workout (current time), needs a template_id to 
         attach the workout to. The user will need to create each exercise
         via the view as they complete them

## Views
   - To create a new template and manage template's exercises:
      - User selects "New Template", gives it a name, and adds to the database
      - User clicks "Edit Template" which takes them to a page to add/edit exercises
         for a given template
      - They can add exercises to the template, or click a button like "Leg Day"
         that will do several POSTs for them to create a handful of other exercises
         like "Leg Press", "Leg Curl", "Leg Extension", etc.
   - To start a new workout:
      - User selects the template, clicks "New Workout"
      - New Workout entry is created with the current time
      - All exercises for the given workout's template are listed
         - Record: [ Leg Press ], [ Leg Extension ], [ Leg Curl ]
         - (Or these are just available in a drop-down -- maybe when
            selected, show the most recent 5 records of this exercise
            from previous workouts when creating the log)
         - Workout Log:
            - Leg Press: 2x 10 reps @ 100 lb
            - Leg Curl: 3x 5 reps @ 60lb
            - Leg Press: 1x 5 reps @ 200lb
      - Could potentially show historic logs for each exercise or 
         throw that on a totally different page (up to you)
   - Reporting view (stretch)
      - Shows all workouts and reps/sets over time?
      - Stretch: Maybe a chart or something like that?
   - To figure out: Should there be a reducer / state to track
      the reps / weight of the last time a given workout's template
      was used (so its easily accessible for the user when managing
      their workout) -- could be a single endpoint like /recent/:exercise_id/
      that just gives back the most recent stats for a given exercise 

## TODO
   - Finish the backend (workouts router) and test in postman
   - Then focus on features:
      - Template View
         - Show all templates, get CREATE and DELETE working
         - Show single template, which will list template's exercises
         - CREATE / DELETE exercises on that template view
      - Workout View
         - Create new workout from the template page
         - Show all workouts somewhere (or under each template)
         - Delete workout
         - Log new exercise on workout based on that workout's template exercises
   - Reducers:
      - Templates (include exercises)
      - Workouts
      - Either a workout_exercises reducer OR pack those into the workouts via json_agg

   - Sagsa:
      - Templates (Create, Read, Update, Delete)
      - Exercises (Create, Delete)
      - Workouts (Create, Read, Delete, Adding workout logs)

What's left:
   - When a new workout is created from a template, make a new log entry for each exercise
      but set it all to defaults (0 reps, 0 weight, whatever). (COME BACK TO THIS) 
   - THEN when we look at a workout, we're actually looking at a workout log table
      for logs that already exist. So we can add new logs, edit existing, delete them, etc.

   1. When 'Start Workout' is hit, do a POST to create a workout and grab that workout's ID
      (do a RETURNING * and res.send(result.rows[0])), then push the user to the URL based on that
      When creating this, also create one log for every exercise in the template, ready to go
   2. When showing the workout, we'll actually just list the existing logs. Now all actions
      are based on that workout:
         Row updates are just a PUT
         Row deletes delete the workout log
         New row is actually 'new log' and its just a drop-down to pick which exercise from
         the template you're using
   3. May want to get back the exercise logs from the workout's GET query like we do with exercise

Summary:
   - The workout page should use the workout id, and the table should be based on workout logs
      Adding a new row is just adding a new workout log, and put/delete are just updating/removing
      workout logs for a given workout that already exist