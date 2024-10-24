// Tableau des IDs à manipuler
const animationElements = ["T100", "T60", "gr2", "remainder40", "T40", "R20T20", "T20", "R40-R20", "lines"];

// Démarrer les animations au clic sur le bouton "play-btn"
document.getElementById("play-btn").addEventListener("click", function() {
  animationElements.forEach(id => {
    document.getElementById(id).classList.add('run-animation');
  });
});

// Mettre les animations en pause au chargement de la page
document.addEventListener('DOMContentLoaded', (event) => {
  animationElements.forEach(id => {
    document.getElementById(id).style.animationPlayState = 'paused';
  });
}); 