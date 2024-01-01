// Todo
// Fix itting the wall
// Fix the apple to appear only in the area that is not occupied by the snake
// Refactor the code

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const blockSize = 20;
let direction = "right";
let isGameOver = true;
let intervalId;
let apple;

let snake;
function init() {
  isGameOver = false;
  clearInterval(intervalId);
  direction = "right";
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
  // Drawing the Snake
  snake = new Snake([
    [0, 0],
    [1, 0],
    [2, 0],
  ]);

  snake.draw();
  intervalId = setInterval(() => snake.advance(direction), 200);

  apple = new Apple(generateRandomPosition());
  apple.draw();

  // Direct Snake
  document.addEventListener("keydown", function (e) {
    switch (e.key) {
      case "ArrowRight":
        if (direction === "right" || direction === "left") break;
        direction = "right";
        snake.advance(direction);
        break;
      case "ArrowLeft":
        if (direction === "left" || direction === "right") break;
        direction = "left";
        snake.advance(direction);
        break;
      case "ArrowDown":
        if (direction === "down" || direction === "top") break;
        direction = "down";
        snake.advance(direction);
        break;
      case "ArrowUp":
        if (direction === "down" || direction === "top") break;
        direction = "top";
        snake.advance(direction);
        break;

      default:
        break;
    }
  });
}

function Snake(body) {
  this.body = body;
  this.draw = function () {
    ctx.save();
    ctx.fillStyle = "green";
    for (const coords of this.body) {
      const [x, y] = coords;
      ctx.fillRect(x * blockSize, (y * blockSize) / 2, 20, 10);
    }
    ctx.restore();
  };

  this.direct = function () {
    let prevPos = this.body.at(-1).slice();
    if (direction === "right") this.body.at(-1)[0] += 1;
    if (direction === "left") this.body.at(-1)[0] -= 1;
    if (direction === "down") this.body.at(-1)[1] += 1;
    if (direction === "top") this.body.at(-1)[1] -= 1;
    for (let i = this.body.length - 2; i >= 0; i--) {
      const currentPos = this.body[i].slice();
      this.body[i] = prevPos;
      prevPos = currentPos;
    }
  };

  this.advance = function (direction) {
    // Checking if the snake hits itself
    for (const coords of snake.body.slice(0, snake.body.length - 1)) {
      if (snake.body.at(-1)[0] !== coords[0]) continue;
      if (snake.body.at(-1)[1] !== coords[1]) continue;
      isGameOver = true;
    }
    if (
      snake.body[snake.body.length - 1][0] >= 15 ||
      snake.body[snake.body.length - 1][0] < 0 ||
      snake.body[snake.body.length - 1][1] >= 15 ||
      snake.body[snake.body.length - 1][1] < 0
    )
      isGameOver = true;
    if (isGameOver) {
      alert("Game Over");
      init();
      return;
    }
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
    const [x, y] = apple.position;
    apple.draw();
    const [headX, headY] = this.body.at(-1);
    if (headX === x && headY === y) {
      this.body.unshift([0, 0]);
      apple = new Apple(generateRandomPosition());
      apple.draw();
    }
    switch (direction) {
      case "right":
        this.direct();
        break;
      case "down":
        this.direct();
        break;
      case "top":
        this.direct();
        break;
      case "left":
        this.direct();
        break;

      default:
        break;
    }

    this.draw();
  };
}

// Drawing the apple
function Apple(position) {
  this.position = position;
  this.draw = function () {
    ctx.save();
    ctx.fillStyle = "red";
    ctx.fillRect(
      this.position[0] * blockSize,
      (this.position[1] * blockSize) / 2,
      20,
      10
    );
    ctx.restore();
  };
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function generateRandomPosition() {
  return [getRandomInt(0, 14), getRandomInt(0, 14)];
}

init();
