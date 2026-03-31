const canvas = document.getElementById("game-board");
const ctx = canvas.getContext('2d');
const spanScore = document.getElementById("score");
const spanHightScore = document.getElementById("hight_score");

// --- CONFIGURATION ---
const gridSize = 20;
const cols = 25;
const rows = 25;
const cookieName = "high_score";

// --- VARIABLES D'ÉTAT ---
let gameState = "MENU"; // États : "MENU", "PLAYING", "GAMEOVER"
let score = 0;
let direction = "";
let snakeBody = [{ x: 100, y: 100 }];
let apple = { x: 40, y: 40 };

// --- INITIALISATION ---
spanScore.textContent = score;
spanHightScore.textContent = getCookieValue(cookieName) || 0;

// --- GESTION DES COOKIES ---
function getCookieValue(name) {
    const match = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
}

function updateHighScore(nouveauScore) {
    const ancienScore = parseInt(getCookieValue(cookieName), 10) || 0;
    if (nouveauScore > ancienScore) {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        document.cookie = `${cookieName}=${nouveauScore}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
        spanHightScore.textContent = nouveauScore;
    }
}

// --- LOGIQUE DE JEU ---
function resetGame() {
    score = 0;
    spanScore.textContent = score;
    direction = "";
    snakeBody = [{ x: 100, y: 100 }];
    spawnApple();
}

function spawnApple() {
    apple.x = Math.floor(Math.random() * cols) * gridSize;
    apple.y = Math.floor(Math.random() * rows) * gridSize;
}

function update() {
    if (gameState !== "PLAYING" || direction === "") return;

    let headX = snakeBody[0].x;
    let headY = snakeBody[0].y;

    if (direction === "right") headX += gridSize;
    if (direction === "left")  headX -= gridSize;
    if (direction === "up")    headY -= gridSize;
    if (direction === "down")  headY += gridSize;

    const newHead = { x: headX, y: headY };

    // Collision Pomme
    if (headX === apple.x && headY === apple.y) {
        score++;
        spanScore.textContent = score;
        updateHighScore(score);
        spawnApple();
    } else {
        snakeBody.pop();
    }

    // Collision Murs ou Soi-même
    if (headX < 0 || headX >= canvas.width || headY < 0 || headY >= canvas.height ||
        snakeBody.some((seg, i) => i !== 0 && seg.x === newHead.x && seg.y === newHead.y)) {
        gameState = "GAMEOVER";
        return;
    }

    snakeBody.unshift(newHead);
}

// --- DESSIN (RENDU) ---
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === "MENU") {
        drawText("SNAKE GAME", "darkgreen", "30px", -20);
        drawText("Appuyez sur 'Entrée' pour jouer", "black", "18px", 30);
    } 
    else if (gameState === "PLAYING") {
        // Dessin Pomme
        ctx.fillStyle = 'red';
        ctx.fillRect(apple.x, apple.y, gridSize, gridSize);
        
        // Dessin Serpent
        snakeBody.forEach((segment, index) => {
            ctx.fillStyle = (index === 0) ? 'darkgreen' : 'green';
            ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(segment.x, segment.y, gridSize, gridSize);
        });
    } 
    else if (gameState === "GAMEOVER") {
        drawText("GAME OVER", "red", "48px", -20);
        drawText("Entrée pour recommencer", "black", "18px", 30);
    }
}

function drawText(text, color, size, offset) {
    ctx.fillStyle = color;
    ctx.font = `bold ${size} Arial`;
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, (canvas.height / 2) + offset);
}

// --- ENTRÉES CLAVIER ---
window.addEventListener('keydown', (event) => {
    if ((gameState === "MENU" || gameState === "GAMEOVER") && event.key === "Enter") {
        resetGame();
        gameState = "PLAYING";
    }

    if (gameState === "PLAYING") {
        const key = event.key;
        if (key === "ArrowRight" && direction !== "left")  direction = "right";
        if (key === "ArrowLeft"  && direction !== "right") direction = "left";
        if (key === "ArrowUp"    && direction !== "down")  direction = "up";
        if (key === "ArrowDown"  && direction !== "up")    direction = "down";
    }
});

// --- BOUCLE PRINCIPALE (60 FPS environ, mais logique bridée par l'intervalle) ---
function gameLoop() {
    update();
    draw();
}

// On garde ton intervalle de 200ms pour que le serpent ne soit pas trop rapide
setInterval(gameLoop, 200);