const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const blockSize = 20;
let direction = "right";

// Drawing the Snake
const snake = new Snake([
  [0, 0],
  [1, 0],
]);
snake.draw();
setInterval(() => snake.advance(direction), 100);

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

let apple = new Apple(generateRandomPosition());
apple.draw();

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

// Direct Snake
document.addEventListener("keydown", function (e) {
  console.log(e.key);
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
