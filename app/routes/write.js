var express = require('express');
var router = express.Router();

/* GET stuff */
router.get('/', function(req, res, next) {
  res.render('write/write_main', {
    title: 'write | bottle of suze'
  });
});

router.get('/to-the-writer', function(req, res, next) {
  res.render('write/help',
    { title: 'to the writer | bottle of suze' }
  );
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

router.get('/golden', function(req, res, next) {
  res.render('write/golden',
    { title: 'Golden | bottle of suze' }
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

router.get('/revisiting-the-embarrassment-of-pain', function(req, res, next) {
  res.render('write/revisiting_the_embarrassment',
    { title: 'Revisiting the Embarrassment of Pain | bottle of suze' }
  );
});

router.get('/if-i-am-to-be-filled', function(req, res, next) {
  res.render('write/if_i_am',
    { title: 'If I Am To Be Filled | bottle of suze' }
  );
});

router.get('/letters', function(req, res, next) {
  res.render('write/letters',
    { title: 'Letters | bottle of suze' }
  );
});

router.get('/silence', function(req, res, next) {
  res.render('write/silence',
    { title: '(Silence) | bottle of suze' }
  );
});

router.get('/my-june-bug-and-other-stories', function(req, res, next) {
  res.render('write/my_june_bug_stories',
    { title: 'My June Bug and Other Stories | bottle of suze' }
  );
});

router.get('/dusk', function(req, res, next) {
  res.render('write/dusk',
    { title: 'dusk, suspended | bottle of suze' }
  );
});

router.get('/dusk/difficult-ask', function(req, res, next) {
  res.render('write/difficult_ask',
    { title: 'dusk, suspended | bottle of suze' }
  );
});

router.get('/screen', function(req, res, next) {
  res.render('write/screen',
    { title: 'screen | bottle of suze' }
  );
});

router.get('/rain-1', function(req, res, next) {
  res.render('write/rain_1',
    { title: 'rain 1 | bottle of suze' }
  );
});



module.exports = router;
