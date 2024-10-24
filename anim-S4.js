document.getElementById("play-btn-S4").addEventListener("click", function() {
    // Liste des IDs à animer
    const elementsToAnimate = ["sq27", "sq18", "sq9", "sq9b", "T27", "T18", "T9", "T9b", "s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10", "s11", "s12", "s13"];
    
    // Ajout de la classe 'run-animation' à chaque élément
    elementsToAnimate.forEach(id => {
        document.getElementById(id).classList.add('run-animation');
    });
});

// On met les animations en pause au chargement
document.addEventListener('DOMContentLoaded', (event) => {
    const elementsToAnimate = ["sq27", "sq18", "sq9", "sq9b", "T27", "T18", "T9", "T9b", "s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10", "s11", "s12", "s13"];
    
    // Mettre en pause l'état d'animation pour chaque élément
    elementsToAnimate.forEach(id => {
        document.getElementById(id).style.animationPlayState = 'paused';
    });
});
