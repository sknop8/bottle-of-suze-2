var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'bottle of suze' });
});

router.get('/suzanne-channel', function(req, res, next) {
  res.render('suzanne');
});

module.exports = router;
