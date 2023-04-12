import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// This is a generator function that handles adding an exercise to the user's workout
function* addExercise(action) {
  try {
    const response = yield axios.post(
      "/api/workouts/user_exercise",
      action.payload
    );
    // The put() function dispatches an action to the store
    // The action type is "ADD_EXERCISE" and the payload is the data received from the response
    yield put({ type: "ADD_EXERCISE", payload: response.data });
  } catch (error) {
    console.log("ERROR IN ADDEXERCISE SAGA", error);
  }
}
function* watchAddExercise() {
  yield takeLatest("ADD_EXERCISE_REQUEST", addExercise);
}

export default watchAddExercise;
