require('dotenv').config()
const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL  
});

knexInstance
    .from('users')
    .select('*')
    .then(users => console.log(users));

knexInstance
    .from('glucose_logs')
    .select('*')
    .then(glucose_logs => console.log(glucose_logs));

knexInstance
    .from('meals_logs')
    .select('*')
    .then(meals_logs => console.log(meals_logs));

knexInstance
    .from('meds_logs')
    .select('*')
    .then(meds_logs => console.log(meds_logs));
