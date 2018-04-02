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


module.exports = router;
