const $canvas = document.querySelector("canvas");
const newGame = new Game($canvas);

const $buttonStart = document.getElementById("start");
const $buttonPause = document.getElementById("pause");
const $buttonReset = document.getElementById("reset");

//main functions invoked here

$buttonStart.addEventListener("click", () => {
  newGame.startGame();
});

$buttonPause.addEventListener("click", () => {
  newGame.pause();
});

$buttonReset.addEventListener("click", () => {
  newGame.reset();
});
