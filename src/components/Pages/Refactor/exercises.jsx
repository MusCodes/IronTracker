import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function Exercises() {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState(``);
  const id = Number(params.id);
  const template = useSelector((store) => store.template);
  console.log("THIS IS TEMPLATE",);

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
    const currentTemplate = template.find(
      (templateObj) => templateObj.id === id
    );

    console.log("I am running")
    dispatch({
      type: "CURRENT_TEMPLATE",
      payload: currentTemplate,
    });
    dispatch({ type: "ADD_TIME", payload: id }); // USED?
    history.push(`/workouts/${id}`);
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

  const filteredTemplate = template.find(
    (templateObj) => templateObj.id === id
  );

  if (!filteredTemplate) {
    return <h1>No template found with id: {id}</h1>;
  }

  return (
    <>
      <h1> Current Template:{filteredTemplate.name}</h1>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        type="text"
        placeholder="Exercise"
      ></input>{" "}
      <button onClick={() => handleStartWorkout(id)}>Start Workout</button>
      <button onClick={addExercise}> add</button>
      <div>
        <section>
          <h2> Current Exercises:</h2>
          <ul>
            {filteredTemplate.exercises.map((exerciseObj, index) => (
              <li key={index}>
                {exerciseObj.name}

                <button onClick={() => deleteExercise(exerciseObj.id)}>
                  delete
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default Exercises;
