var express = require('express');
var router = express.Router();

/* GET watch listing. */
router.get('/', function(req, res, next) {
  res.render('watch/watch', {
    title: 'watch | bottle of suze'
  });
});

router.get('/persona', function(req, res, next) {
  res.render('watch/persona', {
    title: 'persona | bottle of suze'
  });
});

module.exports = router;
