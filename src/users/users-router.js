const express = require('express');
const UsersService = require('../users-service');
const logger = require('../logger');

const usersRouter = express.Router();
const bodyParser = express.json();

usersRouter
  .route('/users')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db');
    UsersService.getAllUsers(knexInstance)
      .then((users) => {
        res.json(users);
      })
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
    const knexInstance = req.app.get('db');
    const newUser = req.body;
    const { fullname, username, password } = newUser;
    if (!fullname) {
      logger.error('Fullname is required');
      return res.status(400).send('Invalid data');
    }
    if (!username) {
      logger.error('Username is required');
      return res.status(400).send('Invalid data');
    }
    if (!password) {
      logger.error('Password is required');
      return res.status(400).send('Invalid data');
    }
    return UsersService.addNewUser(knexInstance, newUser)
      .then((newUser) => res.status(201).location(`/users/${newUser[0].username}`).json(newUser))
      .catch(next);
  });

usersRouter.route('/users/:username').get((req, res, next) => {
  const knexInstance = req.app.get('db');
  const { username } = req.params;

  UsersService.getUserByUsername(knexInstance, username)
    .then((user) => {
      if (!user.length) {
        logger.error(`User with username ${username} not found`);
        return res.status(404).send('User not found');
      }
      return res.json(user);
    })
    .catch(next);
});

module.exports = usersRouter;
