
const ctx = document.getElementById("view").getContext("2d");

let snake = [
  { x:100, y:100 },
  { x:120, y:100 },
  { x:140, y:100 },
  { x:160, y:100 },
  { x:180, y:100 },
];

// Snake direction
let snakeDirection = "ArrowRight";

// Position of food
let foodLocation = { x:null, y:null };

function drawSnake() {
  snake.forEach(piece => {
	ctx.fillStyle = "lime";
	ctx.fillRect(piece.x, piece.y, 10, 10);
	ctx.strokeRect(piece.x, piece.y, 10, 10);
  })
}

function moveSnake() {
  snake.pop();
  switch (snakeDirection) {
	case "ArrowRight" : snake.unshift({ x:snake[0].x+10, y:snake[0].y });
	case "ArrowLeft"  : snake.unshift({ x:snake[0].x-10, y:snake[0].y });
	case "ArrowDown"  : snake.unshift({ x:snake[0].x, y:snake[0].y+10 });
	case "ArrowUp"    : snake.unshift({ x:snake[0].x, y:snake[0].y-10 });
  }
}

function checkForCollision() {
  // Check for collision with the play area boundary
  if (snake[0].x < -10 || snake[0].x > 490) return true;
  if (snake[0].y < -10 || snake[0].y > 490) return true;

  // Check for collision with food
  const xdelta = Math.abs(snake[0].x-foodLocation.x)/snake[0].x;
  const ydelta = Math.abs(snake[0].y-foodLocation.y)/snake[0].y;

  if (ydelta < 15 && xdelta < 15) generateFood(true);
}

function generateFood(addPoint) {
  foodLocation.x = Math.floor(Math.random()*480);
  foodLocation.y = Math.floor(Math.random()*480);

  if (addPoint) {
	snake.unshift({ x:snake[0].x+10, y:snake[0].y });
	score++;
	document.getElementById("score").innerHTML = score;
  }
}

function drawFood() {
  ctx.fillStyle = "tomato";
  ctx.strokeRect(foodLocation.x, foodLocation.y, 15, 15);
  ctx.fillRect(foodLocation.x, foodLocation.y, 15, 15);
}

document.addEventListener("keydown", event => snakeDirection = event.key);

function drawGameAssets() {
  ctx.clearRect(0, 0, 480, 480);
  drawSnake();
  drawFood();
}

function loop() {
  if (checkForCollision()) return;
  moveSnake();
  drawGameAssets();
  requestAnimationFrame(loop, 1);
}

generateFood();
loop();

