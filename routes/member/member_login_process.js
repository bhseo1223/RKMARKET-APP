// bhseo1223 nodejs : routes - member_login_process : rkmarket_app

var express = require('express');
var router = express.Router();
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

    // 계정 입력 확인
    var loginCheck = 'N';   // 로그인 채크
    if (memberId == '' && memberPassword == '') {  // 아이디(회원), 비밀번호 미입력시
        var loginCaution = '아이디와 비밀번호를 입력후 로그인을 클릭하세요.';   // 주의문구
    } else if (memberId == '') {   // 아아디(회원) 미입력시
        var loginCaution = '아이디를 입력해 주세요.';   // 주의문구
    } else if (memberPassword == '') {   // 비밀번호 미입력시
        var loginCaution = '비밀번호를 입력해 주세요.';   // 주의문구
    } else {

        // 계정 정보 확인
        if (memberId == '1' && memberPassword == '1') {   // 정보 일치시
            var loginCheck = 'Y';   // 로그인 채크
        } else {   // 정보 미일치시
            var loginCaution = '아이디와 비밀번호를 확인후 다시 입력해 주세요.';   // 주의문구
        };
        // 계정 정보 확인

    };
    // 계정 입력 확인

    // // render
    // res.render('member/member_login', {
    //     // 타이틀
    //     title:              '로그인',
    //     // 타이틀
    //     // 데이터
    //     memberid:           memberId,           // 아이디(회원)
    //     memberpassword:     memberPassword,     // 비밀번호
    //     logincaution:       loginCaution        // 주의문구
    //     // 데이터
    // });
    // // render

    // 로그인 체크에 따른 페이지 이동
    if (loginCheck == 'Y') {
        // redirect
        res.redirect(`/main/main`);
        // redirect
    } else if (loginCheck == 'N') {
        // redirect
        res.redirect(`/member/member_login?memberid=${memberId}&memberpassword=&logincaution=${loginCaution}`);
        // redirect
    };
    // 로그인 체크에 따른 페이지 이동

});


module.exports = router;


// bhseo1223 nodejs : routes - member_login_process : rkmarket_app