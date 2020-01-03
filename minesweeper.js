var tbody = document.querySelector('#table tbody');
var result = document.getElementById("h1-result");
var dataset; // 입력 받은 데이터에 따라 동적으로 tr, td 생성
var opened = 0; //열린 칸 개수
var finished = false; // 지뢰를 밟았는가

var code = {
  mine : '💣',
  bomb : '💥',
  initial : 0,
  opened : 1,
  eMark : '❗️',
  qMark : '❓',
};

function getCurrentIndex(target) {
  var parentTr = target.parentNode;
  var parentTbody = target.parentNode.parentNode;
  var index = {
    row: -1,
    col: -1,
  };
  index.col = Array.prototype.indexOf.call(parentTr.children, target); // td중에 몇 번째에 있는지. ~prototype : 배열 아닌 애들한테 indexOf 쓰려고
  index.row = Array.prototype.indexOf.call(parentTbody.children, parentTr); // tr중에 몇 번째에 있는지.
  // console.log(index.row, index.col, 'getCurrentIndex');

  return index;
}

// 우클릭 이벤트 처리 _ 깃발달기
function setContextMenu(e) {
  var index = getCurrentIndex(e.currentTarget);

  if (e.currentTarget.textContent === '') {
    e.currentTarget.textContent = code.eMark;
  } else if (e.currentTarget.textContent === code.eMark) {
    e.currentTarget.textContent = code.qMark;
  } else if (e.currentTarget.textContent = code.qMark) {
    e.currentTarget.textContent = '';
  }
}

function reset(){
  tbody.innerHTML = ''; // 내부 태그들 지워버리기 _ 실행 누를 때마다 리셋
  finished = false;
  result.textContent = '';
  opened = 0;
}

document.querySelector('#exec').addEventListener('click', function() {
  reset();

  var hor = parseInt(document.querySelector('#hor').value);
  var ver = parseInt(document.querySelector('#ver').value);
  var mine = parseInt(document.querySelector('#mine').value);

  // 지뢰 위치 생성
  var numArray = Array(hor * ver)
    .fill()
    .map(function(element, index) {
      return index;
    });

  var shuffle = [];
  while (numArray.length > (hor * ver) - mine) {
    var number = numArray.splice(Math.floor(Math.random() * numArray.length), 1)[0];
    shuffle.push(number);
  }
  console.log(shuffle);

  // 지뢰 테이블 생성
  dataset = [];
  for (var i = 0; i < ver; i++) {
    var arr = [];
    var tr = document.createElement('tr');
    dataset.push(arr);
    for (var j = 0; j < hor; j++) {
      arr.push(code.initial);
      var td = document.createElement('td');
      td.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        // 게임이 종료되었거나, 주변 지뢰 개수가 써 있는 경우에는 이벤트 실행 안 함
        if(finished || parseInt(e.currentTarget.textContent) > 0) return;
        setContextMenu(e);
      });

      td.addEventListener('click', function(e) {
        var index = getCurrentIndex(e.currentTarget);
        var row = index.row;
        var col = index.col;

        if(finished || dataset[row][col] === code.opened
          || e.currentTarget.textContent === code.eMark || e.currentTarget.textContent === code.qMark) {
          return;
        }

        opened += 1;
        console.log(opened);
        if(opened >= ver * hor - mine){
          result.textContent = 'you win!';
          finished = true;
        }

        if (dataset[row][col] === code.mine) {
          // 지뢰 누르면 터지기, 게임종료
          e.currentTarget.textContent = code.bomb;
          result.textContent = 'GAME OVER';
          finished = true;
        } else {
          dataset[row][col] = 1; // 열었을 경우 1
          e.currentTarget.classList.add('opened'); // classList로 td 태그의 클래스에 접근

          // 주변 지뢰 개수 세기
          var side = [dataset[row][col - 1], dataset[row][col + 1]];
          console.log(dataset[row - 1]); // if문 조건에 불리언값 와야하는 거 아닌가 ?

          if (dataset[row - 1]) {
            side = side.concat(dataset[row - 1][col - 1], dataset[row - 1][col], dataset[row - 1][col + 1]);
          }

          if (dataset[row + 1]) {
            side = side.concat(dataset[row + 1][col - 1], dataset[row + 1][col], dataset[row + 1][col + 1]);
          }

          var count = side.filter(function(v) {
            return v === code.mine;
          }).length;

          e.currentTarget.textContent = count || ''; // 0이면 표시하지 않게

          if (count === 0) {
            // 동시에 8칸 오픈 _ 재귀함수 이용
            var aroundTarget = [];

            if (tbody.children[row - 1]) { // 윗줄 3칸
              aroundTarget = aroundTarget.concat([
                tbody.children[row - 1].children[col - 1],
                tbody.children[row - 1].children[col],
                tbody.children[row - 1].children[col + 1],
              ]);
              console.log(aroundTarget);
            }

            aroundTarget = aroundTarget.concat([ // 양 옆 2칸
              tbody.children[row].children[col - 1],
              tbody.children[row].children[col + 1],]
            );
            console.log(aroundTarget);

            if(tbody.children[row + 1]){
              aroundTarget = aroundTarget.concat([ // 아랫줄 3칸
                tbody.children[row + 1].children[col - 1],
                tbody.children[row + 1].children[col],
                tbody.children[row + 1].children[col + 1],]
              );
              console.log(aroundTarget);
            }
            // 주변 칸을 배열로 모아서 클릭 이벤트 발생
            aroundTarget.filter((v) => !!v).forEach(function(next){
              var index = getCurrentIndex(next);
              var row = index.row;
              var col = index.col;
              if(dataset[row][col] !== 1){
                // 안 열린 것만 열기
                next.click();
              }
              console.log(next, 'next');
            });
          }
        }
      });
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  console.log(dataset, 'filled dataset');

  // 지뢰 심기
  for (var k = 0; k < shuffle.length; k++) { // e.g. 60
    var row = Math.floor(shuffle[k] / ver); // e.g. 7 -> 6
    var col = shuffle[k] % ver; // e.g. 0 -> 0
    console.log(row, col);
    // tbody.children[row].children[col].textContent = '';
    dataset[row][col] = code.mine; // 데이터 동기화
  }
});
