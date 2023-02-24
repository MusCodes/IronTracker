import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';


function * addExercise(action){
    try {
        const response= yield axios.post('/api/user/user_exercise',action.payload)
        
        yield put ({type:"ADD_EXERCISE", payload:response.data})
    } catch (error){
        console.log("ERROR IN FETCHEXERCISE SAGA", error);
    }
}function* watchAddExercise() {
    yield takeLatest("ADD_EXERCISE_REQUEST", addExercise);
  }

export default watchAddExercise