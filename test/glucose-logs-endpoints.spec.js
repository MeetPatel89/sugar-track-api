const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { makeUsersArray } = require('./users.fixtures');
const { makeGlucoseLogsArray } = require('./glucose-logs.fixtures');

describe('Glucose Logs Endpoints', () => {
    let db;

    before('make knex instance', () => {
      db = knex({
        client: 'pg',
        connection: process.env.TEST_DATABASE_URL,
      });
      app.set('db', db);
    });

    after('disconnect from database', () => db.destroy());

    before('clean the users table', () => db('users').delete());
    before('clean the table', () => db('glucose_logs').delete());

    context('Given there are glucose logs in the database', () => {
        const testGlucoseLogs = makeGlucoseLogsArray();
        const testUsers = makeUsersArray();

        beforeEach('insert users', () => {
          return db.into('users').insert(testUsers);
        });

        beforeEach('insert glucose logs', () => {
          return db.into('glucose_logs').insert(testGlucoseLogs);
        });

        afterEach('cleanup', () => db('users').delete());

        afterEach('cleanup', () => db('glucose_logs').delete());
        

        describe('GET /api/glucose_logs', () => {
          it('GET /api/glucose_logs responds with 200 and all of the glucose logs', () => {
            return supertest(app).get('/api/glucose_logs').expect(200);
          });
        });

        describe('POST /api/glucose_logs', () => {
            it('POST /api/glucose_logs creates a new glucose_log, responding with 201 and the newly created glucose_log', () => {
                
                const newGlucoseLog = {
                  glucose: 250,
                  user_id: 2,
                  date_time: '2020-12-08T01:59:00.000Z',
                };
                return supertest(app)
                    .post('/api/glucose_logs')
                    .send(newGlucoseLog)
                    .expect(201)
                    .expect(res => {
                        expect(res.body[0].glucose).to.eql(newGlucoseLog.glucose)
                        expect(res.body[0].user_id).to.eql(newGlucoseLog.user_id)
                        expect(res.body[0].date_time).to.eql(newGlucoseLog.date_time)
                        expect(res.body[0]).to.have.property('id')
                        expect(res.headers.location).to.eql(`/api/glucose_logs/${res.body[0].id}`)
                    })
              }
            );
        })

        describe('GET /api/glucose_logs/:id', () => {
            it('GET /api/glucose_logs/:id responds with 200 and the glucose log specified by id', () => {
                const idToGet = 3;
                const specifiedGlucoseLog = testGlucoseLogs.filter(glucoseLog => glucoseLog.id === idToGet);
                return supertest(app)
                        .get(`/api/glucose_logs/${idToGet}`)
                        .expect(200)
                        .then(res => {
                            expect(res.body).to.eql(specifiedGlucoseLog)
                        })
            })
        })

        describe('DELETE /api/glucose_logs/:id', () => {
            it('DELETE /api/glucose_logs/:id responds with 204 and removes the glucose log', () => {
                const idToRemove = 2;
                const remainingGlucoseLogs = testGlucoseLogs.filter(glucoseLog => glucoseLog.id !== idToRemove);
                return supertest(app)
                        .delete(`/api/glucose_logs/${idToRemove}`)
                        .expect(204)
                        .then(res => 
                            supertest(app)
                            .get('/api/glucose_logs')
                            .expect(remainingGlucoseLogs)
                            )

            })
        })

        describe('PATCH /api/glucose_logs/:id', () => {
            it('PATCH /api/glucose_logs/:id responds with 201 and the newly edited glucose log', () => {
                const idToEdit = 2;
                const editedGlucoseLogFields = {
                  glucose: 2000,
                  date_time: '2030-12-08T01:59:00.000Z',
                };
                return supertest(app)
                        .patch(`/api/glucose_logs/${idToEdit}`)
                        .send(editedGlucoseLogFields)
                        .expect(201)
                        .then(res => {
                            expect(res.body[0].glucose).to.eql(editedGlucoseLogFields.glucose);
                            expect(res.body[0].date_time).to.eql(editedGlucoseLogFields.date_time);
                            expect(res.body[0].id).to.eql(idToEdit)
                        })
            })
        })
        
    })
})