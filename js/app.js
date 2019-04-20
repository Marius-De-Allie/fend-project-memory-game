/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
//declare variable to keep track of status of game timer(clock), set to off.
let timerOff = true;
//declare variable to hold value of time.
let time = 0;
let timerId;

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

/* function to increment moves counter element by one after 2 cards have been
/*  clicked.
*/
function movesCounter () {
  playerMoves++;
  const movesContent = document.querySelector('.moves');
  movesContent.innerHTML = playerMoves;
}

// Function to adjust player score based on number of player moves made.
function score () {
  switch (playerMoves) {
    case 12:
      starParent.removeChild(document.querySelector('li'));
      break;
    case 16:
      starParent.removeChild(document.querySelector('li'));
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
function resetClock() {
  clearInterval(timerId);
}

// Function to add game stats to modal.
function addModalData() {
  const gameTime = document.querySelector('.clock').innerHTML;
  document.querySelector('#time').innerHTML = `Time: ${gameTime}`;
}

// addModalData();
// Call to resetClock fn to allow clock to be reset with page reloads.
resetClock();
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
    }
  }
});

//Select restart button element from DOM.
const restart = document.querySelector('.restart i');
//restart button click event listener.
restart.addEventListener('click', function() {
  shuffleCards();
});
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
