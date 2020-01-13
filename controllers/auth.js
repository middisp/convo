const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const userMessages = require('../utils/userMessages');

exports.postLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // This is the correct way!
    const error = new Error(userMessages.generic.validationFailed)
    error.statusCode = 422;
    throw error;
  }

  const email = req.body.email;
  const password = req.body.password;
  const loadedUser = {};

  User.getUserByEmail(email)
    .then(result => {
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, result.password);
    }).then(isEqual => {
      if (!isEqual) {
        const error = new Error(userMessages.generic.validationFailed);
        error.statusCode = 401;
        throw error;
      }

      // JWT goes here

      return res.status(200).json(result);

    })
    .catch(error => next(error))
};