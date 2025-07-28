

function validate(){
   
    let searchInput = document.querySelector('.research').value;
    
    let url = `https://fr.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
            throw new Error('Erreur réseau: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const responseContainer = document.querySelector(".response-container");
            responseContainer.innerHTML = ''; 
        
            data.query.search.forEach(result => {

                let linkElement = document.createElement('a');
                linkElement.textContent = result.title;
                linkElement.href = `https://fr.wikipedia.org/wiki/${encodeURIComponent(result.title)}`;
                linkElement.target = '_blank'; 
                linkElement.textContent = result.title;

                article = document.createElement('a');
                article.innerHTML=`<br><a href="https://fr.wikipedia.org/wiki/${result.title}?curid=${result.pageid}" style="color: green; text-decoration: none;" >https://en.wikipedia.org/wiki/${result.title}?curid=${result.pageid}</a>`;
                let snippetElement = document.createElement('p');
                snippetElement.innerHTML = result.snippet;
        
                responseContainer.appendChild(linkElement);
                responseContainer.appendChild(article)
                responseContainer.appendChild(snippetElement);
            });
        })
        
        
        .catch(error => {
            console.error('Erreur lors de la récupération du fichier JSON:', error);
        });
        
}