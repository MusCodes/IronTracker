import axios from 'axios';
import { put, takeLatest} from 'redux-saga/effects';


function * addExercise(action){
    try {
        const response= yield axios.post('/api/workouts/user_exercise',action.payload)
        
        yield put ({type:"ADD_EXERCISE", payload:response.data})
        console.log("THIS IS PAYLOAD:RESPONSE.DATA", payload.response.data)
    } catch (error){
        console.log("ERROR IN ADDEXERCISE SAGA", error);
    }
}function* watchAddExercise() {
    yield takeLatest("ADD_EXERCISE_REQUEST", addExercise);
  }

export default watchAddExercise