import axios from "axios";

import { put, select, takeLatest } from "redux-saga/effects";

function* WorkoutLogSaga() {
  yield takeLatest(`GET_WORKOUT_TABLE`, ViewWorkoutLog);
  yield takeLatest("ADD_TABLE_INFO", AddTableInfo);
}

function* ViewWorkoutLog(action) {
  try {
    const response = yield axios.get(`/api/logs/${action.payload}`);
    console.log("this is response for WORKOUTLOG GET", response);

    // yield put({ type: "ADD_EXERCISE", payload: response.data });
  } catch (error) {
    console.log("error on fetchTemplate line 16", error);
  }
}
function* AddTableInfo(action) {
  try {
    const response = yield axios.post(`/api/logs`, action.payload);

    yield put({ type: "GET_WORKOUT_TABLE", payload: response.data });
    console.log("THIS IS PAYLOAD:RESPONSE.DATA", payload.response.data);
  } catch (error) {
    console.log("ERROR IN ADDEXERCISE SAGA", error);
  }
}

export default WorkoutLogSaga;
