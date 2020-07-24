const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');
const userMessage = require('../utils/userMessages');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    const error = new Error(userMessage.generic.notAuthenticated);
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(' ')[1];
  let decodeToken

  try {
    decodeToken = jwt.verify(token, JWT_SECRET)
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  if (!decodeToken) {
    const error = new Error(userMessage.generic.notAuthenticated);
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodeToken.userId;
  next();
}