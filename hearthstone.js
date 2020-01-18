var my= {
  name : "my",
  hero : document.getElementById('my-hero'),
  deck : document.getElementById('my-deck'),
  field : document.getElementById('my-cards'),
  cost : document.getElementById('my-cost'),
};

var rival= {
  name : "rival",
  hero : document.getElementById('rival-hero'),
  deck : document.getElementById('rival-deck'),
  field : document.getElementById('rival-cards'),
  cost : document.getElementById('rival-cost'),
};

var turnBtn = document.getElementById('turn-btn');
var turn = true; // 내 차례일 때 true

// 덱 다시 그리기
function linkAllCardsWithDOM(from, to, isHero){
  from.forEach(function(data){
    linkCardWithDOM(data, to, isHero);
  });
}

function deckToField(turn, data, currentCost){
  var target = turn ? my : rival;
  var index = target.data.indexOf(data);
      target.data.splice(index, 1);
      target.fieldData.push(data);
      target.deck.innerHTML ='';
      target.field.innerHTML ='';
      linkAllCardsWithDOM(target.fieldData, target.field);
      linkAllCardsWithDOM(target.data, target.deck);
      
      data.field = true; // 필드에 올랐음
      target.cost.textContent = currentCost - data.cost; // 코스트 감소
}

function drawingDisplay(myDisplay){
  var target = myDisplay ? my : rival;
  target.hero.innerHTML = '';
  target.deck.innerHTML ='';
  target.field.innerHTML ='';
  target.fieldData.forEach(function(data){
    if(data.hp > 0){
      console.log("화면 그리는중 데이터 체력", data.hp);
      linkCardWithDOM(data, target.field, false);
    }
  });
  linkAllCardsWithDOM(target.data, target.deck, false);
  linkCardWithDOM(target.heroData, target.hero, true);
}

function attack(card, data, turn, dom, hero){
  var subject = turn ? my : rival;
  var opposite = turn ? rival : my;

  if(subject.selectedCard && dom.id.includes(opposite.name) && !card.classList.contains('card-turnover')){
    // 나의 선택카드로 상대 카드를 공격할 경우
    data.hp = data.hp - subject.selectedCardData.att; // 공격
    // 공격 당한 카드가 죽었을 때
    if(data.hp <= 0){
      var index = opposite.fieldData.indexOf(data);
      if( index > -1 ){
        // 쫄병이 죽었을 때
        opposite.fieldData.splice(index, 1);
      } else{
        // 영웅이 죽었을 때 (필드 데이터에서 존재하지 않을 때)
        if(turn){
          alert("승리!");
        }else{
          alert("패배");
        }
        // 게임 리셋
        initSetting();
      }
    }
    subject.selectedCard.classList.remove('card-selected');
    subject.selectedCard.classList.add('card-turnover');
    subject.selectedCard = null; // 선택 해제
    subject.selectedCardData = null;
    drawingDisplay(!turn); // 상대 화면 다시 그리기
    return;
  }else if(dom.id.includes(opposite.name) || card.classList.contains('card-turnover')){
    return; // 상대 카드이거나 턴오버한 카드일 경우 선택 불가
  }

  if(data.field){
    // 필드에 있는 카드를 선택했을 경우
    card.parentNode.querySelectorAll('.card').forEach(function(card){
      card.classList.remove('card-selected');
    });
    card.classList.add('card-selected');
    subject.selectedCard = card;
    subject.selectedCardData = data;
  }else{
    // 덱에 있는 카드를 선택했을 경우
    // 현재 코스트보다 높은 코스트 카드는 뽑을 수 없음
    var currentCost = Number(subject.cost.textContent);
    if(currentCost < data.cost){
      return;
    }
    if(turn){
      deckToField(turn, data, currentCost);
      makeMyDeck(1); // 덱 카드 추가
    }else{
      deckToField(turn, data, currentCost);
      makeRivalDeck(1);
    }
  }
}

// 데이터와 화면 연결
function linkCardWithDOM(data, dom, hero){
  var card = document.querySelector('.card-hidden .card').cloneNode(true); 
  card.querySelector('.card-cost').textContent = data.cost;
  card.querySelector('.card-att').textContent = data.att;
  card.querySelector('.card-hp').textContent = data.hp;
  
  // 영웅 카드일 경우 (코스트 제거)
  if(hero){
    card.querySelector('.card-cost').style.display = 'none';
    var name = document.createElement('div');
    name.textContent = 'HERO';
    card.appendChild(name);
    data.field = 'true';
  }

  card.addEventListener('click', function(){
    if(turn){// 내 차례일 경우
      attack(card, data, turn, dom, hero);
    }else{// 상대 차례일 경우
      attack(card, data, turn, dom, hero);
    } // end of if/else(차례)
  });

  dom.appendChild(card);
}

function makeRivalDeck(count){
  for(var i = 0 ; i < count ; i++){
    rival.data.push(cardFactory());
  }
  rival.deck.innerHTML = "";
  rival.data.forEach(function(data){
    linkCardWithDOM(data, rival.deck);
  });
}

function makeMyDeck(count){
  for(var i = 0 ; i < count ; i++){
    my.data.push(cardFactory());
  }
  my.deck.innerHTML = "";
  my.data.forEach(function(data){
    linkCardWithDOM(data, my.deck);
  });
}

function makeRivalHero(){
  rival.heroData = cardFactory(true);
  linkCardWithDOM(rival.heroData, rival.hero, true);
}

function makeMyHero(){
  my.heroData = cardFactory(true);
  linkCardWithDOM(my.heroData, my.hero, true);
}

function initSetting(){
  [my, rival].forEach(function (item) {
    item.data = [];
    item.heroData = [];
    item.fieldData = [];
    item.selectedCard = [];
    item.selectedCardData = [];
  });

  makeMyDeck(5);
  makeMyHero();
  makeRivalDeck(5);
  makeRivalHero();

  drawingDisplay(true);
  drawingDisplay(false);
}

function Card(hero){
  if(hero){
    this.att = Math.ceil(Math.random() * 2);
    this.hp = Math.ceil(Math.random() * 5) + 25;
    this.hero = true;
  }else{
    this.att = Math.ceil(Math.random() * 5);
    this.hp = Math.ceil(Math.random() * 5);
    this.cost = Math.ceil((this.att + this.hp) / 2);
  }
}

function cardFactory(hero){
  return new Card(hero);
}

turnBtn.addEventListener('click', function(){
  turn = !turn;
  if(turn){  // 상대 차례 -> 내 차례
    rival.cost.textContent = '10';
    // 상대의 턴오버 카드 풀어주기
    rival.field.childNodes.forEach(function (card) { 
      card.classList.remove('card-turnover');
    });
    rival.hero.classList.remove('card-turnover');
    drawingDisplay(true);
  }else{ // 내 차례 -> 상대 차례
    my.cost.textContent = '10';
    // 나의 턴오버 카드 풀어주기
    my.field.childNodes.forEach(function (card) { 
      card.classList.remove('card-turnover');
    });
    my.hero.classList.remove('card-turnover');
    drawingDisplay(true);
  }
  document.getElementById('my').classList.toggle('turn');
  document.getElementById('rival').classList.toggle('turn');
});