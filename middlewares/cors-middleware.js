const express = require('express');
const app = express();

// Add headers
module.exports =  { 
    cors_policy: function(req, res, next) {
        // var token = req.headers['x-access-token'];
        // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        
        // jwt.verify(token, config.secret, function(err, decoded) {
        //   if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
          
        //   res.status(200).send(decoded);
        // });
        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        // Pass to next layer of middleware
        if (req.method === 'OPTIONS') {
            return res.send(200);
        }
        next();
    }
};