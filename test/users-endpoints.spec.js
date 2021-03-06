const { expect } = require('chai');
const knex = require('knex');
const supertest = require('supertest');
const app = require('../src/app');
const { makeUsersArray } = require('./users.fixtures');

describe('Users Endpoints', () => {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from database', () => db.destroy());

  before('clean the table', () => db('users').delete());

  context('Given there are users in the database', () => {
    const testUsers = makeUsersArray();

    beforeEach('insert users', () => {
      return db.into('users').insert(testUsers);
    });

    afterEach('cleanup', () => db('users').delete());

    describe('GET /api/users', () => {
      it('GET /api/users responds with 200 and all of the users', () => {
        return supertest(app).get('/api/users').expect(200);
      });
    });

    describe('GET /api/users/:username', () => {
      it('GET /api/users/:username responds with 200 and the user specified by username', () => {
        const username = 'thirduser12';
        const expectedUser = testUsers.filter(
          (user) => user.username === username
        );
        return supertest(app)
          .get(`/api/users/${username}`)
          .expect(200, expectedUser);
      });
    });

    describe('POST /api/users', () => {
      it('POST /api/users creates a new user, responding with 201 and the newly created user', () => {
        
        const newUser = {
          fullname: 'Fifth User',
          username: 'fifthuser12',
          password: 'RandomFifthUser12',
        };
        return supertest(app)
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect((user) => {
            expect(user.body[0].fullname).to.eql(newUser.fullname);
            expect(user.body[0].username).to.eql(newUser.username);
            expect(user.body[0].password).to.eql(newUser.password);
            expect(user.body[0]).to.have.property('id');
            expect(user.headers.location).to.eql(`/api/users/${user.body[0].username}`)
          })
          .then((postUser) => {
            return supertest(app)
              .get(`/api/users/${postUser.body[0].username}`)
              .expect(postUser.body);
          });
      });
    });
  });
});
