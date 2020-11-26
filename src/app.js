require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const UsersService = require('./users-service');
const GlucoseLogsService = require('./glucose-logs-service');
const MedsLogsService = require('./meds-logs-service');

const app = express();

const bodyParser = express.json();

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption));
app.use(bodyParser);
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, sugar-track-api!');
});

app.get('/users', (req, res, next) => {
    const knexInstance = req.app.get('db');
    UsersService
        .getAllUsers(knexInstance)
        .then(users => {
            res.json(users);
        })
        .catch(next);
});

app.post('/users', (req, res, next) => {
    const knexInstance = req.app.get('db')
    const newUser = req.body;

    UsersService
        .addNewUser(knexInstance, newUser)
        .then(newUser => res.json(newUser))
        .catch(next);
});

app.get('/users/:username', (req, res, next) => {
    const knexInstance = req.app.get('db');
    const username = req.params.username;

    UsersService
        .getUserByUsername(knexInstance, username)
        .then(user => res.json(user))
        .catch(next);
        

})

app.post('/glucose_logs', (req, res, next) => {
    const knexInstance = req.app.get('db');
    const newGlucoseLog = req.body;
    
    GlucoseLogsService
        .insertGlucoseLog(knexInstance, newGlucoseLog)
        .then(glucoseLog => res.json(glucoseLog))
        .catch(next);


})

app.post('/meds_logs', (req, res, next) => {
    const knexInstance = req.app.get('db');
    const newMedLog = req.body;

    MedsLogsService
        .insertMedLog(knexInstance, newMedLog)
        .then(medLog => res.json(medLog))
        .catch(next)
})

app.get('/glucose_logs', (req, res, next) => {
    const knexInstance = req.app.get('db')
    
    
        GlucoseLogsService
            .getGlucoseLogs(knexInstance)
            .then(glucoseLogs =>  res.json(glucoseLogs)
            
                
            )
            .catch(next)
    
})

app.get('glucose_logs/:date_time', (req, res, next) => {
    
    const knexInstance = req.app.get('db');
    const dateTime = req.params.date_time;

    GlucoseLogsService
        .getGlucoseLogsByDateTime(knexInstance, dateTime)
        .then(glucoseLog => res.json(glucoseLog))
        .catch(next)
})

app.get('/meds_logs', (req, res, next) => {
    const knexInstance = req.app.get('db');

    MedsLogsService
        .getMedsLogs(knexInstance)
        .then(medsLogs => res.json(medsLogs))
        .catch(next)
})

app.get('/meds_logs/:user_id', (req, res, next) => {
    const knexInstance = req.app.get('db');
    const { user_id } = req.params;
    
    MedsLogsService
        .getMedsLogsByUserId(knexInstance, user_id)
        .then(medsLogs => res.json(medsLogs))
        .catch(next)
})

app.use(errorHandler = (error, req, res, next) => {
    let response;
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error'}};
    } else {
        console.error(error);
        response = { message: error.message, error }
    }
    res.status(500).json(response);

})

module.exports = app;
