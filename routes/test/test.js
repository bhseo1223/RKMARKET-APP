// bhseo1223 nodejs : routes - test : rkmarket_app

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mysqlConfig = require('../../config/mysql_config.json');
var connection = mysql.createConnection({
        host: mysqlConfig.host, 
        user: mysqlConfig.user,
        password: mysqlConfig.password,
        database: mysqlConfig.database
    });
connection.connect();
var moment = require('moment');


router.get('/test/test', function(req, res) {  // url(get) : '/test/test'

    // render
    res.render('test/test', {
        // 타이틀
        title:  'TEST',
        // 타이틀
        // 데이터
        data:   'data'  // 데이터
        // 데이터
    });
    // render

});


module.exports = router;


// bhseo1223 nodejs : routes - test : rkmarket_app