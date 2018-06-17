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
  document.querySelector('.moves').innerHTML = 0;
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

//clickTracker function on cards
function clickTracker(gameState) {
  gameState.cards.forEach(function(card) {
    card.addEventListener('click', function(event) {
      if (card.className === 'card match' || card.className === 'card open show') {
        return;
      }
      card.className = "card open show";
      gameState.moveCounter ++;
      evaluateMatch(gameState, card);
      displayMoveCounter(gameState);
      moveCounterStar(gameState);
      showWinningPage(gameState);
    });
  });
}

//evaluate matching status on clicked cards
function evaluateMatch(gameState, card) {
  if (gameState.clickedCards.length === 0) {
    addOpenedCard(gameState, card);
  } else {
    let previousCard = gameState.clickedCards.pop();
    if (previousCard.firstElementChild.className === card.firstElementChild.className) {
      cardMatchTimeout(gameState, previousCard, card);
    } else {
      cardNotMatchTimeout(previousCard, card);
    }
  }
}

//define addOpenedCard function
function addOpenedCard(gameState, card) {
  gameState.clickedCards.push(card);
}

//define cardMatchTimeout function
function cardMatchTimeout(gameState, previousCard, card) {
  setTimeout(function() {
    previousCard.className = "card match";
    card.className = "card match";
    gameState.matchedCounter ++;
  }, 700);
}

//define cardNotMatchTimeout function
function cardNotMatchTimeout(previousCard, card) {
  setTimeout(function() {
    previousCard.className = "card";
    card.className = "card";
  }, 700);
}

//define displayMoveCounter function
function displayMoveCounter(gameState) {
  gameState.moves.innerHTML = gameState.moveCounter;
}

//define moveCounterStar function
function moveCounterStar(gameState) {
  if (gameState.moveCounter <= 16) {
    gameState.starCounter = 3;
  }
  if (gameState.moveCounter > 16) {
    document.getElementById('three-star').setAttribute('style', 'display: none');
    gameState.starCounter = 2;
  }
  if (gameState.moveCounter > 32) {
    document.getElementById('two-star').setAttribute('style', 'display: none');
    gameState.starCounter = 1;
  }
}

//define showWinningPage function
function showWinningPage(gameState) {
  if (gameState.matchedCounter === 8) {
    //display winning message
    gameState.winning_stat_msg = `
      With ${gameState.moveCounter} and ${gameState.starCounter} Stars.

      Woooooo!`;
    gameState.container.setAttribute('style', 'display: none');
    gameState.winning.setAttribute('style', 'display: block');
    gameState.winning_stat.innerText = gameState.winning_stat_msg;
  }
}
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
