# Sugar-Track (Server)
App Live at https://sugar-track-client.vercel.app

Backend server hosted at https://stark-tor-92394.herokuapp.com/
### Table of Contents
- [Description](#description)
- [API endpoints](#api-endpoints)
- [Tech stack](#tech-stack)

## Description

This is the backend server sustaining the live frontend app linked above.

## API endpoints

- For glucose logs:
    - GET /api/glucose_logs responds with all the glucose logs
    - GET /api/glucose_logs:id responds with the glucose log specified by id
    - POST /api/glucose_logs creates a new glucose log
    - DELETE /api/glucose_logs/:id deletes the glucose log specified by id
    - PATCH /api/glucose_logs/:id edits the glucose log specified by id

- For meals logs:
    - GET /api/meals_logs responds with all the meals logs
    - GET /api/meals_logs:id responds with the meals log specified by id
    - POST /api/meals_logs creates a new meals log
    - DELETE /api/meals_logs/:id deletes the meals log specified by id
    - PATCH /api/meals_logs/:id edits the meals log specified by id

- For medications logs:
    - GET /api/meds_logs responds with all the meds logs
    - GET /api/meds_logs:id responds with the meds log specified by id
    - POST /api/meds_logs creates a new meds log
    - DELETE /api/meds_logs/:id deletes the meds log specified by id
    - PATCH /api/meds_logs/:id edits the meds log specified by id

## Tech stack

- JS/ES6
- Node.js
- Express.js
- Knex
- PostgreSQL
- CORS
- Helmet