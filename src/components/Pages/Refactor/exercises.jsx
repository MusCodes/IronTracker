import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Card } from "react-bootstrap";

// This component displays the exercises. it allows user to add an exercise, user is able to use the input field
// to put in an exercise name. this component also allows the delete an exercise.
function Exercises() {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState(``);
  const id = Number(params.id);
  console.log("this is id", id);
  const template = useSelector((store) => store.template);
  console.log("THIS IS TEMPLATE");

  useEffect(() => {
    dispatch({ type: "GET_EXERCISE_TABLE" });
  }, []);
  // This function dispatches two actions to add a new exercise to the database and update the workout log with the new exercise
  function addExercise() {
    dispatch({
      type: "ADD_EXERCISES",
      payload: {
        name: name,
        template_id: id,
      },
    });
    dispatch({
      type: "ADD_TIME",
      payload: {
        template_id: id,
      },
    });
    dispatch({ type: "GET_EXERCISE_TABLE" });
  }

  function handleStartWorkout(id) {
    dispatch({ type: "CREATE_WORKOUT", payload: id, history: history }); //make a work
  }

  useEffect(() => {
    if (template.length === 0) {
      dispatch({ type: "GET_EXERCISE_TABLE" });
    }
  }, []);
  console.log("This is template", template);

  function deleteExercise(exerciseId) {
    dispatch({
      type: "DELETE_EXERCISE",
      payload: Number(exerciseId),
    });
  }
  // The filteredTemplate variable is assigned the template object with the matching ID from the Redux store

  const filteredTemplate = template.find(
    (templateObj) => templateObj.id === id
  );
  // If there is no matching template found in the Redux store, a message is displayed
  if (!filteredTemplate) {
    return <h1>No template found with id: {id}</h1>;
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card className="card-pop" style={{ width: "24rem" }}>
          <Card.Body>
            <Card.Title className="exerciseText">
              Current Template:{" "}
              <span className="exerciseText">{filteredTemplate.name}</span>{" "}
            </Card.Title>
            <div className="input-group mb-3">
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                className="form-control"
                placeholder="Exercise"
              />
              <Button variant="success" onClick={addExercise}>
                Add
              </Button>
              <Button variant="primary" onClick={() => handleStartWorkout(id)}>
                Start Workout
              </Button>
            </div>
            <section>
              <h2 className="exerciseText">Current Exercises:</h2>
              <ul className="list-group">
                {filteredTemplate.exercises.map((exerciseObj, index) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={index}
                  >
                    {exerciseObj.name}
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteExercise(exerciseObj.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Exercises;
