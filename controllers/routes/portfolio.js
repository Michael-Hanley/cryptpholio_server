var express = require('express');
var router = express.Router();

router.use('/', function (req, res , next) {
    console.log('Portfolio route has been hit!');
    next();
});
router.get('/', function(req, res) {
    res.send('Portfolio route!');
});

module.exports = router;