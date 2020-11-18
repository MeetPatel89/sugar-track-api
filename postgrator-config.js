require('dotenv').config();

module.exports = {
    "migrationsdirectory": "migrations",
    "driver": "pg",
    "connectionString": process.env.DB_URL
}