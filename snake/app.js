const canvas = document.getElementById("game-board");
const ctx = canvas.getContext('2d');
const spanScore = document.getElementById("score");
const spanHightScore = document.getElementById("hight_score");
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
const cookieName = "high_score";

/**
 * Gère la création et la mise à jour du record dans les cookies
 * @param {number} nouveauScore - Le score actuel à comparer
 */
function updateHighScore(nouveauScore) {
    // 1. Fonction interne pour récupérer la valeur du cookie
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    };

    // 2. Fonction interne pour sauvegarder le cookie (1 an)
    const setHighScoreCookie = (valeur) => {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        document.cookie = `${cookieName}=${valeur}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
    };

    const cookieValue = getCookie(cookieName);

    if (cookieValue === null) {
        // CAS 1 : Le cookie n'existe pas encore
        setHighScoreCookie(nouveauScore);
        console.log("Premier record enregistré : " + nouveauScore);
    
    } else {
        // CAS 2 : On compare avec l'ancien record
        const ancienScore = parseInt(cookieValue, 10);
        
        if (nouveauScore > ancienScore) {
            setHighScoreCookie(nouveauScore);
            console.log(`Nouveau record ! Passage de ${ancienScore} à ${nouveauScore}`);
            
        } else {
            console.log(`Score actuel (${nouveauScore}) inférieur au record (${ancienScore}).`);
        
        }
    }
}


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
            spanScore.textContent = score;
            updateHighScore(score);
            spanHightScore.textContent = getCookieValue(cookieName);
            
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
}


function getCookieValue(name) {
    // Construire le motif de recherche
    const match = document.cookie.match(new RegExp('(?:^|; )' + 
        name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
    
    // Retourner la valeur décodée ou null
    return match ? decodeURIComponent(match[1]) : null;
}

spanScore.textContent = score;
spanHightScore.textContent = getCookieValue(cookieName);
let gameInterval = setInterval(gameLoop, 200);
