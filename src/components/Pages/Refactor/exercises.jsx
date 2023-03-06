import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import { Button,Card } from 'react-bootstrap';


//WORKING
function Exercises() {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState(``);
  const id = Number(params.id);
  console.log("this is id", id);
  const template = useSelector((store) => store.template);
  console.log("THIS IS TEMPLATE",);
  useEffect(() =>{
  ({type:"GET_EXERCISE_TABLE"})
  })

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
  }

  function handleStartWorkout(id) {
    // const currentTemplate = template.find(
    //   (templateObj) => templateObj.id === id
    // );

    dispatch({ type: "CREATE_WORKOUT", payload: id, history: history }); //make a work
  }

  //   console.log("I am running")
  //   dispatch({
  //     type: "CURRENT_TEMPLATE",
  //     payload: currentTemplate,
  //   });
  //   dispatch({ type: "ADD_TIME", payload: id }); // USED?
  //   history.push(`/workouts/${id}`);
  // }
  

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

  const filteredTemplate = template.find(
    (templateObj) => templateObj.id === id
  );

  if (!filteredTemplate) {
    return <h1>No template found with id: {id}</h1>;
  }
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
  <Card className="card-pop" style={{ width: "24rem" }}>
    <Card.Body>
      <Card.Title className="exerciseText" >Current Template: <span className="exerciseText">{filteredTemplate.name}</span> </Card.Title>
      <div className="input-group mb-3">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          className="form-control"
          placeholder="Exercise"
        />
        <Button
          variant="primary"
          onClick={() => handleStartWorkout(id)}
        >
          Start Workout
        </Button>
        <Button variant="success" onClick={addExercise}>
          Add
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
