import { useState } from "react";

function TableWithInputs() {
  const [rows, setRows] = useState([
    { name: "", sets: "", previous: "", weight: "", reps: "", time: "" },
  ]);

  function handleRowChange(event, rowIndex, fieldName) {
    const { value } = event.target;
    setRows((prevRows) => {
      const newRows = [...prevRows];
      newRows[rowIndex][fieldName] = value;
      return newRows;
    });
  }

  function handleAddRow() {
    setRows((prevRows) => [
      ...prevRows,
      { name: "", sets: "", previous: "", weight: "", reps: "", time: "" },
    ]);
  }

  return (
    <div className="Table">
      <table>
        <thead>
          <tr>
            <th>Exercise Name</th>
            <th>SETS</th>
            <th>Previous</th>
            <th>Weight</th>
            <th>Reps</th>
            <th>Time</th>
            <th>Completed</th>
            
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <input
                  type="text"
                  name="name"
                  value={row.name}
                  onChange={(event) => handleRowChange(event, rowIndex, "name")}
                />
              </td>
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
                  type="Time"
                  name="time"
                  value={row.time}
                  onChange={(event) => handleRowChange(event, rowIndex, "time")}
                />
              </td>
              <td>
                <button>Complete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleAddRow}>Add Set</button>
    </div>
  );
}

export default TableWithInputs;
