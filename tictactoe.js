var turnMark = 'X';
var turnFlag = true;
var markedCount = 0;

// 칸 만들기
var body = document.body;
var table = document.createElement('table');
var cells = [];

// 게임 종료
function terminateGame(message){
    alert(message);

    //reset
    turnMark = 'X';
    turnFlag = true;
    markedCount = 0;

    for (var i = 0; i < 3; i++) {
        for(var j = 0 ; j < 3; j++){
            cells[i][j].textContent = '';
            cells[i][j].style.backgroundColor = 'white'
        }
    }
}

// 차례에 맞게 마킹
var async = function (event) {
    // 빈칸일 경우만 마킹
    if (event.target.textContent === '') {
        event.target.textContent = turnMark;
        event.target.style.backgroundColor = 'lightgray';
        markedCount++;

        if(markedCount === 9){
            terminateGame('무승부!');
            return;
        }

        // 한 줄이 같은 마크일 때 승리
        for (var i = 0; i < 3; i++) {
            if (cells[i][0].textContent === turnMark
                && cells[i][1].textContent === turnMark
                && cells[i][2].textContent === turnMark) {
                // 가로
                terminateGame(turnMark + '의 승리');
                return;
            } else if (cells[0][i].textContent === turnMark
                && cells[1][i].textContent === turnMark
                && cells[2][i].textContent === turnMark) {
                // 세로
                terminateGame(turnMark + '의 승리');
                return;
            } 
        }
        // 대각선
        if((cells[0][0].textContent === turnMark
            && cells[1][1].textContent === turnMark
            && cells[2][2].textContent === turnMark) 
            || (cells[0][2].textContent === turnMark
                && cells[1][1].textContent === turnMark
                && cells[2][0].textContent === turnMark)){ 
            terminateGame(turnMark + '의 승리');
            return;
        }

        // 턴 바꿈
        if (turnFlag) {
            turnMark = 'O';
        } else {
            turnMark = 'X';
        }
        turnFlag = !turnFlag;
    }
};

for (var i = 1; i <= 3; i++) {
    var row = document.createElement('tr');
    cells.push([]);
    for (var j = 1; j <= 3; j++) {
        var column = document.createElement('td');
        column.addEventListener('click', async);
        row.appendChild(column);
        cells[i - 1].push(column);
    }
    table.appendChild(row);
}
body.appendChild(table);
console.log(cells);