var express = require('express');
var router = express.Router();
const apiCtrl = require('../controllers/api');


/* GET home page. */
router.get('/', apiCtrl.index);


module.exports = router;
