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
    })
  }

  function handleRowChange(event, fieldName) {
    setWorkoutInfo({
      ...workoutInfo,
      [fieldName]: event.target.value,
    });
  }

  console.log('building a row');

  return (
    <tr className="WorkoutRow">
      <td className="ExerciseName">{templateExercise?.name}</td>
      <td>
        <input
          type="text"
          name="sets"
          className="InputField"
          value={workoutInfo.sets}
          onChange={(event) => handleRowChange(event, "sets")}
        />
      </td>
      <td>
        <input
          type="number"
          name="weight"
          className="InputField"
          value={workoutInfo.weight}
          onChange={(event) => handleRowChange(event, "weight")}
        />
      </td>
      <td>
        <input
          type="number"
          name="reps"
          className="InputField"
          value={workoutInfo.reps}
          onChange={(event) => handleRowChange(event, "reps")}
        />
      </td>
      <td>
  <button className="btn btn-success btn-sm" onClick={updateWorkoutExercise}>
    <i className="bi bi-save"></i>
  </button>
</td>
<td>
  <button className="btn btn-danger btn-sm " onClick={deleteExercise}>
    <i className="bi bi-trash"></i>
  </button>
</td>

    </tr>
  );
  }  

export default workoutRow;