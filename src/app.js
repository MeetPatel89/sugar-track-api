require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const UsersService = require('./users-service');
const GlucoseLogsService = require('./glucose-logs-service');

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
    res.status(201)
        .send('Post newGlucose')
    next();


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
