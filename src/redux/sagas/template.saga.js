import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* TemplateSaga() {
    yield takeLatest("SUBMIT_TEMPLATE", SubmitTemplate)
    yield takeLatest("FETCH_TEMPLATE", FetchTemplate)
 
}

function* FetchTemplate(){
    try{
        const response= yield axios.get(`/api/workouts/workout_template/${id}`)
       
        console.log("for fetch",response);

    }catch(error){
        console.log("error on fetchTemplate line 16",error)
    }
}

function* SubmitTemplate(action){
    try{
        const response= yield axios.post("/api/workouts/workout_template",{template_name:action.payload.name})
        console.log("THIS IS RESPONSE FOR SUBMITTEMPLATE",response)
      yield action.payload.history.push(`/test/${response.data.id}`) 

    } catch (error ){
        console.log ("ERROR ON LINE 18", error)
    }

}

export default TemplateSaga;
