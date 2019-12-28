var body = document.body;
var numArray;

newAnswer();

var result = document.createElement('h1');
var input = document.createElement('input');
var form = document.createElement('form');
var button = document.createElement('button');

input.maxLength = 4;
form.type = 'number';
button.textContent = 'enter';

body.append(result);
body.append(form);
form.append(input);
form.append(button);

var count = 0;
form.addEventListener('submit', function async(event){ // 엔터를 쳤을 때 - 비동기
    event.preventDefault(); // submit의 기본 기능인 새로고침 막기
    var answer = input.value;
    var correctAnswer = numArray.join('');
    console.log(answer, numArray, correctAnswer, answer === correctAnswer);

    if(answer == correctAnswer){
        // 답이 맞았을 때
        count = 0;
        result.textContent = '홈런 ~ ⚾️';
        alert("딩동댕");
        input.textContent = '';
        input.focus();
        newAnswer();
    }else{
        // 답이 틀렸을 때 
        count++;
        var answerArray = answer.split('');
        var strike = 0;
        var ball = 0;

        if(count > 10){
            result.textContent = '틀린 횟수 10번 초과! 😭 답은 ' + numArray.join(', ') + '입니다.';
            count = 0;
        } else {
            for(var i = 0 ; i < 4 ; i++){
                var number = Number(answerArray[i]);
                if( number === numArray[i]){
                    strike++;
                    console.log(strike + 'strike');
                }else if(numArray.indexOf(number) != -1){
                    ball++;
                    console.log(ball + 'ball');
                }
                console.log(number + ' ' + numArray[i], number === numArray[i], numArray.indexOf(number));
            }
            result.textContent = strike + '스트라이크 ' + ball + '볼';
            input.textContent = '';
            input.focus();
            alert("땡");
        }
    }
});

function newAnswer(){
    var number = [1,2,3,4,5,6,7,8,9];
    numArray = [];
    
    for(var i = 0 ; i < 4 ; i++){
        var picked = number.splice(Math.floor(Math.random() * number.length), 1)[0];
        numArray.push(picked);
    }

    console.log(numArray);
}
