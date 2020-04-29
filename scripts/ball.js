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

  move(direction) {
    switch (direction) {
      case "left": //left arrow
        this.x -= 200 / this.size;
        break;
      case "up": //up arrow
        this.y -= 200 / this.size;
        break;
      case "right": //right arrow
        this.x += 200 / this.size;
        break;
      case "down": //down arrow
        this.y += 200 / this.size;
        break;
    }
    if (this.x >= $canvas.width - this.size || this.x <= this.size) {
      this.x = $canvas.width - this.size;
    }

    if (this.y >= $canvas.height - this.size || this.y <= this.size) {
      this.y = $canvas.height - this.size;
    }
  }
}
