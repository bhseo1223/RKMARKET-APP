// bhseo1223 nodejs : routes - member_searchid_sms : rkmarket_app

var express = require('express');
var router = express.Router();
var request = require('request');


router.post('/member/member_searchid_sms', function(req, res) {  // url(post) : '/member/member_searchid_sms'
    
    // post
    var mobileNumber  = req.body.mobilenumber;  // 휴대전화번호
    // post

    // API REQUEST option
    // var headers = {
    //     'Content-Type': 'application/x-www-form-urlencoded', 
    //     'User-Agent':   'Mozilla/5.0'
    //     };
    // var options = {
    //     uri:        'https://rest.surem.com/sms/v1/json',
    //     method:     'POST', 
    //     headers:    headers, 
    //     form: {
    //             usercode:       'test001',      // *슈어엠 제공 아이디 (text 30자리)
    //             deptcode:       'XX-XXX-XX',    // *슈어엠 제공 회사코드 (text 12자리))
    //             messages:       '',             // *전송할 메시지 배열 (object[])
    //             message_id:     '',             // 메시지 고유키 값 미입력시 단보전송은 1이며, 동보전송은 1씩 증가 (text 9자리), 숫자로
    //             to:             '01092502724',  // *수신받을 전화번호 (text 12자리), '-' 없이 입력
    //             text:           'test',         // *전송할 메시지 (90바이트)
    //             from:           '16618235',     // *문자에 표시될 발신번호 (text 12자리), '-' 없이 입력
    //             reserved_time:  ''              // 예약 발송시 예약시간 (YYYYMMDDhhmm - 12자리), 미입력시 즉시 전송
    //         }
    //     };
    // API REQUEST option

    // API REQUEST 실행
    // request.post(options, function(err, response, body) {

    //     // 리턴 데이터 JSON 변환
    //     var body = JSON.parse(body);

    //     var salesksnetAuthyn    = body.authyn;  // 성공여부

    // redirect
    res.redirect('/member/member_searchid?sms=Y');
    // redirect

    // });
    // API REQUEST 실행

});


module.exports = router;


// bhseo1223 nodejs : routes - member_searchid_sms : rkmarket_app