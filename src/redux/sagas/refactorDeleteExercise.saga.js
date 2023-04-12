import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';

function* deleteExerciseSaga(action) {
  try {
    console.log("this is acitionid", action.payload);
    // The axios.delete() function sends a DELETE request to the specified URL with the given exercise ID
     yield axios.delete(`/api/exercises/${action.payload}`);

   yield put({type: `GET_EXERCISE_TABLE`})
  } catch (error) {
    console.log("Error in deleting exercise:", error);
  }
}

// This generator function listens for "DELETE_EXERCISE" actions and calls the deleteExerciseSaga() function
 function* watchDeleteExercise() {
  yield takeLatest("DELETE_EXERCISE", deleteExerciseSaga);
}
export default watchDeleteExercise