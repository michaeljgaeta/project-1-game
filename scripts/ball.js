class Ball {
  constructor(x, y, size) {
    this.x = 50;
    this.y = $canvas.height / 2;
    this.size = size;


    drawBall() {
      //draws the ball based on canvas functions
      context.strokeStyle = "green";
      context.fillStyle = "green";
      context.beginPath();
      context.arc(this.x, this.y, 50, 0, 2 * Math.PI);
      context.closePath();
      context.fill();
    }

  }