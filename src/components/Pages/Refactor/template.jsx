import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function ViewExerciseTemplate() {
  const dispatch = useDispatch();
  const template = useSelector((store) => store.template);
  const [name, setName] = useState("");
  const [editingTemplate, setEditingTemplate] = useState(null);
  const workoutTime = useSelector((store) => store.workoutTime);
  let log = useSelector((store) => store.log);
  console.log("this is log", log);

  const history = useHistory();
  console.log("this is workout time", workoutTime);
  useEffect(() => {
    dispatch({ type: "GET_EXERCISE_TABLE" });
  }, []);
  //
  useEffect(() => {
    if (log.length === 0) {
      dispatch({ type: "CURRENT_LOG_SAGA" });
    }
  }, []);
  //

  function submitTemplate() {
    dispatch({ type: "SUBMIT_NEW_TEMPLATE", payload: { name } });
    setName("");
    dispatch({ type: "GET_EXERCISE_TABLE" });
  }
  useEffect(() => {
    if (workoutTime.length === 0) {
      dispatch({ type: "FETCH_TIME" });
    }
  }, []);
  function displayTime(id) {
    // workoutTime.filter((obj) => {Number(obj.template_id)===Number(id)})
    let x = workoutTime.find((obj) => Number(obj.template_id) === Number(id));
    console.log("THIS IS X", x);
    if (!x) {
      return <></>;
    }
    return (
      <div>
        <h3>Time: {x.created_at}</h3>
        <p>THIS IS ID:{x.template_id}/</p>
        {/* <p>Template ID: {matchingTemplate}</p> */}
      </div>
    );
  }
  //settime

  // function handleStartWorkout(id) {

  //   dispatch({ type: "ADD_TIME", payload: id });

  //}
  //
  function grabID(id) {
    history.push(`/exercises/${id}`);
  }

  function handleStartWorkout(id) {
    // const currentTemplate = template.find(
    //   (templateObj) => templateObj.id === id
    // );

    dispatch({ type: "CREATE_WORKOUT", payload: id, history: history }); //make a work
  }

  function handleEditTemplateClick(template) {
    setEditingTemplate(template);
  }

  function handleEditTemplateSubmit() {
    dispatch({
      type: "EDIT_TEMPLATE_NAME",
      payload: { id: editingTemplate.id, name },
    });
    setEditingTemplate(null);
    setName("");
  }

  function handleCancelEditTemplate() {
    setEditingTemplate(null);
    setName("");
  }

  return (
    <>
      <section className="newtemplate">
        <div className="template-card">
          {editingTemplate ? (
            <>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="template-input"
                placeholder="Template Name"
              />
              <button onClick={handleEditTemplateSubmit}>Submit</button>
              <button onClick={handleCancelEditTemplate}>Cancel</button>
            </>
          ) : (
            <>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="template-input"
                placeholder="Template Name"
              />
              <button onClick={submitTemplate}>New Template</button>
            </>
          )}
        </div>
      </section>

      <h1>Previous templates</h1>
      <div className="ExerciseTemplateContainer">
        {template.map((template, index) => {
          return (
            <tr key={index}>
              {editingTemplate?.id === template.id ? (
                <>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="template-input"
                    placeholder="Template Name"
                  />
                  <button onClick={handleEditTemplateSubmit}>Submit</button>
                  <button onClick={handleCancelEditTemplate}>Cancel</button>
                </>
              ) : (
                <>
                  {/* {workoutTime.map((time, index) => {
                    const matchingTemplate = template.filter(
                      (templateObj) =>
                        templateObj.id === workoutTime.template_id
                    );
                    return (
                      <div key={index}>

                        <h3>Time: {time.created_at}</h3>
                        <p>THIS IS ID:{time.template_id}/</p>
                        <p>Template ID: {matchingTemplate}</p>
                      </div>
                    );
                  })} */}
                  {displayTime(template.id)}

                  <h1 className="ExerciseTemplate">name: {template.name}</h1>

                  <button onClick={() => handleEditTemplateClick(template)}>
                    Edit Template Name
                  </button>
                  <p>Exercise Count ({template.exercise_count})</p>
                  <button onClick={() => handleStartWorkout(template.id)}>
                    Start Workout
                  </button>
                  <button>Delete</button>
                  <button onClick={() => grabID(template.id)}>Edit</button>
                  <h2>Exercises:</h2>
                  <ul>
                    {template.exercises.map((exercise, index) => {
                      return <li key={index}>{exercise.name}</li>;
                    })}
                  </ul>
                </>
              )}
            </tr>
          );
        })}
      </div>
    </>
  );
}

