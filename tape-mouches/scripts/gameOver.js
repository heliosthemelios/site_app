function afficherGameOver() {
  var gameOverMessage = document.getElementById("gameOverMessage");
  var reloadButton = document.getElementById("reloadButton");
  mouches = [];
  gameOverMessage.style.display = "block"; // Afficher le message "Game Over"
  reloadButton.style.display = "block"; // Afficher le bouton "Rejouer"
}

function rechargerPage() {
  location.reload();
}


