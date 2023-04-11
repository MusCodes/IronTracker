import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* deleteExerciseRow(action) {
  try {
    yield axios.delete(`/api/logs/${action.payload}`);

    yield put({
      type: "FETCH_TIME",
      payload: action.payload,
    });
  } catch (error) {
    console.log("Error in deleting exercise:", error);
  }
}
function* updateExerciseRow(action) {
  try {
    yield axios.put(`/api/logs/${action.payload.id}`, action.payload);
    yield put({
      type: "FETCH_TIME",
    });
  } catch (error) {
    console.log("Error in deleting exercise:", error);
  }
}
function* watchDeleteExerciseRow() {
  yield takeLatest("DELETE_WORKOUT_EXERCISE", deleteExerciseRow);
  yield takeLatest("UPDATE_WORKOUT_EXERCISE", updateExerciseRow);
}
export default watchDeleteExerciseRow;
