import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import WorkoutRow from "./workoutRow";
import WorkoutExerciseForm from "./WorkoutExerciseForm";
import { Button, Card } from "react-bootstrap";

function WorkoutLog() {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const workoutId = Number(params.id); // Get the workout ID from the URL

  // Retrieve data from the Redux store
  let allTemplates = useSelector((store) => store.template);
  let allWorkouts = useSelector((store) => store.workoutTime);
  let log = useSelector((store) => store.log);

  // Fetch the template and workout data if it's not already in the state
  useEffect(() => {
    dispatch({ type: "GET_EXERCISE_TABLE" }); // Refresh the exercise templates
    dispatch({ type: "FETCH_TIME" }); // Refresh all workouts
  }, []);

  // Find the current workout based on the workout ID
  const thisWorkout = allWorkouts.find(
    (workout) => Number(workout.id) === Number(workoutId)
  );

  // Function to navigate to the "HowToPage"
  function HowToPage() {
    history.push("/howto");
  }

  // Display a loading message if the workout data is not available
  if (!thisWorkout) {
    return <h1>Loading...</h1>;
  }

  // Filter related workouts based on the template and exercise data
  const relatedWorkouts = allWorkouts.filter(
    (workout) =>
      Number(workout.template_id) === Number(thisWorkout.template_id) &&
      workout.workout_exercises.length > 0
  );

  // Function to format a timestamp into a readable date and time
  function formatDate(timestamp) {
    const createdAt = new Date(timestamp);
    const date = createdAt.toLocaleDateString();
    const time = createdAt.toLocaleTimeString();
    return `${date} ${time}`;
  }

  // Function to render the historical workout logs
  function historicalLogs() {
    let history = [];

    history.push(
      <table className="workoutLog1">
        <thead>
          <tr>
            <th className="t1">Exercise Name</th>
            <th className="t1">Sets</th>
            <th className="t1">Previous</th>
            <th className="t1">Date</th>
          </tr>
        </thead>
        <tbody className="logTbody">
          {relatedWorkouts.map((thisRelatedWorkout) => {
            // Loop over the workout logs, and for each one, create a row in the table
            const rows = thisRelatedWorkout.workout_exercises.map(
              (thisExercise) => {
                const templateExercise = thisRelatedWorkout.exercises.find(
                  (exercise) => exercise.id === thisExercise.exercise_id
                );

                return (
                  <tr key={thisExercise.id}>
                    <td>{templateExercise.name}</td>
                    <td>{thisExercise.sets}</td>
                    <td>
                      {thisExercise.weight} x {thisExercise.reps}
                    </td>
                    <td>{formatDate(thisRelatedWorkout.created_at)}</td>
                  </tr>
                );
              }
            );

            return rows;
          })}
        </tbody>
      </table>
    );

    return <div className="workoutLogWrapper">{history}</div>;
  }

  // Render the component
  return (
    <div className="WorkoutLog">
      {thisWorkout && (
        <>
          <div className="WorkoutLog-history">
            <Card>
              <h1>Don't know how to perform the Exercise?</h1>
              <Button onClick={HowToPage} className="mt-3 btn-dark">
                Search an Exercise
              </Button>
            </Card>
            <header>Past History</header>
            {historicalLogs()}
          </div>

          <WorkoutExerciseForm workout={thisWorkout} />

          <header>Current Exercise Log</header>
          <table className="logTable1">
            <thead className="logForm">
              <tr>
                <th>Exercise Name</th>
                <th>Sets</th>
                <th>Weight</th>
                <th>Reps</th>
                <th>Finish</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {thisWorkout.workout_exercises.map(
                (workout_exercise, rowIndex) => {
                  const templateExercise = thisWorkout.exercises.find(
                    (exercise) =>
                      Number(exercise.id) ===
                      Number(workout_exercise.exercise_id)
                  );
                  return (
                    <WorkoutRow
                      workoutExercise={workout_exercise}
                      templateExercise={templateExercise}
                    />
                  );
                }
              )}
            </tbody>
          </table>

          <button onClick={() => history.push("/main")}>
            Complete Workout
          </button>
        </>
      )}
    </div>
  );
}

export default WorkoutLog;
