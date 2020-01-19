var table = document.getElementById('table');
var score = document.getElementById('score');
var data = [];

function initSetting(param){ 
    table.innerHTML = '';
    score.textContent = '0';
    var fragment = document.createDocumentFragment(); // 화면에 바로 추가하지 않고 프래그먼트(메모리) 이용
    [1, 2, 3, 4].forEach(function(){
        var colData = [];
        data.push(colData);
        var tr = document.createElement('tr');
        [1, 2, 3, 4].forEach(function () { 
            colData.push(0);
            var td = document.createElement('td');
            tr.appendChild(td);
         });
         fragment.appendChild(tr);
    });
    table.appendChild(fragment);
}

function makeRandomCell(){
    var blankArray = [];
    data.forEach(function(colData, i){
        colData.forEach(function (rowData, j) { 
            if(!rowData){
                blankArray.push([i, j]);
            }
         });
    });

    if(blankArray.length === 0){
        alert("GAME OVER ! score:" + score.textContent);
        data = [];
        initSetting();
        makeRandomCell();
        drawing();
    }else{
        var randomCell = blankArray[Math.floor(Math.random() * blankArray.length)];
        console.log(randomCell);
        data[randomCell[0]][randomCell[1]] = 2;
        console.log("randomCell", randomCell);
        drawing();
    }

}

function drawing(){
    data.forEach(function(rowData, i){
        rowData.forEach(function(rowData, j){
            if(rowData > 0){
                table.children[i].children[j].textContent = rowData;
            }else{
                table.children[i].children[j].textContent = '';
            }
        });
    });
}

var startDrag = false;
var startPosition;
var endPosition;
window.addEventListener('mousedown', function (e) { 
    console.log('mousedown', e);
    startDrag = true;
    startPosition = [e.clientX, e.clientY];
});

window.addEventListener('mousemove', function (e) { 
    // console.log('mousemove', e);
});

window.addEventListener('mouseup', function (e) { 
    console.log('mouseup', e);
    startDrag = false;
    endPosition = [e.clientX, e.clientY];
    var direction;
    var xDiff = endPosition[0] - startPosition[0];
    var yDiff = endPosition[1] - startPosition[1];
    if(yDiff < 0 && Math.abs(yDiff / xDiff) > 1){
        direction = 'up';
    } else if (xDiff > 0 && Math.abs(yDiff / xDiff) < 1 ){
        direction = 'right';
    } else if (yDiff > 0 && Math.abs(yDiff / xDiff) > 1){
        direction = 'down';
    } else {
        direction = 'left';
    }
    this.console.log(xDiff, yDiff, direction);
    
    if(xDiff === 0 && yDiff === 0){
        return; // 제자리 클릭일 경우
    }

    var newData = [
        [],
        [],
        [],
        []
      ];
    switch (direction) {
        case 'left':
          data.forEach(function(colData, i) {
            colData.forEach(function(rowData, j) {
              if (rowData) {
                if (newData[i][newData[i].length - 1] && newData[i][newData[i].length - 1] === rowData) {
                    newData[i][newData[i].length - 1] *= 2;
                  var currentScore = parseInt(score.textContent, 10);
                  score.textContent = currentScore + newData[i][newData[i].length - 1];
                } else {
                    newData[i].push(rowData);
                }
              }
            });
          });
          console.log(newData);
          [1, 2, 3, 4].forEach(function(colData, i) {
            [1, 2, 3, 4].forEach(function(rowData, j) {
              data[i][j] = newData[i][j] || 0;
            });
          });
          break;
        case 'right':
          data.forEach(function(colData, i) {
            colData.forEach(function(rowData, j) {
              if (rowData) {
                if (newData[i][0] && newData[i][0] === rowData) {
                    newData[i][0] *= 2;
                  var currentScore = parseInt(score.textContent, 10);
                  score.textContent = currentScore + newData[i][0];
                } else {
                    newData[i].unshift(rowData);
                }
              }
            });
          });
          console.log(newData);
          [1, 2, 3, 4].forEach(function(colData, i) {
            [1, 2, 3, 4].forEach(function(rowData, j) {
              data[i][3 - j] = newData[i][j] || 0;
            });
          });
          break;
        case 'up':
          data.forEach(function(colData, i) {
            colData.forEach(function(rowData, j) {
              if (rowData) {
                if (newData[j][newData[j].length - 1] && newData[j][newData[j].length - 1] === rowData) {
                    newData[j][newData[j].length - 1] *= 2;
                  var currentScore = parseInt(score.textContent, 10);
                  score.textContent = currentScore + newData[j][newData[j].length - 1];
                } else {
                  newData[j].push(rowData);
                }
              }
            });
          });
          console.log(newData);
          [1, 2, 3, 4].forEach(function(rowData, i) {
            [1, 2, 3, 4].forEach(function(colData, j) {
              data[j][i] = newData[i][j] || 0;
            });
          });
          break;
        case 'down':
          data.forEach(function(colData, i) {
            colData.forEach(function(rowData, j) {
              if (rowData) {
                if (newData[j][0] && newData[j][0] === rowData) {
                  newData[j][0] *= 2;
                  var currentScore = parseInt(score.textContent, 10);
                  score.textContent = currentScore + newData[j][0];
                } else {
                  newData[j].unshift(rowData);
                }
              }
            });
          });
          console.log(newData);
          [1, 2, 3, 4].forEach(function(rowData, i) {
            [1, 2, 3, 4].forEach(function(colData, j) {
              data[3 - j][i] = newData[i][j] || 0;
            });
          });
          break;
      }
    makeRandomCell();
});


initSetting();
makeRandomCell();
drawing();