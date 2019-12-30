var pixel = '0';
// 자바스크립트의 객체는 딕셔너리 자료구조 역할을 해줌 (1:1 매칭 표현)
var handPixel = {
    scissor : {
      hand : 'scissor',
      pixel : '0',
      value : 1,
    },
    rock : {
      hand : 'rock',
      pixel : '-190px',
      value : 2,
    },
    paper : {
      hand : 'paper',
      pixel : '-390px',
      value : 3,
    },
};

var handArray = Object.entries(handPixel);

function handPicked(indicator, by){
    return handArray.find(function(v){
        // console.log('v', v);
        // console.log('v[0]', v[0]);
        // console.log('v[1]', v[1]);
        switch (by) {
          case 'user':
            return v[0] === indicator;
          case 'computer':
            return v[1].pixel === indicator;
          default:
            return -1;
        }
    })[1];
}

function calculateResult(user, computer) {
  var userValue = user.value;
  var computerValue = computer.value;

  switch (userValue - computerValue) {
    case 0:
      alert('draw!');
      break;
    case 1: case -2:
      alert('win!');
      break;
    case -1: case 2:
      alert('lose :(');
      break;

    default:
      break;
  }
}

setInterval(function (){
    if(pixel === handPixel.scissor.pixel){
        pixel = handPixel.rock.pixel;
    }else if(pixel === handPixel.rock.pixel){
        pixel = handPixel.paper.pixel;
    }else{
        pixel = handPixel.scissor.pixel;
    }
    document.querySelector('#computer').style.background = 'url(http://www.lg-sl.net/sl_image/ALMA/ALMA2018/ALMA201804/ALMA2018040001002.jpg) ' + pixel + ' 0';
}, 70);

// calculateResult

document.querySelectorAll('.btn').forEach(function(btn){
    btn.addEventListener('click', function(){
        var userSelect = this.textContent;
        var computer = handPicked(pixel, 'computer');
        var user = handPicked(userSelect, 'user')

        calculateResult(user, computer);
        console.log(user.value, computer.value);
    });
});
