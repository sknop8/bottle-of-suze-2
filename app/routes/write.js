var express = require('express');
var router = express.Router();

/* GET stuff */
router.get('/', function(req, res, next) {
  res.render('write/write_main', {
    title: 'write | bottle of suze'
  });
});

router.get('/on-goal-orientation', function(req, res, next) {
  res.render('write/write_goal_orientation',
    { title: 'On Goal Orientation | bottle of suze' }
  );
});

router.get('/thirty-two-pm-prose', function(req, res, next) {
  res.render('write/thirty_two_pm_prose');
});

router.get('/the-embarrassment-of-pain', function(req, res, next) {
  res.render('write/embarrassment_of_pain',
    { title: 'the embarrassment of pain | bottle of suze' }
  );
});

router.get('/dreams-drive-canyons-between-the-days', function(req, res, next) {
  res.render('write/dreams_drive',
    { title: 'dreams drive canyons | bottle of suze' }
  );
});

router.get('/chestnut', function(req, res, next) {
  res.render('write/chestnut',
    { title: 'chestnut | bottle of suze' }
  );
});

router.get('/twice', function(req, res, next) {
  res.render('write/twice',
    { title: 'twice | bottle of suze' }
  );
});

router.get('/the-driver', function(req, res, next) {
  res.render('write/the_driver',
    { title: 'The Driver | bottle of suze' }
  );
});

router.get('/the-fence', function(req, res, next) {
  res.render('write/the_fence',
    { title: 'The Fence | bottle of suze' }
  );
});


router.get('/ars-poetica', function(req, res, next) {
  res.render('write/ars_poetica',
    { title: 'ars poetica | bottle of suze' }
  );
});

router.get('/catharine-bliss', function(req, res, next) {
  res.render('write/catharine_bliss',
    { title: 'catharine bliss | bottle of suze' }
  );
});


module.exports = router;
