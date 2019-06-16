var express = require('express');
var router = express.Router();
const cors_middleware = require('../../middlewares/cors-middleware');
var mysql = require('mysql');

const dbconnection = require('../../config/dbconnection');
const connectionInfo = dbconnection.getConnectionInfo();
var connection = mysql.createConnection(connectionInfo);

//Returns all coinds from coin_prices table
router.use('/', cors_middleware.cors_policy, function(req,  res, next) {
    connection.query('select * from coin_prices', function (err, result) {
            if (err) throw err;
            req.app.locals.body = result;
            next();
        });
    console.log('MARKET ROUTE HIT!');
});

router.get('/', function(req, res) {
    res.send(req.app.locals.body);
});

//Returns most recent global_market_cap row from global_market_cap table
router.use('/global', function(req, res, next) {
    const query = 'SELECT global_market_cap FROM global_market_cap ORDER BY time_stamp DESC LIMIT 1';
    connection.query(query, function (err, result) {
            if (err) throw err;
            req.app.locals.body = result;
            next();
        });
    console.log('MARKET ROUTE HIT! global');
});
router.get('/global', function(req, res) {

    console.log(req.app.locals.body);
    res.send(req.app.locals.body);
});

module.exports = router;