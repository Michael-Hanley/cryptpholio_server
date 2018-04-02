var express = require('express');
var router = express.Router();

router.use('/', function(req, res , next) {
    console.log('Watch List route has been hit!');
    next();
});
router.get('/', function(req, res) {
    res.send('watch List route!');
});

module.exports = router;