const express = require('express');
const { body } = require('express-validator');

const controllers = require('../controllers/message');

const router = express.Router();

router.post('/add', [
  body('content').trim().notEmpty(),
  body('user_id').trim().notEmpty(),
  body('thread_id').trim().notEmpty()
], controllers.postAddMessage);

router.get('/:thread_id', controllers.getMessagesByThread);

router.put('/update/:message_id', [
  body('content').trim().notEmpty(),
], controllers.putUpdateMessage);

router.delete('/delete', controllers.deleteMessage);

module.exports = router;