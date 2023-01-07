/* bhseo1223 nodejs : script - member_searchid : rkmarket_app */

function submitMobilenumberDiabled() { // submitMobilenumber 버튼 비활성화
    document.getElementById('submitMobilenumber').style.border = 'gray';
    document.getElementById('submitMobilenumber').style.background = 'gray';
    document.getElementById('submitMobilenumber').disabled = true;
    document.getElementById('articleMobilenumber').submit();
    document.getElementById('submitAuthnumber').style.border = 'var(--color-main)';
    document.getElementById('submitAuthnumber').style.background = 'var(--color-main)';
    document.getElementById('submitAuthnumber').disabled = false;
};

function submitAuthnumberDiabled() { // submitAuthnumber 버튼 비활성화
    document.getElementById('submitAuthnumber').style.border = 'gray';
    document.getElementById('submitAuthnumber').style.background = 'gray';
    document.getElementById('submitAuthnumber').disabled = true;
};

function submitMobilenumber() { /* 휴대전화번호 입력후 전송받기 버튼 */
    var checkSubmit = confirm('입력한 휴대전화번호로 인증번호를 발송합니다.\n인증받기를 실행하겠습니까?');
    if (checkSubmit == true) {
        document.getElementById('searchProcess').value = '1';
    } else {
        document.getElementById('searchProcess').value = '0';
    };
};


/* bhseo1223 nodejs : script - member_searchid : rkmarket_app */