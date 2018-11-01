var express = require('express');
var router = express.Router();

router.use('/users', require('./routes/users'));
router.use('/market', require('./routes/market'));
router.use('/watchList', require('./routes/watchList'));
router.use('/portfolio', require('./routes/portfolio'));

  
module.exports = router;