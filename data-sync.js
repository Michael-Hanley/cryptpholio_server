const https = require("https");

const url =
  "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR";

coin = setInterval( function() {
    https.get(url, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
            body += data;
        });
        res.on("end", () => {
            body = JSON.parse(body);
            // req.app.locals.body = body;
            console.log(body);
            // next();            
        });
    });
}, 5000);

module.exports = coin;