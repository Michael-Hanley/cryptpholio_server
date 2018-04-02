var db = require('../dbconnection');
var crypto = require('crypto');
const mysql = require('mysql');

exports.allUsers = function(next) {
    db.query('SELECT * FROM people', function(err, result) {
        if (err) throw err;
        next(result);
    });
};
exports.singleUser = function(userId, next) {
    db.query('SELECT * FROM people WHERE id = ?', userId, function(err, result) {
        if (err) throw err;
        next(result);
    });
}