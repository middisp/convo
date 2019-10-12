const express = require('express');
const bodyParser = require('body-parser');

const controllers = require('../controllers/message');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();

router.post('/add', urlencodedParser, controllers.postAddMessage);

router.get('/get/:channel_id', controllers.getAllMessages);

router.put('/update', controllers.putUpdateMessage);

router.delete('/delete', controllers.deleteMessage);

module.exports = router;