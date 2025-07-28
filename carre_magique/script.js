const N = 5;
const TAILLE_CASE = 100;
const GRILLE = document.getElementById('grid');
const BOUTON_VALIDER = document.getElementById('validate-button');

let carre = generateMagicSquare(N);
let grille = partialGrid(carre);
let currentInput = null;

function generateMagicSquare(n) {
    if (n % 2 === 0) {
        throw new Error("Cette méthode ne fonctionne que pour les tailles impaires.");
    }

    const carre = Array.from({ length: n }, () => Array(n).fill(0));
    let num = 1;
    let i = 0, j = Math.floor(n / 2);

    while (num <= n * n) {
        carre[i][j] = num;
        num += 1;
        let newI = (i - 1 + n) % n;
        let newJ = (j + 1) % n;

        if (carre[newI][newJ] !== 0) {
            i = (i + 1) % n;
        } else {
            i = newI;
            j = newJ;
        }
    }

    return carre;
}

function partialGrid(carre, percentageMask = 50) {
    const n = carre.length;
    const grid = carre.map(row => row.slice());
    const totalCells = n * n;
    let maskedCells = Math.floor((percentageMask / 100) * totalCells);

    while (maskedCells > 0) {
        let i = Math.floor(Math.random() * n);
        let j = Math.floor(Math.random() * n);
        if (grid[i][j] !== null) {
            grid[i][j] = null;
            maskedCells -= 1;
        }
    }

    return grid;
}

function renderGrid() {
    GRILLE.innerHTML = '';
    grille.forEach((row, i) => {
        row.forEach((cell, j) => {
            const div = document.createElement('div');
            div.className = 'grid-cell';
            div.dataset.i = i;
            div.dataset.j = j;
            if (cell !== null) {
                div.textContent = cell;
            } else {
                div.innerHTML = `<input type="text" class="cell-input" data-i="${i}" data-j="${j}" maxlength="2" />`;
            }
            GRILLE.appendChild(div);
        });
    });

    document.querySelectorAll('.cell-input').forEach(input => {
        input.addEventListener('input', (event) => {
            const { i, j } = event.target.dataset;
            const value = event.target.value;
            if (value === '' || (!isNaN(value) && value.trim() !== '')) {
                grille[i][j] = value ? parseInt(value, 10) : null;
            }
        });
    });
}

function validateSolution() {
    return verifySolution(carre, grille);
}

function verifySolution(carre, grille) {
    const n = carre.length;
    const magicSum = carre[0].reduce((a, b) => a + b, 0);

    for (let i = 0; i < n; i++) {
        if (grille[i].reduce((a, b) => a + (b || 0), 0) !== magicSum) return false;
        if (grille.reduce((a, b) => a + (b[i] || 0), 0) !== magicSum) return false;
    }

    if (grille.reduce((a, b, idx) => a + (b[idx] || 0), 0) !== magicSum) return false;
    if (grille.reduce((a, b, idx) => a + (b[n - 1 - idx] || 0), 0) !== magicSum) return false;

    return true;
}

document.addEventListener('DOMContentLoaded', () => {
    renderGrid();

    BOUTON_VALIDER.addEventListener('click', () => {
        if (validateSolution()) {
            alert("Félicitations ! Vous avez trouvé le carré magique.");
        } else {
            alert("Erreur : Le carré magique est incorrect.");
        }
    });
});
