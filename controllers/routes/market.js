var express = require('express');
var router = express.Router();
const https = require("https");

const url =
  "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR";

router.use('/', function(req, res, next) {
    console.log('MARKET ROUTE HIT!');
    https.get(url, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
            body += data;
        });
        res.on("end", () => {
            body = JSON.parse(body);
            req.app.locals.body = body;
            next();            
        })
    })
});
router.get('/', function(req, res) {
    console.log(req.app.locals.body, 'llll');
    res.send(req.app.locals.body);
});

module.exports = router;