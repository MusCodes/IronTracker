import axios from "axios";
import { takeLatest } from "redux-saga/effects";

// This generator function handles adding an exercise to the database
function* addExercise(action) {
  try {
    // The axios.post() function sends a POST request to the specified URL with the given template ID and exercise name
    const response = yield axios.post(
      `/api/exercises/${action.payload.template_id}`,
      { name: action.payload.name }
    );
    console.log("THIS IS RESPONSE FOR EXERCISES", response);
  } catch (error) {
    console.log("ERROR ON LINE 18", error);
  }
}
function* addDefaultExercises(action){
  try {
    // were importing user from the redux store to grab the id and send it in the post request.
    const response = yield axios.post("/api/exercises/", {
      name: action.payload.name,
      template_id: action.payload.templateId,
      id: action.payload.exercise_Id,
    });
    console.log("THIS IS RESPONSE FOR DEFAULT EXERCISES", response);
    
  } catch (error) {
    console.log("ERROR ON LINE 29", error);
  }
}

function* addExerciseSaga() {
  yield takeLatest("ADD_EXERCISES", addExercise);
  yield takeLatest("ADD_DEFAULT_EXERCISES", addDefaultExercises)
}
export default addExerciseSaga;
