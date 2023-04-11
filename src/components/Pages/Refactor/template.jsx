import { Card, Button } from 'react-bootstrap';
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
  []}
  useEffect(() => {
    if (workoutTime.length === 0) {
      dispatch({ type: "FETCH_TIME" });
    }
  }, []);

  // Delete a template
  function deleteTemplate(id){
    dispatch({ type: `DELETE_TEMPLATE`, payload: id})

  }
  function formatDate(timestamp) {
    const createdAt = new Date(timestamp);
    const date = createdAt.toLocaleDateString();
    const time = createdAt.toLocaleTimeString();
    return `${date} ${time}`;
  }
  
  function displayTime(id) {
    let x = workoutTime.find((obj) => Number(obj.template_id) === Number(id));
    console.log("THIS IS X", x);
    if (!x) {
      return <></>;
    }
    return (
      <div>
        <h3>Time: {formatDate(x.created_at)}</h3>
        
      </div>
    );
  }

  function grabID(id) {
    history.push(`/exercises/${id}`);
  }

  function handleStartWorkout(id) {
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
    <Card>
            <Card.Body>
                {editingTemplate ? (
                    <>
                        <input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="form-control mb-2"
                            placeholder="Template Name"
                        />
                        <Button variant="primary" className="mr-2" onClick={handleEditTemplateSubmit}>Submit</Button>
                        <Button variant="secondary" onClick={handleCancelEditTemplate}>Cancel</Button>
                    </>
                ) : (
                    <>
                        <input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="form-control mb-2"
                            placeholder="Template Name"
                        />
                        <Button variant="primary" onClick={submitTemplate}>New Template</Button>
                    </>
                )}
            </Card.Body>
        </Card>
    </section>

    <h1 className="mt-4">Previous templates</h1>
    <div className="row">
        {template.map((template, index) => {
            return (
                <div key={index} className="col-md-6 mb-4">
                    <Card bg="light">
                        <Card.Body>
                            {editingTemplate?.id === template.id ? (
                                <>
                                    <input
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        className="form-control mb-2"
                                        placeholder="Template Name"
                                    />
                                    <Button variant="primary" className="mr-2" onClick={handleEditTemplateSubmit}>Submit</Button>
                                    <Button variant="secondary" onClick={handleCancelEditTemplate}>Cancel</Button>
                                </>
                            ) : (
                                <>
                                    {displayTime(template.id)}

                                    <h1 className="ExerciseTemplate mt-3">name: {template.name}</h1>

                                    <Button variant="secondary" className="mr-2" onClick={() => handleEditTemplateClick(template)}>
                                        Edit Template Name
                                    </Button>
                                    <p>Exercise Count ({template.exercise_count})</p>
                                    <Button variant="primary" className="mr-2" onClick={() => handleStartWorkout(template.id)}>
                                        Start Workout
                                    </Button>
                                    
                                    <Button variant="danger" className="mr-2" onClick={() => deleteTemplate(template.id) } >Delete</Button>
                                    <Button variant="secondary" onClick={() => grabID(template.id)}>Edit</Button>
                                    <h2 className="mt-3">Exercises:</h2>
                                    <ul>
                                        {template.exercises.map((exercise, index) => {
                                            return <li key={index}>{exercise.name}</li>;
                                        })}
                                    </ul>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </div>
            
            );
        })}
    </div>
</>)
    
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
