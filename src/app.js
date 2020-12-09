require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const GlucoseLogsService = require('./glucose-logs-service');
const logger = require('./logger');
const MedsLogsService = require('./meds-logs-service');
const MealsLogsService = require('./meals-logs-service');
const usersRouter = require('./users/users-router');
const app = express();

const bodyParser = express.json();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(bodyParser);
app.use(helmet());
app.use(cors());

app.use(usersRouter);

app.get('/', (req, res) => {
  res.status(200).send('Hello, sugar-track-api!');
});

/*
app.get('/users', (req, res, next) => {
  const knexInstance = req.app.get('db');
  UsersService.getAllUsers(knexInstance)
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});
*/

/*
app.post('/users', (req, res, next) => {
  const knexInstance = req.app.get('db');
  const newUser = req.body;
  const { fullname, username, password } = newUser;
  if (!fullname) {
    logger.error('Fullname is required');
    return res.status(400).send('Invalid data');
  }
  if (!username) {
    logger.error('Username is required');
    return res.status(400).send('Invalid data');
  }
  if (!password) {
    logger.error('Password is required');
    return res.status(400).send('Invalid data');
  }
  UsersService.addNewUser(knexInstance, newUser)
    .then((newUser) => res.status(201).json(newUser))
    .catch(next);
});
*/
/*
app.get('/users/:username', (req, res, next) => {
  const knexInstance = req.app.get('db');
  const username = req.params.username;

  UsersService.getUserByUsername(knexInstance, username)
    .then((user) => {
      if (!user.length) {
        logger.error(`User with username ${username} not found`);
        return res.status(404).send('User not found');
      }
      res.json(user);
    })
    .catch(next);
});
*/
/*
app.get('/glucose_logs/:user_id', (req, res, next) => {
  const knexInstance = req.app.get('db');

  const userId = req.params.user_id;
  GlucoseLogsService.getGlucoseLogsByUserId(knexInstance, userId)
    .then((glucoseLogs) => {
      if (!glucoseLogs.length) {
        logger.error(`Glucose log for user id ${userId} does not exist`);
        return res.status(404).send('Glucose log not found');
      }
      res.json(glucoseLogs);
    })
    .catch(next);
});
*/

app.post('/glucose_logs', (req, res, next) => {
  const knexInstance = req.app.get('db');
  const newGlucoseLog = req.body;
  if (!newGlucoseLog.user_id) {
    logger.error('User id is required');
    return res.status(400).send('Invalid data');
  }
  if (!newGlucoseLog.date_time) {
    logger.error('Date-time is required');
    return res.status(400).send('Invalid data');
  }
  if (!newGlucoseLog.glucose) {
    logger.error('Glucose is required');
    return res.status(400).send('Invalid data');
  }
  GlucoseLogsService.insertGlucoseLog(knexInstance, newGlucoseLog)
    .then((glucoseLog) => res.json(glucoseLog))
    .catch(next);
});

app.post('/meds_logs', (req, res, next) => {
  const knexInstance = req.app.get('db');
  const newMedLog = req.body;
  if (!newMedLog.user_id) {
    logger.error('User id is required');
    return res.status(400).send('Invalid data');
  }
  if (!newMedLog.date_time) {
    logger.error('Date-time is required');
    return res.status(400).send('Invalid data');
  }
  if (!newMedLog.meds) {
    logger.error('Meds is required');
    return res.status(400).send('Invalid data');
  }
  MedsLogsService.insertMedLog(knexInstance, newMedLog)
    .then((medLog) => res.json(medLog))
    .catch(next);
});

app.post('/meals_logs', (req, res, next) => {
  const knexInstance = req.app.get('db');
  const newMealsLog = req.body;
  if (!newMealsLog.user_id) {
    logger.error('User id is required');
    return res.status(400).send('Invalid data');
  }
  if (!newMealsLog.date_time) {
    logger.error('Date-time is required');
    return res.status(400).send('Invalid data');
  }
  if (!newMealsLog.meals) {
    logger.error('Meals is required');
    return res.status(400).send('Invalid data');
  }
  MealsLogsService.insertMealsLog(knexInstance, newMealsLog)
    .then((mealsLog) => res.json(mealsLog))
    .catch(next);
});

app.get('/glucose_logs', (req, res, next) => {
  const knexInstance = req.app.get('db');

  GlucoseLogsService.getGlucoseLogs(knexInstance)
    .then((glucoseLogs) => res.json(glucoseLogs))
    .catch(next);
});

app.get('/meals_logs', (req, res, next) => {
  const knexInstance = req.app.get('db');

  MealsLogsService.getMealsLogs(knexInstance)
    .then((mealsLogs) => res.json(mealsLogs))
    .catch(next);
});

/*
app.get('glucose_logs/:date_time', (req, res, next) => {
  const knexInstance = req.app.get('db');
  const dateTime = req.params.date_time;

  GlucoseLogsService.getGlucoseLogsByDateTime(knexInstance, dateTime)
    .then((glucoseLog) => {
      if (!glucoseLog.length) {
        logger.error(`Glucose log for date-time ${dateTime} does not exist`);
        return res.status(404).send('Glucose log not found');
      }
      res.json(glucoseLog);
    })
    .catch(next);
});
*/

