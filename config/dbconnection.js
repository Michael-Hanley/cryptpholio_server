var mysql = require('mysql');

getConnectionInfo = function getConnectionInfo() {
    return {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    };
}
var connection = mysql.createConnection(getConnectionInfo());

connection.query(
    `CREATE TABLE IF NOT EXISTS coin_prices(
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255),
        PRIMARY KEY(id),
        symbol VARCHAR(255),
        btc_price DECIMAL(30, 6),
        eth_price DECIMAL(30, 6),
        usd_price DECIMAL(30, 2),
        eur_price DECIMAL(30, 6),
        coin_rank INT(2),
        market_cap_usd DECIMAL(30, 2),
        image_url VARCHAR(255),
        available_supply BIGINT(32),
        total_supply BIGINT(32),
        max_supply BIGINT(32),
        percent_change_1h DECIMAL(30, 6),
        percent_change_24h DECIMAL(30, 6),
        percent_change_7d DECIMAL(30, 6)
    );`, function (err) {
        if (err) throw err;
});

connection.query(
    `CREATE TABLE IF NOT EXISTS global_market_cap(
        id INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY(id),
        time_stamp BIGINT(32),
        global_market_cap DECIMAL(30, 6)
    );`, function (err) {
        if (err) throw err;
});

module.exports.connection = connection
module.exports.getConnectionInfo = getConnectionInfo;