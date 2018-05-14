let f = document.forms.menu;                                                        //
if(localStorage.firstName !== undefined) f[0].value = localStorage.firstName;       //
if(localStorage.lastName !== undefined) f[1].value = localStorage.lastName;         //
if(localStorage.email !== undefined) f[2].value = localStorage.email;               //
f.onsubmit = function() {                                                           //
  Game.startGame();                                                                 //
};                                                                                  //
let Game = {
  map: [],
  level: "16",
  typeCards: "type-cards-1",
  pairForNewCard: false,
  time: 0,
  toFillForm: function() {},
  infForGame: function() {},
  createMapCards: function() {},
  congrutulations: function() {},
  createFuncOnclickForCard: function() {},
  tableResultUp: function() {},
  startTimer: function() {},
  startGame: function() {}
};
Game.toFillForm = function() {
  Game.form = document.forms.menu;
};
Game.infForGame = function() {
  localStorage.firstName = f[0].value;
  localStorage.lastName = f[1].value;
  localStorage.email = f[2].value;
  for(let i = 3; i < 6; i++) {
    if(f[i].checked === true) this.level = f[i].value;
  }
  for(let i = 6; i < 9; i++) {
    if(f[i].checked === true) this.typeCards = f[i].value;
  }
};
Game.createMapCards = function() {
    let arrNum = [];
    for(let i = 0; i < +this.level; i++) {
      if(i > +this.level/2 - 1) arrNum[i] = i + 1 - (+this.level/2);
      else arrNum[i] = i + 1;
    }
    for(let i = 0; i < +this.level; i++) {
      let newCard = document.createElement('div');
      newCard.classList.add('card');
      newCard.classList.add(this.typeCards);
      newCard.id = "card-num-at-map-" + i;
      let  k = Math.floor(Math.random()*arrNum.length);
      newCard.numberImgCard = "img-card-" + arrNum[k];
      arrNum.splice(k, 1);
      document.body.appendChild(newCard);
      newCard = document.getElementById('card-num-at-map-' + i);
      this.map[i] = newCard;
    }
};
Game.congrutulations = function() {
  if(document.body.childNodes.length === 0) {
    this.time -= new Date;
    this.time *= -1;
    this.time /= 1000;
    document.body.classList = [];
    let congr = document.createElement('div');
    congr.innerHTML = "CONGRATULATIONS!";
    congr.innerHTML += " " + this.time + "s";
    congr.className = "congr";
    document.body.appendChild(congr);
    this.tableResultUp();
  }
};
Game.tableResultUp = function() {
  let profileInTable = {
    profile: localStorage.firstName + " " + localStorage.lastName,
    time: this.time
  };
  if(localStorage.gameRecord == undefined) {
    localStorage.gameRecord = "[]";
  }
  let gameRecord = JSON.parse(localStorage.getItem("gameRecord"));
  gameRecord.push(profileInTable);
  function compareNumeric(a, b) {
    if (a.time > b.time) return 1;
    if (a.time < b.time) return -1;
  }
  gameRecord.sort(compareNumeric);
  if(gameRecord.length > 10) {
    gameRecord.splice(10);
  }
  localStorage.setItem("gameRecord", JSON.stringify(gameRecord));
  console.log(localStorage.gameRecord);
};
Game.createFuncOnclickForCard = function() {
  for(let i = 0; i < Game.map.length ; i++) {
    let card = Game.map[i];
    card.onclick = function() {
      if(Game.pairForNewCard !== false) {
        if(Game.pairForNewCard.id !== card.id) {
          if(card.numberImgCard === Game.pairForNewCard.numberImgCard) {
            card.classList.add(card.numberImgCard);
            function removeCard() {
              document.body.removeChild(card);
              document.body.removeChild(Game.pairForNewCard);
              Game.pairForNewCard = false;
              Game.congrutulations();
            }
            setTimeout(removeCard, 700);

          }
          else {
            card.classList.add(card.numberImgCard);
            function removeClassCard() {
                for(let i in Game.map) {
                  if(Game.map[i].id === Game.pairForNewCard.id) {
                    Game.map[i].classList.remove(Game.map[i].numberImgCard);
                    break;
                  }
                }
                card.classList.remove(card.numberImgCard);
                Game.pairForNewCard = false;
            }
            setTimeout(removeClassCard, 700);
          }
        }
      }
      else {
        Game.pairForNewCard = card;
        card.classList.add(card.numberImgCard);
      }
    };
  }
};
Game.startTimer = function() {
  Game.time = new Date;
}
Game.startGame = function() {
  Game.infForGame();
  document.body.innerHTML = ""; // добавить элементу с ID start-menu класс hiden не получается. Нет! Он добавляется, но стили не применяются. Объясните.
  document.body.className = 'newStyleBody';
  Game.createMapCards();
  Game.createFuncOnclickForCard();
  Game.startTimer();
};
