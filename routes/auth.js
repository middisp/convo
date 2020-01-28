const express = require('express');
const { body } = require('express-validator');

const isAuth = require('../middleware/isAuth');
const controllers = require('../controllers/auth');

const router = express.Router();

router.post('/', [
  body('email').trim().isEmail().notEmpty().normalizeEmail(),
  body('password').trim().notEmpty().isLength({ min: 5 })
], controllers.postLogin);


router.put('/updatePassword/:user_id', isAuth, [
  body('currentPassword').notEmpty().isLength({ min: 5 }),
  body('newPassword').notEmpty().isLength({ min: 5 })
], controllers.putUpdatePassword);

// router.post('/logout', controllers.postLogout);

// router.post('/forgotPassword', controllers.postForgotPassword)

module.exports = router;