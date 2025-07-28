let vitessemouches = 2;
let difficulterInfernale = false;
var bouton1 = document.getElementById("difficulte1");
var bouton2 = document.getElementById("difficulte2");
var bouton3 = document.getElementById("difficulte3");

function niveauFacile(){

    bouton1.style.backgroundColor = "white"; // Changer la couleur du fond du bouton en rouge
    bouton1.style.color = "black"; // Changer la couleur du texte en blanc
    
    if (bouton2 && bouton3){
        bouton2.classList.add("hidden");
        bouton3.classList.add("hidden");
    }

}
function augmenterVitesseMouches() 
{   
   
    bouton2.style.backgroundColor = "white"; // Changer la couleur du fond du bouton en rouge
    bouton2.style.color = "black"; // Changer la couleur du texte en blanc
    vitesseMouches = 4;

    if (bouton1 && bouton3){
        bouton1.classList.add("hidden");
        bouton3.classList.add("hidden");
    }
   
}
function augmenterVitesseGrosseur()
{
    bouton3.style.backgroundColor = "white"; // Changer la couleur du fond du bouton en rouge
    bouton3.style.color = "black"; // Changer la couleur du texte en blanc
    vitesseMouches = 4;
    maxMouches = 60; 
    difficulterInfernale = true;
    if (bouton1 && bouton2){
        bouton1.classList.add("hidden");
        bouton2.classList.add("hidden");
    }

   
}