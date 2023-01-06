// bhseo1223 nodejs : routes - member_searchid : rkmarket_app

var express = require('express');
var router = express.Router();


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
    } else if (searchProcess == 2) {
        var mobilenumberCaution  = '인증하기를 진행해 주세요.';
        var authnumberCaution    = '인증이 완료되면 아이디가 전송됩니다.';
    } else {
        var mobilenumberCaution  = '등록된 휴대전화번호 입력후 전송받기를 눌러 주세요.';
        var authnumberCaution    = '인증번호를 받은후 진행해 주세요.';
    }
    // 주의문구

    // 결과
    var resultCode  = '11';  // 이후 데이터 확인하여 알려줄 것
    // 11 : 정상
    // 91 : 인증번호
    // 92
    if (resultCode == '11') {
        var memberId    = 'A1234567';
        var resultText  = `아이디는 ${memberId} 입니다.`;
    } else if (resultCode == '81') {
        var resultText  = `인증번호를 다시 입력해 주세요.`;
    } else if (resultCode == '91') {
        var resultText  = `인증번호를 다시 입력해 주세요.`;
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


module.exports = router;


// bhseo1223 nodejs : routes - member_searchid : rkmarket_app