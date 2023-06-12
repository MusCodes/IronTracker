import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function WorkoutTemplate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [editing, setEditing] = useState(null);
  const [newTemplateName, setNewTemplateName] = useState("");
  const workout = useSelector((store) => store.fetchTemplate);
  const id = workout.user_id;
  

  useEffect(() => {
    dispatch({ type: `FETCH_TEMPLATE` });
  }, []);

  useEffect(() => {
    dispatch({ type: `UPDATE_TEMPLATE` });
  }, []);


  function onSubmit(id) {
    dispatch({ type: "FETCH_TEMPLATE", payload: { history } });
    history.push(`/test/${id}`);
  }

  function editTemplateName(workout) {
    setEditing(workout.id);
    setNewTemplateName(workout.template_name);
  }

  function saveTemplateName(id, template_name) {
    dispatch({ type: "UPDATE_TEMPLATE", payload: { id, template_name } });
    setEditing(null);
  }

  return (
    <>
    
    <h1>Previous Templates</h1>
        {console.log("THIS IS WORKOUTS!!!!!!!",workout)}
      {workout==null? '' :workout.map((workout, index) => {
        
        if (editing === workout.id) {
          return (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={newTemplateName}
                  onChange={(e) => setNewTemplateName(e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => saveTemplateName(workout.id, newTemplateName)}>Save</button>
                <button onClick={() => setEditing(null)}>Cancel</button>
              </td>
            </tr>
          );
        } else {
          return (
            <tr key={index}>
              <td>TemplateName: {workout.template_name}</td>
              <td>
                <button onClick={() => onSubmit(workout.id)}>Start Workout</button>
                <button onClick={() => editTemplateName(workout)}>Edit Template Name</button>
              </td>
            </tr>
          );
        }
      })}
    </>
  );
}

export default WorkoutTemplate;