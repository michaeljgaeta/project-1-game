class Block {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;

    this.speed = 1;

    this.width = 25;
    this.height = 50;
  }

  getRandomBlocks() {
    //paints random obstacles with Math.random * size of canvas
    const blocksArr = [];
    for (let i = 0; i < 20; i++) {
      const block = new Block(150 + i * 50, Math.random() * $canvas.width, 1);
      blocksArr.push(block);
    }
  }

  drawBlocks() {
    context.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }

  scrollBlocks() {
    //original control speed
    this.x -= this.speed;
  }

  changeBlockSpeed(keyCode) {
    //conditionals based on multipliers mapped to canvas position based on controller logic
    window.addEventListener("keydown", (event) => {
      event.preventDefault();

      switch (event.keyCode) {
        case 87: //'w'
          this.speed += 1;
          compoundScore(87);
          break;
        case 81: //'q'
          this.speed -= 1;
          compoundScore(81);
          break;
      }
    });
  }
}
