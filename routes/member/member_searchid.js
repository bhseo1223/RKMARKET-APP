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

    // 공용
    var today   = moment().format('YYYY-MM-DD');           // 일자
    var todate  = moment().format('YYYY-MM-DD HH:mm:ss');  // 일시
    var iddate  = moment().format('YYYYMMDDHHmmssSSSS');   // 일련번호
    // 공용

    // 주의문구
    var resultCheck  = 'N';  // 아이디 찾기 결과 _ 초기화

    if (searchProcess == undefined) {
        searchProcess  = 0;
    };

    if (searchProcess == 0) { // 휴대전화번호 미입력, 인증번호 미입력

        var mobilenumberCaution  = '등록된 휴대전화번호 입력후 전송받기를 눌러 주세요.';
        var authnumberCaution    = '인증번호를 전송 받은후 진행해 주세요.';
        var resultText1          = '휴대전화 인증정보 입력중입니다.';
        var resultText2          = '반드시 등록된 번호를 입력해 주세요.';

    } else if (searchProcess == 1) { // 휴대전화번호 입력, 인증번호 미입력

        var mobilenumberCaution  = '인증하기를 진행해 주세요.';
        var authnumberCaution    = '전송받은 인증번호 입력후 인증하기를 눌러 주세요.';
        var resultText1          = '휴대전화 인증정보 입력중입니다.';
        var resultText2          = '인증번호를 발송하고 있습니다.';

    } else if (searchProcess == 2) { // 휴대전화번호 입력, 인증번호 입력

        var mobilenumberCaution  = '인증하기를 진행해 주세요.';
        var authnumberCaution    = '인증이 완료되면 인증 결과가 표시됩니다..';
        // var resultText1          = '휴대전화 인증중이니 잠시만 기다려 주세요.';
        // var resultText2          = '새로고침이나 뒤로가기를 누르지 마세요.';

        // SELECT : member_searchid - 아이디찾기_인증
        var sqlMembersearchid = `SELECT * FROM member_searchid WHERE mobilenumber = ? AND authnumber = ?`;
        var paramsMembersearchid = [mobileNumber, authNumber];
        connection.query(sqlMembersearchid, paramsMembersearchid, function(err, rowsMembersearchid, fields) {

            // 인증번호 확인
            if (rowsMembersearchid.length > 0) {

                // 사용처리 확인
                if (rowsMembersearchid[0].check_auth == 'N') { // 미사용시

                    // 시간내 인증번호 입력 : 180초
                    var checkDate = moment(rowsMembersearchid[0].senddate).add('180', 's').format('YYYY-MM-DD HH:mm:ss');

                    if (checkDate >= todate) {

                        // UPDATE : member_searchid - 사용처리
                        var sqlMembersearchidUPDATE = `UPDATE member_searchid SET check_auth = 'Y', authdate = ? WHERE id = ?`;
                        var paramsMembersearchidUPDATE = [todate, rowsMembersearchid[0].id];
                        connection.query(sqlMembersearchidUPDATE, paramsMembersearchidUPDATE, function(err, rowsMembersearchidUPDATE, fields) {});
                        // UPDATE : member_searchid - 사용처리

                        // SELECT : member - 회원정보
                        var sqlMember = `SELECT id FROM member WHERE mobilenumber = ?`;
                        var paramsMember = [mobileNumber];
                        connection.query(sqlMember, paramsMember, function(err, rowsMember, fields) {

                            // 휴대전화번호 확인
                            if (rowsMember.length > 0) {

                                resultText1  = '찾은 아이디입니다. 새로고침 하지 마세요.';
                                resultText2  = rowsMember[0].id;
                                resultCheck  = 'Y';

                            } else {

                                resultText1  = '계정없음!  처음부터 다시 진행해 주세요.';
                                resultText2  = '등록된 휴대전화번호인지 확인해 주세요.';

                            };
                            // 휴대전화번호 확인

                        });
                        // SELECT : member - 회원정보

                    } else {

                        resultText1  = '시간초과!  처음부터 다시 진행해 주세요.';
                        resultText2  = '인증번호 입력시간(3분)이 초과하였습니다.';

                    };
                    // 시간내 인증번호 입력 : 180초

                } else { // 사용시
                    
                    resultText1  = '중복인증!  처음부터 다시 진행해 주세요.';
                    resultText2  = '인증에 사용된 인증번호입니다.';

                };
                // 사용처리 확인

            } else {

                resultText1  = '인증오류!  처음부터 다시 진행해 주세요.';
                resultText2  = '전송 인증번호와 입력 인증번호가 다릅니다.';
                
            };
            // 인증번호 확인

        });
        // SELECT : member_searchid - 아이디찾기_인증

    };
    // 주의 문구

    // sync
    connection.query(`SELECT * FROM sync`, function(err, rows, fields) {
        // sync
        connection.query(`SELECT * FROM sync`, function(err, rows, fields) {

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
                resultcheck:          resultCheck,          // 결과문구_구분
                resulttext1:          resultText1,          // 결과문구1
                resulttext2:          resultText2           // 결과문구2
                // 데이터
            });
            // render

        });
        // sync
    });
    // sync

});


module.exports = router;


// bhseo1223 nodejs : routes - member_searchid : rkmarket_app