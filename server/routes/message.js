const express = require('express');
const controllers = require('../controllers/message');

const router = express.Router();

router.post('/add', controllers.postAddMessage);

router.get('/get', controllers.getAllMessages);

module.exports = router;