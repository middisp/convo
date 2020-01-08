const express = require('express');
const { body } = require('express-validator');

const controllers = require('../controllers/user');

const router = express.Router();

router.get('/:id', controllers.getUser);

router.post('/add', [
  body('name').trim().notEmpty().isString(),
  body('email').trim().notEmpty().isEmail(),
  body('password').trim().notEmpty().isLength({ min: 5 })
], controllers.postAddUser);

router.put('/update/:user_id', controllers.putUpdateUser);

module.exports = router;