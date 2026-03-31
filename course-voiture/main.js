// ==========================================
// 1. CONFIGURATION ET ÉTATS
// ==========================================
const ETAT_MINUTEUR = "MINUTEUR";
const ETAT_JEU = "JEU";
const ETAT_GAMEOVER = "GAMEOVER";

let etatActuel = ETAT_MINUTEUR;

const canvas = document.getElementById("plateau-jeu");
const ctx = canvas.getContext("2d");

// ==========================================
// 2. VARIABLES DU JEU
// ==========================================
// Images
const img_auto = new Image();
const img_route = new Image();
const img_obstacle = new Image();
const img_bonus = new Image();

const list_obstacle = ["images/auto_jaune.png", "images/auto_bleu.png", "images/auto_verte.png"];
img_auto.src = "images/auto.png";
img_route.src = "images/route.png";
img_bonus.src = "images/bonus.png";

// Positions et Physique
let xx_auto = 240;
let yy_auto = 500;

let xx_obstacle = 125;
let yy_obstacle = 25;
const xx_pos_possibles = [125, 240];

let xx_bonus = 125;
let yy_bonus = 50;

let vitesse_obstacle = 5;
let points = 0;
let tours = 0;
let seconde = 5;

// Contrôles
let touche_droite = false;
let touche_gauche = false;

// ==========================================
// 3. LOGIQUE MÉTIER (FONCTIONS)
// ==========================================

function resetJeu() {
    points = 0;
    vitesse_obstacle = 10;
    yy_obstacle = 25;
    seconde = 5;
    xx_auto = 240;
    tours = 0;
    genererObstacle();
    etatActuel = ETAT_MINUTEUR;
}

function genererObstacle() {
    img_obstacle.src = list_obstacle[Math.floor(Math.random() * 3)];
    
    // Aléatoire entre la bordure gauche (120) et la bordure droite (280)
    let min = 120;
    let max = 280 - 45; // On retire la largeur de la voiture
    xx_obstacle = Math.floor(Math.random() * (max - min + 1)) + min;
}

function gererObstacles() {
    yy_obstacle += vitesse_obstacle;
    
    if (yy_obstacle > canvas.height) {
        points += 1;
        yy_obstacle = 25;
        vitesse_obstacle += 0.5;
        genererObstacle();
    }
    ctx.drawImage(img_obstacle, xx_obstacle, yy_obstacle, 45, 75);
}

function gererBonus() {
    tours += 1;
    if (tours === 100) {
        xx_bonus = xx_pos_possibles[Math.floor(Math.random() * 2)];
    } else if (tours >= 400) {
        yy_bonus += 8;
        ctx.drawImage(img_bonus, xx_bonus, yy_bonus, 64, 64);
        
        // Collision bonus
        if (xx_auto + 45 > xx_bonus && xx_auto < xx_bonus + 64 && yy_auto + 75 > yy_bonus && yy_auto < yy_bonus + 64) {
            points += 10;
            yy_bonus = -100; // Sort de l'écran
            tours = 0;
        }

        if (yy_bonus > canvas.height) {
            yy_bonus = 50;
            tours = 0;
        }
    }
}

function verifierCollision() {
    if (xx_auto + 45 > xx_obstacle && xx_auto < xx_obstacle + 45 && yy_auto + 75 > yy_obstacle && yy_auto < yy_obstacle + 75) {
        etatActuel = ETAT_GAMEOVER;
    }
}

// ==========================================
// 4. SYSTÈME DE RENDU (MACHINE À ÉTATS)
// ==========================================

function loop() {
    // On efface tout à chaque frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (etatActuel) {
        case ETAT_MINUTEUR:
            ctx.drawImage(img_route, 0, 0, canvas.width, canvas.height);
            ctx.font = "50px Arial";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText(seconde, canvas.width / 2, canvas.height / 2);
            break;

        case ETAT_JEU:
            // Dessiner la route
            ctx.drawImage(img_route, 0, 0, canvas.width, canvas.height);
            
            // Dessiner le joueur
            ctx.drawImage(img_auto, xx_auto, yy_auto, 45, 75);

            // Logique de mouvement
            if (touche_droite && xx_auto < 280) xx_auto += 5;
            if (touche_gauche && xx_auto > 120) xx_auto -= 5;

            // Obstacles, Bonus et Score
            gererObstacles();
            gererBonus();
            verifierCollision();

            // Affichage Score
            ctx.font = "25px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "left";
            ctx.fillText("Points : " + points, 10, 30);
            break;

        case ETAT_GAMEOVER:
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)"; // Fond semi-transparent
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText("PARTIE TERMINÉE", canvas.width / 2, canvas.height / 2);
            ctx.font = "20px Arial";
            ctx.fillText("Score final : " + points, canvas.width / 2, canvas.height / 2 + 50);
            ctx.fillText("Espace pour recommencer", canvas.width / 2, canvas.height / 2 + 90);
            window.location.reload();
    }

    requestAnimationFrame(loop);
}

// ==========================================
// 5. ÉVÉNEMENTS (INPUTS & TIMERS)
// ==========================================

// Gestion du compte à rebours
setInterval(() => {
    if (etatActuel === ETAT_MINUTEUR) {
        seconde--;
        if (seconde <= 0) {
            etatActuel = ETAT_JEU;
        }
    }
}, 1000);

// Écouteurs de clavier
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") touche_droite = true;
    if (e.key === "ArrowLeft") touche_gauche = true;
    if (e.code === "Space" && etatActuel === ETAT_GAMEOVER) resetJeu();
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight") touche_droite = false;
    if (e.key === "ArrowLeft") touche_gauche = false;
});

// Lancement initial
genererObstacle();
loop();
