var express = require('express');
var router = express.Router();

/* GET watch listing. */
router.get('/', function(req, res, next) {
  res.render('phthalo', {
    title: 'PHTHALO*WORLD'
  });
});

module.exports = router;
