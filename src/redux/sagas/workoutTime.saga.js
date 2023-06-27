import axios from "axios";

import { put, takeLatest } from "redux-saga/effects";

function* createWorkout(action) {
  try {
    // takes template id and makes a workout based on that
    const response = yield axios.post(`/api/workout_time/`, {
      template_id: action.payload,
    });
    // push user to the workout page
    yield action.history.push(`/workouts/${response.data.id}`);
    yield put({ type: "FETCH_TIME" }); // refreshes all workouts
  } catch (error) {
    console.log("ERROR IN FETCHEXERCISE SAGA", error);
  }
}

function* fetchTime() {
  try {
    const response = yield axios.get(`/api/workout_time/`);
    console.log("this is response", response);
    yield put({ type: "SET_TIME", payload: response.data });
  } catch (error) {
    console.log("ERROR IN FETCHEXERCISE SAGA", error);
  }
}
function* fetchTimeSaga() {
  yield takeLatest("FETCH_TIME", fetchTime);
  yield takeLatest("CREATE_WORKOUT", createWorkout);
}
export default fetchTimeSaga;
