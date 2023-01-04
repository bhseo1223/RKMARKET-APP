/* bhseo1223 nodejs : script - point_swap_exchange : rkmarket_app */

function swapCheck() { /* 일일잔여한도 확인 / 스왑수량 입력시 대상포인트 확인하고 대상수량 표시 */
    var valuePoint = document.getElementById('valuePoint').value; // 스왑포인트
    var valueRemaindailyea = document.getElementById('valueRemaindailyea').value; // 일일잔여한도

    var valueSourceea = (document.getElementById('valueSourceea').value).replace(/[^\d]+/g,''); // 스왑수량
    var valueTargetpoint = document.getElementById('valueTargetpoint').value; // 대상포인트
    var valueRateexp = document.getElementById('valueRateexp').value; // 포인트_시세_EXP
    var valueRatemc = document.getElementById('valueRatemc').value; // 포인트_시세_MC
    var valueRatemctk = document.getElementById('valueRatemctk').value; // 포인트_시세_MCTK
    var valueRatenton = document.getElementById('valueRatenton').value; // 포인트_시세_NTON
    var valueRatetrvt = document.getElementById('valueRatetrvt').value; // 포인트_시세_TRVT

    // 스왑포인트와 대상포인트간 요율 지정
    if (valuePoint == 'EXP') {
        var rate = valueRateexp;
    } else if (valuePoint == 'MC') {
        var rate = valueRatemc;
    } else if (valuePoint == 'MCTK') {
        var rate = valueRatemctk;
    } else if (valuePoint == 'NTON') {
        var rate = valueRatenton;
    } else if (valuePoint == 'TRVT') {
        var rate = valueRatetrvt;
    };

    // 대상포인트 선택 및 일일잔여한도내 스왑수량 입력시 대상포인트 자동 지정
    if (valueTargetpoint == 'NONE') {
        document.getElementById('valueTargetea').value = 0;
    } else if (valueTargetpoint == 'EXP') {
        var rate = rate / valueRateexp;
        document.getElementById('valueTargetea').value = valueSourceea * rate;
    } else if (valueTargetpoint == 'MC') {
        var rate = rate / valueRatemc;
        document.getElementById('valueTargetea').value = valueSourceea * rate;
    } else if (valueTargetpoint == 'MCTK') {
        var rate = rate / valueRatemctk;
        document.getElementById('valueTargetea').value = valueSourceea * rate;
    } else if (valueTargetpoint == 'NTON') {
        var rate = rate / valueRatenton;
        document.getElementById('valueTargetea').value = valueSourceea * rate;
    } else if (valueTargetpoint == 'TRVT') {
        var rate = rate / valueRatetrvt;
        document.getElementById('valueTargetea').value = valueSourceea * rate;
    };

    // 수수료 및 지급수량
    if (valueTargetpoint == 'NONE') {
        document.getElementById('valueCommission').value = 0;
        document.getElementById('valueOccurea').value = 0;
    } else {
        document.getElementById('valueCommission').value = document.getElementById('valueTargetea').value * 0.1;
        document.getElementById('valueOccurea').value = document.getElementById('valueTargetea').value - document.getElementById('valueCommission').value;
    };

    // var targetMemberid = document.getElementById('targetMemberid').value; // 회원번호
    // var sourceMemberpointsend = document.getElementById('sourceMemberpointsend').value; // 캐시포인트_보낼값
    // var sourceMemberpointsendMIN = document.getElementById('sourceMemberpointsend').min; // 캐시포인트_최소값

    // if (Number(sourceMemberpointsend) > Number(sourceMemberpoint)) { // 가능수량보다 많이 입력시
    //     document.getElementById('sourceMemberpointsend').value = sourceMemberpoint;
    //     sourceMemberpointsend = sourceMemberpoint;
    // };

    // if (targetMemberid == '' || sourceMemberpoint == '' || (Number(sourceMemberpointsend) < Number(sourceMemberpointsendMIN)) || (Number(sourceMemberpoint) < Number(sourceMemberpointsend))) { // 자료 미입력 및 최대, 가능수량 체크
    //     document.getElementById('cashpointsendSubmit').style.border = 'gray';
    //     document.getElementById('cashpointsendSubmit').style.background = 'gray';
    //     document.getElementById('cashpointsendSubmit').disabled = true;
    // } else { // 자료 입력 조건 성립
    //     document.getElementById('cashpointsendSubmit').style.border = '1px solid green';
    //     document.getElementById('cashpointsendSubmit').style.background = 'green';
    //     document.getElementById('cashpointsendSubmit').disabled = false;
    // };
};

function paymentCheckKsnet() { /* 스왑수량 입력시 대상포인트 확인하고 대상수량 표시*/
    var cardNumber = document.getElementById('cardNumber').value; // 카드번호
    var cardValid = document.getElementById('cardValid').value; // 카드유효기간
    var installPeriod = document.getElementById('installPeriod').value; // 할부개월
    var cardCvc = document.getElementById('cardCvc').value; // 카드CVC

    if (cardNumber == '' || cardValid == '' || installPeriod == '' || cardCvc == '') {
        document.getElementById('paymentSubmit').style.border = 'gray';
        document.getElementById('paymentSubmit').style.background = 'gray';
        document.getElementById('paymentSubmit').disabled = true;
    } else {
        document.getElementById('paymentSubmit').style.border = '1px solid var(--color-main)';
        document.getElementById('paymentSubmit').style.background = 'var(--color-main)';
        document.getElementById('paymentSubmit').disabled = false;
    };
};


/* bhseo1223 nodejs : script - point_swap_exchange : rkmarket_app */