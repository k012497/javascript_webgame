var screen = document.querySelector('#screen');
var record = [];
var start;
var timeout;

screen.addEventListener('click', function(e) {
  var end = new Date();
  if (screen.classList.contains('waiting')) {
    screen.classList.remove('waiting');
    screen.classList.add('ready');
    screen.textContent = '초록색이 되면 클릭하세요!';
    // 랜덤 초 후에 화면 전환
    timeout = setTimeout(function(){
      console.log('timeout!');
      screen.classList.remove('ready');
      screen.classList.add('now');
      screen.textContent = '지금!!!';
      // 시간 재기
      start = new Date();
    }, Math.floor(Math.random() * 1000) + 2000);
  } else if (screen.classList.contains('now')) {
    screen.classList.remove('now');
    screen.classList.add('waiting');
    record.push((end - start) / 1000);
    screen.textContent = record[record.length - 1] + '초, click to start!';
    start = null;
  }
});
