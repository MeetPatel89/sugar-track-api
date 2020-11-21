require('dotenv').config()
const knex = require('knex');
const { types } = require('pg');
const moment = require('moment');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL  
});

knexInstance
    .from('glucose_logs')
    .select('date')
    .then(dateArr => {
        const dates = dateArr.map(dateObj => dateObj.date.toLocaleDateString());
        console.log(dates);
    });


