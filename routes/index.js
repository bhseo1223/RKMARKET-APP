// bhseo1223 nodejs : routes - index : rkmarket_app

var express = require('express');
var router = express.Router();
var moment = require('moment');


router.get('/', function(req, res) {  // url(get) : '/'

    res.render('index', {
        // 타이틀
        title:      '타이틀',
        // 데이터
        data:       '데이터'
    });

});


module.exports = router;


// bhseo1223 nodejs : routes - index : rkmarket_app