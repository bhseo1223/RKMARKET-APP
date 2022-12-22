// bhseo1223 nodejs : routes - main : rkmarket_app

var express = require('express');
var router = express.Router();
var moment = require('moment');


router.get('/main/main', function(req, res) {  // url(get) : '/main/main'

    res.render('main/main', {
        // 타이틀
        title:      '메인',
        // 데이터
        data:       '데이터'
    });

});


module.exports = router;


// bhseo1223 nodejs : routes - main : rkmarket_app