var pixel = '0';
// 자바스크립트의 객체는 딕셔너리 자료구조 역할을 해줌 (1:1 매칭 표현)
var handPixel = {
    scissor : '0',
    rock : '-190px',
    paper : '-390px',
    example : { // 1:n도 가능
        ex1 : 1,
        ex2 : 2
    }
};

// // 딕셔너리의 단점 : 거꾸로 찾는 게 힘들다. - 다른 구조는 없나 ?
// var hand = {
//     '0' : '가위',
//     '-190px' : '바위',
//     '-390px' : '보',
// }

function computerPick(pixel){
    return Object.entries(handPixel).find(function(v){
        console.log('computerPick', v);
        return v[1] === pixel;
    });
}

setInterval(function (){
    if(pixel === handPixel.scissor){
        pixel = handPixel.rock;
    }else if(pixel === handPixel.rock){
        pixel = handPixel.paper;
    }else{
        pixel = handPixel.scissor;
    }
    document.querySelector('#computer').style.background = 'url(http://www.lg-sl.net/sl_image/ALMA/ALMA2018/ALMA201804/ALMA2018040001002.jpg) ' + pixel + ' 0';
}, 1000);

document.querySelectorAll('.btn').forEach(function(btn){
    btn.addEventListener('click', function(){
        var user = this.textContent;
        var computer = computerPick(pixel)[0];
        console.log(user, computer);
    });
});
