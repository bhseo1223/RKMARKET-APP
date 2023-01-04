/* bhseo1223 nodejs : script - java : rkmarket_app */

function heightSizeChange(id1, id2) { /* height 변경 */
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


/* bhseo1223 nodejs : script - java : rkmarket_app */