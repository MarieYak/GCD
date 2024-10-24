let initialX = 0, initialY = 0;
let isDragging = false;
let selectedGroup = null; // Changement de variable pour représenter le groupe sélectionné
let actionHistory = [];   // Historique des actions

const groups = document.querySelectorAll("#draggable-item g[id^='gr'], #ruler"); // Sélectionner les groupes

// Ajouter des écouteurs d'événements aux groupes
groups.forEach(group => {
    group.addEventListener("mousedown", startAction);
    group.addEventListener("touchstart", startAction);
});

function startAction(event) {
    const clickedGroup = event.target.closest('g'); // Obtenir le groupe cliqué
    startDrag(event, clickedGroup);
}

function startDrag(event, group) {
    isDragging = true;
    selectedGroup = group;
    // Change le curseur à 'grabbing'
    selectedGroup.classList.remove('grab');
    selectedGroup.classList.add('grabbing');

    initialX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
    initialY = event.type.includes('mouse') ? event.clientY : event.touches[0].clientY;

    window.addEventListener("mousemove", drag);
    window.addEventListener("touchmove", drag);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchend", stopDrag);

    event.preventDefault();
}

function drag(event) {
    if (!isDragging || !selectedGroup) return;

    let newX = (event.type.includes('mouse') ? event.clientX : event.touches[0].clientX) - initialX;
    let newY = (event.type.includes('mouse') ? event.clientY : event.touches[0].clientY) - initialY;

    let currentTransform = selectedGroup.getAttribute('transform') || '';
    let translateMatch = /translate\(([^)]+)\)/.exec(currentTransform);
    let currentTranslate = translateMatch ? translateMatch[1].split(',').map(Number) : [0, 0];

    const previousTranslate = [currentTranslate[0], currentTranslate[1]]; // Sauvegarder la position précédente

    selectedGroup.setAttribute("transform", `translate(${currentTranslate[0] + newX}, ${currentTranslate[1] + newY})`);

    // Enregistrer l'action de déplacement dans l'historique
    actionHistory.push({
        type: 'move',
        element: selectedGroup,
        previousTranslate: previousTranslate,
        newTranslate: [currentTranslate[0] + newX, currentTranslate[1] + newY]
    });

    initialX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
    initialY = event.type.includes('mouse') ? event.clientY : event.touches[0].clientY;
}

function stopDrag() {
    isDragging = false;
    window.removeEventListener("mousemove", drag);
    window.removeEventListener("touchmove", drag);
    window.removeEventListener("mouseup", stopDrag);
    window.removeEventListener("touchend", stopDrag);
}
