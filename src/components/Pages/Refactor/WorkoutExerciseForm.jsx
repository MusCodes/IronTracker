import { useState } from "react";
import { useDispatch } from "react-redux";

function WorkoutExerciseForm({ workout }) {
  const dispatch = useDispatch();

  const [workoutInfo, setWorkoutInfo] = useState({
    exercise_id: '',
    sets: 0,
    weight: 0,
    reps: 0,
    workout_id: workout.id,
  });

  // create a form that posts a new workout exercise for a given workout
  function handleRowChange(event, fieldName) {
    setWorkoutInfo({
      ...workoutInfo,
      [fieldName]: event.target.value,
    });
  }

  const handleSubmit = () => {
    // do a POST to create a new workout log for this workout
    dispatch({ type: 'POST_WORKOUT', payload: workoutInfo})
  };

  return (
    <div>
      Exercise: <br/>
      <select
         value={workoutInfo.exercise_id}
         onChange={(event) => handleRowChange(event, "exercise_id")}
      >
         <option value={undefined}>Please Select...</option>
        {workout.exercises.map((exercise, index) => {
          return (
            <option value={exercise.id}>{exercise.name} </option>
          )
        })}
         {/* map over workout's exercises for drop-down */}
      </select>
      <br />
      Sets:
      <input
        type="text"
        name="sets"
        value={workoutInfo.sets}
        onChange={(event) => handleRowChange(event, "sets")}
      />
      Weight:
      <input
        type="number"
        name="weight"
        value={workoutInfo.weight}
        onChange={(event) => handleRowChange(event, "weight")}
      />
      Reps:
      <input
        type="number"
        name="reps"
        value={workoutInfo.reps}
        onChange={(event) => handleRowChange(event, "reps")}
      />

      <button onClick={handleSubmit}>Add Workout Log</button>
    </div>
  );
}

export default WorkoutExerciseForm;
