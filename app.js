// bhseo1223 nodejs : app : rkmarket_app

// npm install express --save
var express = require('express');

// require
// var https = require('https');
var http = require('http');
var fs = require('fs');
// ssl - sslOtions

// express
var router = express.Router();

// app
var app = express();

// npm install path <==============================
var path = require('path');

// npm install mysql -s
var mysql = require('mysql');
var mysqlConfig = require('./config/mysql_config.json');
var connection = mysql.createConnection({
        host:mysqlConfig.host, 
        user: mysqlConfig.user,
        password: mysqlConfig.password,
        database: mysqlConfig.database
    });
connection.connect();

// npm install express-session -s
var session = require('express-session')
// npm install express-mysql-session --save
var mysqlStore = require('express-mysql-session')(session);
var mysqlStoreConfig = require('./config/mysql_config.json');
var option = {
        host: mysqlStoreConfig.host, 
        user: mysqlStoreConfig.user,
        password: mysqlStoreConfig.password,
        database: mysqlStoreConfig.database,
        createDatabaseTable: false,
        schema: {
            tableName: 'session_member',
            columnNames: {
                session_id: 'session_id',
                expires: 'expires',
                data: 'data'
            }
        }
    };
var sessionStore = new mysqlStore(option)

// npm install body-parser
var bodyParser = require('body-parser');

// npm install moment
var moment = require('moment');

// npm install request
var request = require('request');

// npm install supervisor
// npm install pm2 -g

// view(EJS) : npm ejs install
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// static
app.use(express.static('public'));

// use : public
// app.use('/static', express.static(__dirname + '/public'));

// use : /css
app.use('/css', express.static(__dirname + '/public/css'));
// use : /icon
app.use('/icon', express.static(__dirname + '/public/image/icon'));
// use : /script
app.use('/script', express.static(__dirname + '/public/script'));

// use : post
app.use(bodyParser.urlencoded({ extended: false }));
// use : session
app.use(session({
    secret: mysqlStoreConfig.password,
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));


// router

// index
var indexRouter = require('./routes');
    app.use('/', indexRouter);  // 인덱스

// main
var mainRouter = require('./routes/main/main');
    app.use('/', mainRouter);  // 메인
    var mainshoppingRouter = require('./routes/main/main_shopping');
        app.use('/', mainshoppingRouter);  // 메인_쇼핑하기
    var mainpayRouter = require('./routes/main/main_pay');
        app.use('/', mainpayRouter);  // 메인_크립토페이
    var mainpointRouter = require('./routes/main/main_point');
        app.use('/', mainpointRouter);  // 메인_포인트
    var maintradeRouter = require('./routes/main/main_trade');
        app.use('/', maintradeRouter);  // 메인_거래하기

// point
var pointswapRouter = require('./routes/point/point_swap');
    app.use('/', pointswapRouter);  // 포인트_스왑
    var pointswapexchangeRouter = require('./routes/point/point_swap_exchange');
        app.use('/', pointswapexchangeRouter);  // 포인트_스왑_전환
        var pointswapexchangeprocessRouter = require('./routes/point/point_swap_exchange_process');
            app.use('/', pointswapexchangeprocessRouter);  // 포인트_스왑_전환_프로세스
    var pointswaplistRouter = require('./routes/point/point_swap_list');
        app.use('/', pointswaplistRouter);  // 포인트_스왑_목록

// member
var memberloginRouter = require('./routes/member/member_login');
    app.use('/', memberloginRouter);  // 회원_로그인
    var memberloginprocessRouter = require('./routes/member/member_login_process');
        app.use('/', memberloginprocessRouter);  // 회원_로그인_프로세스
var membersearchidRouter = require('./routes/member/member_searchid');
    app.use('/', membersearchidRouter);  // 회원_아이디찾기
    // var membersearchidsmsRouter = require('./routes/member/member_searchid_sms');
    //     app.use('/', membersearchidsmsRouter);  // 회원_아이디찾기_인증받기
var membersearchpwRouter = require('./routes/member/member_searchpw');
    app.use('/', membersearchpwRouter);  // 회원_비밀번호찾기

// test
var testRouter = require('./routes/test/test');
    app.use('/', testRouter);  // 테스트


// listen
var port = 4000;
var time = moment().format('YYYY-MM-DD HH:mm:ss');
// https.createServer('', app, function(req, res) {}).listen(port, function() {
http.createServer(app, function(req, res) {}).listen(port, function() {
    console.log(`rkmarket app : port ${port} / time ${time}`);
});


// bhseo1223 nodejs : app : rkmarket_app
