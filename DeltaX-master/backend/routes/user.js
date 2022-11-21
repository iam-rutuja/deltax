const express = require('express');
const router = express.Router();

//controllers
const { read } = require('../controller/user');
const { requireSign } = require('../controller/auth');

router.get('/user', requireSign, read);

module.exports = router;