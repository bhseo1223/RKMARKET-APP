/* bhseo1223 nodejs : script - point_swap_list : rkmarket_app */

function swapHeightSizeChange(id1, id2) { /* height 변경 */
    if (document.getElementById(id1).style.height == '28vw') {
        document.getElementsByClassName('points-point')[0].style.height = '28vw';
        document.getElementsByClassName('points-point')[1].style.height = '28vw';
        document.getElementsByClassName('points-point')[2].style.height = '28vw';
        document.getElementsByClassName('points-point')[3].style.height = '28vw';
        document.getElementsByClassName('points-point')[4].style.height = '28vw';
        document.getElementsByClassName('point-detail')[0].style.visibility = 'hidden';
        document.getElementsByClassName('point-detail')[1].style.visibility = 'hidden';
        document.getElementsByClassName('point-detail')[2].style.visibility = 'hidden';
        document.getElementsByClassName('point-detail')[3].style.visibility = 'hidden';
        document.getElementsByClassName('point-detail')[4].style.visibility = 'hidden';
        document.getElementById(id1).style.height = '48vw';
        document.getElementById(id2).style.visibility = 'visible';
    } else {
        document.getElementById(id1).style.height = '28vw';
        document.getElementById(id2).style.visibility = 'hidden';
    };
};

