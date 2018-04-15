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

router.get('/twice', function(req, res, next) {
  res.render('write/twice');
});

router.get('/the-driver', function(req, res, next) {
  res.render('write/the_driver');
});

router.get('/the-fence', function(req, res, next) {
  res.render('write/the_fence');
});



module.exports = router;
