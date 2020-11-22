require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const UsersService = require('./users-service');

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
