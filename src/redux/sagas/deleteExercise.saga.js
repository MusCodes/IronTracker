import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';

function* deleteExerciseSaga(action) {
  try {
     yield axios.delete(`/api/workouts/user_exercise/${action.payload}`);

    yield put({
      type: "FETCH_EXERCISE",
      //payload: action.payload,
    });
  } catch (error) {
    console.log("Error in deleting exercise:", error);
  }
}

 function* watchDeleteExercise() {
  yield takeLatest("DELETE_EXERCISE", deleteExerciseSaga);
}
export default watchDeleteExercise