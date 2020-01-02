const express = require('express');
const { body } = require('express-validator');
const bodyParser = require('body-parser');


const controllers = require('../controllers/message');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();

router.post('/add', urlencodedParser, [
  body('content').trim().notEmpty(),
  body('user_id').trim().notEmpty(),
  body('channel_id').trim().notEmpty()
], controllers.postAddMessage);

router.get('/:channel_id', controllers.getAllMessages);

router.put('/update', controllers.putUpdateMessage);

router.delete('/delete', controllers.deleteMessage);

module.exports = router;