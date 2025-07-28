const responses = ["b", "c", "b", "a", "a"];
const emojis = ["✔️", "✨", "👀", "😭", "👎"];


const radios1 = document.getElementsByName('premier-formulaire');
const radios2 = document.getElementsByName('deuxieme-formulaire');
const radios3 = document.getElementsByName('troisieme-formulaire');
const radios4 = document.getElementsByName('quatrieme-formulaire');
const radios5 = document.getElementsByName('cinquieme-formulaire');
let elements1 = document.querySelectorAll('.form-1');
let elements2 = document.querySelectorAll('.form-2');
let elements3 = document.querySelectorAll('.form-3');
let elements4 = document.querySelectorAll('.form-4');
let elements5 = document.querySelectorAll('.form-5');

let selectedValue1 = '';
let selectedValue2 = '';
let selectedValue3 = '';
let selectedValue4 = '';
let selectedValue5 = '';
let erreur = 0;
function valider(){ 
    for (const radio of radios1) {
        if (radio.checked) {
            selectedValue1 = radio.value;

            if (selectedValue1 === "Léonard de Vinci") {
                let elements1 = document.querySelectorAll('.form-1');
                elements1.forEach(element => {
                    element.style.backgroundColor = 'blue'; // Change la couleur de fond pour tous les éléments avec la classe .form-1
                });
            }
            else if(selectedValue1 !== "Léonard de Vinci" ){
                elements1 = document.querySelectorAll('.form-1');
                elements1.forEach(element =>{
                    element.style.backgroundColor = 'red';
                    erreur +=1;
                })
            }
        }

    }
    for (const radio of radios2) {
        if (radio.checked) {
            selectedValue2 = radio.value;

            if (selectedValue2 === "Impressionnisme") {
                elements2 = document.querySelectorAll('.form-2');
                elements2.forEach(element => {
                    element.style.backgroundColor = 'blue'; // Change la couleur de fond pour tous les éléments avec la classe .form-1
                });
            }
            else if(selectedValue1 !== "Impressionnisme" ){
                elements2 = document.querySelectorAll('.form-2');
                elements2.forEach(element =>{
                    element.style.backgroundColor = 'red';
                    erreur +=1;
                })
            }
        }
    }
    for (const radio of radios3) {
        if (radio.checked) {
            selectedValue3 = radio.value;

            if (selectedValue3 === "Rome") {
                elements3 = document.querySelectorAll('.form-3');
                elements3.forEach(element => {
                    element.style.backgroundColor = 'blue'; // Change la couleur de fond pour tous les éléments avec la classe .form-1
                });
            }
            else if(selectedValue3 !== "Rome" ){
                elements3 = document.querySelectorAll('.form-3');
                elements3.forEach(element =>{
                    element.style.backgroundColor = 'red';
                    erreur +=1;
                })
            }
        }
    }
    for (const radio of radios4) {
        if (radio.checked) {
            selectedValue4 = radio.value;

            if (selectedValue4 === "Vincent van Gogh") {
                elements4 = document.querySelectorAll('.form-4');
                elements4.forEach(element => {
                    element.style.backgroundColor = 'blue'; // Change la couleur de fond pour tous les éléments avec la classe .form-1
                });
            }
            else if(selectedValue4 !== "Vincent van Gogh" ){
                elements4 = document.querySelectorAll('.form-4');
                elements4.forEach(element =>{
                    element.style.backgroundColor = 'red';
                    erreur +=1;
                })
            }
        }
    }
    for (const radio of radios5) {
        if (radio.checked) {
            selectedValue5 = radio.value;

            if (selectedValue5 === "Wassily Kandinsky") {
                elements5 = document.querySelectorAll('.form-5');
                elements5.forEach(element => {
                    element.style.backgroundColor = 'blue'; // Change la couleur de fond pour tous les éléments avec la classe .form-1
                });
            }
            else if(selectedValue5 !== "Wassily Kandinsky" ){
                elements5 = document.querySelectorAll('.form-5');
                elements5.forEach(element =>{
                    element.style.backgroundColor = 'red';
                    erreur +=1;
                })
            }
        }
    }
    if (erreur == 0){
        document.querySelector('.directive').textContent = "✔️ Barvo ! Vous avez fait 0 erreur!"
        erreur = 0
    }
    else if(erreur == 1){
        document.querySelector('.directive').textContent = "✨ Vous avez fait une erreur! allez faites mieux !"

        erreur = 0
    }
    else if(erreur == 2){
        document.querySelector('.directive').textContent ="👀 Oupp! Vous commencer mal, mais c'est bon pareil!"
        erreur = 0
    }
    else if(erreur == 3){
        document.querySelector('.directive').textContent ="😭 C'est mauvais, vous pouvez faire mieux!"
        erreur = 0
    }
    else if(erreur == 4){
        document.querySelector('.directive').textContent ="👎 C'est tres tres mauvais, recommencer!"
        erreur = 0
    }
    else if(erreur == 5){
        document.querySelector('.directive').textContent ="👎 Habitez vous la terre!"
        erreur = 0
    }

}   
    