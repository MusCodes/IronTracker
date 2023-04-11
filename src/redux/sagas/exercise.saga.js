import axios from "axios";
import { takeLatest } from "redux-saga/effects";


function* addExercise(action) {
    try {
     
      const response = yield axios.post(`/api/exercises/${action.payload.template_id}`, { name: action.payload.name});
      console.log('THIS IS RESPONSE FOR EXERCISES', response);
      //yield put({type:"GET_EXERCISE_TABLE"})
      //yield action.payload.history.push(`/exercises/${response.data}`)
    } catch (error) {
      console.log('ERROR ON LINE 18', error);
    }

  }

  function* addExerciseSaga(){
    yield takeLatest("ADD_EXERCISES", addExercise)
  }
  export default addExerciseSaga