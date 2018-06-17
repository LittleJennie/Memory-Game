/*
 * Create a list that holds all of your cards
 */
 const allCards = [
  'fa-diamond', 'fa-diamond',
  'fa-paper-plane-o', 'fa-paper-plane-o',
  'fa-anchor','fa-anchor',
  'fa-bolt','fa-bolt',
  'fa-cube','fa-cube',
  'fa-leaf','fa-leaf',
  'fa-bicycle','fa-bicycle',
  'fa-bomb','fa-bomb',
 ];

 //create html function for card deck
 function cardDeck(allcard) {
  return `<li class="card"><i class="fa ${allcard}"></i></li>`;
 }

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

//create initGame function
function initGame() {
  let cardHTML = shuffle(allCards).map(function(allcard) {
    return cardDeck(allcard);
  });
  console.log(cardHTML);
  document.querySelector('.deck').innerHTML = cardHTML.join('');
  let gameState = {
    moveCounter: 0,
    starCounter: 0,
    matchedCounter: 1,
    clickedCards: [],
    container: document.querySelector('.container'),
    winning: document.querySelector('.winning'),
    cards: document.querySelectorAll('.card'),
    moves: document.querySelector('.moves'),
    winning_stat_msg: "",
    winning_stat: document.querySelector('.winning_stat'),
  }
  clickTracker(gameState);
 }
initGame();

//game restart button
document.querySelector('.restart').addEventListener('click', function(event) {
  initGame();
  document.querySelector('.moves').innerHTML = 0;
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
