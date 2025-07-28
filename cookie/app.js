// Fonction pour créer un cookie
document.querySelector(".create-button").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton (rechargement de la page)
    
    // Récupérer les valeurs des champs
    let nameCookie = document.querySelector('.name-cookie').value;
    let valueCookie = document.querySelector('.value-cookie').value;
    
    // Appeler la fonction pour créer le cookie
    createCookie(nameCookie, valueCookie);
});

function createCookie(nameCookie, valueCookie) {
    if (nameCookie !== "" && valueCookie !== "") {
        // Créer le cookie avec un chemin pour le rendre accessible
        document.cookie = encodeURIComponent(nameCookie) + "=" + encodeURIComponent(valueCookie) + "; path=/";
        alert("Cookie créé !");
    } else {
        alert("Nom ou valeur du cookie manquant !");
    }
}

// Fonction pour afficher les cookies
document.querySelector(".display-button").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche le comportement par défaut du bouton (rechargement de la page)
    
    displayCookie(); // Appelle la fonction pour afficher les cookies
});

function displayCookie() {
    var displayContainer = document.querySelector(".display-cookie");
    
    if (displayContainer) {
        // Vider le conteneur avant d'ajouter les nouveaux éléments
        displayContainer.innerHTML = '';

        if (document.cookie.length > 0) {
            var cookies = document.cookie.split(";");
            
            var displayedCookies = [];

            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                var nameValuePair = cookie.split("=");
                var name = nameValuePair[0].trim();
                var value = nameValuePair[1] ? nameValuePair[1].trim() : '';

                if (!displayedCookies.includes(name + "=" + value)) {
                    displayedCookies.push(name + "=" + value);

                    var paragraph = document.createElement("p");
                    paragraph.innerHTML = `
                        <div class="cookie-info">
                            <div class="delete-cookie" data-cookie-name="${name}" onclick="deleteCookieFromElement(this)">❌</div>
                            <div><span>Nom: </span><span class="cookie-name">${name}</span></div>
                            <div><span>Valeur: </span><span class="cookie-value">${value}</span></div>
                        </div>`;
                    displayContainer.appendChild(paragraph);
                }
            }
        }
    }
}

// Fonction pour supprimer le cookie et le paragraphe HTML associé
function deleteCookieFromElement(element) {
    // Récupère le nom du cookie à partir de l'attribut data-cookie-name
    const cookieName = element.getAttribute('data-cookie-name');
    
    // Appelle la fonction pour supprimer le cookie
    deleteCookie(cookieName);
    
    // Supprime le paragraphe HTML associé
    const cookieInfo = element.closest('.cookie-info');
    if (cookieInfo) {
        cookieInfo.parentElement.remove(); // Supprime le <p> contenant l'élément
    }
}

function deleteCookie(name) {
    // Supprime le cookie en le réinitialisant avec une date d'expiration dans le passé
    document.cookie = encodeURIComponent(name) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    alert('Cookie "' + name + '" supprimé !');
}
