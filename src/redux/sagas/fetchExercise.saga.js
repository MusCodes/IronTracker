import axios from 'axios';
import { put} from 'redux-saga/effects';

function * fetchExercise(){
    try {
        const response= yield axios.get('/api/user/user_exercise')
        console.log("this is response", response)
        yield put ({type:"SET_EXERCISE", payload:response.data})
    } catch (error){
        console.log("ERROR IN FETCHEXERCISE SAGA", error);
    }
}
function* fetchExerciseDataSaga() {
    yield takeLatest('FETCH_EXERCISE', fetchExercise)
  }
export default fetchExerciseDataSaga