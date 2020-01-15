const express = require('express');
const { body } = require('express-validator');

const isAuth = require('../middleware/isAuth');
const controllers = require('../controllers/user');

const router = express.Router();

router.get('/:id', isAuth, controllers.getUser);

router.post('/add', isAuth, [
  body('name').trim().notEmpty().isString(),
  body('email').trim().notEmpty().isEmail(),
  body('password').trim().notEmpty().isLength({ min: 5 })
], controllers.postAddUser);

router.put('/update/:user_id', isAuth, controllers.putUpdateUser);

module.exports = router;