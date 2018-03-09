var express = require('express');
var router = express.Router();

/* GET watch listing. */
router.get('/', function(req, res, next) {
  res.render('watch', {
    title: 'watch',
    image: 'fallen_image.png'
  });
});

module.exports = router;
