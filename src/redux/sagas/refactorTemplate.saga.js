import axios from "axios";

import { put, select, takeLatest } from "redux-saga/effects";

function* viewTemplateSaga() {
  yield takeLatest(`GET_EXERCISE_TABLE`, viewExerciseTemplate);
  yield takeLatest(`SUBMIT_NEW_TEMPLATE`, newTemplate);
  yield takeLatest(`DELETE_TEMPLATE`, deleteTemplate);
  yield takeLatest(`DEFAULT_TEMPLATE`, defaultTemplate)
}

function* viewExerciseTemplate() {
  try {
    const response = yield axios.get(`/api/templates/`);
    
    console.log("this is response.data.exercises", response.data.id);
    yield put({ type: "v2SET_TEMPLATE", payload: response.data });
  } catch (error) {
    console.log("error on fetchTemplate line 16", error);
  }
}

function* newTemplate(action) {
  try {
    // were importing user from the redux store to grab the id and send it in the post request.
    const user = yield select((store) => store.user);
    const response = yield axios.post("/api/templates/", {
      name: action.payload.name,
      user_id: user.id,
    });
    console.log("THIS IS RESPONSE FOR SUBMITTEMPLATE", response);
    yield put({ type: "GET_EXERCISE_TABLE" });
  } catch (error) {
    console.log("ERROR ON LINE 18", error);
  }
}

// this saga is for default template
function* defaultTemplate(action) {
  try {
    // were importing user from the redux store to grab the id and send it in the post request.
    const user = yield select((store) => store.user);
    const response = yield axios.post("/api/templates/default/", {
      name: action.payload.name,
      user_id: user.id,
      id: action.payload.templateId,
    });
    console.log("THIS IS RESPONSE FOR SUBMITTEMPLATE", response);
    yield put({ type: "GET_EXERCISE_TABLE" });
  } catch (error) {
    console.log("ERROR ON LINE 18", error);
  }
}

function* deleteTemplate(action) {
  try {
    yield axios.delete(`/api/templates/${Number(action.payload)}`);
    yield put({
      type: "GET_EXERCISE_TABLE",
    });
  } catch (error) {
    console.log("Error in deleting an template", error);
  }
}
export default viewTemplateSaga;
