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
    <tr
      // style={
      //   completedRows.includes(rowIndex) ? { backgroundColor: "green" } : null
      // }
    >
      <td>
        {templateExercise?.name}
      </td>
      <td>
        <input
          type="text"
          name="sets"
          value={workoutInfo.sets}
          onChange={(event) => handleRowChange(event, "sets")}
        />
      </td>

      <td>
        <input
          type="number"
          name="weight"
          value={workoutInfo.weight}
          onChange={(event) => handleRowChange(event, "weight")}
        />
      </td>
      <td>
        <input
          type="number"
          name="reps"
          value={workoutInfo.reps}
          onChange={(event) => handleRowChange(event, "reps")}
        />
      </td>

      <td>
        <td>
          <button
            onClick={updateWorkoutExercise}
          >
            Save!
          </button>
        </td>
      </td>
      <td>
        <td>
          <button onClick={deleteExercise}>delete</button>
        </td>
      </td>
    </tr>
  );
}

export default workoutRow;
