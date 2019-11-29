var express = require('express');
var router = express.Router();
var login = require('../mutual/login');

/* GET users listing. */
router.get('/', function(req, res, next) {
  login.login(req, res, next)
});

module.exports = router;
