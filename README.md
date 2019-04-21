# Memory Game Project

This is the 2nd project of the udacity FEND course. It is a card matching game.
The game consists of a deck of 16 cards (8 matching pairs), that are randomly position upon game start. The objective of the game is to match each pair of cards in as little moves(clicks) as possible.

## Table of Contents

* [Instructions](#instructions)
* [Contributing](/CONTRIBUTING.md)

## Instructions

Functionality for all interactive game elements have been implemented through javascript via file _js/app.js_. Most of the projects Functionality is accomplished through functions and event listeners.

### Functions:
- **shuffle** - randomizes (shuffles) array elements.
- **shuffleCards** - calls shuffle function and then appends result to card deck DOM element.
- **toggleOpenShow** - toggles the `open` and `show` class properties on target element.
- **compareCards** - compares to cards stored in flippedCard array for a match and toggles `match` class if match found, if not flip cards back over.
- **movesCounter** - keeps track of number of player moves(clicks) during game _(each 2 card flips counts as 1 move)_.
- **Score** - adjusts player score _(number of stars)_ in game based on number of player moves.
- **showTime** - displays game time on game page.
- **startTimer** - starts game clock when first click event on card element is detected.
- **stopTimer** - stops game clock.
- **numberOfStars** - returns number of stars _(score)_ from current game.
- **addModalData** - Adds game stats _(score, time & moves)_ to DOM modal element.
- **toggleModal** - toggle `hidden` class on modal DOM element.
- **resetPlayerMoves** - set `playerMoves` variable back to 0 and update moves DOM element to same value.
- **resetClock** - set `time` variable to 0, `timerOff` to true and call `stopTimer` function.
- **resetStars** - remove `hidden` class from stars DOM elements.
- **newGame** - call ```resetClock shuffleCards resetPlayerMoves resetStars``` functions to initiate a new game.
- **newGameModal** - call `newGame` and `toggleModal` function to start a new game when new game modal button is clicked.
- **gameWon** - call ```stopTimer addModalData toggleModal``` functions to stop time and display modal.

### Event Listener:
- **CardDeck click event** - click event listener on cards parent element to: _start timer, flip card over, check card for match, increase moves counter, update score and check for game win condition._
- **modalClose click event** - click event listener on modal close element to: _toggle_ `hidden`_class on for modal element._
- **modalNewGame click event** - click event listenere on modal new game button element to: _call_ `newGameModal` _function to start a new game_.
- **restart click event** - click event listener on refresh element to: _call_ `newGame` _function to start a new game and reset all game stats_.

For specific, detailed instructions, look at the project instructions in the [Udacity Classroom](https://classroom.udacity.com/me).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
