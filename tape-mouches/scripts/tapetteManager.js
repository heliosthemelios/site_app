let tapetteX;
let tapetteY;
let clicX;
let clicY;
var marge;
function sonGrandeTapette(){
  if(powerUpTapette){ 
    POWER_UP_TAPETTE_AUDIO.play()
  }

}
function moveTapette(e) {
  const rect = CANVAS.getBoundingClientRect();
  tapetteX = e.clientX - rect.left - LARGEUR_TAPETTE / 2;
  tapetteY = e.clientY - rect.top - HAUTEUR_TAPETTE + HAUTEUR_TAPETTE_OFFSET;
   
}

function gererClic(event) {
  const rect = CANVAS.getBoundingClientRect();
  clicX = event.clientX - rect.left;
  clicY = event.clientY - rect.top;

  // Debugging: Assurez-vous que clicX et clicY sont dans les limites du canvas
  console.log(clicX, clicY);

  for (let i = 0; i < mouches.length; i++) {
    const mouche = mouches[i];
    if (clicX >= mouche.x && clicX <= mouche.x + LARGEUR_MOUCHE &&
        clicY >= mouche.y && clicY <= mouche.y + HAUTEUR_MOUCHE) {
      mouche.ecraser = true;
      TAPE_MOUCHE_AUDIO.play();
      return;
    } else if (powerUpTapette && clicX >= mouche.x - 30 && clicX <= mouche.x + LARGEUR_MOUCHE + 30 &&
      clicY >= mouche.y - 30 && clicY <= mouche.y + HAUTEUR_MOUCHE + 30) {
      mouche.ecraser = true;
      TAPE_MOUCHE_AUDIO.play();
      return;
    }
  }
}

