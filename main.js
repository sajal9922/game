// Getting value from local storage...
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
updateScoreElement();

/* if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}*/

// Auto play function...
let isAutoPlaying = false;
let intervalId;
function autoPlay() {
  if (!isAutoPlaying) {
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('Rock');
});
document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('Paper');
});
document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('Scissors');
});

document
  .querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    showResetConfirmation();
  });

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
  autoPlay();
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('Rock');
  } else if (event.key === 'p') {
    playGame('Paper');
  } else if (event.key === 's') {
    playGame('Scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    showResetConfirmation();
  } else if (event.key === 'y') {
    resetScore();
    hideResetConfirmation();
  } else if (event.key === 'n') {
    hideResetConfirmation();
  }
});

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

function showResetConfirmation() {
  document.querySelector('.js-reset-game').innerHTML = `Are you sure?
  <button class="yes-button js-yes-button">yes</button>
  <button class="no-button js-no-button">no</button>`;

  document.querySelector('.js-yes-button').addEventListener('click', () => {
    resetScore();
    hideResetConfirmation();
  });
  document.querySelector('.js-no-button').addEventListener('click', () => {
    hideResetConfirmation();
  });
}

function hideResetConfirmation() {
  document.querySelector('.js-reset-game').innerHTML = '';
}
// Function for playing game....
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';
  if (playerMove === 'Scissors') {
    if (computerMove === 'Rock') {
      result = 'You lose.';
    } else if (computerMove === 'Paper') {
      result = 'You win.';
    } else if (computerMove === 'Scissors') {
      result = 'Tie.';
    }
  } else if (playerMove === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'Tie.';
    } else if (computerMove === 'Paper') {
      result = 'You lose.';
    } else if (computerMove === 'Scissors') {
      result = 'You win.';
    }
  } else if (playerMove === 'Paper') {
    if (computerMove === 'Rock') {
      result = 'You win.';
    } else if (computerMove === 'Paper') {
      result = 'Tie.';
    } else if (computerMove === 'Scissors') {
      result = 'You lose.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  // Local storage.....
  localStorage.setItem('score', JSON.stringify(score));
  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You
  <img src="image/${playerMove}-emoji.png" class="move-icon" />
  <img src="image/${computerMove}-emoji.png" class="move-icon" />
  Computer`;
  updateScoreElement();
}

// score display function
function updateScoreElement() {
  document.querySelector(
    '.js-score'
  ).innerHTML = `Wins: ${score.wins}, losses: ${score.losses}, Ties: ${score.ties}`;
}

// Function for generating randome numbers....
function pickComputerMove() {
  randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'Rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'Paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'Scissors';
  }
  return computerMove; // return ends the function.
}
