const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dataSync = require('./data-sync');
const db = require('./dbconnection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(require('./middlewares/users'));
app.use(require('./controllers'));

app.listen(3000, function() {
    console.log('Listening on port 3000...')
});