const express = require('express');
const { body } = require('express-validator');

const isAuth = require('../middleware/isAuth');
const controllers = require('../controllers/thread');

const router = express.Router();

router.post('/add', isAuth, [
  body('members').trim().notEmpty(),
  body('user_id').trim().notEmpty()
], controllers.postAddThread);

router.get('/:user_id', isAuth, controllers.getThreads);

router.put('/update', isAuth, [
  body('members').trim().notEmpty()
], controllers.putUpdateThread);

// router.delete('/delete', controllers.deleteMessage);

module.exports = router;