const express = require('express');
const logger = require('../logger');
const MedsLogsService = require('../meds-logs-service');

const medsLogsRouter = express.Router();
const bodyParser = express.json();

medsLogsRouter
  .route('/meds_logs')
  .get((req, res, next) => {
      const knexInstance = req.app.get('db');

      MedsLogsService.getMedsLogs(knexInstance)
        .then((medsLogs) => res.json(medsLogs))
        .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
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

medsLogsRouter
  .route('/meds_logs/:id')
  .delete((req, res, next) => {
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
  })
  .patch(bodyParser, (req, res, next) => {
      const knexInstance = req.app.get('db');
      const { id } = req.params;
      const meds = req.body.meds;
      const dateTime = req.body.date_time;
      const newMedLog = {
        meds,
        date_time: dateTime,
      };
      if (!meds && !dateTime) {
        logger.error(
          'At least one of "meds" or "date_time" required to edit log'
        );
        return res.status(404).send('Invalid data');
      }
      MedsLogsService.updateMedsLog(knexInstance, id, newMedLog)
        .then((updatedMedLog) => res.send(updatedMedLog))
        .catch(next);
  });

module.exports = medsLogsRouter;