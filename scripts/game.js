const $canvas = document.querySelector('canvas');
const context = $canvas.getContext('2d');

new Game {
  constructor ($canvas) {
    this.$canvas = $canvas;
    this.context = $canvas.getContext('2d');

    this.obstacles = new Obstacles;
    this.ball = new Ball;
    this.controller = new Controller;
    this.score = new Score;
  }

  clearCanvas() {
    context.clearRect(0, 0, $canvas.width, $canvas.height);
  }

  startGame() {
    //conditionals based on controller start button
    //initializes obstacles, ball, score methods
    this.clearCanvas();
    this.obstacles.getRandomObstacles();
    this.ball.drawBall();
    this.score.increaseScore();
  }

  pauseGame() {
    //this logic 'freezes' the game until the user presses pause again
  }

  gameOver() {
      //this logic stops the game and places 'Game Over' text in center of screen
    }
  }
}