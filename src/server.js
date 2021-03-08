const knex = require('knex');
const app = require('./app');
const pg = require('pg');
const { PORT, DATABASE_URL, API_BASE_URL } = require('./config');
pg.defaults.ssl = process.env.NODE_ENV === 'production';

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
});

app.set('db', db);

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
