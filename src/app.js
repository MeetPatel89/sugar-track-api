require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { CLIENT_ORIGIN } = require('./config');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const usersRouter = require('./users/users-router');
const glucoseLogsRouter = require('./glucose-logs/glucose-logs-router');
const mealsLogsRouter = require('./meals-logs/meals-logs-router');
const medsLogsRouter = require('./meds-logs/meds-logs-router');
const logsRouter = require('./logs/logs-router');

const app = express();
const bodyParser = express.json();
const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(bodyParser);
app.use(helmet());
app.use(cors());

app.use(usersRouter);
app.use(glucoseLogsRouter);
app.use(mealsLogsRouter);
app.use(medsLogsRouter);
app.use(logsRouter);

app.get('/', (req, res) => {
  res.status(200);
  res.send(
    'Hello, the backend works. It is the database which is problematic!'
  );
});

/*
const errorHandler = (error, req, res, next) => {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    response = { message: error.message, error };
  }
  res.status(500).json(response);
  next();
};

app.use(errorHandler);
*/
module.exports = app;
