

  //card options
  const cardArray = [
    {name: "pikachu", img:"images\\Pikachu 100x100.png"},
    {name: "pikachu", img:"images\\Pikachu 100x100.png"},
    {name: "bulbasaur", img:"images\\Bulbasaur.png"},
    {name: "bulbasaur", img:"images\\Bulbasaur.png"},
    {name: "charizard", img:"images\\Charizard.png"},
    {name: "charizard", img:"images\\Charizard.png"},
    {name: "squirtle", img:"images\\Squirtle.png"},
    {name: "squirtle", img:"images\\Squirtle.png"}
  ];
  
  const grid = document.querySelector('.grid')

const timer = document.getElementById("timer")
var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;
const reset = document.getElementById("reset");
const start = document.getElementById("start");
const stopGame = document.getElementById("stop");


function startTimer() {
  if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
    grid.classList.remove("hidden");
}
function stopTimer() {
  if (stoptime == false) {
    stoptime = true;
  }
}

function timerCycle() {
    if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if (hr < 10 || hr == 0) {
      hr = '0' + hr;
    }

    timer.innerHTML = "Timer " + hr + ":" + min + ":" + sec + ":";

    setTimeout("timerCycle()", 1000);
  }
}

function resetTimer() {
  timer.innerHTML = '00:00:00';
  document.location.reload(true);
}

reset.addEventListener("click", resetTimer);
start.addEventListener("click",startTimer);
stopGame.addEventListener("click", stopTimer);


cardArray.sort(() => 0.5 - Math.random())


let cardsChosen = []
let cardsChosenId = []
let cardsWon = []

//create your board
function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement('img')
    card.setAttribute('src', 'images\\pokemon cardback 2.0.jpg')
    card.setAttribute('data-id', i)
    card.addEventListener('click', flipCard)
    grid.appendChild(card)
  }
}

//check for matches
function checkForMatch() {
  const cards = document.querySelectorAll('img')
  const optionOneId = cardsChosenId[0]
  const optionTwoId = cardsChosenId[1]
  
    if (cardsChosen[0] === cardsChosen[1]) {
    
    cards[optionOneId].setAttribute('src', 'images/blank.jpg')
    cards[optionTwoId].setAttribute('src', 'images/blank.jpg')
    cards[optionOneId].removeEventListener('click', flipCard)
    cards[optionTwoId].removeEventListener('click', flipCard)
    cardsWon.push(cardsChosen)
  } else {
    cards[optionOneId].setAttribute('src', 'images\\pokemon cardback 2.0.jpg')
    cards[optionTwoId].setAttribute('src', 'images\\pokemon cardback 2.0.jpg')
  }
  cardsChosen = []
  cardsChosenId = []
  
}

//flip your card
function flipCard() {
  let cardId = this.getAttribute('data-id')
  cardsChosen.push(cardArray[cardId].name)
  cardsChosenId.push(cardId)
  this.setAttribute('src', cardArray[cardId].img)
  if (cardsChosen.length ===2) {
    setTimeout(checkForMatch, 500)
  }
}

createBoard()
