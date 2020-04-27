const $canvas = document.querySelector("canvas");
const context = $canvas.getContext("2d");

class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = $canvas.getContext("2d");

    this.obstacles = new Obstacle();
    this.ball = new Ball();
    this.score = new Score();
  }

  clearCanvas() {
    context.clearRect(0, 0, $canvas.width, $canvas.height);
  }

  startGame() {
    //conditionals based on button clicked
    //initializes obstacles, ball, score methods
    this.clearCanvas();
    this.obstacles.getRandomObstacles();
    this.ball.drawBall();
    this.score.startScore();
    this.obstacles.scrollLvl();
  }

  pauseGame() {
    //this logic 'freezes' the game until the user presses pause again
  }

  gameOver() {
    //this logic stops the game and places 'Game Over' text in center of screen
  }

  changeGameState() {
    //conditionals mapped to game state (start, reset, pause) based on click button logic
    window.addEventListener("click", () => {
      switch (event.click) {
        case document.getElementById("start"):
          startGame();
          break;
        case document.getElementById("pause"):
          pauseGame();
          break;
        case document.getElementById("reset"):
          startGame();
          break;
      }
    });
  }
}
