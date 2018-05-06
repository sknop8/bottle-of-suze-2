var express = require('express');
var router = express.Router();

/* GET stuff */
router.get('/', function(req, res, next) {
  res.render('write/write_main', {
    title: 'write'
  });
});

router.get('/on-goal-orientation', function(req, res, next) {
  res.render('write/write_goal_orientation');
});

router.get('/thirty-two-pm-prose', function(req, res, next) {
  res.render('write/thirty_two_pm_prose');
});

router.get('/the-embarrassment-of-pain', function(req, res, next) {
  res.render('write/embarrassment_of_pain');
});

router.get('/dreams-drive-canyons-between-the-days', function(req, res, next) {
  res.render('write/dreams_drive');
});

router.get('/chestnut', function(req, res, next) {
  res.render('write/chestnut');
});

router.get('/twice', function(req, res, next) {
  res.render('write/twice');
});

router.get('/the-driver', function(req, res, next) {
  res.render('write/the_driver');
});

router.get('/the-fence', function(req, res, next) {
  res.render('write/the_fence');
});


router.get('/ars-poetica', function(req, res, next) {
  res.render('write/ars_poetica');
});



module.exports = router;
