document.getElementById("startButton").addEventListener("click", function() {
  jeuDemarre = true;
  var element = document.getElementById("presentation-jeu");
  if (element) {
    element.innerHTML = "";
  }
  var elementPointile = document.getElementById("jeuCanvas");
  if (elementPointile) {
  elementPointile.classList.remove("hidden"); 
  }

  var startContainer = document.getElementById("start-container");
  if (startContainer) {
  startContainer.classList.add("hidden"); 
  }

  console.log("Le jeu est démarré !");
  if(jeuDemarre){
    
    jouerJeu();
    minuteur();
    MUSIQUE_JEU_AUDIO.play();
  }
});
  