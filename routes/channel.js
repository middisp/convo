const express = require('express');
const bodyParser = require('body-parser');

const controllers = require('../controllers/channel');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();

router.post('/add', urlencodedParser, controllers.postAddChannel);

router.get('/get/:userId', controllers.getAllChannels);

router.put('/update', controllers.putUpdateChannel);

router.delete('/delete', controllers.deleteChannel);

module.exports = router;