function swapCheck() { /* 일일잔여한도 확인 / 스왑수량 입력시 대상포인트 확인하고 대상수량 표시 */
    var valuePoint          = document.getElementById('valuePoint').value;          // 스왑포인트
    var valueRemaindailyea  = document.getElementById('valueRemaindailyea').value;  // 일일잔여한도
    var valueSourceea       = document.getElementById('valueSourceea').value;       // 스왑수량
    var valueTargetpoint    = document.getElementById('valueTargetpoint').value;    // 대상포인트
    var valueOwnexp         = document.getElementById('valueOwnexp').value;         // 포인트_보유량_EXP
    var valueOwnmc          = document.getElementById('valueOwnmc').value;          // 포인트_보유량_MC
    var valueOwnmctk        = document.getElementById('valueOwnmctk').value;        // 포인트_보유량_MCTK
    var valueOwnnton        = document.getElementById('valueOwnnton').value;        // 포인트_보유량_NTON
    var valueOwntrvt        = document.getElementById('valueOwntrvt').value;        // 포인트_보유량_TRVT
    var valueRateexp        = document.getElementById('valueRateexp').value;        // 포인트_시세_EXP
    var valueRatemc         = document.getElementById('valueRatemc').value;         // 포인트_시세_MC
    var valueRatemctk       = document.getElementById('valueRatemctk').value;       // 포인트_시세_MCTK
    var valueRatenton       = document.getElementById('valueRatenton').value;       // 포인트_시세_NTON
    var valueRatetrvt       = document.getElementById('valueRatetrvt').value;       // 포인트_시세_TRVT

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

    // 스왑포인트 소수점 제거
    valueSourceea = Math.floor(valueSourceea);
    document.getElementById('valueSourceea').value = valueSourceea;

    // 스왑포인트 일일잔여한도 적용

    // 스왑포인트 보유량한도 적용
    if (valuePoint == 'EXP' && Number(valueSourceea) > Number(valueOwnexp)) {
        valueSourceea = valueOwnexp;
    } else if (valuePoint == 'MC' && Number(valueSourceea) > Number(valueOwnmc)) {
        valueSourceea = valueOwnmc;
    } else if (valuePoint == 'MCTK' && Number(valueSourceea) > Number(valueOwnmctk)) {
        valueSourceea = valueOwnmctk;
    } else if (valuePoint == 'NTON' && Number(valueSourceea) > Number(valueOwnnton)) {
        valueSourceea = valueOwnnton;
    } else if (valuePoint == 'TRVT' && Number(valueSourceea) > Number(valueOwntrvt)) {
        valueSourceea = valueOwntrvt;
    };
    if (Number(valueSourceea) > Number(valueRemaindailyea)) {
        valueSourceea = valueRemaindailyea;
    };
    document.getElementById('valueSourceea').value = valueSourceea;

    // 대상포인트 선택 및 일일잔여한도내 스왑수량 입력시 대상포인트 자동 지정
    if (valueTargetpoint == 'NONE') {
        var rate = 0.0000;
        document.getElementById('valueTargetea').value = 0.0000.toFixed(4);
    } else if (valueTargetpoint == 'EXP') {
        var rate = (rate / valueRateexp).toFixed(4);
        document.getElementById('valueOccurea').style.color = 'navy';
    } else if (valueTargetpoint == 'MC') {
        var rate = (rate / valueRatemc).toFixed(4);
        document.getElementById('valueOccurea').style.color = 'green';
    } else if (valueTargetpoint == 'MCTK') {
        var rate = (rate / valueRatemctk).toFixed(4);
        document.getElementById('valueOccurea').style.color = 'green';
    } else if (valueTargetpoint == 'NTON') {
        var rate = (rate / valueRatenton).toFixed(4);
        document.getElementById('valueOccurea').style.color = 'darkcyan';
    } else if (valueTargetpoint == 'TRVT') {
        var rate = (rate / valueRatetrvt).toFixed(4);
        document.getElementById('valueOccurea').style.color = 'purple';
    };

    // 수수료 및 지급수량
    if (valueTargetpoint == 'NONE') {
        var valueTargetea = 0.0000;
        var valueSwaprate = '';
        var valueCommission = 0.0000;
        var valueOccurea = 0.0000;
        document.getElementById('valueTargetea').value = 0.0000.toFixed(4);
        document.getElementById('valueSwaprate').value = '';
        document.getElementById('valueCommission').value = 0.0000.toFixed(4);
        document.getElementById('valueOccurea').value = 0.0000.toFixed(4);
    } else {
        var valueTargetea = valueSourceea * rate;
        var valueTargeteaLeft = (valueTargetea.toFixed(4)).split('.')[0];
        var valueTargeteaRight = (valueTargetea.toFixed(4)).split('.')[1];
        var valueSwaprate = '1 : ' + rate;
        var valueCommission = valueSourceea * rate * 0.1;
        var valueCommissionLeft = (valueCommission.toFixed(4)).split('.')[0];
        var valueCommissionRight = (valueCommission.toFixed(4)).split('.')[1];
        var valueOccurea = valueTargetea - valueCommission;
        var valueOccureaLeft = (valueOccurea.toFixed(4)).split('.')[0];
        var valueOccureaRight = (valueOccurea.toFixed(4)).split('.')[1];
        document.getElementById('valueTargetea').value = Number(valueTargeteaLeft).toLocaleString() + '.' + (valueTargeteaRight + '0000').substr(0,4);
        document.getElementById('valueSwaprate').value = valueSwaprate;
        document.getElementById('valueCommission').value = Number(valueCommissionLeft).toLocaleString() + '.' + (valueCommissionRight + '0000').substr(0,4);
        document.getElementById('valueOccurea').value = Number(valueOccureaLeft).toLocaleString() + '.' + (valueOccureaRight + '0000').substr(0,4);
    };

    // 지급수량 확인후 스왑버튼 활성화
    if (valueOccurea > 0) {
        document.getElementById('buttonSubmit').style.background = 'var(--color-point)';
        document.getElementById('buttonSubmit').disabled = false;
    } else {
        document.getElementById('buttonSubmit').style.background = 'gray';
        document.getElementById('buttonSubmit').disabled = true;
    };
};

function buttonSubmitInsert() { /* 스왑하기 */
    var checkSubmit = confirm('포인트를 스왑합니다.\n스왑을 실행하겠습니까?');
    return checkSubmit;
};


/* bhseo1223 nodejs : script - point_swap_list : rkmarket_app */