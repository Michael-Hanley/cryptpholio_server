var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'*******',
    database:'cryptpholio'
});


connection.query('CREATE TABLE IF NOT EXISTS coin_prices('
    + 'id INT NOT NULL AUTO_INCREMENT,'
    + 'PRIMARY KEY(id),'
    + 'symbol VARCHAR(255),'
    + 'btc_price DECIMAL(30, 6),'
    // + 'eth_price DECIMAL(30, 6),'
    + 'usd_price DECIMAL(30, 6),'
    // + 'eur_price DECIMAL(30, 6),'
    + 'rank INT(2),'
    + 'name VARCHAR(255),'
    + 'market_cap_usd DECIMAL(30, 2),'
    + 'image_url VARCHAR(255)'
    +  ')', function (err) {
        if (err) throw err;
    });

module.exports = connection;