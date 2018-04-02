var express = require('express');
var router = express.Router();

router.use('/', function(req, res, next) {
    console.log('MARKET ROUTE HIT!');
    next();
});
router.get('/', function(req, res) {
    res.send({
        coinName: 'Bitcoin'
    });
});

module.exports = router;