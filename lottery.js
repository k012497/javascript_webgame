var numArray =  Array(45)
                .fill()
                .map(function (element, index){
                    return index +1;
                });

var shuffle = []; // 랜덤으로 섞기
while(numArray.length>0){
    var number = numArray.splice(Math.floor(Math.random() * numArray.length), 1)[0]; 
    shuffle.push(number);
}          

var bonus = shuffle[shuffle.length - 1]; // 마지막 숫자 가져오기
var selected = shuffle.slice(0,6).sort(function (p,c){return p - c;}); // 배열 자름. 6 전까지 (0~5) 6개 

console.log(selected, bonus); // 정렬 : p - c > 0이면 순서를 바꿈

var result = document.getElementById("result"); // html element 가져오기 (id, tagname, classname로 찾음)

// 공 번호에 따른 공 색깔
function selectColorByNumber(number){
    if(number >= 1 && number < 11){
        return 'red';
    }else if (number >= 11 && number < 21){
        return '#F4A460'; //orange
    }else if (number >= 21 && number < 31){
        return 'yellow';
    }else if(number >= 31 && number < 41){
        return '#B0C4DE'; //blue
    }else if(number >= 41 && number <= 45){
        return '#8FBC8F'; // green
    }
}

function makeBall(number, color){
    var ball = document.createElement('div');
    ball.textContent = number;
    ball.style.backgroundColor = selectColorByNumber(number);
    ball.style.display = 'inline-block';
    ball.style.margin = '5px';
    ball.style.border = '1px solid black';
    ball.style.borderRadius = '10px';
    ball.style.width = '20px';
    ball.style.height = '20px';
    ball.style.textAlign = 'center';
    result.appendChild(ball);
}

// javascript는 단일 스레드 환경이기때문에 sleep 함수가 없다
function sleep(ms) {
    return new Promise(resolve=>setTimeout(resolve, ms));
}

(async function() {
    for(var i = 0 ; i < selected.length ; i++){
        makeBall(selected[i]);
        await sleep(1000);
    }

    var plus = document.createElement('div');
    plus.style.display = 'inline-block';
    plus.textContent = ' + ';
    result.appendChild(plus);

    var ball = makeBall(bonus);
})();