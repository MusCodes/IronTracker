import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';

function* deleteExerciseSaga(action) {
  try {
    console.log("this is acitionid", action.payload);
     yield axios.delete(`/api/exercises/${action.payload}`);

   yield put({type: `GET_EXERCISE_TABLE`})
  } catch (error) {
    console.log("Error in deleting exercise:", error);
  }
}

 function* watchDeleteExercise() {
  yield takeLatest("DELETE_EXERCISE", deleteExerciseSaga);
}
export default watchDeleteExercise