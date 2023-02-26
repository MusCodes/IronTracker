import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function TableWithInputs() {
  const [rows, setRows] = useState([]);

  const params = useParams();
  const id = params.workout_id;
  console.log("THIS IS ID", id);

  let exerciseData = useSelector((store) => store.fetchExercise);
  console.log("this is exerciseDATA", exerciseData);
  const FilterexerciseData = exerciseData.filter(
    (FilterexerciseData) => FilterexerciseData.workout_id === Number(id)
  );
  const dispatch = useDispatch();

  const [dataTest,setDataTest] = useState([])
  
  useEffect(() => {
    dispatch({ type: "FETCH_EXERCISE" });
  }, []);


  useEffect(() => {

    setDataTest(FilterexerciseData)
  }, [exerciseData]);


  function handleRowChange(event, rowIndex, fieldName) {
    const { value } = event.target;
    // setRows((prevRows) => {
    //   const newRows = [...prevRows];
    //   if (!newRows[rowIndex]) {
    //     newRows[rowIndex] = {
    //       exercise_name: "",
    //       sets: "",
    //       previous: "",
    //       weight: 0,
    //       reps: 0,
    //       completed_at: 0,
    //       completed: false,

    //       workout_id: id,
    //     };
    //   }
       FilterexerciseData[rowIndex][fieldName] = value;
    //   newRows[rowIndex].completed = false;
    //   newRows[rowIndex].workout_id = id;

      setDataTest(FilterexerciseData)
      //return newRows;
  
    
  }

  function sendDataToServer(rowIndex) {
    dispatch({
      type: "ADD_EXERCISE_REQUEST",
      payload: {
        exercise_name: rows[rowIndex].exercise_name,
        workout_id: id,
      },
    });
  }

  function handleAddRow() {
    const newRow = {
      exercise_name: "",
      sets: "",
      previous: "",
      weight: 0,
      reps: 0,
      completed_at: 0,
      completed: false,
      workout_id: Number(id),
    };
    dispatch({ type: "ADD_ROW", payload: newRow });
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
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {dataTest.map((row, rowIndex) => {
            console.log(row);
            return (
              <tr key={rowIndex}>
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
                <td>
                  <input
                    type="text"
                    name="sets"
                    value={row.sets}
                    onChange={(event) => {
                      console.log(event.target)
                      handleRowChange(event, rowIndex, "sets")
                    }
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="previous"
                    value={row.previous}
                    onChange={(event) =>{
                      handleRowChange(event,rowIndex,"previous")
                    }}
              
                    //}
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
                    onChange={(event) =>
                      handleRowChange(event, rowIndex, "reps")
                    }
                  />
                </td>
                <td>
                  <input
                    type="integer"
                    name="time"
                    value={row.completed_at}
                    onChange={(event) =>
                      handleRowChange(event, rowIndex, "completed_at")
                    }
                  />
                </td>
                <td>
                  <td>
                    <button onClick={() => sendDataToServer(rowIndex)}>
                      Complete!
                    </button>
                  </td>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={handleAddRow}>Add Set</button>
    </div>
  );
}

export default TableWithInputs;
