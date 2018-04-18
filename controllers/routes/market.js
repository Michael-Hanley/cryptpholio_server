var express = require('express');
var router = express.Router();
const https = require("https");
const url =
  "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR";

  var mysql = require('mysql');

  var connection = mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'*******',
      database:'cryptpholio'
  });

router.use('/', function(req, res, next) {
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

module.exports = router;