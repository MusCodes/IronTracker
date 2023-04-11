import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';

import addExercise from './addExerciseReducer';
import fetchExercise from './fetchExercise.reducer';
// import watchAddExercise from './DeleteExercise.reducer';
import fetchTemplate from './fetchTemplate.reducer';
import template from './refactorTemplate.Reducer';
import currentTemplate from './CurrentTemplate';
import workoutTime from './workoutTime';
import log from './Workout_log.reducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  addExercise,
  fetchExercise,
  //watchAddExercise,
  fetchTemplate,
  template,
  currentTemplate,
  workoutTime,
  log,
  
  // deleteExercise,
  
  

  
});

export default rootReducer;
