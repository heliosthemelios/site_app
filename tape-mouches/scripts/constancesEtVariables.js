const LARGEUR_ECRAN = 600;
const HAUTEUR_ECRAN = 450;

const COULEUR_FOND = '#c3f989';

const LARGEUR_MOUCHE = 49;
const HAUTEUR_MOUCHE = 46;

const LARGEUR_TAPETTE = 60;
const HAUTEUR_TAPETTE = 200
const HAUTEUR_TAPETTE_OFFSET = 160;

const RAYON_MAX = 150;

const ANGLE_INCREMENT = 0.01;
const ANGLES_OFFSETS = [];
const ANGLES = [];

const CANVAS = document.getElementById('jeuCanvas');
const CONTEXT = CANVAS.getContext('2d');

const MOUCHE_IMG = new Image();
MOUCHE_IMG.src = 'img/mouche.png';
const TAPETTE_IMG = new Image();
TAPETTE_IMG.src = 'img/tapetteMouche.png';
const ECRASE_MOUCHE_IMG = new Image();
ECRASE_MOUCHE_IMG.src = 'img/moucheEcrase.png';
const FOND_IMG = new Image();
FOND_IMG.src = 'img/fond.png';


const CENTRES_X = [];
const CENTRES_Y = [];

const TAPE_MOUCHE_AUDIO = document.getElementById('tape-mouche');
const MUSIQUE_JEU_AUDIO = document.getElementById('musique-jeu');
const GAME_OVER_AUDIO = document.getElementById('game-overPerdu');
const GAGNANT_AUDIO= document.getElementById('winner');
const POWER_UP_TAPETTE_AUDIO= document.getElementById('grandeTapette');

var valeur = false;
var maxMouches = 30;
var mouchesEcrasees = [];
var powerUpTapette = false;
var frames = 0;
var mouches = [];
var vitesseMouches = 2;
