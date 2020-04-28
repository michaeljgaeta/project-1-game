class Score {
  constructor(game) {
    this.context = $canvas.getContext("2d");
    this.game = game;
    this.score = 0;
    this.rate = 1;
  }

  drawScore() {
    const context = this.game.context;
    const score = this.score.toFixed(1);

    context.font = "24px sans-serif";
    context.fillText(`Score: ${score} - (${this.rate.toFixed(1)}x multiplier)`, 500, 25);
  }
  // method to increase the score > this method can use the timestamp
  increaseScore() {
    this.score += 1 * this.rate.toFixed(1);
  }

  compoundScore(keyCode) {
    //increment/decrement absolute score increase by multiplier based on controller keystroke logic
    window.addEventListener("keydown", (event) => {
      event.preventDefault();

      switch (event.keyCode) {
        case 87: //'w'
          this.rate -= 0.1;
          break;
        case 81: //'q'
          this.rate += 0.1;
          break;
        case 83: //'s'
          this.rate += 0.1;
          break;
        case 65: //'a'
          this.rate -= 0.1;
          break;
      }
      //console.log(this.rate);
      //this.score = this.score * this.rate;
    });
  }
}
