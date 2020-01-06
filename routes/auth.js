const express = require('express');
const { body } = require('express-validator');
const bodyParser = require('body-parser');

const controllers = require('../controllers/auth');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();

router.post('/', urlencodedParser, [
  body('username').trim().notEmpty(),
  body('password').trim().notEmpty().isLength({ min: 5 })
], controllers.postLogin);

// router.post('/logout', urlencodedParser, controllers.postLogout);

// router.post('/forgotPassword', urlencodedParser, controllers.postForgotPassword)

module.exports = router;