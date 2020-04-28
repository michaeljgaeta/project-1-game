class Block {
  constructor(game, x, y, speed) {
    this.game = game;
    this.x = x;
    this.y = y;

    this.speed = speed;

    this.width = 25;
    this.height = 50;
  }

  getRandomBlocks() {
    //paints random obstacles with Math.random * size of canvas
    const blocksArr = [];
    for (let i = 0; i < 20; i++) {
      const block = new Block(150 + i * 50, Math.random() * $canvas.width, 1);
      blocksArr.push();
    }
  }

  drawBlocks() {
    this.game.context.fillRect(this.x, this.y, this.width, this.height);
  }

  runLogic() {
    this.x -= this.speed;
  }

  changeBlockSpeed(keyCode) {
    //conditionals based on multipliers mapped to canvas position based on controller logic
    window.addEventListener("keydown", (event) => {
      event.preventDefault();

      switch (event.keyCode) {
        case 87: //'w'
          this.speed -= this.speed / 2;
          //compoundScore(87);
          break;
        case 81: //'q'
          this.speed += 5;
          //compoundScore(81);
          break;
      }
    });
  }
}
//for later - loop to increase block speed every x seconds/interval
//fix disappearing and going off the canvas
