const express = require('express');
const { body } = require('express-validator');
const bodyParser = require('body-parser');


const controllers = require('../controllers/thread');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();

router.post('/add', urlencodedParser, [
  body('members').trim().notEmpty(),
  body('user_id').trim().notEmpty()
], controllers.postAddThread);

router.get('/:user_id', urlencodedParser, controllers.getThreads);

// router.put('/update', controllers.putUpdateMessage);

// router.delete('/delete', controllers.deleteMessage);

module.exports = router;