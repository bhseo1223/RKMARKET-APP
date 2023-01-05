// bhseo1223 nodejs : routes - point_swap : rkmarket_app

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


router.get('/point/point_swap', function(req, res) {  // url(get) : '/point/point_swap'

    // data + session
    if (req.session.memberid == undefined) { // 미로그인시

        // redirect : 강제이동
        res.redirect('/member/member_login');
        // redirect : 강제이동

    } else { // 로그인시

        // get
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

                    // SELECT : setting_limit_swap - 포인트_일일스왑한도
                    var sqlSettinglimitswap = `SELECT * FROM setting_limit_swap WHERE regdate = (SELECT MAX(regdate) FROM setting_limit_swap);`;
                    connection.query(sqlSettinglimitswap, function(err, rowsSettinglimitswap, feilds) {

                        // 일일스왑한도
                        var limitDailyExp   = rowsSettinglimitswap[0].limit_daily_exp;   // EXP 일일스왑한도
                        var limitDailyMc    = rowsSettinglimitswap[0].limit_daily_mc;    // MC 일일스왑한도
                        var limitDailyMctk  = rowsSettinglimitswap[0].limit_daily_mctk;  // MCTK 일일스왑한도
                        var limitDailyNton  = rowsSettinglimitswap[0].limit_daily_nton;  // NRON 일일스왑한도
                        var limitDailyTrvt  = rowsSettinglimitswap[0].limit_daily_trvt;  // TRVT 일일스왑한도
                        // 일일스왑한도

                        // SELECT : point_swap - 포인트_일일잔여한도
                        var sqlPointswap = `SELECT source_point, SUM(source_ea) AS useea FROM point_swap WHERE member_id = ? AND registdate = ? GROUP BY source_point`;
                        var paramsPointswap = [memberid, today];
                        connection.query(sqlPointswap, paramsPointswap, function(err, rowsPointswap, feilds) {

                            // 일일잔여한도
                            var remainDailyExp   = limitDailyExp;
                            var remainDailyMc    = limitDailyMc;
                            var remainDailyMctk  = limitDailyMctk;
                            var remainDailyNton  = limitDailyNton;
                            var remainDailyTrvt  = limitDailyTrvt;
                            var swapDailyExp     = 'Y';
                            var swapDailyMc      = 'Y';
                            var swapDailyMctk    = 'Y';
                            var swapDailyNton    = 'Y';
                            var swapDailyTrvt    = 'Y';
                            for (var i=0; rowsPointswap.length > i; i++) {
                                if (rowsPointswap[i].source_point == 'EXP') {
                                    remainDailyExp   = limitDailyExp - rowsPointswap[i].useea;   // EXP 일일잔여한도
                                    if (remainDailyExp > 0) {
                                        swapDailyExp = 'Y';
                                    } else {
                                        swapDailyExp = 'N';
                                    };
                                } else if (rowsPointswap[i].source_point == 'MC') {
                                    remainDailyMc    = limitDailyMc - rowsPointswap[i].useea;    // MC 일일잔여한도
                                    if (remainDailyMc > 0) {
                                        swapDailyMc = 'Y';
                                    } else {
                                        swapDailyMc = 'N';
                                    };
                                } else if (rowsPointswap[i].source_point == 'MCTK') {
                                    remainDailyMctk  = limitDailyMctk - rowsPointswap[i].useea;  // MCTK 일일잔여한도
                                    if (remainDailyMctk > 0) {
                                        swapDailyMctk = 'Y';
                                    } else {
                                        swapDailyMctk = 'N';
                                    };
                                } else if (rowsPointswap[i].source_point == 'NTON') {
                                    remainDailyNton  = limitDailyNton - rowsPointswap[i].useea;  // NTON 일일잔여한도
                                    if (remainDailyNton > 0) {
                                        swapDailyNton = 'Y';
                                    } else {
                                        swapDailyNton = 'N';
                                    };
                                } else if (rowsPointswap[i].source_point == 'TRVT') {
                                    remainDailyTrvt = limitDailyTrvt - rowsPointswap[i].useea;  // TRVT 일일잔여한도
                                    if (remainDailyTrvt > 0) {
                                        swapDailyTrvt = 'Y';
                                    } else {
                                        swapDailyTrvt = 'N';
                                    };
                                };
                            };
                            // 일일잔여한도

                            // render
                            res.render('point/point_swap', {
                                // 타이틀
                                title:              '스왑(SWAP)',
                                // 타이틀
                                // 데이터
                                member:           rowsMember,       // 회원
                                classlevelcss:    classlevelCSS,    // 구매등급색상
                                pointmember:      rowsPointmember,  // 포인트_회원별수량
                                rateexp:          rateExp,          // 포인트_시세_EXP
                                ratemc:           rateMc,           // 포인트_시세_MC
                                ratemctk:         rateMctk,         // 포인트_시세_MCTK
                                ratenton:         rateNton,         // 포인트_시세_NTON
                                ratetrvt:         rateTrvt,         // 포인트_시세_TRVT
                                limitdailyexp:    limitDailyExp,    // 포인트_일일스왑한도_EXP
                                limitdailymc:     limitDailyMc,     // 포인트_일일스왑한도_MC
                                limitdailymctk:   limitDailyMctk,   // 포인트_일일스왑한도_MCTK
                                limitdailynton:   limitDailyNton,   // 포인트_일일스왑한도_NTON
                                limitdailytrvt:   limitDailyTrvt,   // 포인트_일일스왑한도_TRVT
                                remaindailyexp:   remainDailyExp,   // 포인트_일일잔여한도_EXP
                                remaindailymc:    remainDailyMc,    // 포인트_일일스왑한도_MC
                                remaindailymctk:  remainDailyMctk,  // 포인트_일일잔여한도_MCTK
                                remaindailynton:  remainDailyNton,  // 포인트_일일잔여한도_NTON
                                remaindailytrvt:  remainDailyTrvt,  // 포인트_일일잔여한도_TRVT
                                swapdailyexp:     swapDailyExp,     // 포인트_일일잔여확인_EXP
                                swapdailymc:      swapDailyMc,      // 포인트_일일잔여확인_MC
                                swapdailymctk:    swapDailyMctk,    // 포인트_일일잔여확인_MCTK
                                swapdailynton:    swapDailyNton,    // 포인트_일일잔여확인_NTON
                                swapdailytrvt:    swapDailyTrvt     // 포인트_일일잔여확인_TRVT
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
            // select : point_member - 포인트_회원별수량

        });
        // select : member (회원)

    };
    // data + session

});


module.exports = router;


// bhseo1223 nodejs : routes - point_swap : rkmarket_app