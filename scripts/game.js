const gameMusic = new Audio("audios/8-bit-game-music.mp3");
const backgroundImage0 = new Image();
backgroundImage0.src = "/images/8-bit-day-0.jpg";
const backgroundImage1 = new Image();
backgroundImage1.src = "/images/8-bit-day-1.jpg";
const backgroundImage2 = new Image();
backgroundImage2.src = "/images/8-bit-day-2.jpg";
const backgroundImage3 = new Image();
backgroundImage3.src = "/images/8-bit-day-3.jpg";
const backgroundImage4 = new Image();
backgroundImage4.src = "/images/8-bit-day-4.jpg";
const backgroundImage5 = new Image();
backgroundImage5.src = "/images/8-bit-day-5.jpg";
const backgroundImage6 = new Image();
backgroundImage6.src = "/images/8-bit-day-6.jpg";
const backgroundImage7 = new Image();
backgroundImage7.src = "/images/8-bit-day-7.jpg";

class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = $canvas.getContext("2d");

    // timestamp for creating blocks
    this.blockTime = 0;
    this.range = 1000;

    // timestamp for changing game difficulty
    this.speed = 0;
    this.difficulty1 = 12000;
    this.difficulty2 = 24000;
    this.difficulty3 = 36000;
    this.difficulty4 = 48000;
    this.difficulty = 12000;

    // timestamp to increase the score

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

  drawBackground() {
    if (this.level === 0) {
      this.context.drawImage(backgroundImage0, 0, 0);
    } else if (this.level === 1) {
      this.context.drawImage(backgroundImage1, 0, 0);
    } else if (this.level === 2) {
      this.context.drawImage(backgroundImage2, 0, 0);
    } else if (this.level === 3) {
      this.context.drawImage(backgroundImage3, 0, 0);
    } else if (this.level === 4) {
      this.context.drawImage(backgroundImage4, 0, 0);
    } else if (this.level === 5) {
      this.context.drawImage(backgroundImage5, 0, 0);
    } else if (this.level >= 6) {
      this.context.drawImage(backgroundImage6, 0, 0);
    }
  }

  playTitleAudio() {
    const titleAudio = new Audio("audios/video-game-beeps.wav");
    titleAudio.play();
  }

  clearCanvas() {
    this.context.clearRect(0, 0, $canvas.width, $canvas.height);
  }

  playGameMusic() {
    gameMusic.play();
  }

  pauseGameMusic() {
    gameMusic.pause();
  }

  startGame() {
    //this.running = true;
    this.blockTime = 0;
    this.levelTime = 0;
    this.level = 0;
    this.scoreTime = 0;

    this.speed = 0;

    console.log(this.speed);
    console.log(this.levelTime);

    this.blocksArr = [];
    this.timestamp = 0;

    //console.log(this.timestamp);

    this.ball = new Ball(this);
    this.score = new Score(this);
    if (!this.running) {
      this.running = true;
      this.loop();
    }
    this.playGameMusic();
  }

  pauseGame() {
    if (this.running === true) {
      this.running = !this.running;
    } else {
      this.running = !this.running;
      this.loop();
    }
  }

  resetGame() {
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
    if (this.levelTime < timestamp - this.difficulty) {
      this.levelTime = timestamp;
      this.level++;
      this.speed = 4 * this.level;
      console.log(this.level, this.speed);
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
    if (this.running) {
      this.clearCanvas();
      this.drawBackground();
      this.ball.drawBall();
      for (let block of this.blocksArr) {
        block.drawBlocks();
      }
    }
    this.score.drawScore();
  }
  loop(timestamp) {
    this.runLogic(timestamp);
    this.drawEverything();
    if (this.running === true) {
      this.timestampId = window.requestAnimationFrame((timestamp) => {
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
    this.running = false;
    this.loseNoise();
    this.pauseGameMusic();
    this.context.font = "42px sans-serif";
    this.context.fillText(`Game Over! Score: ${this.score.score}`, 250, $canvas.height / 2);
    //context.fillText(`Game Over! Score: ${this.score.score}`, 350, $canvas.height / 2);
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
