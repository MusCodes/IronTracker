import { useState } from "react";
import { useDispatch } from "react-redux";

function workoutRow({ workoutExercise, templateExercise }) {
  const dispatch = useDispatch();

  const [workoutInfo, setWorkoutInfo] = useState({
    id: workoutExercise.id,
    sets: workoutExercise.sets || 0,
    weight: workoutExercise.weight || 0,
    reps: workoutExercise.reps || 0,
  });

  const [saved, setSaved] = useState(false); // new state variable

  function deleteExercise() {
    dispatch({
      type: "DELETE_WORKOUT_EXERCISE",
      payload: Number(workoutExercise.id),
    });
  }

  function updateWorkoutExercise() {
    dispatch({
      type: "UPDATE_WORKOUT_EXERCISE",
      payload: workoutInfo
    });
    setSaved(true); // set the saved state to true when the button is clicked
  }

  function handleRowChange(event, fieldName) {
    setWorkoutInfo({
      ...workoutInfo,
      [fieldName]: event.target.value,
    });
  }

  console.log('building a row');

  const inputClass = saved ? 'InputField InputField--saved' : 'InputField'; // determine the input field class based on the saved state

  return (
    <tr className="WorkoutRow">
      <td className="ExerciseName">{templateExercise?.name}</td>
      <td>
        <input
          type="text"
          name="sets"
          className={inputClass} // use the input field class determined above
          value={workoutInfo.sets}
          onChange={(event) => handleRowChange(event, "sets")}
        />
      </td>
      <td>
        <input
          type="number"
          name="weight"
          className={inputClass} // use the input field class determined above
          value={workoutInfo.weight}
          onChange={(event) => handleRowChange(event, "weight")}
        />
      </td>
      <td>
        <input
          type="number"
          name="reps"
          className={inputClass} // use the input field class determined above
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
        <button
          className="btn btn-danger btn-sm "
          onClick={deleteExercise}
        >
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  );
}

export default workoutRow;