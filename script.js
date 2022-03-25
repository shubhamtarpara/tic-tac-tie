window.addEventListener('DOMContentLoaded', () => {
  const tiles = Array.from(document.querySelectorAll('.tile'));
  const playerDisplay = document.querySelector('.display-player');
  console.log(playerDisplay)
  const resetButton = document.querySelector('#reset');
  const announcer = document.querySelector('.announcer');

  const undoBtn = document.querySelector('#undo');
  let board = ['', '', '',
    '', '', '',
    '', '', ''
  ];
  let currentPlayer = 'X';
  let isGameActive = true;
  let stack = [];
  const PLAYERX_WON = 'PLAYERX_WON';
  const PLAYERO_WON = 'PLAYERO_WON';
  const TIE = 'TIE';
  var xMatchCard = document.querySelector('.winningX');
  var oMatchCard = document.querySelector('.winningO');
  var drawMatchCard = document.querySelector('.winningTIE');
  /*
     board number
      [0] [1] [2]
      [3] [4] [5]
      [6] [7] [8]
  */

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

var xMatch = 0;
var oMatch = 0;
var tieq = 0;

  const isValidAction = (tile) => {
    if (tile.innerText === 'X' || tile.innerText === 'O') {
      return false;
    }

    return true;
  };
  const updateBoard = (index) => {
    board[index] = currentPlayer;
  }
  const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
  }

  const announce = (type) => {
    switch (type) {
      case PLAYERO_WON:
        announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
        announcer.classList.toggle('hide');
        stack=[]
        oMatch++;
        oMatchCard.innerHTML = oMatch;
        break;
      case PLAYERX_WON:
        announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
        announcer.classList.toggle('hide');
        stack=[]
        xMatch++;
        xMatchCard.innerHTML = xMatch;
        break;

      case TIE:
        announcer.innerText = 'Tie';

        tieq++;
        drawMatchCard.innerHTML = tieq;
        break;
    }
    announcer.classList.remove('hide');
  };

  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
      isGameActive = false;
      return;
    }

    if (!board.includes("")) announce(TIE);
  }

  const userAction = (tile, index) => {
    if (isValidAction(tile) && isGameActive) {
      tile.innerHTML = currentPlayer;


      tile.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      console.log(tile.id)
      stack.push(tile.id)
      console.log(stack)
      handleResultValidation();
      changePlayer();
    }
  };

  tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => userAction(tile, index));

  });

  const resetBoard = () => {
    board = ['', '', '',
      '', '', '',
      '', '', ''
    ];
    isGameActive = true;
    announcer.classList.add('hide');

    if (currentPlayer === 'O') {
      changePlayer();
    }

    tiles.forEach(tile => {
      tile.innerText = '';
      tile.classList.remove('playerX');
      tile.classList.remove('playerO');
    });
  }

  
  const undo = () => {
    if (stack.length <= 0) {
      alert("PLEASE START THE GAME FIRST");
    }
    else {
      let x = document.getElementById(stack.pop());
      x.innerHTML = "";

      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      console.log(x.classList);
      x.classList.remove(`player${currentPlayer}`);
      console.log(`player${currentPlayer}`);
      playerDisplay.innerHTML = currentPlayer;
      playerDisplay.classList.toggle('playerX')
      playerDisplay.classList.toggle('playerO')
    };

  }


  resetButton.addEventListener('click', resetBoard);
  undoBtn.addEventListener('click', undo);


});

