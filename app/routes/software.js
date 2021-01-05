var express = require('express');
var router = express.Router();
let path = require('path');

router.get('/', function(req, res, next) {
  res.render('software/software', {
    title: 'software | bottle of suze'
  });
});

///// CLOUDS /////
router.get('/clouds', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/software/clouds/clouds.html'), {
    title: 'clouds | bottle of suze'
  });
});

///// LUNGS /////
router.get('/lungs', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/software/lungs/lungs.html'), {
    title: 'lungs | bottle of suze'
  });
});

router.get('/lungs/audio/bigthief.mp3', function(req, res, next) {
  res.redirect('https://sknop8.github.io/lungs/audio/bigthief.mp3');
});


///// MORE:WONDERFUL /////
router.get('/morewonderful', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/software/morewonderful/morewonderful.html'), {
    title: 'more:wonderful | bottle of suze'
  });
});

router.get('/couchme.mp4', function(req, res, next) {
  res.redirect('https://sknop8.github.io/morewonderful/couchme.mp4');
});

router.get('/audio/morewonderful.mp3', function(req, res, next) {
  res.redirect('https://sknop8.github.io/morewonderful/audio/morewonderful.mp3');
});

module.exports = router;
