import { Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// This is the component that shows the template  and its the first page user gets directed to soon as they log in.
function ViewExerciseTemplate() {
  const dispatch = useDispatch();
  // The useSelector() hook is used to access the Redux store and retrieve the list of exercise templates, workout log, and workout time
  const template = useSelector((store) => store.template);
  const [name, setName] = useState("");
  const [editingTemplate, setEditingTemplate] = useState(null);
  const workoutTime = useSelector((store) => store.workoutTime);
  let log = useSelector((store) => store.log);
  console.log("this is log", log);

  const history = useHistory();
  console.log("this is workout time", workoutTime);
  // The GET_EXERCISE_TABLE and CURRENT_LOG_SAGA actions are dispatched to fetch the list of exercise templates and workout log from the database
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
    [];
  }
  useEffect(() => {
    if (workoutTime.length === 0) {
      dispatch({ type: "FETCH_TIME" });
    }
  }, []);

  // Delete a template
  function deleteTemplate(id) {
    dispatch({ type: `DELETE_TEMPLATE`, payload: id });
  }
  // This function formats a timestamp into a human-readable date and time string
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
        <p>Last Completed: {formatDate(x.created_at)}</p>
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
  // this function will be the button users will click to make default templates
  function DefaultWorkoutProgram() {
    function Chest() {
      dispatch({ type: "SUBMIT_NEW_TEMPLATE", payload: { name: "chest/triceps" } });
      dispatch({
        type: "ADD_EXERCISES",
        payload: {
          name: "triceps",
          template_id: 116,
        },
      });
    }
  
    function BackBiceps() {
      dispatch({ type: "SUBMIT_NEW_TEMPLATE", payload: { name: "back/biceps" } });
    }
  
    function ShouldersLegs() {
      dispatch({ type: "SUBMIT_NEW_TEMPLATE", payload: { name: "shoulders/legs" } });
    }
    
    dispatch({ type: "GET_EXERCISE_TABLE" });
    [];
    Chest();
    BackBiceps();
    ShouldersLegs();
    // these 3 functions will be nested inside DefaultWorkoutProgram
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
                <Button
                  variant="primary"
                  className="mr-2"
                  onClick={handleEditTemplateSubmit}
                >
                  Submit
                </Button>
                <Button variant="secondary" onClick={handleCancelEditTemplate}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="form-control mb-2"
                  placeholder="Template Name"
                />
                <Button variant="primary" onClick={submitTemplate}>
                  New Template
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
      </section>

      <Button onClick={DefaultWorkoutProgram} >Beginner workout Program</Button>

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
                      <Button
                        variant="primary"
                        className="mr-2"
                        onClick={handleEditTemplateSubmit}
                      >
                        Submit
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={handleCancelEditTemplate}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      {displayTime(template.id)}

                      <h1 className="ExerciseTemplate mt-3">
                        name: {template.name}
                      </h1>

                      <Button
                        variant="secondary"
                        className="mr-2"
                        onClick={() => handleEditTemplateClick(template)}
                      >
                        Edit Template Name
                      </Button>
                      <p>Exercise Count ({template.exercise_count})</p>
                      <Button
                        variant="primary"
                        className="mr-2"
                        onClick={() => handleStartWorkout(template.id)}
                      >
                        Start Workout
                      </Button>

                      <Button
                        variant="danger"
                        className="mr-2"
                        onClick={() => deleteTemplate(template.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => grabID(template.id)}
                      >
                        Edit
                      </Button>
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
    </>
  );
}

export default ViewExerciseTemplate;
