require('dotenv').config();
const knex = require('knex');
const UsersService = require('./users-service');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL 
})

const newUserFields = {
    fullname: 'Logarithmic Spiral',
    username: 'logarithmic89',
    password: 'RandomLogarithmic12#'
}

UsersService
    .updateUser(knexInstance, 7, newUserFields)
    .then(updatedUser => console.log(updatedUser));
    



