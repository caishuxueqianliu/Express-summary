var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({name:'123',
            age:'1222'})
});

module.exports = router;
