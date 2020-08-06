const express = require('express');
const { body } = require('express-validator');

const isAuth = require('../middleware/isAuth');
const controllers = require('../controllers/user');

const router = express.Router();

router.get('/:id', isAuth, controllers.getUser);

router.post('/find', isAuth, [
  body('email').trim().notEmpty().isEmail()
], controllers.postAllUsers);

router.post('/add', [
  body('firstName').trim().notEmpty().isString(),
  body('lastName').trim().notEmpty().isString(),
  body('email').trim().notEmpty().isEmail(),
  body('password').trim().notEmpty().isLength({ min: 5 })
], controllers.postAddUser);

router.put('/update/:user_id', isAuth, controllers.putUpdateUser);

router.put('/mateRequest/:user_id', isAuth, controllers.putUpdateMateRequest);

// router.post('/addTestData', controllers.postAddTestData);

module.exports = router;