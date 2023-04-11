import axios from "axios";

import { put, select, takeLatest } from "redux-saga/effects";




function* viewTemplateSaga(){
    yield takeLatest(`GET_EXERCISE_TABLE`, viewExerciseTemplate)
    yield takeLatest(`SUBMIT_NEW_TEMPLATE`, newTemplate)
    yield takeLatest(`DELETE_TEMPLATE`, deleteTemplate)
}

function* viewExerciseTemplate(){
    try{
        const response= yield axios.get(`/api/templates/`)
        console.log("THIS IS XXXX RESPONSE", response)
        console.log("this is response.data.exercises",response.data.id);
        yield put({type: "v2SET_TEMPLATE", payload:response.data})
    }catch(error){
        console.log("error on fetchTemplate line 16",error)
    }
    
}

function* newTemplate(action) {
    try {
      const user = yield select(store => store.user);
      const response = yield axios.post('/api/templates/', { name: action.payload.name, user_id: user.id });
      console.log('THIS IS RESPONSE FOR SUBMITTEMPLATE', response);
      yield put({type:"GET_EXERCISE_TABLE"})
      //yield action.payload.history.push(`/exercises/${response.data}`)
    } catch (error) {
      console.log('ERROR ON LINE 18', error);
    }
  }
  
  function* deleteTemplate(action) {
    try {
      
      yield axios.delete(`/api/templates/${Number(action.payload)}`);
      yield put({
        type: "GET_EXERCISE_TABLE"
      });
    } catch (error) {
      console.log("Error in deleting an template", error);
    }
  }
export default viewTemplateSaga