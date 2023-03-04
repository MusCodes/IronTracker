import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import WorkoutRow from "./workoutRow";
import WorkoutExerciseForm from "./WorkoutExerciseForm";

function WorkoutLog() {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const workoutId = Number(params.id); // to get the current's exercise template, look it up in redux

  // all templates from the db
  let allTemplates = useSelector((store) => store.template);
  let allWorkouts = useSelector((store) => store.workoutTime);

  // let workoutTime = useSelector((store) => store.workoutTime);
  let log = useSelector((store) => store.log);

  // Fetch the template if it's not already in the state
  useEffect(() => {
    dispatch({ type: "GET_EXERCISE_TABLE" }); // refreshes templates
    dispatch({ type: "FETCH_TIME" }); // refreshes all workouts
  }, []);

  const thisWorkout = allWorkouts.find(
    (workout) => Number(workout.id) === Number(workoutId)
  );

  console.log(`this workout:`, thisWorkout);

  return (
    <div className="Table">
      {thisWorkout && (
        <>
          <WorkoutExerciseForm workout={thisWorkout} />
          {/* Previous Workouts from the same template? */}
          {/* 
            - Grab the most recent X workouts with the same template id (sorted reverse order by created_at)
            - Show each of the workout logs by exercise name:
              June 10 2022:
                Leg Press: 10 reps @ 100lb (2 sets)
                Leg Curl: 5 reps @ 100lb (3 sets)

              June 12 2022:
                etc.
              
            - Strech Goal: Process the workout logs so that you can group all exercises together
            by the same type:

            Leg Press  June 10: 10 reps   90lb   2 sets
                       June 15: 10 reps   100lb  2 sets
            Leg Curl ...
          */}
          <table>
            <thead>
              <tr>
                <th>Exercise Name</th>
                {/* <th> WorkoutID</th> */}
                <th>Sets</th>
                {/* <th>Previous</th> */}
                <th>Weight</th>
                <th>Reps</th>
                {/* <th>Time</th> */}
                <th>Completed</th>
                <th>Delete </th>
              </tr>
            </thead>
            <tbody>
              {thisWorkout.workout_exercises.map((workout_exercise, rowIndex) => {
                // grab the current exercise from thisWorkout.exercises
                const templateExercise = thisWorkout.exercises.find(
                  (exercise) => Number(exercise.id) === Number(workout_exercise.exercise_id)
                );
                return <WorkoutRow workoutExercise={workout_exercise} templateExercise={templateExercise} />;
              })}
            </tbody>
          </table>
          {/* <button onClick={handleAddRow}>Add Set</button> */}

          <button onClick={() => history.push("/test")}>
            Complete Workout
          </button>
        </>
      )}
    </div>
  );
}

export default WorkoutLog;
