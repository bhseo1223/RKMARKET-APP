// bhseo1223 nodejs : routes - main_point : rkmarket_app

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


router.get('/main/main_point', function(req, res) {  // url(get) : '/main/main_point'

    // data + session
    if (req.session.memberid == undefined) { // 미로그인시

        // redirect : 강제이동
        res.redirect('/member/member_login');
        // redirect : 강제이동

    } else { // 로그인시

        // get
        // get

        // select : member - 회원
        var sqlMember = `SELECT member.hname, member.cp, member.class_level, 
                    code_class_level.hname AS classlevelhname, code_class_level.color AS classlevelcolor, code_class_level.background AS classlevelbackground 
                FROM member 
                LEFT JOIN code_class_level ON member.class_level = code_class_level.code 
                WHERE member.id = ?`;
        var paramsMember = [req.session.memberid];
        connection.query(sqlMember, paramsMember, function(err, rowsMember, fields) {

            // code_class color에 따라 color, backgroud CSS 적용
            var classlevelCSS = `"color: ${rowsMember[0].classlevelcolor}; background: ${rowsMember[0].classlevelbackground}"`
            // code_class color에 따라 color, backgroud CSS 적용

            // render
            res.render('main/main_point', {
                // 타이틀
                title:          '포인트',
                // 타이틀
                // 데이터
                member:         rowsMember,     // 회원
                classlevelcss:  classlevelCSS   // 구매등급색상
                // 데이터
            });
            // render

        });
        // select : member (회원)

    };
    // data + session

});


module.exports = router;


// bhseo1223 nodejs : routes - main_point : rkmarket_app