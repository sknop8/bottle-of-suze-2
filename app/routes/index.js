var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index-3', { title: 'bottle of suze' });
});

router.get('/suzanne-channel', function(req, res, next) {
  res.render('suzanne');
});

router.get('/hi', function(req, res, next) {
  res.render('about');
});

module.exports = router;
