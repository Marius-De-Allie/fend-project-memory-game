
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Select parent element of game cards from DOM.
const cardDeck = document.querySelector('.deck');

// select all 16 card list elements and assign to array (allCards).
const allCards = [...document.querySelectorAll('.deck li')];

let flippedCards = [];
// declare variable to track player moves.
let playerMoves = 0;
// select stars parent element
const starParent = document.querySelector('.stars');
// declare variable to keep track of status of game timer(clock), set to off.
let timerOff = true;
// declare variable to hold value of time.
let time = 0;
let timerId;
 // select modal close button DOM element and assign to variable.
const modalClose = document.querySelector('.close_button');
// select modal new game button DOM element and assign to variable.
const modalNewGame = document.querySelector('#restart_button');
 // select all star elements from DOM and assign to variable.
const totalStars = [...document.querySelectorAll('.stars li')];
// declare variable to keep count of cards that are matched.
let matchedCards = 0;
// Variable to hold number of pairs of cards in deck.
const allCardPairs = 8;
//Select restart button element from DOM.
const restart = document.querySelector('.restart i');

// Function to shuffle deck of cards
function shuffleCards() {
  let cardsShuffled = shuffle(allCards);
  for (card of cardsShuffled) {
    cardDeck.appendChild(card);
    card.className = 'card';
  }
}
shuffleCards();

// function to toggle class ('open show') of cards.
function toggleOpenShow (targetCard) {
  targetCard.classList.toggle('open');
  targetCard.classList.toggle('show');
}

// function to check for card match in flippedCards array
function comparCards () {
  if (flippedCards[0].firstElementChild.className === flippedCards[1].
  firstElementChild.className) {
    for (card of flippedCards) { //toggle match class on both cards in array.
      card.classList.toggle('match');
    }
    flippedCards = []; /*empty array after matching card classes have been set
    to 'match' class.*/
    matchedCards++ // increment matchedCards var by 1 for each match.
  }
  else {
    setTimeout(function() {
      for (card of flippedCards) {
        toggleOpenShow(card)
      }
      flippedCards = [];
    }, 1000);
  }
}

 // function to increment moves counter element by one.
function movesCounter () {
  playerMoves++;
  const movesContent = document.querySelector('.moves');
  movesContent.innerHTML = playerMoves;
}

// Function to adjust player score based on number of player moves made.
function score () {
  switch (playerMoves) {
    case 12:
      for (let i = 0; i < 1; i++) {
        totalStars[i].firstElementChild.classList.toggle('hidden');
      }
      break;
    case 16:
    for (let i = 1; i < 2; i++) {
      totalStars[i].firstElementChild.classList.toggle('hidden');
    }
    break;
  }
}

// Function to show game time.
function showTime() {
  const timer = document.querySelector('.clock');
  const mins = Math.floor(time/60);
  const secs = Math.floor(time%60);
  if (secs < 10) {
    timer.innerHTML = `${mins}:0${secs}`;
  }
  else {
    timer.innerHTML = `${mins}:${secs}`;
  }
}

// function to start timer and increment time.
function startTimer() {
  timerId = setInterval(function() {
    time++;
    showTime();
  }, 1000);
}

// Function to reset game clock.
function stopTimer() {
  clearInterval(timerId);
}

// function to return score (# of stars) from last game played.
function numberOfStars() {
  starList = document.querySelectorAll('.stars li');
  stars = 0;
  for (star of starList) {
    if (!star.firstElementChild.classList.contains('hidden')) {
      stars++;
    }
  }
  return stars;
}

// Function to add game stats to modal.
function addModalData() {
  const gameTime = document.querySelector('.clock').innerHTML;
  document.querySelector('#time').innerHTML = `Time: ${gameTime}`;
  document.querySelector('#moves').innerHTML = `Moves: ${playerMoves}`;
  document.querySelector('#score').innerHTML = `Stars: ${numberOfStars()}`;
}

// Function to toggle '.hidden' class on Modal object.
function toggleModal() {
  document.querySelector('.modal').classList.toggle('hidden');
}

// Call to resetClock fn to allow clock to be reset with page reloads.
stopTimer();

// Function to reset player game moves.
function resetPlayerMoves() {
  playerMoves = 0;
  const movesContent = document.querySelector('.moves');
  movesContent.innerHTML = playerMoves;
}

// Function to reset game clock.
function resetClock() {
  stopTimer();
  timerOff = true;
  time = 0;
  showTime();
}

// Function to reset score (star count).
function resetStars() {
  starCount = 0
  totalStars[0].firstElementChild.classList.remove('hidden');
  totalStars[1].firstElementChild.classList.remove('hidden');
}
resetStars();

// Function to reset all game elements to start a new game.
function newGame() {
  resetClock();
  shuffleCards();
  resetPlayerMoves();
  resetStars();
}

 // Function to reset all game elements and hide modal.
function newGameModal() {
  resetClock();
  shuffleCards();
  resetPlayerMoves();
  resetStars();
  toggleModal();
}

// Function to stop timer and display game stats to Modal.
function gameWon() {
  stopTimer();
  addModalData();
  toggleModal();
}
// Event listener for click on cards parent element using event delegation
cardDeck.addEventListener('click', function(event) {
  const target = event.target; // Event Delegation
  if (target.classList.contains('card') && flippedCards.length < 2 &&
  !target.classList.contains('match') && !flippedCards.includes(target)) {
    if (timerOff) {
      startTimer();
      timerOff = false;
    }
    toggleOpenShow(target);
    flippedCards.push(target); /*add clicked card to flippedCards array.
    If flippedCards array has two cards, check for a match. */
    if (flippedCards.length === 2) {
      comparCards();
      movesCounter();
      score();       // adjust stars (score) based on # of player moves
      if (matchedCards === allCardPairs) {
        gameWon();
      }
    }
  }
});
// Modal close button click event listener.
modalClose.addEventListener('click', function() {
  toggleModal();
});
// Modal new game button click event listener.
modalNewGame.addEventListener('click', function() {
  newGameModal();
});
//restart button click event listener.
restart.addEventListener('click', newGame);
