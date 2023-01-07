// bhseo1223 nodejs : routes - point_swap_exchange_process_process : rkmarket_app

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


router.get('/point/point_swap_exchange_process', function(req, res) { // url(get) : '/point/point_swap_exchange_process'

    // url 접근 - '/' 강제 이동
    res.redirect('/');
    // url 접근 - '/' 강제 이동

});

router.post('/point/point_swap_exchange_process', function(req, res) { // url(post) : '/point/point_swap_exchange_process'

    // data + session
    if (req.session.memberid == undefined) { // 미로그인시

        // redirect : 강제이동
        res.redirect('/member/member_login');
        // redirect : 강제이동

    } else { // 로그인시

        // post
        var rateExp         = req.body.valuerateexp;         // 시세_EXP
        var rateMc          = req.body.valueratemc;          // 시세_MC
        var rateMctk        = req.body.valueratemctk;        // 시세_MCTK
        var rateNton        = req.body.valueratenton;        // 시세_NTON
        var rateTrvt        = req.body.valueratetrvt;        // 시세_TRVT
        var limitDailyExp   = req.body.valuelimitdailyexp;   // 일일스왑한도_EXP
        var limitDailyMc    = req.body.valuelimitdailyemc;   // 일일스왑한도_MC
        var limitDailyMctk  = req.body.valuelimitdailymctk;  // 일일스왑한도_MCTK
        var limitDailyNton  = req.body.valuelimitdailynton;  // 일일스왑한도_NTON
        var limitDailyTrvt  = req.body.valuelimitdailytrvt;  // 일일스왑한도_TRVT
        var remainDaily     = req.body.valueremaindailyea;   // 일일잔여한도

        var sourcePoint     = req.body.valuepoint;           // 스왑포인트
        var sourceEa        = req.body.valuesourceea;        // 스왑수량
        var targetPoint     = req.body.valuetargetpoint;     // 대상포인트
        var targetEa        = req.body.valuetargetea;        // 대상수량
        var swapRate        = req.body.valueswaprate;        // 스왑요율
        var commissionRate  = req.body.valuecommissionrate;  // 수수료율
        var commission      = req.body.valuecommission;      // 수수료
        var occurEa         = req.body.valueoccurea;         // 지급수량
        // post
        
        // post : 스왑포인트
        if (sourcePoint == 'EXP') {
            var sourceRate = rateExp;
            var limitDaily = limitDailyExp;
        } else if (sourcePoint == 'MC') {
            var sourceRate = rateMc;
            var limitDaily = limitDailyMc;
        } else if (sourcePoint == 'MCTK') {
            var sourceRate = rateMctk;
            var limitDaily = limitDailyMctk;
        } else if (sourcePoint == 'NTON') {
            var sourceRate = rateNton;
            var limitDaily = limitDailyNton;
        } else if (sourcePoint == 'TRVT') {
            var sourceRate = rateTrvt;
            var limitDaily = limitDailyTrvt;
        };
        // post : 스왑포인트
        // post : 대상포인트
        if (targetPoint == 'EXP') {
            var targetRate = rateExp;
        } else if (targetPoint == 'MC') {
            var targetRate = rateMc;
        } else if (targetPoint == 'MCTK') {
            var targetRate = rateMctk;
        } else if (targetPoint == 'NTON') {
            var targetRate = rateNton;
        } else if (targetPoint == 'TRVT') {
            var targetRate = rateTrvt;
        };
        // post : 대상포인트
        // post : 스왑요율
        swapRate = swapRate.substring(4);
        // post : 스왑요율

        // 공용
        var memberid     = req.session.memberid;                    // 아이디(회원)
        var memberhname  = req.session.memberhname;                 // 회원명(회원)
        var today        = moment().format('YYYY-MM-DD');           // 일자
        var todate       = moment().format('YYYY-MM-DD HH:mm:ss');  // 일시
        var iddate       = moment().format('YYYYMMDDHHmmssSSSS');   // 일련번호
        // 공용

        // 검증 : 스왑을 다른 기기에서 했을 경우 확인하고 잔여가 다를 경우 처음으로 돌아감

        // SELECT : point_swap - 포인트_일일잔여한도
        var sqlPointswap = `SELECT SUM(source_ea) AS useea FROM point_swap WHERE member_id = ? AND registdate = ? AND source_point = ?`;
        var paramsPointswap = [memberid, today, sourcePoint];
        connection.query(sqlPointswap, paramsPointswap, function(err, rowsPointswap, feilds) {

            // 일일잔여한도
            var remainCheck = rowsPointswap[0].useea;
            if (remainCheck == null) {
                remainCheck = limitDaily;
            } else {
                remainCheck = limitDaily - remainCheck;
            };
            // 일일잔여한도

            // 일일잔여한도 확인
            if (remainDaily == remainCheck) {

                // INSERT point_swap - data
                var pointswapId              = `PT${iddate}${memberid}`;     // point_swap: uid - 일련번호 
                var pointswapMemberid        = memberid;                     // point_swap: uid - 아이디(회원)
                var pointswapSourcepoint     = sourcePoint;                  // (post)point_swap: source_point - 스왑포인트
                var pointswapSourceea        = sourceEa.replace(',','');     // (post)point_swap: source_ea - 스왑수량
                var pointswapSourcerate      = sourceRate.replace(',','');   // (post)point_swap: source_rate - 스왑시세
                var pointswapTargetpoint     = targetPoint;                  // (post)point_swap: target_point - 대상포인트
                var pointswapTargetea        = targetEa.replace(',','');     // (post)point_swap: target_ea - 대상수량
                var pointswapTargetrate      = targetRate.replace(',','');   // (post)point_swap: target_rate - 대상시세
                var pointswapSwaprate        = swapRate.replace(',','');     // (post)point_swap: swap_rate - 스왑요율
                // var pointswapCommissionrate  = commissionRate;  // (post)point_swap: commission_rate - 수수료율
                    var pointswapCommissionrate  = 0.1000;  // (post)point_swap: commission_rate - 수수료율
                var pointswapCommission      = commission.replace(',','');   // (post)point_swap: commission - 수수료
                var pointswapOccurea         = occurEa.replace(',','');      // (post)point_swap: occur_ea - 지급수량
                var pointswapRegistdate      = today;                        // point_swap: registdate - 등록일자
                var pointswapMemo            = '';                           // point_swap: memo - 메모
                var pointswapReguserid       = 'user';                       // point_swap: reguserid - 등록아이디(사용자)
                var pointswapRegdate         = todate;                       // point_swap: regdate - 등록일시
                var pointswapEdituserid      = '';                           // point_swap: reguserid - 수정아이디(사용자)
                var pointswapEditdate        = '';                           // point_swap: regdate - 수정일시
                // INSERT point_swap - data

                // INSERT : point_swap - 포인트_스왑
                var sqlPointswapINSERT = `INSERT INTO point_swap
                            (id, member_id, 
                            source_point, source_ea, source_rate, 
                            target_point, target_ea, target_rate, 
                            swap_rate, commission_rate, commission, occur_ea, 
                            registdate, memo, reguserid, regdate, edituserid, editdate) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                var paramsPointswapINSERT = [
                        pointswapId, pointswapMemberid, 
                        pointswapSourcepoint, pointswapSourceea, pointswapSourcerate, 
                        pointswapTargetpoint, pointswapTargetea, pointswapTargetrate, 
                        pointswapSwaprate, pointswapCommissionrate, pointswapCommission, pointswapOccurea, 
                        pointswapRegistdate, pointswapMemo, pointswapReguserid, pointswapRegdate, pointswapEdituserid, pointswapEditdate];
                connection.query(sqlPointswapINSERT, paramsPointswapINSERT, function(err, rowsPointswapINSERT, feilds) {

                    // SELECT : point_member - 포인트_회원별수량
                    var sqlPointmember = `SELECT * FROM point_member WHERE regdate = (SELECT MAX(regdate) FROM point_member WHERE member_id = ?);`;
                    var paramsPointmember = [memberid];
                    connection.query(sqlPointmember, paramsPointmember, function(err, rowsPointmember, feilds) {

                        // 데이터 가감
                        var pointmemberCp         = rowsPointmember[0].cp;
                        var pointmemberPointexp   = rowsPointmember[0].point_exp;
                        var pointmemberPointmc    = rowsPointmember[0].point_mc;
                        var pointmemberPointmctk  = rowsPointmember[0].point_mctk;
                        var pointmemberPointnton  = rowsPointmember[0].point_nton;
                        var pointmemberPointtrvt  = rowsPointmember[0].point_trvt;
                        if (pointswapSourcepoint == 'EXP') {
                            pointmemberPointexp   = pointmemberPointexp - pointswapSourceea;
                        } else if (pointswapSourcepoint == 'MC') {
                            pointmemberPointmc    = pointmemberPointmc - pointswapSourceea;
                        } else if (pointswapSourcepoint == 'MCTK') {
                            pointmemberPointmctk  = pointmemberPointmctk - pointswapSourceea;
                        } else if (pointswapSourcepoint == 'NTON') {
                            pointmemberPointnton  = pointmemberPointnton - pointswapSourceea;
                        } else if (pointswapSourcepoint == 'TRVT') {
                            pointmemberPointtrvt  = pointmemberPointtrvt - pointswapSourceea;
                        };
                        if (pointswapTargetpoint == 'EXP') {
                            pointmemberPointexp   = pointmemberPointexp + Number(pointswapOccurea);
                        } else if (pointswapTargetpoint == 'MC') {
                            pointmemberPointmc    = pointmemberPointmc + Number(pointswapOccurea);
                        } else if (pointswapTargetpoint == 'MCTK') {
                            pointmemberPointmctk  = pointmemberPointmctk + Number(pointswapOccurea);
                        } else if (pointswapTargetpoint == 'NTON') {
                            pointmemberPointnton  = pointmemberPointnton + Number(pointswapOccurea);
                        } else if (pointswapTargetpoint == 'TRVT') {
                            pointmemberPointtrvt  = pointmemberPointtrvt + Number(pointswapOccurea);
                        };
                        // 데이터 가감

                        // INSERT point_member - data
                        var pointmemberId          = `PM${iddate}${memberid}`;  // point_member: uid - 일련번호 
                        var pointmemberMemberid    = memberid;                  // point_member: uid - 아이디(회원)
                         // pointmemberCp          = pointmemberCp;             // (data)point_member: cp - 캐시포인트
                         // pointmemberPointexp    = pointmemberPointexp;       // (data)point_member: point_exp - 포인트_EXP
                         // pointmemberPointmc     = pointmemberPointmc;        // (data)point_member: point_mc - 포인트_MC
                         // pointmemberPointmctk   = pointmemberPointmctk;      // (data)point_member: point_mctk - 포인트_MCTK
                         // pointmemberPointnton   = pointmemberPointnton;      // (data)point_member: point_nton - 포인트_NTON
                         // pointmemberPointtrvt   = pointmemberPointtrvt;      // (data)point_member: point_trvt - 포인트_TRVT
                        var pointmemberRegistdate  = today;                     // point_member: registdate - 등록일자
                        var pointmemberMemo        = '';                        // point_member: memo - 메모
                        var pointmemberReguserid   = 'user';                    // point_member: reguserid - 등록아이디(사용자)
                        var pointmemberRegdate     = todate;                    // point_member: regdate - 등록일시
                        var pointmemberEdituserid  = '';                        // point_member: reguserid - 수정아이디(사용자)
                        var pointmemberEditdate    = '';                        // point_member: regdate - 수정일시
                        // INSERT point_member - data

                        // INSERT : point_member - 포린트_회원별수량
                        var sqlPointmemberINSERT = `INSERT INTO point_member
                                    (id, member_id, 
                                    cp, point_exp, point_mc, point_mctk, point_nton, point_trvt, 
                                    registdate, memo, reguserid, regdate, edituserid, editdate) 
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                        var paramsPointmemberINSERT = [
                                pointmemberId, pointmemberMemberid, 
                                pointmemberCp, pointmemberPointexp, pointmemberPointmc, pointmemberPointmctk, pointmemberPointnton, pointmemberPointtrvt, 
                                pointmemberRegistdate, pointmemberMemo, pointmemberReguserid, pointmemberRegdate, pointmemberEdituserid, pointmemberEditdate];
                        var logpointTable  = `point_swap, point_member`;  // 로그
                        var logpointLog    = `point_swap : 성공(일련번호_${pointswapId}_${pointmemberId})`;  // 로그
                        connection.query(sqlPointmemberINSERT, paramsPointmemberINSERT, function(err, rowsPointmemberINSERT, feilds) {

console.log(paramsPointmemberINSERT)

                            // log_point save
                            var logpointMemberid      = memberid;       // (session)log_point: member_id - 아이디(회원)
                            var logpointMemberhname   = memberhname;    // log_point: member_hname - 회원명
                             // logpointTable         = logpointTable;  // log_point: table- 테이블 
                             // logpointLog           = logpointLog;    // log_point: log - 로그
                            var logpointregdate       = todate;         // log_point: logdate - 로그일시
                            var sqlLogpointINSERT = `INSERT INTO log_point(uid, member_id, member_hname, table, log, logdate) 
                                    VALUES (null, ?, ?, ?, ?, ?);`;
                            var paramsLogpointINSERT = [logpointMemberid, logpointMemberhname, logpointTable, logpointLog, logpointregdate];
                            connection.query(sqlLogpointINSERT, paramsLogpointINSERT, function(err, rowsLogpointINSERT, fields) {

                                // redirect
                                res.redirect(`/point/point_swap`);
                                // redirect

                            });
                            // log_point save

                        });
                        // INSERT : point_member - 포린트_회원별수량

                    });
                    // SELECT : point_member - 포인트_회원별수량

                });
                // INSERT : point_swap - 포인트_스왑

            } else {

                // log_point save
                var logpointMemberid      = memberid;                       // (session)log_point: member_id - 아이디(회원)
                var logpointMemberhname   = memberhname;                    // log_point: member_hname - 회원명
                var logpointLog           = `point_swap : 실패(잔여상이)`;  // log_point: log - 로그
                var logpointregdate       = todate;                         // log_point: logdate - 로그일시
                var sqlLogpointINSERT = `INSERT INTO log_point(uid, member_id, member_hname, log, logdate) 
                        VALUES (null, ?, ?, ?, ?);`;
                var paramsLogpointINSERT = [logpointMemberid, logpointMemberhname, logpointLog, logpointregdate];
                connection.query(sqlLogpointINSERT, paramsLogpointINSERT, function(err, rowsLogpointINSERT, fields) {

                    // 리턴
                    var changeCaution = '일일잔여한도가 상이합니다!';
                    res.send(`<script>alert('${changeCaution}'); history.go(-2);</script>`)
                    // 리턴

                });
                // log_point save

            };
            // 일일잔여한도 확인

        });
        // SELECT : point_swap - 포인트_일일잔여한도

    };
    // data + session

});


module.exports = router;


// bhseo1223 nodejs : routes - point_swap_exchange_process : rkmarket_app