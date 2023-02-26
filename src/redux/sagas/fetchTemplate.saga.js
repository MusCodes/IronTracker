import axios from "axios";
import {put,takeLatest} from "redux-saga/effects"

function* fetchTemplate(){
    try {
        const response= yield axios.get(`/api/workouts/workout_template/`);
        console.log("THIS IS RESPONSE FOR TEMPLATE",response);
        yield put({ type: `SET_TEMPLATE`, payload:response.data});
        // yield action.payload.history.push(`/test/${response.data.id}`) 
    } catch(error){
        console.log("ERROR IN FETCH TEMPLATE SAGA", error);
    }
} function* fetchTemplateSaga(){
    yield takeLatest("FETCH_TEMPLATE",fetchTemplate)
}
export default fetchTemplateSaga