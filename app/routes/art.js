var express = require('express');
var router = express.Router();

/* GET watch listing. */
router.get('/', function(req, res, next) {
  res.render('art/art_main', {
    title: 'art | bottle of suze'
  });
});

router.get('/finished', function(req, res, next) {
  res.render('art/art_finished', {
    title: 'finished works | bottle of suze'
  });
});

router.get('/fun', function(req, res, next) {
  res.render('art/art_fun', {
    title: 'sketches & fun stuff | bottle of suze'
  });
});

router.get('/photos', function(req, res, next) {
  res.render('art/art_photos', {
    title: 'photo journal | bottle of suze'
  });
});

module.exports = router;
