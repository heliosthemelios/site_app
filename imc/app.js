const BMIData = [
  { name: "Maigreur", color: "midnightblue", range: [0, 18.5] },
  { name: "Bonne santé", color: "green", range: [18.5, 25] },
  { name: "Surpoids", color: "lightcoral", range: [25, 30] },
  { name: "Obésité modérée", color: "orange", range: [30, 35] },
  { name: "Obésité sévère", color: "crimson", range: [35, 40] },
  { name: "Obésité morbide", color: "purple", range: 40 },
];

// IMC = poids en kg / taille² en m



function calculerImc() {
  let taille = parseFloat(document.getElementById("taille").value);
  let poids = parseFloat(document.getElementById("poids").value);
  let valide = "Entrez des nombres valides";
  let imc = poids / taille**2
  if (!isNaN(taille) && !isNaN(poids) && taille > 0 && poids > 0) {
      let imc = poids / (taille ** 2);

      if (imc < 18.5) {
          document.getElementById("resultat").textContent = imc;
          document.getElementById("attente").textContent = BMIData[0].name;
          document.getElementById("attente").style.color = BMIData[0].color;
      }
      else if (imc >= 18.5 && imc < 25) {
          document.getElementById("resultat").textContent = imc;
          document.getElementById("attente").textContent = BMIData[1].name;
          document.getElementById("attente").style.color = BMIData[1].color;
      }
      else if (imc >= 25 && imc < 30) {
          document.getElementById("resultat").textContent = imc;
          document.getElementById("attente").textContent = BMIData[2].name;
          document.getElementById("attente").style.color = BMIData[2].color;
      }
      else if (imc >= 30 && imc < 35) {
          document.getElementById("resultat").textContent = imc;
          document.getElementById("attente").textContent = BMIData[3].name;
          document.getElementById("attente").style.color = BMIData[3].color;
      }
      else if (imc >= 35 && imc < 40) {
          document.getElementById("resultat").textContent = imc;
          document.getElementById("attente").textContent = BMIData[4].name;
          document.getElementById("attente").style.color = BMIData[4].color;
      }
      else if (imc >= 40) {
          document.getElementById("resultat").textContent = imc;
          document.getElementById("attente").textContent = BMIData[5].name;
          document.getElementById("attente").style.color = BMIData[5].color;
      }
  } else {
      document.getElementById("attente").textContent = valide;
  }
}
