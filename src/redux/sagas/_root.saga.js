import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import TemplateSaga from './template.saga';
import fetchExerciseDataSaga from './fetchExercise.saga';
import watchAddExercise from './addExercise.saga';

import fetchTemplateSaga from './fetchTemplate.saga';
import templateSaga from './UpdateTemplateName.saga';
import viewTemplateSaga from './refactorTemplate.saga';
import addExerciseSaga from './exercise.saga';
import watchDeleteExercise from './refactorDeleteExercise.saga';
import watchDeleteExerciseRow from './deleteExercise.saga';
import fetchLogSaga from './workout_log.saga';
import WorkoutLogSaga from './fetchWorkout_log.saga';
import fetchTimeSaga from './workoutTime.saga';
// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    TemplateSaga(),
    fetchExerciseDataSaga(),
    watchAddExercise(),
   fetchLogSaga(),
    fetchTemplateSaga(),
    
    viewTemplateSaga(),
    addExerciseSaga(),
    watchDeleteExercise(),
    WorkoutLogSaga(),
    fetchTimeSaga(),
    templateSaga(),
    watchDeleteExerciseRow(),
    
  ]);
}
