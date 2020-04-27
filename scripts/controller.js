new Controller {
  //change this constructor? how relates to class?
  constructor (left, right, up, down) {
    this.left = left;
    this.right = right;
    this.up = up;
    this.down = down;
  }

  changeGameState() {
    //conditionals mapped to game state (start, reset, pause) based on click button logic
    window.addEventListener("click", () => {

    switch (event.click) {
      case document.getElementById("start"):
        startGame();
        break;
      case document.getElementById("pause"):
        pauseGame();
        break;
      case document.getElementById("reset"):
        startGame();
        break;
    }
    }
  }

  changeBallPosition() {
    //conditionals mapped to canvas position and ball speed based on controller logic
    window.addEventListener("keydown", (event) => {
    event.preventDefault();
    
    switch (event.keyCode) {
      case 37: //left arrow
        ball.x -= 1;
        break;
      case 38: //up arrow
        ball.y -= 1;
        break;
      case 39: //right arrow
      ball.x += 1;
        break;
      case 40: //down arrow
        ball.y += 1;
        break;
    }
    }
  }

  changeBallSize() {
    //conditionals mapped to ball size based on controller logic
    window.addEventListener("keydown", (event) => {
    event.preventDefault();
    
    switch (event.keyCode) {
      case 83: //'s'
        ball.size += 50;
        compoundScore();
        break;
      case 65: //'a'
        ball.size -= 50;
        compoundScore();
        break;
    }
    }
  }

  changeLvlSpeed(keyCode) {
    //conditionals based on multipliers mapped to canvas position based on controller logic
    window.addEventListener("keydown", (event) => {
    event.preventDefault();
    
    switch (event.keyCode) {
      case 87: //'w'
        obstacles.speed += 1;
        compoundScore();
        break;
      case 81: //'q'
        obstacles.speed -= 1;
        compoundScore();
        break;
    }
    }
  }

}