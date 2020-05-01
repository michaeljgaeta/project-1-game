class Score {
  constructor(game) {
    this.context = $canvas.getContext("2d");
    this.game = game;
    this.score = 0;
  }

  // get rate () {
  //   return this.game.ball.size / 10 + 0.5;
  // }

  drawScore() {
    const context = this.game.context;
    const score = this.score;
    const rate = this.game.ball.size / 10 + 0.5;
    // const rate = this.rate;
    /*this.context.save();
    this.context.globalAlpha = 1;
    this.context.rect(320, 0, 300, 50);
    this.context.fillStyle = "black";
    this.context.fill();*/
    this.context.fillStyle = "white";
    this.context.strokeStyle = "black";
    context.font = "24px sans-serif";
    context.fillText(`Score: ${score.toFixed(1)} - (${rate.toFixed(1)}+ bonus)`, 330, 30);
  }

  increaseScore() {
    const rate = this.game.ball.size / 10 + 0.5;
    this.score += rate;
  }
}
