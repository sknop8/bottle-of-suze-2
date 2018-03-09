var express = require('express');
var router = express.Router();

/* GET watch listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Watch' });
});

module.exports = router;
