const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let score = 0;

let snake = [{ x: 160, y: 160 }];
let food = generateFood();
let direction = "RIGHT";
let gameInterval;

document.addEventListener("keydown", setDirection);

function setDirection(e) {
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

function generateFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
  };
}

function draw() {
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.fillStyle = "#ef4444";
  ctx.fillRect(food.x, food.y, box, box);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
      // Draw head
      ctx.beginPath();
      ctx.arc(snake[i].x + box / 2, snake[i].y + box / 2, box / 2, 0, 2 * Math.PI);
      ctx.fillStyle = "#22c55e";
      ctx.fill();
      ctx.strokeStyle = "#16a34a";
      ctx.stroke();

      // Eyes
      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.arc(snake[i].x + box / 3, snake[i].y + box / 3, 2, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(snake[i].x + 2 * box / 3, snake[i].y + box / 3, 2, 0, 2 * Math.PI);
      ctx.fill();
    } else {
      // Draw body
      ctx.fillStyle = "#4ade80";
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
  }

  // Move snake
  let head = { x: snake[0].x, y: snake[0].y };

  if (direction === "UP") head.y -= box;
  else if (direction === "DOWN") head.y += box;
  else if (direction === "LEFT") head.x -= box;
  else if (direction === "RIGHT") head.x += box;

  // Game Over
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height ||
    checkCollision(head)
  ) {
    clearInterval(gameInterval);
    alert("Game Over! Your score: " + score);
    location.reload();
    return;
  }

  snake.unshift(head);

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").innerText = score;
    food = generateFood();
  } else {
    snake.pop();
  }
}

function checkCollision(head) {
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) return true;
  }
  return false;
}

gameInterval = setInterval(draw, 150);