export default ViewExerciseTemplate;

// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";

// function ViewExerciseTemplate() {
//   const dispatch = useDispatch();
//   const template = useSelector((store) => store.template);
//   const [name, setName] = useState("");
//   const [editingTemplate, setEditingTemplate] = useState(null);
//   const [viewingTemplate, setViewingTemplate] = useState(null);
//   const history = useHistory();

//   useEffect(() => {
//     dispatch({ type: "GET_EXERCISE_TABLE" });
//   }, []);

//   function submitTemplate() {
//     dispatch({ type: "SUBMIT_NEW_TEMPLATE", payload: { name } });
//     setName("");
//   }

//   function grabID(id) {
//     history.push(`/exercises/${id}`);
//   }

//   function handleStartWorkout(id) {
//     const currentTemplate = template.find((templateObj) => templateObj.id === id);
//     dispatch({
//       type: "CURRENT_TEMPLATE",
//       payload: currentTemplate,
//     });
//     dispatch({
//       type: "FETCH_TIME",
//     });
//     history.push(`/workouts/${id}`);
//   }

//   function handleEditTemplateClick(template) {
//     setEditingTemplate(template);
//   }

//   function handleEditTemplateSubmit() {
//     dispatch({ type: "EDIT_TEMPLATE_NAME", payload: { id: editingTemplate.id, name } });
//     setEditingTemplate(null);
//     setName("");
//   }

//   function handleCancelEditTemplate() {
//     setEditingTemplate(null);
//     setName("");
//   }

//   function handleViewTemplate(template) {
//     setViewingTemplate(template);
//   }

//   function handleHideTemplate() {
//     setViewingTemplate(null);
//   }

//   return (
//     <>
//       <section className="newtemplate">
//         <div className="template-card">
//           <div className="template-card-front">
//             <h1 className="template-name">Templates</h1>
//             <button className="new-template-button" onClick={() => setEditingTemplate({})}>
//               New Template
//             </button>
//           </div>
//           {editingTemplate && (
//             <div className="template-card-back">
//               <input
//                 value={name}
//                 onChange={(event) => setName(event.target.value)}
//                 className="template-input"
//                 placeholder="Template Name"
//               />
//               <button className="submit-template-button" onClick={handleEditTemplateSubmit}>Submit</button>
//               <button className="cancel-template-button" onClick={handleCancelEditTemplate}>Cancel</button>
//             </div>
//           )}
//         </div>
//       </section>

//       <h1>Previous templates</h1>
//       <div className="ExerciseTemplateContainer">
//         {template.map((template, index) => {
//           return (
//             <div className="template-card-container" key={index}>
//               <div className="template-card">
//                 <div className="template-card-front">
//                   <h1 className="template-name">{template.name}</h1>
//                   <button className="edit-template-button" onClick={() => handleEditTemplateClick(template)}>Edit Template Name</button>
//                   <p className="exercise-count">Exercise Count ({template.exercise_count})</p>
//                   <button className="view-template-button" onClick={() => handleViewTemplate(template)}>View</button>
//                 </div>
//                 {viewingTemplate?.id === template.id && (
//                   <div className="template-card-back">
//                     <h2 className="exercises-heading">Exercises:</h2>
//                     <ul className="exercises-list">
//                       {template.exercises.map((exercise, index) => {
//                         return <li key={index}>{exercise.name}</li>;

//                    })}
//                 </ul>
//                 <div className="template-buttons">
//                   <button className="start-workout-button" onClick={() => handleStartWorkout(template.id)}>Start Workout</button>
//                   <button className="edit-template-button" onClick={() => grabID(template.id)}>Edit</button>
//                   <button className="hide-template-button" onClick={handleHideTemplate}>Hide</button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       );
//     })}
//   </div>
// </>

//   );
// }

// export default ViewExerciseTemplate;
