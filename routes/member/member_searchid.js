// bhseo1223 nodejs : routes - member_searchid : rkmarket_app

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


router.get('/member/member_searchid', function(req, res) {  // url(get) : '/member/member_searchid'
    
    // get
    var searchProcess  = req.query.searchprocess;  // 인증프로세스
    var mobileNumber   = req.query.mobilenumber;   // 휴대전화번호
    var authNumber     = req.query.authnumber;     // 인증번호
    // get

    // 주의문구
    if (searchProcess == 1) {
        var mobilenumberCaution  = '인증하기를 진행해 주세요.';
        var authnumberCaution    = '전송받은 인증번호 입력후 인증하기를 눌러 주세요.';
        var resultText           = `휴대전화 인증을 완료해 주세요.`;

        // render : searchProcess != 2
        res.render('member/member_searchid', {
            // 타이틀
            title:                '아이디찾기',
            // 타이틀
            // 데이터
            searchprocess:        searchProcess,        // 인증프로세스
            mobilenumber:         mobileNumber,         // 휴대전화번호
            authnumber:           authNumber,           // 인증번호
            mobilenumbercaution:  mobilenumberCaution,  // 주의문구_휴대전화번호
            authnumbercaution:    authnumberCaution,    // 주의문구_인증번호
            resulttext:           resultText            // 결과문구
            // 데이터
        });
        // render

    } else if (searchProcess == 2) {
        var mobilenumberCaution  = '인증하기를 진행해 주세요.';
        var authnumberCaution    = '인증이 완료되면 아이디가 전송됩니다.';

        // SELECT : member - 회원
        var sqlMember = `SELECT id FROM member WHERE mobilenumber = ?`;
        var paramsMember = [mobileNumber];
        connection.query(sqlMember, paramsMember, function(err, rowsMember, fields) {

            // 결과
            if (rowsMember.length > 0) {
                var resultText  = `아이디는 [ ${rowsMember[0].id} ] 입니다.`;
            } else {
                var resultText  = `입력한 휴대전화번호로 찾은 아이디가 없습니다.`;
            };
            // 결과

            // render
            res.render('member/member_searchid', {
                // 타이틀
                title:                '아이디찾기',
                // 타이틀
                // 데이터
                searchprocess:        searchProcess,        // 인증프로세스
                mobilenumber:         mobileNumber,         // 휴대전화번호
                authnumber:           authNumber,           // 인증번호
                mobilenumbercaution:  mobilenumberCaution,  // 주의문구_휴대전화번호
                authnumbercaution:    authnumberCaution,    // 주의문구_인증번호
                resulttext:           resultText            // 결과문구
                // 데이터
            });
            // render

        });
        // SELECT : member - 회원

    } else {
        var mobilenumberCaution  = '등록된 휴대전화번호 입력후 전송받기를 눌러 주세요.';
        var authnumberCaution    = '인증번호를 받은후 진행해 주세요.';
        var resultText           = `휴대전화 인증을 완료해 주세요.`;

        // render : searchProcess != 2
        res.render('member/member_searchid', {
            // 타이틀
            title:                '아이디찾기',
            // 타이틀
            // 데이터
            searchprocess:        searchProcess,        // 인증프로세스
            mobilenumber:         mobileNumber,         // 휴대전화번호
            authnumber:           authNumber,           // 인증번호
            mobilenumbercaution:  mobilenumberCaution,  // 주의문구_휴대전화번호
            authnumbercaution:    authnumberCaution,    // 주의문구_인증번호
            resulttext:           resultText            // 결과문구
            // 데이터
        });
        // render

    };
    // 주의문구

});


module.exports = router;


// bhseo1223 nodejs : routes - member_searchid : rkmarket_app