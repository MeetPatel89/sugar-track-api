const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { makeUsersArray } = require('./users.fixtures');
const { makeMealsLogsArray } = require('./meals-logs.fixtures');

describe('Meals Logs Endpoints', () => {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from database', () => db.destroy());

  before('clean the users table', () => db('users').delete());
  before('clean the meals_logs table', () => db('meals_logs').delete());

  context('Given there are meals logs in the database', () => {
    const testMealsLogs = makeMealsLogsArray();
    const testUsers = makeUsersArray();

    beforeEach('insert users', () => {
      return db.into('users').insert(testUsers);
    });

    beforeEach('insert meals logs', () => {
      return db.into('meals_logs').insert(testMealsLogs);
    });

    afterEach('cleanup', () => db('users').delete());
    afterEach('cleanup', () => db('meals_logs').delete());

    describe('GET /meals_logs', () => {
      it('GET /meals_logs responds with 200 and all of the meals logs', () => {
        return supertest(app).get('/meals_logs').expect(200);
      });
    });

    describe('POST /meals_logs', () => {
      it('POST /meals_logs creates a new meals_log, responding with 201 and the newly created meals log', () => {
        const newMealsLog = {
          meals: 'sandwich',
          user_id: 2,
          date_time: '2020-12-08T01:59:00.000Z',
        };
        return supertest(app)
          .post('/meals_logs')
          .send(newMealsLog)
          .expect(201)
          .expect((res) => {
            expect(res.body[0].meals).to.eql(newMealsLog.meals);
            expect(res.body[0].user_id).to.eql(newMealsLog.user_id);
            expect(res.body[0].date_time).to.eql(newMealsLog.date_time);
            expect(res.body[0]).to.have.property('id');
            expect(res.headers.location).to.eql(
              `/meals_logs/${res.body[0].id}`
            );
          });
      });
    });

    describe('GET /meals_logs/:id', () => {
      it('GET /meals_logs/:id responds with 200 and the meals log specified by id', () => {
        const idToGet = 3;
        const specifiedMealsLog = testMealsLogs.filter(
          (mealsLog) => mealsLog.id === idToGet
        );
        return supertest(app)
          .get(`/meals_logs/${idToGet}`)
          .expect(200)
          .then((res) => {
            expect(res.body).to.eql(specifiedMealsLog);
          });
      });
    });

    describe('DELETE /meals_logs/:id', () => {
      it('DELETE /meals_logs/:id responds with 204 and removes the meals log', () => {
        const idToRemove = 2;
        const remainingMealsLogs = testMealsLogs.filter(
          (mealsLog) => mealsLog.id !== idToRemove
        );
        return supertest(app)
          .delete(`/meals_logs/${idToRemove}`)
          .expect(204)
          .then((res) =>
            supertest(app).get('/meals_logs').expect(remainingMealsLogs)
          );
      });
    });

    describe('PATCH /meals_logs/:id', () => {
      it('PATCH /meals_logs/:id responds with 201 and the newly edited meals log', () => {
        const idToEdit = 2;
        const editedMealsLogFields = {
          meals: 'A very bland British food',
          date_time: '2030-12-08T01:59:00.000Z',
        };
        return supertest(app)
          .patch(`/meals_logs/${idToEdit}`)
          .send(editedMealsLogFields)
          .expect(201)
          .then((res) => {
            expect(res.body[0].meals).to.eql(editedMealsLogFields.meals);
            expect(res.body[0].date_time).to.eql(
              editedMealsLogFields.date_time
            );
            expect(res.body[0].id).to.eql(idToEdit);
          });
      });
    });


  });
});