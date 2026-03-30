const canvas = document.getElementById("game-board");
const ctx = canvas.getContext('2d');

let direction = ""; 
const gridSize = 20; 

let snakeBody = [
    { x: 100, y: 100 }
];

let apple = {
    x: 40, 
    y: 40,
    width: gridSize,
    height: gridSize
};

const cols = 25;
const rows = 25;
let score = 0

const spanElement = document.getElementById("score");

function refreshPage(){
    window.location.reload();
} 

function drawGameOver() {
    
    clearInterval(gameInterval);

    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    ctx.fillStyle = "red";
    ctx.font = "bold 48px Arial";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
}


function drawSnake() {
    snakeBody.forEach((segment, index) => {
        ctx.fillStyle = (index === 0) ? 'darkgreen' : 'green'; 
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
        
        ctx.strokeStyle = 'black';
        ctx.strokeRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function drawApple(){
    ctx.fillStyle = 'red'; 
    ctx.fillRect(apple.x, apple.y, gridSize, gridSize);
}

window.addEventListener('keydown', (event) => {
   
    if (event.key === "ArrowRight" && direction !== "left")  direction = "right";
    if (event.key === "ArrowLeft"  && direction !== "right") direction = "left";
    if (event.key === "ArrowUp"    && direction !== "down")  direction = "up";   
    if (event.key === "ArrowDown"  && direction !== "up")    direction = "down";
});

function gameLoop() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let headX = snakeBody[0].x;
    let headY = snakeBody[0].y;

    if (direction === "right") headX += gridSize;
    if (direction === "left")  headX -= gridSize;
    if (direction === "up")    headY -= gridSize;
    if (direction === "down")  headY += gridSize;

    const newHead = { x: headX, y: headY };

    if (direction !== "") {
       if (headX === apple.x && headY === apple.y) {
            apple.x = Math.floor(Math.random() * cols) * gridSize;
            apple.y = Math.floor(Math.random() * rows) * gridSize;
            score += 1
            
        } else {
            
            snakeBody.pop();
        }
        
        snakeBody.unshift(newHead);
    }

    if (headX < 0){
        drawGameOver();
        return;
    } 
    if (headX > 500){
        drawGameOver();
        return;
    } 
    if (headY < 0){
        drawGameOver();
        return;
    } 
    if (headY > 500){
        drawGameOver();
        return;
    } 
    
    for (let i = 1; i < snakeBody.length; i++) {
        if (newHead.x === snakeBody[i].x && newHead.y === snakeBody[i].y) {
            drawGameOver();
            return;
        }
    }
    drawApple();
    drawSnake();
    spanElement.textContent = score;
}

let gameInterval = setInterval(gameLoop, 200);
