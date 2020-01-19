var tetris = document.querySelector('#tetris');
var tetrisData = [];

function makeCell() { 
    var fragment = document.createDocumentFragment();
    for(var i = 0 ; i < 20 ; i++){
        var tr = document.createElement('tr');
        fragment.appendChild('tr');
    }

    for(var j = 0 ; j < 10 ; j++){
        var td = document.createElement('td');
        tr.appendChild(td);
    }

    console.log(tetris, fragment);
    tetris.appendChild(fragment);
}

window.addEventListener('keyup', function (e) { 
    switch(e.code){
        case 'ArrowUp': // 방향 전환
            break;
        case 'ArrowDown': // 아래쪽 이동
            break;
        case 'ArrowLeft': // 왼쪽 이동
            break;
        case 'ArrowRight': // 오른쪽 이동
            break;
        case 'Space': // 한 번에 내리기
            break;
    }
});