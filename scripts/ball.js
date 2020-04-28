class Ball {
  constructor(game, x, y, size) {
    this.game = game;
    this.x = 50;
    this.y = 250;
    this.size = 5; //radius
  }

  drawBall() {
    //draws the ball based on canvas functions
    const context = this.game.context;
    context.strokeStyle = "black";
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = "black";
    context.fill();
  }

  changeBallPosition() {
    //conditionals mapped to canvas position and ball speed based on controller logic
    window.addEventListener("keydown", (event) => {
      event.preventDefault();

      switch (event.keyCode) {
        case 37: //left arrow
          this.x -= 200 / this.size;
          break;
        case 38: //up arrow
          this.y -= 200 / this.size;
          break;
        case 39: //right arrow
          this.x += 200 / this.size;
          break;
        case 40: //down arrow
          this.y += 200 / this.size;
          break;
      }
    });
  }

  changeBallSize(keyCode) {
    //conditionals mapped to ball size based on controller logic
    window.addEventListener("keydown", (event) => {
      event.preventDefault();

      if (this.size <= 5) {
        this.size = 5;
      } //prevent ball size smaller than 5px;

      switch (event.keyCode) {
        case 83: //'s'
          this.size += 5;
          //compoundScore(83);
          break;
        case 65: //'a'
          this.size -= 5;
          //ompoundScore(65);
          break;
      }
    });
  }
}
