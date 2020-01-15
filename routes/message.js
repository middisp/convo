const express = require('express');
const { body } = require('express-validator');

const isAuth = require('../middleware/isAuth');
const controllers = require('../controllers/message');

const router = express.Router();

router.post('/add', isAuth, [
  body('content').trim().notEmpty(),
  body('user_id').trim().notEmpty(),
  body('thread_id').trim().notEmpty()
], controllers.postAddMessage);

router.get('/:thread_id', isAuth, controllers.getMessagesByThread);

router.put('/update/:message_id', isAuth, [
  body('content').trim().notEmpty(),
], controllers.putUpdateMessage);

router.delete('/delete', isAuth, controllers.deleteMessage);

module.exports = router;