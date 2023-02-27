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








//XXXXXXXXXXXXXXXXXXX
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux"
// import { useHistory } from "react-router-dom";



// function WorkoutTemplate(){
//     let dispatch= useDispatch();
//     let history= useHistory();
//     let workout= useSelector((store) => store.fetchTemplate);
//     console.log("THIS IS TEMPLATE", workout);
//     let id=workout.user_id;
//     console.log("this is IDXXXXXX", id)
//     function onSubmit(id){
//         dispatch({type:"FETCH_TEMPLATE",payload:{history}});
//         history.push(`/test/${id}`)

//     }
//     function editTemplateName(id){
//         dispatch({type:"UPDATE_TEMPLATE"});
        

//     }

//     useEffect(() =>{
//         dispatch({type:`FETCH_TEMPLATE`});
//     },[])
//     return (
//         <>
//         {workout.map((workout,index) =>{
//             console.log("this is workout",workout)
//             return (   <tr key={index}>
//                 <h1>TemplateName: {workout.template_name}</h1>
//                 <button onClick={() =>onSubmit(workout.id)} >start Workout</button>
//                 <button onClick={() => editTemplateName(workout.id)}>Edit Template Name</button>
//             </tr>)
         
//         })}
//         </>
//     )
// }
// export default WorkoutTemplate