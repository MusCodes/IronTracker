import { useState } from "react";
import { useDispatch } from "react-redux";

function workoutRow({ workoutExercise, templateExercise }) {
  const dispatch = useDispatch();

  // State to manage the workout information
  const [workoutInfo, setWorkoutInfo] = useState({
    id: workoutExercise.id,
    sets: workoutExercise.sets || 0,
    weight: workoutExercise.weight || 0,
    reps: workoutExercise.reps || 0,
  });

  // State to manage the "saved" status
  const [saved, setSaved] = useState(false);

  // Function to delete an exercise from the workout
  function deleteExercise() {
    dispatch({
      type: "DELETE_WORKOUT_EXERCISE",
      payload: Number(workoutExercise.id),
    });
  }

  // Function to update the workout exercise
  function updateWorkoutExercise() {
    dispatch({
      type: "UPDATE_WORKOUT_EXERCISE",
      payload: workoutInfo,
    });
    setSaved(true); // Set the saved state to true when the button is clicked
  }

  // Function to handle changes in the input fields
  function handleRowChange(event, fieldName) {
    setWorkoutInfo({
      ...workoutInfo,
      [fieldName]: event.target.value,
    });
  }

  // Log a message to indicate that a row is being built
  console.log("building a row");

  // Determine the class for the input fields based on the "saved" state
  const inputClass = saved ? "InputField InputField--saved" : "InputField";

  return (
    <>
      {/* Table row for the workout exercise */}
      <tr className="WorkoutRow">
        <td className="ExerciseName">{templateExercise?.name}</td>
        <td>
          <input
            type="number"
            name="sets"
            className={inputClass} // Use the input field class determined above
            value={workoutInfo.sets}
            onChange={(event) => handleRowChange(event, "sets")}
          />
        </td>
        <td>
          <input
            type="number"
            name="weight"
            className={inputClass} // Use the input field class determined above
            value={workoutInfo.weight}
            onChange={(event) => handleRowChange(event, "weight")}
          />
        </td>
        <td>
          <input
            type="number"
            name="reps"
            className={inputClass} // Use the input field class determined above
            value={workoutInfo.reps}
            onChange={(event) => handleRowChange(event, "reps")}
          />
        </td>
        <td>
          <button
            className="btn btn-success btn-sm"
            onClick={updateWorkoutExercise}
          >
            <i className="bi bi-save"></i>
          </button>
        </td>
        <td>
          <button className="btn btn-danger btn-sm" onClick={deleteExercise}>
            <i className="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    </>
  );
}

export default workoutRow;
