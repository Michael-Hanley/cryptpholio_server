require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./data-sync');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(require('./middlewares/users'));
app.use(require('./controllers'));

app.listen(3000, function() {
    console.log('Listening on port 3000...')
});