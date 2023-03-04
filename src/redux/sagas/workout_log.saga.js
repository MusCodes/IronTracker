import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* fetchLog(action) {
  try {
    const response = yield axios.get(`/api/logs/`);
    console.log("THIS IS RESPONSE FOR TEMPLATE", response);
    yield put({ type: `CURRENT_LOG`, payload: response.data });
    console.log("ASDAJSDLAKJDLAKSD", response.data);
    // TODO: push to the URL with the created workout's id (below):
    // TODO: remove the push on the user page that's probably doing it already
    //  yield action.payload.history.push(`/workouts/${response.data.id}`)
  } catch (error) {
    console.log("ERROR IN FETCH TEMPLATE SAGA", error);
  }
}

function* addWorkoutLog(action) {
  try {
    // takes template id and makes a workout based on that
    const response = yield axios.post(`/api/logs/`, action.payload);
    yield put({ type: "FETCH_TIME" });
  } catch (error) {
    console.log("ERROR IN FETCHEXERCISE SAGA", error);
  }
}
function* fetchLogSaga() {
  yield takeLatest("CURRENT_LOG_SAGA", fetchLog);
  yield takeLatest("POST_WORKOUT", addWorkoutLog);
}
export default fetchLogSaga;
