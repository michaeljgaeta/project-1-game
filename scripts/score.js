class Score {
  constructor() {
    this.score = 1 * this.rate;
    this.rate = 1;
  }

  increaseScore() {
    //sets absolute control rate of increase based on time interval
    //how to display the score?
    this.score += 1;
    setInterval(increaseScore(), 1000 / 5);
  }

  compoundScore(keyCode) {
    //increment/decrement absolute score increase by multiplier based on controller keystroke logic
    switch (keyCode) {
      case 87:
        this.rate += 0.01;
        break;
      case 81:
        this.rate -= 0.01;
        break;
      case 83:
        this.rate += 0.01;
        break;
      case 65:
        this.rate -= 0.01;
        break;
    }
  }
}
