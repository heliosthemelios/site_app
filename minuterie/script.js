let i; // variable globale
let startTime;
let myTimer;
function displayCurrentTime(){
    var maReferenceTemps = new Date();

    var hhmmss = maReferenceTemps.toLocaleTimeString();

    document.getElementById("current-hour").innerHTML = hhmmss;

}

function displayCurrentDate(){
    var maReferenceTemps = new Date();

    var jjmmaaaa = maReferenceTemps.toLocaleDateString();

    document.getElementById("current-date").innerHTML = jjmmaaaa;

}

function startCountdown() {
    i = parseInt(document.getElementById("set-number").value); // on récupère la valeur une seule fois
    document.getElementById("set-number").value="";
    document.getElementById("time-remaining").innerHTML = i;
    myTimer = setInterval(decreasingTime, 1000); // appelle decreasingTime chaque seconde
}
 
function decreasingTime() {
    if(i > 0){
        i--;
        document.getElementById("time-remaining").innerHTML = i;
    } else {
        clearInterval(myTimer);
        document.getElementById("time-remaining").innerHTML = "Le compte à rebours est terminé !";
    }

}
function startChrono() {
    startTime = Date.now(); // on stocke le temps de départ
    myTimer = setInterval(updateChrono, 100); // on met à jour toutes les 100ms pour plus de fluidité
}
function stopChrono(){
    clearInterval(myTimer);
    
}

function updateChrono() {
    const now = Date.now();
    const elapsed = Math.floor((now - startTime) / 1000); // en secondes entières
    document.getElementById("myChrono").innerHTML = elapsed;
}
