// Récupération du canvas et de son contexte 2D
let canvas = document.getElementById("plateau-jeu");
let ctx = canvas.getContext("2d");

// Chargement des images
let img_auto = new Image();
let img_route = new Image();
let img_obstacle = new Image();
let img_bonus = new Image();

let list_obstacle = ["images/auto_jaune.png", "images/auto_bleu.png", "images/auto_verte.png"];
img_auto.src = "images/auto.png";
img_route.src = "images/route.png";
img_bonus.src ="images/bonus.png";

// Positions initiales des obstacles et des bonus
let xx_position_obstacle = [125, 240];
let yy_obstacle = 25;

let xx_position_bonus = [125, 240];
let yy_bonus = 50;

// Position initiale de la voiture du joueur
let xx_auto = 240;
let yy_auto = 500;

let xx_bonus;
let xx_obstacle;

// Vitesse des obstacles et état de déplacement de la voiture
let vitesse_obstacle = 10;
let auto_droite = false;

// Points et tours
let points = 0;
let tours = 0;

let seconde = 5;

let animationID;

// Sélection aléatoire d'un obstacle
img_obstacle.src = list_obstacle[Math.floor(Math.random() * 3)];
xx_obstacle = xx_position_obstacle[Math.floor(Math.random() * 2)];
ctx.drawImage(img_obstacle, xx_obstacle, yy_obstacle, 45, 75);

// Fonction pour gérer la fin de jeu
function gameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Partie Terminée", canvas.width / 2, canvas.height / 2);
}

// Fonction pour gérer le déplacement aléatoire des obstacles
function hasardObstacle() {
    yy_obstacle += vitesse_obstacle;
    if (yy_obstacle > canvas.height) {
        img_obstacle.src = list_obstacle[Math.floor(Math.random() * 3)];
        xx_obstacle = xx_position_obstacle[Math.floor(Math.random() * 2)];
        ctx.drawImage(img_obstacle, xx_obstacle, yy_obstacle, 45, 75);
        points += 1;
        yy_obstacle = 25;
        vitesse_obstacle += 0.5;
    }
    ctx.drawImage(img_obstacle, xx_obstacle, yy_obstacle, 45, 75);
}

// Fonction pour gérer les bonus
function bonus() {
    tours += 1;
    if (tours == 100) {
        xx_bonus = xx_position_bonus[Math.floor(Math.random() * 2)];
    } else if (tours >= 400) {
        yy_bonus += 8;
        ctx.drawImage(img_bonus, xx_bonus, yy_bonus, 64, 64);
        if (yy_bonus > canvas.height + 10) {
            yy_bonus = 50;
            tours = 0;
        }
    }
}

function capture_bonus(){
    if (xx_auto + 45 > xx_bonus && xx_auto < xx_bonus + 64 && yy_auto + 75 > yy_bonus && yy_auto < yy_bonus + 64){
        points += 10;
        yy_bonus = 0;
        tours = 0;
    }
}

// Fonction pour afficher le score
function scorePoint() {
    ctx.font = "25px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Points : " + points, 10, 30);
}

// Fonction de minuteur de début de partie
function minuteur() {
    if(seconde >= 0){ 
        ctx.drawImage(img_route, 0, 0, canvas.width, canvas.height);
        ctx.font = "50px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(seconde, canvas.width/2 - 25, canvas.height/2);
    }
    seconde -= 1;
}


// Fonction pour détecter les collisions avec les obstacles
function collisionObstacle() {
    if (xx_auto + 45 > xx_obstacle && xx_auto < xx_obstacle + 45 && yy_auto + 75 > yy_obstacle && yy_auto < yy_obstacle + 75) {
        gameOver();
        ctx.font = "25px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Vous avez marqué " + points + " points", canvas.width/2, canvas.height/2 + 35);
        cancelAnimationFrame(animationID);
        return true;
    }
    return false;
}

// Fonction d'initialisation du jeu
function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img_route, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(img_auto, xx_auto, yy_auto, 45, 75);
    hasardObstacle();
    bonus(tours);
    capture_bonus();
    scorePoint();
   
    

    if (auto_droite && xx_auto < 280) {
        xx_auto += 5;
    } else if (xx_auto > 120) {
        xx_auto -= 5;
    }

    if (collisionObstacle()) {
        return;
    }

    animationID = requestAnimationFrame(init);
}

// Gestion des événements clavier
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight") {
        auto_droite = true;
    }
});

document.addEventListener("keyup", function(event) {
    if (event.key === "ArrowRight") {
        auto_droite = false;
    }
});

setInterval(minuteur, 1000);

setTimeout(() => {
    init();
}, 6000);


