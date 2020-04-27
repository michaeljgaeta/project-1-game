class Ball {
  constructor(x, y, size) {
    this.x = 50;
    this.y = 250;
    this.size = 1;
  }

    drawBall() {
      //draws the ball based on canvas functions
      context.strokeStyle = "green";
      context.fillStyle = "green";
      context.beginPath();
      context.arc(this.x, this.y, 50, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
    }

    changeBallPosition() {
      //conditionals mapped to canvas position and ball speed based on controller logic
      window.addEventListener("keydown", (event) => {
      event.preventDefault();
      
      switch (event.keyCode) {
        case 37: //left arrow
          this.x -= 1;
          break;
        case 38: //up arrow
          this.y -= 1;
          break;
        case 39: //right arrow
          this.x += 1;
          break;
        case 40: //down arrow
          this.y += 1;
          break;
        }
      });
    }
  
    changeBallSize() {
      //conditionals mapped to ball size based on controller logic
      window.addEventListener("keydown", (event) => {
      event.preventDefault();
      
      switch (event.keyCode) {
        case 83: //'s'
          this.size += 50;
          compoundScore(83);
          break;
        case 65: //'a'
          this.size -= 50;
          compoundScore(65);
          break;
        }
      });
    }

    checkCollision() {
      //conditionals based on matching positions of ball and obstacles
      if (this.x === block.x || this.y === block.y) {
        gameOver();
      }
    }
  }