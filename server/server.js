const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const workoutRouter= require('./routes/template.router')
const workoutRouterV2= require(`./routes/template.v2.router`)
const exercisesRouter= require(`./routes/exercises.router`)
const workoutsRouter= require(`./routes/workouts.router`)
const workoutLogRouter= require(`./routes/workout_logs.router`)

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
// app.use(`/api/workouts`, workoutRouter); // deprecated
app.use(`/api/templates`,workoutRouterV2);
app.use(`/api/workout_time`,workoutsRouter); // could rename to just /api/workout
app.use(`/api/exercises`,exercisesRouter);
app.use(`/api/logs`,workoutLogRouter)


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
