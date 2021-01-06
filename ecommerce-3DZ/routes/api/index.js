var express = require('express');
var router = express.Router();
var indexAPIController = require('../../controllers/api/indexController');

router.get('/', indexAPIController.chart);

module.exports = router;
