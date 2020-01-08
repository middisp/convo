const { validationResult } = require('express-validator');
const User = require('../models/user');

const userMessages = require('../utils/userMessages');

exports.postLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed, entered data is incorrect.',
      errors: errors.array()
    });
  }

  const email = req.body.email;
  const password = req.body.password;

  exports.getUser = (req, res, next) => {
    User.getUser(email)
      .then(result => {
        if (result.password === password) {
          res.status(200).json(result);
        } else {
          res.status(401).json({ message: 'Incorrect username or passowrd', statusCode: 401 });
        }
      })
      .catch(err => {
        const error = new Error('Error logging in');
        error.statusCode = 422;
        throw error;
      });
  };
};