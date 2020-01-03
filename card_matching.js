var hor = 4;
var ver = 3;
var colorOption = ['red', 'red', 'orange', 'orange', 'green', 'green', 'purple', 'purple', 'gray', 'gray', 'pink', 'pink'];
var color = []; // 후보색상을 랜덤으로 섞은 배열
var clickFlag = false; // 클릭 가능 여부
var clickCount = 0; // 클릭 횟수
var cardOrder = []; // 생성한 카드 배열
var flippedCard = {}; // 뒤집은 카드의 색상

for(var i = 0 ; colorOption.length > 0 ; i += 1){
  color = color.concat(colorOption.splice(Math.floor(Math.random() * colorOption.length), 1));
}

function setCard(hor, ver) {
  for (var i = 0; i < hor * ver; i++) {
    var card = document.createElement('div');
    card.className = 'card';
    var cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    var cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    var cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.style.background = color[i];

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    cardOrder.push(card);

    (function(c) {// 클릭 이벤트 콜백_ 비동기
      card.addEventListener('click', function(e) {
        if(!clickFlag) return;
        c.classList.toggle('flipped'); // flipped라는 클래스 없으면 넣고, 있으면 빼고
        console.log(cardOrder.indexOf(e.currentTarget), flippedCard.color);

        if(flippedCard.color){
          // 짝지을 카드(2번째 카드)를 고를 때
          console.log('if문');
          if(flippedCard.color !== color[cardOrder.indexOf(e.currentTarget)]){
            // 뒤집은 두 카드의 색상이 다를 때
            clickFlag = false;

            (function(c){
              setTimeout(function(){
                c.classList.remove('flipped');
                flippedCard.card.classList.remove('flipped');
                flippedCard.color = null;
                flippedCard.card = null;
                clickFlag = true;
              }, 800);
            })(c);
            return;
          }else{
            // 뒤집은 두 카드의 색상이 같을 때
            // 이제 더이상 클릭 못 함 - 완성카드
          }

          flippedCard.color = null;
          flippedCard.card = null;

        }else{
          console.log('else문');
          flippedCard.color = color[cardOrder.indexOf(e.currentTarget)];
          flippedCard.card = e.currentTarget;
        }

      });
    })(card);

    document.body.appendChild(card);
  }
  document.querySelectorAll('.card').forEach(function (card, index){
    // 카드 외울 시간 주기
    setTimeout(function(){
      card.classList.add('flipped');
    }, 1000 + 100 * index);
    // 5초 뒤 뒤집기
    setTimeout(function(){
      card.classList.remove('flipped');
      clickFlag = true;
    }, 2000);
  });
}

setCard(hor, ver);
