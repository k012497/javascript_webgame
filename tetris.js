var tetris = document.querySelector('#tetris');
var startBtn = document.querySelector('#start');
var stopBtn = document.querySelector('#stop');
var blockDict = { // 색상, 움직일 수 있는지 여부, 블럭의 모양
    0: ['white', false, []], // 빈 칸
    1: ['red', true, [
        [1, 1],
        [1, 1]],
    ],
    2: ['green', true, [
        [0, 2, 0],
        [2, 2, 2],
    ]], 
    3: ['orange', true, [
        [3, 3, 0],
        [0, 3, 3],
    ]], 
    4: ['navy', true, [
        [0, 4, 4],
        [4, 4, 0],
    ]],
    5: ['yellowgreen', true, [
        [5, 0, 0],
        [5, 5, 5],
    ]],
    6: ['violet', true, [
        [0, 0, 6],
        [6, 6, 6],
    ]],
    7: ['yellow', true, [
        [7, 7, 7, 7],
    ]],
    10: ['red', false, []],
    20: ['green', false, []],
    30: ['orange', false, []],
    40: ['navy', false, []],
    50: ['yellowgreen', false, []],
    60: ['violet', false, []],
    70: ['yellow', false, []],
};
var tetrisData = [];
var stopDown = false;


function makeCell() { 
    var fragment = document.createDocumentFragment();
    for(var i = 0 ; i < 20 ; i++){
        var tr = document.createElement('tr');
        var arr = [];
        tetrisData.push(arr);
        fragment.appendChild(tr);
        for(var j = 0 ; j < 10 ; j++){
            var td = document.createElement('td');
            tr.appendChild(td);
        }
    }
    // console.log(tetris, fragment);
    tetris.appendChild(fragment);
}

function drwaing(){
    tetrisData.forEach(function (tr, i) {  // 행의 값(tr)과 행의 인덱스(i)
        tr.forEach(function (td, j){ // 열의 값(td)과 열의 인덱스(j)
            tetris.children[i].children[j].className = blockDict[td][0];
            console.log(td, i, j, blockDict[td][0]);
        });
    });
}

function blockMaker(){
    var block = blockDict[Math.floor(Math.random() * 7) + 1][2]; // 랜덤 블럭 모양 
    console.log(block);
    block.forEach(function (tr, i) { 
        tr.forEach(function (td, j) { 
            // TODO: 이미 다 차있을 경우 게임 오버 
            tetrisData[i][j + 3] = td;
        });
    });
    drwaing();
}

function tick() { 
    // 비효율적이지만 전체 화면 새로 그리기
    // 밑 줄부터 검사하는 포문
    for (var i = tetrisData.length - 1 ; i >= 0 ; i--){
        tetrisData[i].forEach(function (td, j) { 
            if (td > 0 && td < 10){ // 왜 10?
                if (tetrisData[i + 1] && !stopDown){
                    console.log("td", td, "tetrisData[i + 1][j]", tetrisData[i + 1][j]);
                    tetrisData[i + 1][j] = td;
                    tetrisData[i][j] = 0;
                } else {
                    // 더이상 내려갈 칸이 없을 때 블럭 고정 (빈 공간에 고정 / 블럭 사이에 고정)
                    stopDown = true;
                    tetrisData[i][j] = td * 10;
                }
            }
        });
    }
    if(stopDown){
        stopDown = false;
        blockMaker();
    }
    drwaing(); // 데이터와 화면 일치
}



window.addEventListener('keydown', function (e) { 
    switch(e.code){
        case 'ArrowDown': // 아래쪽 이동
            break;
        case 'ArrowLeft': // 왼쪽 이동
            break;
        case 'ArrowRight': // 오른쪽 이동
            break;
        default : 
            break;
    }
});

window.addEventListener('keyup', function (e) { 
    switch(e.code){
        case 'ArrowUp': // 방향 전환
            break;
        case 'Space': // 한 번에 내리기
            break;
        default : 
            break;
    }
});

makeCell();
blockMaker();
var tick = setInterval(tick, 100);