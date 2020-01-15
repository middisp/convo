const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
  let loadedUser = {};

  User.getUserByEmail(email)
    .then(user => {
      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    }).then(isEqual => {
      if (!isEqual) {
        const error = new Error(userMessages.generic.validationFailed);
        error.statusCode = 401;
        throw error;
      }
      delete loadedUser.password;
      loadedUser._id = loadedUser._id.toString();
      // JWT goes here
      const token = jwt.sign({ userId: loadedUser._id }, 'whyAreGiraffesConsideredTall', { expiresIn: '1hr' });
      return res.status(200).json({ user: loadedUser, token });
    })
    .catch(error => next(error))
};