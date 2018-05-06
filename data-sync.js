const https = require("https");
var mysql = require('mysql');
const dbconnection = require('./dbconnection');
const connectionInfo = dbconnection.getConnectionInfo();
var connection = mysql.createConnection(connectionInfo);
var fs = require('fs'),
    request = require('request');

var fullCoinList;
var FullCoinListImages;
getFullCoinList();
calculateGlobalMarketCap();

function calculateGlobalMarketCap() {
    query = `select sum(market_cap_usd) as 'global_market_cap' from coin_prices;`;
    connection.query(query, function (err, result) {
        const queryResult = result[0].global_market_cap;
        insertQuery = `INSERT INTO global_market_cap(
            time_stamp, 
            global_market_cap)
            VALUES(
            UNIX_TIMESTAMP(), 
            ${queryResult});`;
        connection.query(insertQuery, function(err, result) {
            if (err) throw err;
        })
    });
}

function getFullCoinList() {
    https.get('https://api.coinmarketcap.com/v1/ticker/?limit=1500', res => {
        res.setEncoding("utf8");
        fullCoinList = "";
        res.on("data", data => {
            fullCoinList += data; 
        })
        res.on("end", () => {
            fullCoinList = JSON.parse(fullCoinList);
        })
    });
}
getFullCoinListImages = https.get('https://min-api.cryptocompare.com/data/all/coinlist', res => {
    res.setEncoding("utf8");
    FullCoinListImages = "";
    res.on("data", data => {
        FullCoinListImages += data; 
    })
    res.on("end", () => {
        FullCoinListImages = JSON.parse(FullCoinListImages);
    })  
})

coin = setInterval( function() {
    fullCoinList.forEach(coin => {
        if (FullCoinListImages.Data[coin.symbol] != undefined 
            && FullCoinListImages.Data[coin.symbol].ImageUrl != undefined
            && coin.symbol != 'MIOTA' && coin.symbol != 'NANO') {
            var ImageUrl = FullCoinListImages.Data[coin.symbol].ImageUrl;
        } else if (coin.symbol === 'MIOTA'){
            var ImageUrl = FullCoinListImages.Data['IOT'].ImageUrl;
        } else if (coin.symbol === 'NANO') {
            var ImageUrl = FullCoinListImages.Data['XRB'].ImageUrl;            
        }  else if (coin.symbol === 'ETHOS') {
            var ImageUrl = FullCoinListImages.Data['BQX'].ImageUrl;            
        }   else if (coin.symbol === 'SMT') {
            var ImageUrl = FullCoinListImages.Data['SMT*'].ImageUrl;            
        } else {
            var ImageUrl = 'womp womp'; 
        }

        const coins = `UPDATE coin_prices SET
                btc_price = ${coin.price_btc}, 
                usd_price = ${coin.price_usd}, 
                rank = ${coin.rank},
                market_cap_usd = ${coin.market_cap_usd},
                percent_change_1h = ${coin.percent_change_1h},
                percent_change_24h  = ${coin.percent_change_24h},
                percent_change_7d  = ${coin.percent_change_7d},
                image_url = "${ImageUrl}"
                WHERE symbol = '${coin.symbol}';`;

        connection.query(coins, function (err, result) {
            if (err) throw err;
            if(result != undefined && result.affectedRows === 0 && coin.symbol != '') {

                query = `INSERT INTO coin_prices(
                    symbol, 
                    btc_price, 
                    usd_price, 
                    rank,
                    market_cap_usd,
                    percent_change_1h,
                    percent_change_24h,
                    percent_change_7d,
                    name,
                    image_url,
                    available_supply,
                    total_supply,
                    max_supply)
                VALUES(
                    '${coin.symbol}', 
                    ${coin.price_btc}, 
                    ${coin.price_usd}, 
                    ${coin.rank},
                    ${coin.market_cap_usd},
                    ${coin.percent_change_1h},
                    ${coin.percent_change_24h},
                    ${coin.percent_change_7d},
                    "${coin.name}",
                    "${ImageUrl}",
                    ${coin.available_supply},
                    ${coin.total_supply},
                    ${coin.max_supply});`;

                connection.query(query, function(err, result) {
                    if (err) throw err;
                })
            }
            });
        })
        getFullCoinList();
        calculateGlobalMarketCap();
            // next();
}, 60000);


// var download = function(uri, filename, callback){
//     request.head(uri, function(err, res, body){
//       console.log('content-type:', res.headers['content-type']);
//       console.log('content-length:', res.headers['content-length']);
  
//       request(uri).pipe(fs.createWriteStream('./coinIcons/'+filename)).on('close', callback);
//     });
// };

// download('https://www.cryptocompare.com/media/19633/btc.png', 'google.png', function(){
//   console.log('done');
// });

module.exports = coin;