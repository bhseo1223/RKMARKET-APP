// bhseo1223 nodejs : routes - point_swap_list : rkmarket_app

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


router.get('/point/point_swap_list', function(req, res) {  // url(get) : '/point/point_swap_list'

    // data + session
    if (req.session.memberid == undefined) { // 미로그인시

        // redirect : 강제이동
        res.redirect('/member/member_login');
        // redirect : 강제이동

    } else { // 로그인시

        // get
        var point  = req.query.point;  // 포인트_구분
        // get

        // 공용
        var memberid  = req.session.memberid;           // 아이디(회원)
        var today     = moment().format('YYYY-MM-DD');  // 일자
        // 공용

        // SELECT : member - 회원
        var sqlMember = `SELECT member.hname, member.class_level, 
                    code_class_level.hname AS classlevelhname, code_class_level.color AS classlevelcolor, code_class_level.background AS classlevelbackground 
                FROM member 
                LEFT JOIN code_class_level ON member.class_level = code_class_level.code 
                WHERE member.id = ?`;
        var paramsMember = [memberid];
        connection.query(sqlMember, paramsMember, function(err, rowsMember, fields) {

            // code_class color에 따라 color, backgroud CSS 적용
            var classlevelCSS = `"color: ${rowsMember[0].classlevelcolor}; background: ${rowsMember[0].classlevelbackground}"`;
            // code_class color에 따라 color, backgroud CSS 적용

            // SELECT : point_member - 포인트_회원별수량
            var sqlPointmember = `SELECT * FROM point_member WHERE member_id = ? AND regdate = (SELECT MAX(regdate) FROM point_member)`;
            var paramsPointmember = [memberid];
            connection.query(sqlPointmember, paramsPointmember, function(err, rowsPointmember, feilds) {

                // SELECT : point_rate - 포인트_시세
                var sqlPointrate = `SELECT * FROM point_rate WHERE regdate = (SELECT MAX(regdate) FROM point_rate)`;
                connection.query(sqlPointrate, function(err, rowsPointrate, feilds) {

                    // 시세 적용
                    var rateExp   = rowsPointrate[0].rate_exp;   // EXP CP시세
                    var rateMc    = rowsPointrate[0].rate_mc;    // MC CP시세
                    var rateMctk  = rowsPointrate[0].rate_mctk;  // MCTK CP시세
                    var rateNton  = rowsPointrate[0].rate_nton;  // NRON CP시세
                    var rateTrvt  = rowsPointrate[0].rate_trvt;  // TRVT CP시세
                    // 시세 적용

                    // SELECT : point_swap - 포인트_스왑
                    var sqlPointswap = `SELECT * FROM point_swap WHERE source_point = ? ORDER BY regdate DESC`;
                    var paramsPointswap = [point];
                    connection.query(sqlPointswap, paramsPointswap, function(err, rowsPointswap, feilds) {

                        // render
                        res.render('point/point_swap_list', {
                            // 타이틀
                            title:              '스왑(SWAP)',
                            // 타이틀
                            // 데이터
                            member:         rowsMember,       // 회원
                            classlevelcss:  classlevelCSS,    // 구매등급색상
                            pointmember:    rowsPointmember,  // 포인트_회원별수량
                            point:          point,            // 포인트_구분
                            rateexp:        rateExp,          // 포인트_시세_EXP
                            ratemc:         rateMc,           // 포인트_시세_MC
                            ratemctk:       rateMctk,         // 포인트_시세_MCTK
                            ratenton:       rateNton,         // 포인트_시세_NTON
                            ratetrvt:       rateTrvt,         // 포인트_시세_TRVT
                            pointswap:      rowsPointswap     // 포인트_목록
                            // 데이터
                        });
                        // render

                    });
                    // SELECT : point_swap - 포인트_스왑

                });
                // SELECT : point_rate - 포인트_시세

            });
            // SELECT : point_member - 포인트_회원별수량

        });
        // SELECT : member - 회원

    };
    // data + session

});


module.exports = router;


// bhseo1223 nodejs : routes - point_swap_list : rkmarket_app