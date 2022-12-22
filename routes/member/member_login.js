// bhseo1223 nodejs : routes - member_login : rkmarket_app

var express = require('express');
var router = express.Router();
var moment = require('moment');


router.get('/member/member_login', function(req, res) {  // url(get) : '/member/member_login'
    
    // get
    // get

    // session delete
    // delete req.session.memberid;
    // delete req.session.memberhname;
    // delete req.session.isLogined;
    // session delete

    // data + session
    // req.session.save(function() {

        var loginCaution = '아이디와 비밀번호를 입력후 로그인을 눌러 주세요.' // 주의문구

        // render
        res.render('member/member_login', {
            // 타이틀
            title:              '로그인',
            // 타이틀
            // 데이터
            memberid:         '',            // 아이디(회원)
            memberpassword:   '',            // 비밀번호
            logincaution:     loginCaution   // 주의문구
            // 데이터
        });
        // render

    // });
    // data + session

});


module.exports = router;


// bhseo1223 nodejs : routes - member_login : rkmarket_app