import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* editTemplateName(action) {
  try {
    const { id, name } = action.payload;
    yield axios.put(`/api/templates/`, { id, name });
    yield put({ type: "EDIT_TEMPLATE_NAME_SUCCESS", payload: { id, name }  });
  } catch (error) {
    console.log("Error in updating Workout Template line 122", error);
    yield put({ type: "EDIT_TEMPLATE_NAME_ERROR" });
  }
}

function* templateSaga() {
  yield takeLatest("EDIT_TEMPLATE_NAME", editTemplateName);
}

export default templateSaga;
