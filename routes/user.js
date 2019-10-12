const express = require('express');
const bodyParser = require('body-parser');

const controllers = require('../controllers/user');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = express.Router();

router.get('/:id', controllers.getUser);

router.post('/add', urlencodedParser, controllers.postAddUser);

router.get('/get/:channel_id', controllers.getAllUsers);

router.put('/update', controllers.postAddUser);

router.delete('/delete', controllers.deleteUser);

module.exports = router;