const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { makeUsersArray } = require('./users.fixtures');
const { makeMedsLogsArray } = require('./meds-logs.fixtures');

describe('Meds Logs Endpoints', () => {
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
  before('clean the meds_logs table', () => db('meds_logs').delete());

  context('Given there are meds logs in the database', () => {
    const testMedsLogs = makeMedsLogsArray();
    const testUsers = makeUsersArray();

    beforeEach('insert users', () => {
      return db.into('users').insert(testUsers);
    });

    beforeEach('insert meds logs', () => {
      return db.into('meds_logs').insert(testMedsLogs);
    });

    afterEach('cleanup', () => {
      return db('users').delete();
    });
    afterEach('cleanup', () => {
      return db('meds_logs').delete();
    });

    describe('GET /meds_logs', () => {
      it('GET /meds_logs responds with 200 and all of the meds logs', () => {
        return supertest(app).get('/meds_logs').expect(200);
      });
    });

    describe('POST /meds_logs', () => {
      it('POST /meds_logs creates a new meds_log, responding with 201 and the newly created meds log', () => {
        const newMedsLog = {
          meds: 'insulin, metformin',
          user_id: 2,
          date_time: '2020-12-08T01:59:00.000Z',
        };
        return supertest(app)
          .post('/meds_logs')
          .send(newMedsLog)
          .expect(201)
          .expect((res) => {
            expect(res.body[0].meds).to.eql(newMedsLog.meds);
            expect(res.body[0].user_id).to.eql(newMedsLog.user_id);
            expect(res.body[0].date_time).to.eql(newMedsLog.date_time);
            expect(res.body[0]).to.have.property('id');
            expect(res.headers.location).to.eql(`/meds_logs/${res.body[0].id}`);
          });
      });
    });

    describe('GET /meds_logs/:id', () => {
      it('GET /meds_logs/:id responds with 200 and the meds log specified by id', () => {
        const idToGet = 3;
        const specifiedMedsLog = testMedsLogs.filter(
          (medsLog) => medsLog.id === idToGet
        );
        return supertest(app)
          .get(`/meds_logs/${idToGet}`)
          .expect(200)
          .then((res) => {
            expect(res.body).to.eql(specifiedMedsLog);
          });
      });
    });

    describe('DELETE /meds_logs/:id', () => {
      it('DELETE /meds_logs/:id responds with 204 and removes the meds log', () => {
        const idToRemove = 2;
        const remainingMedsLogs = testMedsLogs.filter(
          (medsLog) => medsLog.id !== idToRemove
        );
        return supertest(app)
          .delete(`/meds_logs/${idToRemove}`)
          .expect(204)
          .then((res) =>
            supertest(app).get('/meds_logs').expect(remainingMedsLogs)
          );
      });
    });

    describe('PATCH /meds_logs/:id', () => {
      it('PATCH /meds_logs/:id responds with 201 and the newly edited meds log', () => {
        const idToEdit = 2;
        const editedMedsLogFields = {
          meds: 'Pseudo-scientific quack medicine',
          date_time: '2030-12-08T01:59:00.000Z',
        };
        return supertest(app)
          .patch(`/meds_logs/${idToEdit}`)
          .send(editedMedsLogFields)
          .expect(201)
          .then((res) => {
            expect(res.body[0].meds).to.eql(editedMedsLogFields.meds);
            expect(res.body[0].date_time).to.eql(
              editedMedsLogFields.date_time
            );
            expect(res.body[0].id).to.eql(idToEdit);
          });
      });
    });
  });
});
