// bhseo1223 nodejs : routes - member_login_process : rkmarket_app

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


router.get('/member/member_login_process', function(req, res) {  // url(get) : '/member/member_login_process'

    // url 접근 = '/' 강제 이동
    res.redirect('/');
    // url 접근 = '/' 강제 이동

});

router.post('/member/member_login_process', function(req, res) {  // url(post) : '/member/member_login_process'

    // post
    var memberId         = (req.body.memberid).trim();         // 아이디(회원)
    var memberPassword   = (req.body.memberpassword).trim();   // 비밀번호
    // post

    // data + session 
    if (memberId == '' && memberPassword == '') {  // 아이디(회원), 비밀번호 미입력시

        // redirect
        res.redirect(`/member/member_login?memberid=${memberId}&memberpassword=&logincaution=아이디와 비밀번호를 입력후 로그인을 클릭하세요.`);
        // redirect

    } else if (memberId == '') {   // 아아디(회원) 미입력시

        // redirect
        res.redirect(`/member/member_login?memberid=${memberId}&memberpassword=&logincaution=아이디를 입력해 주세요.`);
        // redirect

    } else if (memberPassword == '') {   // 비밀번호 미입력시

        // redirect
        res.redirect(`/member/member_login?memberid=${memberId}&memberpassword=&logincaution=비밀번호를 입력해 주세요.`);
        // redirect

    } else {

        // 계정 확인
        var sqlMemberLOGIN = `SELECT * FROM member WHERE id = ? AND password = ?`;
        var paramsMemberLOGIN = [memberId, memberPassword];
        connection.query(sqlMemberLOGIN, paramsMemberLOGIN, function(err, rowsMemberLOGIN, fields) {

            // 로그인
            if (rowsMemberLOGIN.length == 1) { // 로그인 성공

                // session
                req.session.memberid    = rowsMemberLOGIN[0].id;    // 로그인후 아이디 부분
                req.session.memberhname = rowsMemberLOGIN[0].hname; // 로그인후 회원명 부분
                req.session.isLogined   = true;
                // session

                // log_member_loginout save
                var logmemberloginoutMemberid      = memberId;                                 // (post)log_member_loginout: member_id - 아이디(회원)
                var logmemberloginoutMemberhname   = rowsMemberLOGIN[0].hname;                 // log_member_loginout: member_hname - 회원명
                var logmemberloginoutLog           = `회원_로그인_성공`;                       // log_member_loginout: log - 로그
                var logmemberloginoutregdate       = moment().format('YYYY-MM-DD HH:mm:ss');   // log_member_loginout: logdate - 로그일시
                var sqlLogmemberINSERT = `INSERT INTO log_member_loginout(uid, member_id, member_hname, log, logdate) 
                        VALUES (null, ?, ?, ?, ?);`;
                var paramsLogmemberINSERT = [logmemberloginoutMemberid, logmemberloginoutMemberhname, logmemberloginoutLog, logmemberloginoutregdate];
                connection.query(sqlLogmemberINSERT, paramsLogmemberINSERT, function(err, rowsLogmemberINSERT, fields) {
console.log(`${req.session.memberid} : login_success - ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
                    // session save
                    req.session.save(function() {
                        res.redirect(`/main/main`);
                    });
                    // session save

                });
                // log_member_loginout save

            } else { // 로그인 실패

                // log_member_loginout save
                var logmemberloginoutMemberid      = memberId;                                 // (post)log_member_loginout: member_id - 아이디(회원)
                var logmemberloginoutMemberhname   = '';                                       // log_member_loginout: member_hname - 회원명
                var logmemberloginoutLog           = `회원_로그인_실패 오류(${memberPassword})`;    // log_member_loginout: log - 로그
                var logmemberloginoutregdate       = moment().format('YYYY-MM-DD HH:mm:ss');   // log_member_loginout: logdate - 로그일시
                var sqlLogmemberINSERT = `INSERT INTO log_member_loginout(uid, member_id, member_hname, log, logdate) 
                        VALUES (null, ?, ?, ?, ?);`;
                var paramsLogmemberINSERT = [logmemberloginoutMemberid, logmemberloginoutMemberhname, logmemberloginoutLog, logmemberloginoutregdate];
                connection.query(sqlLogmemberINSERT, paramsLogmemberINSERT, function(err, rowsLogmemberINSERT, fields) {
console.log(`${memberId} : login_fail - ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
                    // redirect
                    res.redirect(`/member/member_login?memberid=${memberId}&memberpassword=&logincaution=아이디와 비밀번호를 확인후 다시 입력해 주세요.`);
                    // redirect

                });
                // log_save

            };
            // 로그인

        });
        // 계정 확인

    };
    // data + session

});


module.exports = router;


// bhseo1223 nodejs : routes - member_login_process : rkmarket_app