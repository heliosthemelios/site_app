const motEl = document.getElementById('mot');
const mauvaisesLettres = document.getElementById('mauvaises-lettres');
const rejouerBtn = document.getElementById('play-bouton');
const popup = document.getElementById('popup-contenant');
const notification = document.getElementById('notification-contenant');
const messageFinal = document.getElementById('message-final');

const figurePartie = document.querySelectorAll('.figure-partie');
const mots =["chien", "chat", "souris", "lion", "tigre", "ours", "girafe", "hippopotame", "kangourou", "koala", "singe", "gorille", "chimpanze", "renard", "lapin", "cheval", "vache", "mouton", "chevre", "cochon", "taureau", "rat", "hamster", "furet", "oiseau", "canard", "poule", "pigeon", "corbeau", "hibou", "aigle", "poisson", "requin", "baleine", "dauphin", "tortue", "crocodile", "serpent", "grenouille", "escargot", "crevette", "crabe", "araignee", "fourmi", "papillon", "libellule", "abeille", "moustique", "coccinelle", "sauterelle", "mouche", "guepe", "escargot", "ecrevisse", "chenille", "gazelle", "perroquet", "leopard", "panthere", "ecureuil", "panda", "castor", "bison", "loutre", "herisson", "tortue", "meduse", "anemone de mer", "etoile de mer", "crabe", "homard", "langouste", "mouette", "goeland", "pie", "colombe", "mouette", "chauve-souris", "epervier", "salamandre", "phoque", "morse", "beluga", "emeu", "kookaburra", "wombat", "wallaby", "koala", "kiwi", "toucan", "heron", "ibis", "pelican", "poisson-clown", "guppy", "piranha", "morue", "thon"]




let motSelectionne = mots[Math.floor(Math.random() * mots.length)];

const bonnesLettresArr = [''];
const mauvaisesLettresArr = [''];
mauvaisesLettresArr.splice(0);
function afficherMot(){ 
    motEl.innerHTML = `   
        ${motSelectionne
            .split('')
            .map(
                lettre =>` 
                    <span class="lettre">
                        ${bonnesLettresArr.includes(lettre) ? lettre : '' }
                    </span>
                ` 
            )
            .join('')
        }          
    `; 


    const motInterne = motEl.innerText.replace(/\n/g, '');

    if(motInterne === motSelectionne){
        messageFinal.innerText = 'Bravo ! tu as gagne';
        popup.style.display = 'flex';
    }
}


function updateMauvaisesLettresEl(){


    mauvaisesLettres.innerHTML =`
        ${mauvaisesLettresArr 
            .map (lettre => `<span>${lettre}</span>
            `
        )}

    `

    figurePartie.forEach((partie, index) =>{
        const erreurs = mauvaisesLettresArr.length;
        
        if(index < erreurs){
            partie.style.display = 'block';
        }
        else{
            partie.style.display = 'none';
        }

    })

    if (mauvaisesLettresArr.length === figurePartie.length){
        messageFinal.innerText = ' Malheureusement, tu as perdu !';
        popup.style.display = 'flex';
    }

}




function afficherNotification() {
    notification.classList.add('afficher');

    // Retirer la notification après quelques secondes
    setTimeout(() => {
        notification.classList.remove('afficher');
    }, 2000); // Masque la notification après 3 secondes
}




window.addEventListener('keydown', e => {
    if (e.keyCode >= 60 && e.keyCode <= 90) {
        lettre = e.key;

        if (motSelectionne.includes(lettre)) {
            if (!bonnesLettresArr.includes(lettre)) {
                bonnesLettresArr.push(lettre);
                afficherMot();
            } else {
                afficherNotification(); // La lettre correcte a déjà été utilisée
            }
        } else {
            if (!mauvaisesLettresArr.includes(lettre)) {
                mauvaisesLettresArr.push(lettre);
                updateMauvaisesLettresEl(); // Met à jour l'affichage des lettres incorrectes
            } else {
                afficherNotification(); // La lettre incorrecte a déjà été utilisée
            }
        }
    }
});

rejouerBtn.addEventListener('click', () => {
    bonnesLettresArr.splice(0);
    mauvaisesLettresArr.splice(0);
    motSelectionne = mots[Math.floor(Math.random() * mots.length)];
    afficherMot();
    updateMauvaisesLettresEl();
    popup.style.display = 'none';
})

afficherMot();