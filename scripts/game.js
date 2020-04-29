class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = $canvas.getContext("2d");

    // timestamp for creating blocks
    this.blockTime = 0;
    this.range = 1000;

    // timestamp for changing game difficulty
    this.speed = 0;
    this.levelTime = 0;
    this.difficulty1 = 12000;
    this.difficulty2 = 24000;
    this.difficulty3 = 36000;
    this.difficulty4 = 48000;
    this.running = "";

    // timestamp to increase the score
    this.scoreTime = 0;
    this.increaseScore = 1000;

    // set key bindings and sets title screen
    this.setKeyBindings();
    this.drawTitleScreen();
    this.playTitleAudio();
  }

  setKeyBindings() {
    window.addEventListener("keydown", (event) => {
      event.preventDefault();
      if (this.running) {
        switch (event.keyCode) {
          case 83: //'s' bigger ball
            this.ball.size += 5;
            break;
          case 65: //'a' smaller ball
            this.ball.size = Math.max(this.ball.size - 5, 5);
            break;
          case 37: //left
            this.ball.move("left");
            break;
          case 38: //up
            this.ball.move("up");
            break;
          case 39: //right
            this.ball.move("right");
            break;
          case 40: //down
            this.ball.move("down");
            break;
        }
      }
    });
  }

  drawTitleScreen() {
    const titleImg = new Image();
    titleImg.src = "/images/risk-runner-title.png";
    titleImg.addEventListener("load", () => {
      this.context.drawImage(titleImg, 0, 0);
    });
  }

  playTitleAudio() {
    const titleAudio = new Audio("audios/video-game-beeps.wav");
    titleAudio.play();
  }

  clearCanvas() {
    this.context.clearRect(0, 0, $canvas.width, $canvas.height);
  }

  playGameMusic() {
    const gameMusic = new Audio("audios/nuts-and-bolts-short.wav");
    gameMusic.play();
  }

  startGame() {
    this.running = true;
    this.blockTime = 0;
    this.levelTime = 0;
    this.scoreTime = 0;
    this.speed = 0;
    this.blocksArr = [];
    this.timestamp = 0;
    this.ball = new Ball(this);
    this.score = new Score(this);
    this.loop(0);
  }

  pause() {
    this.running = !this.running;
    if (this.running === true) {
      this.loop();
    }
  }

  reset() {
    this.startGame();
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
      this.speed = 4;
      console.log("difficulty 1");
    } else if (this.levelTime > timestamp - this.difficulty2) {
      this.speed = 8;
      console.log("difficulty 2");
    } else if (this.levelTime > timestamp - this.difficulty3) {
      this.speed = 12;
      console.log("difficulty 3");
    } else if (this.levelTime > timestamp - this.difficulty4) {
      this.speed = 16;
      console.log("difficulty 4");
    } else {
      this.speed = 20;
      console.log("difficulty 5");
    }

    if (this.blockTime < timestamp - this.range) {
      this.blockTime = timestamp;
      const block = new Block(this, $canvas.width, Math.random() * $canvas.height, Math.random() * this.speed + 1);
      this.blocksArr.push(block);
    }
    for (let block of this.blocksArr) {
      block.runLogic();
    }
    this.checkCollision();
  }

  drawEverything() {
    this.clearCanvas();
    this.ball.drawBall();
    for (let block of this.blocksArr) {
      block.drawBlocks();
    }
    this.score.drawScore();
  }

  loop(timestamp) {
    this.runLogic(timestamp);
    this.drawEverything();
    if (this.running === true) {
      window.requestAnimationFrame((timestamp) => {
        this.loop(timestamp);
      });
    }
  }

  loseNoise() {
    // Play sound of losing
    const losingNoise = new Audio("audios/crash.wav");
    losingNoise.play();
  }

  drawGameOver() {
    this.context.font = "64px sans-serif";
    this.context.fillText("Game Over! Score: " + this.score, $canvas.width / 2, $canvas.height / 2);
    //("Game Over! Score: " + this.score.toFixed(1)
    this.running = !this.running;
    const context = this.context;
    this.loseNoise();
  }

  checkCollision() {
    for (let block of this.blocksArr) {
      if (
        this.ball.x + this.ball.size >= block.x - block.width / 2 &&
        this.ball.x - this.ball.size <= block.x + block.width / 2 &&
        this.ball.y + this.ball.size >= block.y - block.height / 2 &&
        this.ball.y - this.ball.size <= block.y + block.height / 2
      ) {
        this.drawGameOver();
      }
    }
  }
}
