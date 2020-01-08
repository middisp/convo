const express = require('express');
const { body } = require('express-validator');


const controllers = require('../controllers/thread');

const router = express.Router();

router.post('/add', [
  body('members').trim().notEmpty(),
  body('user_id').trim().notEmpty()
], controllers.postAddThread);

router.get('/:user_id', controllers.getThreads);

router.put('/update', [
  body('members').trim().notEmpty()
], controllers.putUpdateThread);

// router.delete('/delete', controllers.deleteMessage);

module.exports = router;