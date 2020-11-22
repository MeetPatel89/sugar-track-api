require('dotenv').config();
const knex = require('knex');
const UsersService = require('./users-service');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL 
})






