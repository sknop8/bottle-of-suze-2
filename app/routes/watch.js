var express = require('express');
var router = express.Router();

/* GET watch listing. */
router.get('/', function(req, res, next) {
  res.render('watch/2020', {
    title: 'watch | 2020 | bottle of suze'
  });
});

router.get('/2020', function(req, res, next) {
  res.render('watch/2020', {
    title: 'watch | 2020 | bottle of suze'
  });
});

router.get('/2019', function(req, res, next) {
  res.render('watch/2019', {
    title: 'watch | 2019 | bottle of suze'
  });
});

router.get('/2018', function(req, res, next) {
  res.render('watch/2018', {
    title: 'watch | 2018 | bottle of suze'
  });
});

router.get('/2017', function(req, res, next) {
  res.render('watch/2017', {
    title: 'watch | 2017 | bottle of suze'
  });
});

router.get('/persona', function(req, res, next) {
  res.render('watch/persona', {
    title: 'persona | bottle of suze'
  });
});

module.exports = router;
