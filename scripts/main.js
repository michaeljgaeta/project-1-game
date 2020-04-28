const $canvas = document.querySelector("canvas");
const newGame = new Game($canvas);
const $buttonStart = document.getElementById("start");

const $buttonPause = document.getElementById("pause");

//main functions invoked here

$buttonStart.addEventListener("click", () => {
  newGame.startGame();
});

$buttonPause.addEventListener("click", () => {
  newGame.pause();
});
