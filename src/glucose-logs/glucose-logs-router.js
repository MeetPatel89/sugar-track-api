/* eslint-disable prefer-destructuring */
const express = require('express');
const logger = require('../logger');
const GlucoseLogsService = require('../glucose-logs-service');

const glucoseLogsRouter = express.Router();
const bodyParser = express.json();

glucoseLogsRouter
  .route('/glucose_logs')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');

    GlucoseLogsService.getGlucoseLogs(knexInstance)
      .then((glucoseLogs) => res.json(glucoseLogs))
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
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
    return GlucoseLogsService.insertGlucoseLog(knexInstance, newGlucoseLog)
      .then((glucoseLog) => res.json(glucoseLog))
      .catch(next);
  });

glucoseLogsRouter
  .route('/glucose_logs/:id')
  .delete((req, res, next) => {
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
  })
  .patch(bodyParser, (req, res, next) => {
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
    return GlucoseLogsService.updateGlucoseLog(knexInstance, id, newGlucoseLog)
      .then((updatedGlucoseLog) => res.send(updatedGlucoseLog))
      .catch(next);
  });

module.exports = glucoseLogsRouter;
