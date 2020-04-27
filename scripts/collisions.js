new Collison {
  constructor (true) {
    this.collision = collision;
  }

  checkCollision(ball) {
    //conditionals based on matching positions of ball and obstacles
      if (ball.x === obstacles.x || ball.y === obstacles.y) {
        gameOver();
      }

    }
    
}