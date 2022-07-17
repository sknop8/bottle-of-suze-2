var express = require('express');
var router = express.Router();

/* GET watch listing. */
router.get('/', function(req, res, next) {
  res.render('watch/watch_2022', {
    title: 'watch | 2022 | bottle of suze'
  });
});

router.get('/2022', function(req, res, next) {
  res.render('watch/watch_2022', {
    title: 'watch | 2022 | bottle of suze'
  });
});

router.get('/2021', function(req, res, next) {
  res.render('watch/watch_2021', {
    title: 'watch | 2021 | bottle of suze'
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

router.get('/index', function(req, res, next) {
  res.render('watch/watch_index', {
    title: 'watch index | bottle of suze'
  });
});

router.get('/persona', function(req, res, next) {
  res.render('watch/persona', {
    title: 'persona | bottle of suze'
  });
});

router.get('/twinpeaks', function(req, res, next) {
  res.render('watch/twinpeaks', {
    title: 'twinpeaks | bottle of suze'
  });
});

module.exports = router;
