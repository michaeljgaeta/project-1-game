class Obstacles {
  constructor (x, y, speed) {
    this.x = x;
    this.y = y;

    this.speed = 1;

    this.width = 25;
    this.height = 50;
  }

  getRandomObstacles() {
    //paints random obstacles with Math.random * size of canvas
    const enemies = [];
    for (let i = 0; i < 20; i++) {
      const enemy = new Obstacles(150 + i * 50, Math.random() * $canvas.width);
      enemies.push(enemy);

    const loop = () => {
      for (let enemy of enemies) {
        this.speed -= 1;
        }
    }


  }

  scrollSpeed() {
    //original control speed
    this.x -= this.speed;
  }

}