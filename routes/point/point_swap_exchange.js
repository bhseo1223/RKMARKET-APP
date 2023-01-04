// bhseo1223 nodejs : routes - point_swap_exchange : rkmarket_app

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


router.get('/point/point_swap_exchange', function(req, res) {  // url(get) : '/point/point_swap_exchange'

    // data + session
    if (req.session.memberid == undefined) { // 미로그인시

        // redirect : 강제이동
        res.redirect('/member/member_login');
        // redirect : 강제이동

    } else { // 로그인시

        // get
        var point           = req.query.point;          // 포인트 구분
        var remainDailyEa   = req.query.remaindailyea;  // 포인트 일일잔여한도
        // get


        // SELECT : member - 회원
        var sqlMember = `SELECT member.hname, member.class_level, 
                    code_class_level.hname AS classlevelhname, code_class_level.color AS classlevelcolor, code_class_level.background AS classlevelbackground, 
                    point_member.cp AS membercp, point_member.point_exp AS memberpointexp, point_member.point_mc AS memberpointmc, 
                    point_member.point_mctk AS memberpointmctk, point_member.point_nton AS memberpointnton, point_member.point_trvt AS memberpointtrvt 
                FROM member 
                LEFT JOIN code_class_level ON member.class_level = code_class_level.code 
                LEFT JOIN point_member ON member.id = point_member.member_id 
                WHERE member.id = ?`;
        var paramsMember = [req.session.memberid];
        connection.query(sqlMember, paramsMember, function(err, rowsMember, fields) {

            // code_class color에 따라 color, backgroud CSS 적용
            var classlevelCSS = `"color: ${rowsMember[0].classlevelcolor}; background: ${rowsMember[0].classlevelbackground}"`
            // code_class color에 따라 color, backgroud CSS 적용

            // SELECT : point_rate - 포인트_시세
            var sqlPointrate = `SELECT * FROM point_rate WHERE regdate = (SELECT MAX(regdate) FROM point_rate)`;
            connection.query(sqlPointrate, function(err, rowsPointrate, feilds) {

                // 시세 적용
                var rateExp     = rowsPointrate[0].rate_exp;    // EXP CP시세
                var rateMc      = rowsPointrate[0].rate_mc;     // MC CP시세
                var rateMctk    = rowsPointrate[0].rate_mctk;   // MCTK CP시세
                var rateNton    = rowsPointrate[0].rate_nton;   // NRON CP시세
                var rateTrvt    = rowsPointrate[0].rate_trvt;   // TRVT CP시세
                // 시세 적용

                // SELECT : setting_limit_swap - 포인트_일일스왑한도
                var sqlSettinglimitswap = `SELECT * FROM setting_limit_swap WHERE regdate = (SELECT MAX(regdate) FROM setting_limit_swap);`;
                connection.query(sqlSettinglimitswap, function(err, rowsSettinglimitswap, feilds) {

                    // 일일스왑한도
                    var limitDailyExp   = rowsSettinglimitswap[0].limit_daily_exp;      // EXP 일일스왑한도
                    var limitDailyMc    = rowsSettinglimitswap[0].limit_daily_mc;       // MC 일일스왑한도
                    var limitDailyMctk  = rowsSettinglimitswap[0].limit_daily_mctk;     // MCTK 일일스왑한도
                    var limitDailyNton  = rowsSettinglimitswap[0].limit_daily_nton;     // NRON 일일스왑한도
                    var limitDailyTrvt  = rowsSettinglimitswap[0].limit_daily_trvt;     // TRVT 일일스왑한도
                    // 일일스왑한도

                    // SELECT : point_swap - 포인트_일일잔여한도
                    var sqlPointswap = `SELECT source_point, SUM(source_ea) AS useea FROM point_swap WHERE member_id = ? AND registdate = ? GROUP BY source_point`;
                    var paramsPointswap = [req.session.memberid, moment().format('YYYY-MM-DD')];
                    connection.query(sqlPointswap, paramsPointswap, function(err, rowsPointswap, feilds) {

                        // 일일잔여한도
                        var remainDailyExp      = limitDailyExp;
                        var remainDailyMc       = limitDailyMc;
                        var remainDailyMctk     = limitDailyMctk;
                        var remainDailyNton     = limitDailyNton;
                        var remainDailyTrvt     = limitDailyTrvt;
                        for (var i=0; rowsPointswap.length > i; i++) {
                            if (rowsPointswap[i].source_point == 'EXP') {
                                remainDailyExp  = limitDailyExp - rowsPointswap[i].useea;   // EXP 일일잔여한도
                            } else if (rowsPointswap[i].source_point == 'MC') {
                                remainDailyMc   = limitDailyMc - rowsPointswap[i].useea;    // MC 일일잔여한도
                            } else if (rowsPointswap[i].source_point == 'MCTK') {
                                remainDailyMctk = limitDailyMctk - rowsPointswap[i].useea;  // MCTK 일일잔여한도
                            } else if (rowsPointswap[i].source_point == 'NTON') {
                                remainDailyNton = limitDailyNton - rowsPointswap[i].useea;  // NTON 일일잔여한도
                            } else if (rowsPointswap[i].source_point == 'TRVT') {
                                remainDailyTrvt = limitDailyTrvt - rowsPointswap[i].useea;  // TRVT 일일잔여한도
                            };
                        };
                        // 일일잔여한도

                        // 포인트간요율
                        

                        // 포인트간요율

console.log(`${req.session.memberid} : point_swap_exchange - ${moment().format('YYYY-MM-DD HH:mm:ss')}`);

                        // render
                        res.render('point/point_swap_exchange', {
                            // 타이틀
                            title:              '스왑(SWAP)',
                            // 타이틀
                            // 데이터
                            member:             rowsMember,         // 회원
                            classlevelcss:      classlevelCSS,      // 구매등급색상
                            point:              point,              // 포인트 구분
                            remaindailyea:      remainDailyEa,      // 포인트 일일잔여한도
                            rateexp:            rateExp,            // 포인트_시세_EXP
                            ratemc:             rateMc,             // 포인트_시세_MC
                            ratemctk:           rateMctk,           // 포인트_시세_MCTK
                            ratenton:           rateNton,           // 포인트_시세_NTON
                            ratetrvt:           rateTrvt,           // 포인트_시세_TRVT
                            limitdailyexp:      limitDailyExp,      // 포인트_일일스왑한도_EXP
                            limitdailymc:       limitDailyMc,       // 포인트_일일스왑한도_MC
                            limitdailymctk:     limitDailyMctk,     // 포인트_일일스왑한도_MCTK
                            limitdailynton:     limitDailyNton,     // 포인트_일일스왑한도_NTON
                            limitdailytrvt:     limitDailyTrvt,     // 포인트_일일스왑한도_TRVT
                            remaindailyexp:     remainDailyExp,     // 포인트_일일잔여한도_EXP
                            remaindailymc:      remainDailyMc,      // 포인트_일일스왑한도_MC
                            remaindailymctk:    remainDailyMctk,    // 포인트_일일잔여한도_MCTK
                            remaindailynton:    remainDailyNton,    // 포인트_일일잔여한도_NTON
                            remaindailytrvt:    remainDailyTrvt     // 포인트_일일잔여한도_TRVT
                            // 데이터
                        });
                        // render

                    });
                    // SELECT : point_swap - 포인트_일일잔여한도

                });
                // SELECT : setting_limit_swap - 포인트_일일스왑한도

            });
            // select : point_rate - 포인트_시세

        });
        // SELECT : member - 회원

    };
    // data + session

});


module.exports = router;


// bhseo1223 nodejs : routes - point_swap_exchange : rkmarket_app