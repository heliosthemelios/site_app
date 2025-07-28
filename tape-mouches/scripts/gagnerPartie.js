function afficherWinner() {
  var partieGagnerMessage = document.getElementById("partieGagnerMessage");
  var reloadButtonGagner = document.getElementById("reloadButtonGagner");
  MUSIQUE_JEU_AUDIO.pause();

  MUSIQUE_JEU_AUDIO.currentTime = 0;
  GAGNANT_AUDIO.play();
  mouches = [];
  partieGagnerMessage.style.display = "block"; // Afficher le message "Game Over"
  reloadButtonGagner.style.display = "block"; // Afficher le bouton "Rejouer"
}

function rechargerPage() {
  location.reload();
}