var express = require('express');
const user = require('../../models/user');
var router = express.Router();

router.use('/', function(req, res , next) {
    console.log('user route has been hit!');
    
    next();
});
router.get('/', function(req, res) {
    user.allUsers(function(values, err) {
        if (err) throw err;
        res.send(values); 
    });
});
router.get('/single', function(req, res) {
    user.singleUser(1, function(values, err) {
        if (err) throw err;
        res.send(values); 
    });
});
module.exports = router;