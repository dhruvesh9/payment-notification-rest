const express = require('express');
const router = express.Router();
const tokenController = require('../controller/token.controller');


router.get('/get', tokenController.get_token );

module.exports = router;