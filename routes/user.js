const express = require('express');
const { body } = require('express-validator');
const bodyParser = require('body-parser');

const controllers = require('../controllers/user');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();

router.get('/:id', controllers.getUser);

router.post('/add', urlencodedParser, [
  body('name').trim().isEmpty(),
  body('email').trim().isEmail(),
  body('password').trim().isLength({ min: 5 })
], controllers.postAddUser);

router.get('/get/:channel_id', controllers.getAllUsers);

router.put('/update', controllers.postAddUser);

router.delete('/delete', controllers.deleteUser);

module.exports = router;