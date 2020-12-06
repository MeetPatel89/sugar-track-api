require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const UsersService = require('./users-service');
const GlucoseLogsService = require('./glucose-logs-service');
const logger = require('./logger')
const MedsLogsService = require('./meds-logs-service');
const MealsLogsService = require('./meals-logs-service');


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
        .then(newUser => res
                            .status(201)
                            .json(newUser))
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

app.get('/glucose_logs/:user_id', (req, res, next) => {
    const knexInstance = req.app.get('db');
    
    const { user_id } = req.params;
    GlucoseLogsService
        .getGlucoseLogsByUserId(knexInstance, user_id)
        .then(glucoseLogs => res.json(glucoseLogs))
        .catch(next)

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

app.post('/meals_logs', (req, res, next) => {
    const knexInstance = req.app.get('db');
    const newMealsLog = req.body;

    MealsLogsService
        .insertMealsLog(knexInstance, newMealsLog)
        .then(mealsLog => res.json(mealsLog))
        .catch(next);
        

})

app.get('/glucose_logs', (req, res, next) => {
    const knexInstance = req.app.get('db')
    
    
        GlucoseLogsService
            .getGlucoseLogs(knexInstance)
            .then(glucoseLogs =>  res.json(glucoseLogs)
            
                
            )
            .catch(next)
    
})

app.get('/meals_logs', (req, res, next) => {
    const knexInstance = req.app.get('db')

    MealsLogsService
        .getMealsLogs(knexInstance)
        .then(mealsLogs => res.json(mealsLogs))
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

app.delete('/glucose_logs/:id', (req, res, next) => {
    const knexInstance = req.app.get('db');
    const { id } = req.params;
    GlucoseLogsService
        .deleteGlucoseLogById(knexInstance, id)
        .then(() => res.status(204).end())
        .catch(next)
})

app.delete('/meds_logs/:id', (req, res, next) => {
    const knexInstance = req.app.get('db');
    const { id } = req.params;

    MedsLogsService
        .deleteMedsLogsById(knexInstance, id)
        .then(() => res.status(204).end())
        .catch(next)
        
})

app.delete('/meals_logs/:id', (req, res, next) => {
    const knexInstance = req.app.get('db');
    const { id } = req.params;

    MealsLogsService
        .deleteMealsLogsById(knexInstance, id)
        .then(() => res.status(204).end())
        .catch(next)
})

app.patch('/glucose_logs/:user_id/:id', (req, res, next) => {
    const knexInstance = req.app.get('db');
    const { id } = req.params;
    const { glucose, date_time } = req.body;
    console.log(req.body);
    const newGlucoseLog = {
        glucose,
        date_time
    }
    GlucoseLogsService
        .updateGlucoseLog(knexInstance, id, newGlucoseLog)
        .then(updatedGlucoseLog => res.send(updatedGlucoseLog))
        .catch(next)
    
    
})

app.patch('/meals_logs/:user_id/:id', (req, res, next) => {
    const knexInstance = req.app.get('db');
    const { id } = req.params;
    const { meals, date_time } = req.body;
    const newMealLog = {
        meals,
        date_time
    }
    MealsLogsService
        .updateMealsLog(knexInstance, id, newMealLog)
        .then(updatedMealLog => res.send(updatedMealLog))
        .catch(next)
})

app.patch('/meds_logs/:user_id/:id', (req, res, next) => {
    const knexInstance = req.app.get('db');
    const { id } = req.params;
    const { meds, date_time } = req.body;
    const newMedLog = {
        meds,
        date_time
    }
    MedsLogsService
        .updateMedsLog(knexInstance, id, newMedLog)
        .then(updatedMedLog => res.send(updatedMedLog))
        .catch(next)
})



app.get('/meds_logs', (req, res, next) => {
    const knexInstance = req.app.get('db');

    MedsLogsService
        .getMedsLogs(knexInstance)
        .then(medsLogs => res.json(medsLogs))
        .catch(next)
})
app.get('/meals_logs/:user_id', (req, res, next) => {
    const knexInstance = req.app.get('db');
    
    const { user_id } = req.params;

    MealsLogsService
        .getMealsLogsByUserId(knexInstance, user_id)
        .then(mealsLogs => res.json(mealsLogs))
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

app.get('/logs/:user_id', (req, res, next) => {
    const knexInstance = req.app.get('db');
    const { user_id } = req.params;
    const logs = []
    GlucoseLogsService
        .getGlucoseLogsByUserId(knexInstance, user_id)
        .then(glucoseLogs => {
            logs.push(...glucoseLogs);
            MealsLogsService
                .getMealsLogsByUserId(knexInstance, user_id)
                .then(mealsLogs => {
                    logs.push(...mealsLogs);
                    MedsLogsService
                        .getMedsLogsByUserId(knexInstance, user_id)
                        .then(medsLogs => {
                            logs.push(...medsLogs)
                            console.log(logs);
                            logs.sort((a, b) => {
                                if (a.date_time < b.date_time) {
                                    return -1
                                } else {
                                    return 1
                                }
                            })
                            res.json(logs)
                        })
                })
        })
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
