var canvas2 = document.getElementById('timerCanvas');
var context2 = canvas2.getContext('2d');
canvas2.width = 600;
canvas2.height = 50;

function minuteur(){ 
    
    
    function afficherMinuteur(minutes, secondes) {

        
        context2.clearRect(0, 0, canvas2.width, canvas2.height);

        context2.fillStyle = "green"; 
        context2.fillRect(0, 0, canvas2.width, canvas2.height);
        context2.strokeStyle = "pink"; 
        context2.font = "36px Arial";
        context2.textAlign = "center";
        context2.fillText(minutes + ":" + (secondes < 10 ? "0" : "") + secondes, canvas2.width / 2, canvas2.height - 12);
        context2.strokeText(minutes + ":" + (secondes < 10 ? "0" : "") + secondes, canvas2.width / 2, canvas2.height - 12);
    }


    var minutes = 1;
    var secondes = 0;


    function updateMinuteur() {
        
        if (mouchesEcrasees.length === mouches.length) {
          clearInterval(intervalId);  // Arrêter le minuteur
          afficherWinner();
          return;
        }



        else if (secondes > 0) { 
            secondes--;
        } 

        else {

            if(minutes > 0) {
                minutes--;
                secondes = 59;
            }
            
            

            else {
                
                clearInterval(intervalId);
                GAME_OVER_AUDIO.play();
                MUSIQUE_JEU_AUDIO.pause();
                MUSIQUE_JEU_AUDIO.currentTime = 0;
                afficherGameOver();
                
                


            }
        }

        afficherMinuteur(minutes, secondes);
    }

    var intervalId = setInterval(updateMinuteur, 1000);
    
}