var tbody = document.querySelector('#table tbody');
var dataset; // 입력 받은 데이터에 따라 동적으로 tr, td 생성

// 우클릭 이벤트 처리 _ 깃발달기
function setContextMenu(e){
  var parentTr = e.currentTarget.parentNode;
  var parentTbody = e.currentTarget.parentNode.parentNode;
  var col = Array.prototype.indexOf.call(parentTr.children, e.currentTarget); // td중에 몇 번째에 있는지. ~prototype : 배열 아닌 애들한테 indexOf 쓰려고
  var row = Array.prototype.indexOf.call(parentTbody.children, parentTr); // tr중에 몇 번째에 있는지.
  console.log(parentTr, parentTbody, row, col);
  if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X'){
    e.currentTarget.textContent = '!';
  }else if(e.currentTarget.textContent === '!'){
    e.currentTarget.textContent = '?';
  }else if (e.currentTarget.textContent = '?'){
    console.log(dataset[row][col] === 'X');
    if(dataset[row][col] === 'X'){
      e.currentTarget.textContent = 'X';
    } else {
      e.currentTarget.textContent = '';
    }
  }
}

document.querySelector('#exec').addEventListener('click', function(){
  tbody.innerHTML = ''; // 내부 태그들 지워버리기 _ 실행 누를 때마다 리셋
  var hor = parseInt(document.querySelector('#hor').value);
  var ver = parseInt(document.querySelector('#ver').value);
  var mine = parseInt(document.querySelector('#mine').value);

  // 지뢰 위치 생성
  var numArray =  Array(hor * ver)
                  .fill()
                  .map(function (element, index){
                      return index;
                  });

  var shuffle = [];
  while(numArray.length > (hor * ver) - mine){
      var number = numArray.splice(Math.floor(Math.random() * numArray.length), 1)[0];
      shuffle.push(number);
  }
  console.log(shuffle);

  // 지뢰 테이블 생성
  dataset = [];
  for(var i = 0; i < ver ; i++){
    var arr = [];
    var tr = document.createElement('tr');
    dataset.push(arr);
    for(var j = 0; j < hor ; j++){
      arr.push(1);
      var td = document.createElement('td');
      td.addEventListener('contextmenu', function(e){
        e.preventDefault();
        setContextMenu(e);
      });
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  console.log(dataset, 'filled dataset');

  // 지뢰 심기
  for (var k = 0 ; k < shuffle.length ; k++){ // e.g. 60
    var row = Math.floor(shuffle[k] / 10); // e.g. 7 -> 6
    var col = shuffle[k] % 10; // e.g. 0 -> 0
    console.log(row, col);
    tbody.children[row].children[col].textContent = 'X';
    dataset[row][col] = 'X'; // 데이터와 화면 동기화
  }
});
