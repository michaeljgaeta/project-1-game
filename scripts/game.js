class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = $canvas.getContext("2d");

    // timestamp for creating blocks
    this.blockTime = 0;
    this.range = 3000;

    // timestamp for changing game difficulty
    this.speed = 5;
    this.levelTime = 0;
    this.difficulty1 = 12000;
    this.difficulty2 = 21000;

    // timestamp to increase the score
    this.scoreTime = 0;
    this.increaseScore = 3000;
  }

  clearCanvas() {
    this.context.clearRect(0, 0, $canvas.width, $canvas.height);
  }

  startGame() {
    //conditionals based on button clicked
    //initializes obstacles, ball, score methods
    this.running = true;
    this.blockTime = 0;
    this.levelTime = 0;
    this.scoreTime = 0;
    this.speed = 5;
    this.blocksArr = [];
    this.ball = new Ball(this); //creates new instance of ball
    this.ball.changeBallSize(); //invokes ball size controls
    this.ball.changeBallPosition(); //invokes ball position controls
    this.score = new Score(this); //creates new instance of score
    this.loop(0); //invokes this object's loop function (below)
    this.score.drawScore();
    this.score.compoundScore();
  }

  pause() {
    this.running = !this.running;
    if (this.running === true) {
      this.loop();
    }
  }

  runLogic(timestamp) {
    // increasing the score
    if (this.scoreTime === 0 || !this.scoreTime) {
      this.scoreTime = timestamp;
    } else if (this.scoreTime < timestamp - this.increaseScore) {
      this.scoreTime = timestamp;
      this.score.increaseScore();
    }
    // changing difficulty
    if (this.levelTime > timestamp - this.difficulty1) {
      this.speed = 5;
      console.log("difficulty 1");
    } else if (this.levelTime > timestamp - this.difficulty2) {
      this.speed = 10;
      console.log("difficulty 2");
    } else {
      this.speed = 15;
      console.log("difficulty 3");
    }
    if (this.blockTime < timestamp - this.range) {
      this.blockTime = timestamp;
      const block = new Block(this, $canvas.width, Math.random() * $canvas.height, Math.random() * this.speed + 1);
      block.changeBlockSpeed();
      this.blocksArr.push(block);
    }
    for (let block of this.blocksArr) {
      block.runLogic();
    }
  }

  drawEverything() {
    this.clearCanvas();
    this.ball.drawBall();
    for (let block of this.blocksArr) {
      block.drawBlocks();
    }
  }

  loop(timestamp) {
    this.checkCollision();
    this.runLogic(timestamp);
    this.drawEverything();
    this.score.drawScore();
    if (this.running === true) {
      window.requestAnimationFrame((timestamp) => {
        this.loop(timestamp);
      });
    }
  }

  drawGameOver() {
    this.running = !this.running;
    const context = this.context;
    context.font = "64px sans-serif";
    context.fillText(`Game Over`, 250, 500);
    context.save();
  }

  checkCollision() {
    //conditionals based on matching positions of ball and obstacles (any edge of ball, any edge of oblock)
    for (let block of this.blocksArr) {
      if (
        this.ball.x + this.ball.size >= block.x - block.width / 2 &&
        //ball right side > block left side
        this.ball.x - this.ball.size <= block.x + block.width / 2 &&
        //ball left side < block right side
        this.ball.y + this.ball.size >= block.y - block.height / 2 &&
        //ball top side > block bottom side
        this.ball.y - this.ball.size <= block.y + block.height / 2
        //ball bottom side < block top side
      ) {
        // another method?
        this.drawGameOver();
        console.log("ball touched block");
      }
    }
  } //search for range/margins (radius) - sometimes doesn't work? wonky when circle biggger, sometimes the ball can go through the block when it's too small
}

/*changeGameState() {
    //conditionals mapped to game state (start, reset, pause) based on click button logic
    window.addEventListener("click", () => {
      const gameState = "";
      switch (event.click) {
        case document.getElementById("start"):
          gameIsPlaying = true;
          break;
      }
    });
  }*/
