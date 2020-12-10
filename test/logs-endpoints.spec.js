const { expect } = require('chai');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');
chai.use(deepEqualInAnyOrder);
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { makeUsersArray } = require('./users.fixtures');
const { makeGlucoseLogsArray } = require('./glucose-logs.fixtures');
const { makeMedsLogsArray } = require('./meds-logs.fixtures');
const { makeMealsLogsArray } = require('./meals-logs.fixtures');

describe('Logs Endpoints', () => {
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
    before('clean the glucose_logs table', () => db('glucose_logs').delete());
    before('clean the meals_logs table', () => db('meals_logs').delete());
    before('clean the meds_logs table', () => db('meds_logs').delete());

    context('Given there are glucose logs, meals logs and meds logs in the database', () => {
        const testUsers = makeUsersArray();
        const testGlucoseLogs = makeGlucoseLogsArray();
        const testMealsLogs = makeMealsLogsArray();
        const testMedsLogs = makeMedsLogsArray();

        beforeEach('insert users', () => {
          return db.into('users').insert(testUsers);
        });

        beforeEach('insert glucose logs', () => {
          return db.into('glucose_logs').insert(testGlucoseLogs);
        });

        beforeEach('insert meals logs', () => {
            return db.into('meals_logs').insert(testMealsLogs);
        });

        beforeEach('insert meds logs', () => {
            return db.into('meds_logs').insert(testMedsLogs);
        });


        afterEach('cleanup', () => db('users').delete());

        afterEach('cleanup', () => db('glucose_logs').delete());

        afterEach('cleanup', () => db('meals_logs').delete());

        afterEach('cleanup', () => db('meds_logs').delete());

        describe('GET /logs/:userId', () => {
            it('GET /logs/:userId responds with 200 and all of the logs of the specified userId', () => {
                const userIdRequest = 2;
                const expectedGlucoseLogs = testGlucoseLogs.filter(glucoseLog => glucoseLog.user_id === userIdRequest)
                const expectedMealsLogs = testMealsLogs.filter(mealsLog => mealsLog.user_id === userIdRequest)
                const expectedMedsLogs = testMedsLogs.filter(medsLog => medsLog.user_id === userIdRequest)
                const expectedLogs = expectedGlucoseLogs.concat(expectedMealsLogs).concat(expectedMedsLogs)
                return supertest(app)
                        .get(`/logs/${userIdRequest}`)
                        .expect(200)
                        .then(res => {
                            expect(res.body).to.deep.equalInAnyOrder(expectedLogs)
                        })
          });
        })
    })
})
