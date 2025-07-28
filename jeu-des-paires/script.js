var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var canvas2 = document.getElementById("myCanvas2");
var ctx2 = canvas2.getContext("2d");

var bouton = document.getElementById("bouton-jouer");

let temps_string;
let longeur = 125;
let col;
let row;
let display = 0;
let col_2 = [];
let row_2 = [];
let image_pige = [];
let game_over = 0;
let temps = 0;

var mes_images = [
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
];

mes_images[0].src = "images/vaiseau_2_75.png";
mes_images[1].src = "images/vaiseau_3_75.png";
mes_images[2].src = "images/vaiseau_4_75.png";
mes_images[3].src = "images/vaiseau_5_75.png";
mes_images[4].src = "images/vaiseau_6_75.png";
mes_images[5].src = "images/vaiseau_7_75.png";
mes_images[6].src = "images/vaiseau_8_75.png";
mes_images[7].src = "images/vaiseau_9_75.png";
mes_images[8].src = "images/vaiseau_2_75.png";
mes_images[9].src = "images/vaiseau_3_75.png";
mes_images[10].src = "images/vaiseau_4_75.png";
mes_images[11].src = "images/vaiseau_5_75.png";
mes_images[12].src = "images/vaiseau_6_75.png";
mes_images[13].src = "images/vaiseau_7_75.png";
mes_images[14].src = "images/vaiseau_8_75.png";
mes_images[15].src = "images/vaiseau_9_75.png";

function miseAJourMinuteur() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height); // Efface le contenu du canvas
    ctx2.fillStyle = "orange";
    ctx2.font = "48px Arial";
    ctx2.fillText(temps.toString(), 130, 100); // Affiche le temps actuel
    temps++;
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// dessin de la grille
if (game_over != 16){
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            ctx.strokeStyle = "rgb(249, 163, 44)";
            ctx.strokeRect(i * longeur, j * longeur, longeur, longeur);

        }
    }
}

shuffleArray(mes_images);
// quand on clique sur le bouton html ça mélange les carte et les fait voir une seconde
bouton.addEventListener("click", function () {
    let x = 0;
    let y = 0;


    shuffleArray(mes_images);



    setInterval(miseAJourMinuteur, 1000);
    

    for (let i = 0; i < mes_images.length; i++) {
        ctx.drawImage(mes_images[i], x, y, 125, 125);
        x += 125;
        if (x >= 500) {
            x = 0;
            y += 125;
        }
    }

    setTimeout(function () {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                ctx.clearRect(i * 125, j * 125, 125 - 1, 125 - 1);
            }
        }
    }, 1000);
});



//quand on clique sur une image
canvas.addEventListener("click", function (event) {
    let x = event.clientX - canvas.getBoundingClientRect().left;
    let y = event.clientY - canvas.getBoundingClientRect().top;

    col = Math.floor(x / longeur);
    row = Math.floor(y / longeur);

    //on regarde quelle image a été cliquer
    if (col >= 0 && col < 4 && row >= 0 && row < 4) {
        index = row * 4 + col;
        ctx.drawImage(mes_images[index], col * longeur, row * longeur, longeur, longeur);

        console.log("image");
        col_2.push(col);
        row_2.push(row);
        image_pige.push(mes_images[index]);
        display += 1;
        
        if (display == 2) {
            
            //si c'est la deuxieme carte on fait une comparaison
            if (image_pige[0].isEqualNode(image_pige[1])) {
                game_over += 2;
                col_2.length = 0;
                row_2.length = 0;
                image_pige.length = 0;
                display = 0;

                if(game_over == 16){
                    for (let i = 0; i < 4; i++) {
                        for (let j = 0; j < 4; j++) {
                            ctx.clearRect(i * 125, j * 125, 125, 125);
                        }
                    }
                    ctx.font = "48px serif";
                    ctx.fillText("Bravo, tu a été rapide!", 20, 200);
                }
            }

            else {
                setTimeout(function () {
                    ctx.clearRect(col_2[0] * 125, row_2[0] * 125, 125 - 1, 125 - 1);
                    ctx.clearRect(col_2[1] * 125, row_2[1] * 125, 125 - 1, 125 - 1);

                    col_2.length = 0;
                    row_2.length = 0;
                    image_pige.length = 0;
                    display = 0;
                },1000);
            }
        }
    }
});