app.delete('/glucose_logs/:id', (req, res, next) => {
  const knexInstance = req.app.get('db');
  const { id } = req.params;
  GlucoseLogsService.deleteGlucoseLogById(knexInstance, id)
    .then((glucoseLog) => {
      if (!glucoseLog.length) {
        logger.error(`Glucose log with id ${id} not found`);
        return res.status(404).send('Glucose log not found');
      }
      return res.status(204).end();
    })
    .catch(next);
});

app.delete('/meds_logs/:id', (req, res, next) => {
  const knexInstance = req.app.get('db');
  const { id } = req.params;

  MedsLogsService.deleteMedsLogsById(knexInstance, id)
    .then((medsLog) => {
      if (!medsLog.length) {
        logger.error(`Meds log with id ${id} not found`);
        return res.status(404).send('Meds log not found');
      }
      return res.status(204).end();
    })
    .catch(next);
});

app.delete('/meals_logs/:id', (req, res, next) => {
  const knexInstance = req.app.get('db');
  const { id } = req.params;

  MealsLogsService.deleteMealsLogsById(knexInstance, id)
    .then((mealsLog) => {
      if (!mealsLog.length) {
        logger.error(`Meals log with id ${id} does not exist`);
        return res.status(404).send('Meals log not found');
      }
      return res.status(204).end();
    })
    .catch(next);
});

app.patch('/glucose_logs/:user_id/:id', (req, res, next) => {
  const knexInstance = req.app.get('db');
  const { id } = req.params;
  const glucose = req.body.glucose;
  const dateTime = req.body.date_time;
  const newGlucoseLog = {
    glucose,
    date_time: dateTime,
  };
  if (!glucose && !dateTime) {
    logger.error(
      'At least one of "glucose" or "date_time" required to edit log.'
    );
    return res.status(404).send('Invalid data');
  }
  GlucoseLogsService.updateGlucoseLog(knexInstance, id, newGlucoseLog)
    .then((updatedGlucoseLog) => res.send(updatedGlucoseLog))
    .catch(next);
});

app.patch('/meals_logs/:user_id/:id', (req, res, next) => {
  const knexInstance = req.app.get('db');
  const { id } = req.params;
  const meals = req.body.meals;
  const dateTime = req.body.date_time;
  const newMealLog = {
    meals,
    date_time: dateTime,
  };
  if (!meals && !dateTime) {
    logger.error('At least one of "meals" or "date_time" required to edit log');
    return res.status(404).send('Invalid data');
  }
  MealsLogsService.updateMealsLog(knexInstance, id, newMealLog)
    .then((updatedMealLog) => res.send(updatedMealLog))
    .catch(next);
});

app.patch('/meds_logs/:user_id/:id', (req, res, next) => {
  const knexInstance = req.app.get('db');
  const { id } = req.params;
  const meds = req.body.meds;
  const dateTime = req.body.date_time;
  const newMedLog = {
    meds,
    date_time: dateTime,
  };
  if (!meds && !dateTime) {
    logger.error('At least one of "meds" or "date_time" required to edit log');
    return res.status(404).send('Invalid data');
  }
  MedsLogsService.updateMedsLog(knexInstance, id, newMedLog)
    .then((updatedMedLog) => res.send(updatedMedLog))
    .catch(next);
});

app.get('/meds_logs', (req, res, next) => {
  const knexInstance = req.app.get('db');

  MedsLogsService.getMedsLogs(knexInstance)
    .then((medsLogs) => res.json(medsLogs))
    .catch(next);
});

/*
app.get('/meals_logs/:userId', (req, res, next) => {
  const knexInstance = req.app.get('db');
const { userId } = req.params

  MealsLogsService.getMealsLogsByUserId(knexInstance, userId)
    .then((mealsLogs) => res.json(mealsLogs))
    .catch(next);
});

app.get('/meds_logs/:user_id', (req, res, next) => {
  const knexInstance = req.app.get('db');
  const { user_id } = req.params;

  MedsLogsService.getMedsLogsByUserId(knexInstance, user_id)
    .then((medsLogs) => res.json(medsLogs))
    .catch(next);
});
*/

app.get('/logs/:userId', (req, res, next) => {
  const knexInstance = req.app.get('db');
  const { userId } = req.params;
  const logs = [];
  GlucoseLogsService.getGlucoseLogsByUserId(knexInstance, userId)
    .then((glucoseLogs) => {
      logs.push(...glucoseLogs);
      MealsLogsService.getMealsLogsByUserId(knexInstance, userId).then(
        (mealsLogs) => {
          logs.push(...mealsLogs);
          MedsLogsService.getMedsLogsByUserId(knexInstance, userId).then(
            (medsLogs) => {
              logs.push(...medsLogs);
              logs.sort((a, b) => {
                if (a.date_time < b.date_time) {
                  return -1;
                } else {
                  return 1;
                }
              });
              if (!logs.length) {
                logger.error(`Logs for user id ${userId} do not exist`);
                return res.status(404).send('Logs not found');
              }
              res.json(logs);
            }
          );
        }
      );
    })
    .catch(next);
});

app.use(
  (errorHandler = (error, req, res, next) => {
    let response;
    if (NODE_ENV === 'production') {
      response = { error: { message: 'server error' } };
    } else {
      console.error(error);
      response = { message: error.message, error };
    }
    res.status(500).json(response);
  })
);

module.exports = app;
