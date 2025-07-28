

function getRandomPosition(max) {
  return Math.floor(Math.random() * max);
}
function getRandomDimentionMouche(maxMouche){
  return Math.floor(Math.random() * maxMouche)
}

function dessiner() {
  CONTEXT.fillStyle = COULEUR_FOND;
  CONTEXT.fillRect(0, 0, LARGEUR_ECRAN, HAUTEUR_ECRAN);
  CONTEXT.drawImage(FOND_IMG, 0, 0)
  mouchesEcrasees = [];
  for (let i = 0; i < mouches.length; i++) {
   
    const mouche = mouches[i];
    if (mouche.ecraser) {
      CONTEXT.drawImage(ECRASE_MOUCHE_IMG, mouche.x, mouche.y);
      mouchesEcrasees.push(mouche);
    }
    else {
      const r = mouche.rayon;
      const theta = ANGLES[i] + ANGLES_OFFSETS[i];
      const x = mouche.centreX + r * Math.cos(theta);
      const y = mouche.centreY + r * Math.sin(theta);
      mouche.x = x;
      mouche.y = y;
      ANGLES[i] += ANGLE_INCREMENT  * vitesseMouches ;
      if(difficulterInfernale) {
        CONTEXT.drawImage(MOUCHE_IMG, x, y, 20, 20);
        if(mouchesEcrasees.length >= 15){
          CONTEXT.drawImage(TAPETTE_IMG, tapetteX, tapetteY, 80, 266);
          powerUpTapette = true;
          if(mouchesEcrasees.length == 15 & frames < 1){
            sonGrandeTapette();
            frames = frames + 1
          }
          
        }
        else if(powerUpTapette == false){
          CONTEXT.drawImage(TAPETTE_IMG, tapetteX, tapetteY);
        }
      }
      else{
        CONTEXT.drawImage(MOUCHE_IMG, x, y);
        if(mouchesEcrasees.length >= 10){
          CONTEXT.drawImage(TAPETTE_IMG, tapetteX, tapetteY, 80, 266);
          powerUpTapette = true;
          if(mouchesEcrasees.length == 10 & frames < 1){
            sonGrandeTapette();
            frames = frames + 1
          }
          
          
        }
        else if(powerUpTapette == false)
        {
          CONTEXT.drawImage(TAPETTE_IMG, tapetteX, tapetteY);
        }
      }
    }
  }
  
  requestAnimationFrame(dessiner);
}


function initialiserJeu() {
  for (let i = 0; i < maxMouches; i++) {
    const mouche = {
      x: getRandomPosition(LARGEUR_ECRAN - LARGEUR_MOUCHE),
      y: getRandomPosition(HAUTEUR_ECRAN - HAUTEUR_MOUCHE),
      ecraser: false,
      rayon: getRandomPosition(RAYON_MAX - LARGEUR_MOUCHE / 2) + LARGEUR_MOUCHE / 2,
      angleOffset: Math.random() * Math.PI * 2,
      angle: 0,
      ANGLE_INCREMENT: 0.01,
      centreX: CENTRES_X[i],
      centreY: CENTRES_Y[i],
    };

    ANGLES_OFFSETS.push(Math.random() * Math.PI * 2);
    ANGLES.push(0);
    mouches.push(mouche);
  }
  
  CANVAS.addEventListener("mousemove",moveTapette);
  CANVAS.addEventListener("click", gererClic);
  document.getElementById("reloadButton").addEventListener("click", rechargerPage);
  document.getElementById("reloadButtonGagner").addEventListener("click", rechargerPage);
  
  dessiner();
}

function jouerJeu() {
  for (let i = 0; i < maxMouches; i++) {
    CENTRES_X.push(getRandomPosition(LARGEUR_ECRAN));
    CENTRES_Y.push(getRandomPosition(HAUTEUR_ECRAN));
  }
  
  tapetteX = getRandomPosition(LARGEUR_ECRAN / 2);
  tapetteY = getRandomPosition(HAUTEUR_ECRAN / 2);
 
  initialiserJeu();
}

