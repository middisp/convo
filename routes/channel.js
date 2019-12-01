const express = require('express');
const bodyParser = require('body-parser');

const controllers = require('../controllers/channel');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();

router.post('/add/:user_id', urlencodedParser, controllers.postAddChannel);

router.get('/:user_id', controllers.getAllChannels);

router.put('/update', controllers.putUpdateChannel);

router.delete('/delete', controllers.deleteChannel);

router.get('/', controllers.getAddChannel);

module.exports = router;