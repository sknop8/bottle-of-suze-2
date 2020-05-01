var express = require('express');
var router = express.Router();

/* GET watch listing. */
router.get('/', function(req, res, next) {
  res.render('readwell', {
    title: 'readwell | bottle of suze'
  });
});

module.exports = router;
