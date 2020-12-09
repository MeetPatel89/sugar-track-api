const express = require('express');
const logger = require('../logger');
const GlucoseLogsService = require('../glucose-logs-service');
const MealsLogsService = require('../meals-logs-service');
const MedsLogsService = require('../meds-logs-service');

const logsRouter = express.Router();

logsRouter
    .route('/logs/:userId')
    .get((req, res, next) => {
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
    })

module.exports = logsRouter;