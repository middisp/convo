const express = require('express');
const bodyParser = require('body-parser');

const controllers = require('../controllers/auth');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();

router.get('/', controllers.getLogin);

router.post('/', urlencodedParser, controllers.postLogin);

// router.post('/logout', urlencodedParser, controllers.postLogout);

// router.post('/forgotPassword', urlencodedParser, controllers.postForgotPassword)

module.exports = router;