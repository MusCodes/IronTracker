import axios from "axios";

import { put, takeLatest } from "redux-saga/effects";

// This generator function handles fetching exercises for the user's workout log
function* fetchExercise() {
  try {
    const response = yield axios.get(`/api/workouts/user_exercise/`);
    console.log("this is response", response);
    yield put({ type: "SET_EXERCISE", payload: response.data });
  } catch (error) {
    console.log("ERROR IN FETCHEXERCISE SAGA", error);
  }
}
function* fetchExerciseDataSaga() {
  yield takeLatest("FETCH_EXERCISE", fetchExercise);
}
export default fetchExerciseDataSaga;
