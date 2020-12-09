const express = require('express');
const logger = require('../logger');
const MealsLogsService = require('../meals-logs-service');

const mealsLogsRouter = express.Router();
const bodyParser = express.json();

mealsLogsRouter
  .route('/meals_logs')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');

    MealsLogsService.getMealsLogs(knexInstance)
      .then((mealsLogs) => res.json(mealsLogs))
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
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

mealsLogsRouter
  .route('/meals_logs/:id')
  .delete((req, res, next) => {
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
  })
  .patch(bodyParser, (req, res, next) => {
      const knexInstance = req.app.get('db');
      const { id } = req.params;
      const meals = req.body.meals;
      const dateTime = req.body.date_time;
      const newMealLog = {
        meals,
        date_time: dateTime,
      };
      if (!meals && !dateTime) {
        logger.error(
          'At least one of "meals" or "date_time" required to edit log'
        );
        return res.status(404).send('Invalid data');
      }
      MealsLogsService.updateMealsLog(knexInstance, id, newMealLog)
        .then((updatedMealLog) => res.send(updatedMealLog))
        .catch(next);
  });

module.exports = mealsLogsRouter;
