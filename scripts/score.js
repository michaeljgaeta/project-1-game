new Score {
  constructor (game) {
    this.game = game;
    this.score = 0;
  }

  drawScore() {
    const context = this.game.context;
    const score = this.game.score;

    context.font = '24px sans-serif';

    context.fillText(`${score} Points`, 25, this.game.$canvas.height - 25);
  }
  
  increaseScore() {
    //sets absolute control rate of increase based on time interval

  }

  compoundScore() {
    //increment/decrement absolute score increase by multiplier based on controller keystroke logic
  }
}