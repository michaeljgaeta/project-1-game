class Block {
  constructor(game, x, y, speed) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.color = "#444a8a";

    this.speed = speed;

    this.width = 25;
    this.height = 50;
  }

  getRandomBlocks() {
    const blocksArr = [];
    for (let i = 0; i < 20; i++) {
      const block = new Block(150 + i * 50, Math.random() * $canvas.width, 1);

      blocksArr.push();
    }
  }

  drawBlocks() {
    this.game.context.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }
  /*
  drawBlocks() {
    const context = this.game.context;
    const catBall = new Image();
    catBall.src = "images/cat-ball.png";
    catBall.addEventListener("load", () => {
      this.context.drawImage(catBall, this.x - this.width, this.y - this.height / 2, this.width, this.height);
      console.log(this.x, this.y, catBall);
      
    });
  }*/

  runLogic() {
    this.x -= this.speed;
  }
}
