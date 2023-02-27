import axios from "axios";
import {put,takeLatest} from "redux-saga/effects"


function* updateTemplate(action){
    try {
        const response= yield axios.put(`/api/workouts/workout_template/${action.payload.id}`,{template_name:action.payload.template_name});
        console.log("this is response",response);
        yield put({type: `SECOND_TEMPLATE`,payload: action.payload});
    } catch(error){
        console.log("ERROR IN UPDATE TEMPLATE SAGA", error)
    }
  
    }  function* updateTemplateSaga(){
        yield takeLatest("UPDATE_TEMPLATE", updateTemplate)
}

export default updateTemplateSaga;