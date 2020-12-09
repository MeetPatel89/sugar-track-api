const UsersService = require('../src/users-service');
const knex = require('knex');
const { expect } = require('chai');

describe('Users Service Object', () => {
  let db;
  let testUsers = [
    {
      id: 1,
      fullname: 'First User',
      username: 'firstuser12',
      password: 'RandomFirstUser12',
    },
    {
      id: 2,
      fullname: 'Second User',
      username: 'seconduser12',
      password: 'RandomSecondUser12',
    },
    {
      id: 3,
      fullname: 'Third User',
      username: 'thirduser12',
      password: 'RandomThirdUser12',
    },
  ];

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });


  before(() => db('users').truncate());

  afterEach(() => db('users').truncate());

  after(() => db.destroy());

  describe('getAllUsers()', () => {
    context('Given "users" has data', () => {
        beforeEach(() => {
          return db.into('users').insert(testUsers);
        });

         it('getAllUsers() resolves all users from "users" table', () => {
           // test that UsersService.getAllUsers gets data from the table
           return UsersService.getAllUsers(db).then((actual) => {
             expect(actual).to.eql(testUsers);
           });
         });

         it('getUserByUsername() resolves a user by username from "users" table', () => {
           const thirdUserName = 'thirduser12';
           const thirdUser = testUsers.find(
             (user) => user.username === thirdUserName
           );
           return UsersService.getUserByUsername(db, thirdUserName).then(
             (actual) => {
               expect(actual).to.eql([thirdUser]);
             }
           );
         });
    })

    context('Given "users" has no data', () => {
        it('getAllUsers() resolves an empty array', () => {
            // test that UsersService.getAllUsers gets no data from the table
            return UsersService.getAllUsers(db).then(actual => {
                expect(actual).to.eql([])
            })
        })

        describe('addNewUser()', () => {
          it('addNewUser() inserts a user and resolves the user with a id', () => {
            const newUser = {
              fullname: 'Random User',
              username: 'randomuser12',
              password: 'RandomUser12',
            };
            return UsersService.addNewUser(db, newUser).then((actual) => {
              expect(actual).to.eql([
                {
                  id: 1,
                  ...newUser,
                },
              ]);
            });
          });
        });
    })

   
  });

  
  
  
});
