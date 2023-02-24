import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function TableWithInputs() {
  const [rows, setRows] = useState([
    {
      exercise_name: "",
      sets: "",
      previous: "",
      weight: "",
      reps: "",
      completed_at: "",
    },
  ]);

  const params = useParams();
  const id = params.workout_id;
  console.log("THIS IS ID", id);

  function handleRowChange(event, rowIndex, fieldName) {
    const { value } = event.target;
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[rowIndex][fieldName] = value;
      newRows[rowIndex].completed = false; 
      newRows[rowIndex].workout_id = id;

      return newRows;
    });
  }

  //
  function sendDataToServer(data) {
    axios
      .post("/api/workouts/user_exercise", data)

      .then((response) => {
        console.log("THIS IS DATA!", data);
        console.log("THIS IS RESPONSe", response);
        console.log("THIS IS RESPONSE.DATA !", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //

  function handleAddRow() {
    setRows((prevRows) => [
      ...prevRows,
      {
        exercise_name: "",
        workout_id: "",
        sets: "",
        previous: "",
        weight: "",
        reps: "",
        completed_at: "",
      },
    ]);
  }

  return (
    <div className="Table">
      <table>
        <thead>
          
          <tr>
            <th>Exercise Name</th>
            {/* <th> WorkoutID</th> */}
            <th>SETS</th>
            <th>Previous</th>
            <th>Weight</th>
            <th>Reps</th>
            <th>Time</th>
            <th>Completed!</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            console.log(row);
            
             return <tr key={rowIndex}>
              <td>
                <input
                  type="text"
                  name="exercise_name"
                  value={row.exercise_name}
                  onChange={(event) =>
                    handleRowChange(event, rowIndex, "exercise_name")
                  }
                />
              </td>
              {/* <td> */}
              {/* <input
                  type="number"
                  name="workout_id"
                  value={row.workout_id}
                  onChange={(event) => handleRowChange(event, rowIndex, "workout_id")}
                />
              </td> */}
              <td>
                <input
                  type="text"
                  name="sets"
                  value={row.sets}
                  onChange={(event) => handleRowChange(event, rowIndex, "sets")}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="previous"
                  value={row.previous}
                  onChange={(event) =>
                    handleRowChange(event, rowIndex, "previous")
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  name="weight"
                  value={row.weight}
                  onChange={(event) =>
                    handleRowChange(event, rowIndex, "weight")
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  name="reps"
                  value={row.reps}
                  onChange={(event) => handleRowChange(event, rowIndex, "reps")}
                />
              </td>
              <td>
                <input
                  type="time"
                  name="time"
                  value={row.completed_at}
                  onChange={(event) =>
                    handleRowChange(event, rowIndex, "completed_at")
                  }
                />
              </td>
              <td>
                <td>
                  <button onClick={() => sendDataToServer(rows[rowIndex])}>
                    Complete
                  </button>
                </td>
              </td>
            </tr>
})}
        </tbody>
      </table>
      <button onClick={handleAddRow}>Add Set</button>
    </div>
  );
}

export default TableWithInputs;
