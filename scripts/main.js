const $canvas = document.querySelector("canvas");
const newGame = new Game($canvas);

const $buttonStart = document.getElementById("start");
const $buttonPause = document.getElementById("pause");
const $buttonReset = document.getElementById("reset");

//main functions invoked here

//listen for start/pause game
window.addEventListener("keydown", (event) => {
  event.preventDefault();
  switch (event.keyCode) {
    case 13: // 'enter' how to play
      newGame.drawTitleScreen2();
      break;
    case 32: // 'spacebar' start/reset
      newGame.startGame();
      break;
    case 80: // 'p' pause game
      newGame.pauseGame();
      break;
  }
});
