// bhseo1223 nodejs : app : rkmarket_app

// npm install express --save
var express = require('express');

// require
// var https = require('https');
var http = require('http');
var fs = require('fs');

// express
var router = express.Router();

// app
var app = express();

// npm install body-parser
var bodyParser = require('body-parser');

// npm install moment
var moment = require('moment');

// npm install supervisor

// view(EJS) : npm ejs install
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// static
app.use(express.static('public'));

// use : public
// app.use('/static', express.static(__dirname + '/public'));
// use : post
app.use(bodyParser.urlencoded({ extended: false }));


// router

// index
var indexRouter = require('./routes');
    app.use('/', indexRouter);  // 인덱스

// main
var mainRouter = require('./routes/main/main');
    app.use('/', mainRouter);  // 메인

// member
var memberloginRouter = require('./routes/member/member_login');
    app.use('/', memberloginRouter);  // 회원_로그인
    var memberloginprocessRouter = require('./routes/member/member_login_process');
        app.use('/', memberloginprocessRouter);  // 회원_로그인_프로세스


// listen
var port = 4000;
var time = moment().format('YYYY-MM-DD HH:mm:ss');
// https.createServer('', app, function(req, res) {}).listen(port, function() {
http.createServer(app, function(req, res) {}).listen(port, function() {
    console.log(`rkmarket app : port ${port} / time ${time}`);
});


// bhseo1223 nodejs : app : rkmarket_app