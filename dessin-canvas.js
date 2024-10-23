const canvasContainer = document.getElementById('canvas-container');

let isDrawing = false;
let startX = 0;
let startY = 0;
let currentSquare = null;

// Fonction pour commencer à dessiner un carré
canvasContainer.addEventListener('mousedown', (e) => {
    isDrawing = true;

    const rect = canvasContainer.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;

    currentSquare = document.createElement('div');
    currentSquare.classList.add('square');
    currentSquare.style.left = `${startX}px`;
    currentSquare.style.top = `${startY}px`;
    canvasContainer.appendChild(currentSquare);
});

canvasContainer.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    const rect = canvasContainer.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const deltaX = Math.abs(currentX - startX);
    const deltaY = Math.abs(currentY - startY);
    const squareSize = Math.min(deltaX, deltaY);

    let leftPosition = startX;
    let topPosition = startY;

    if (currentX < startX) leftPosition = startX - squareSize;
    if (currentY < startY) topPosition = startY - squareSize;

    // Assurer que les carrés ne dépassent pas les limites
    if (leftPosition < 0) leftPosition = 0;
    if (topPosition < 0) topPosition = 0;
    if (leftPosition + squareSize > canvasContainer.clientWidth) {
        leftPosition = canvasContainer.clientWidth - squareSize;
    }
    if (topPosition + squareSize > canvasContainer.clientHeight) {
        topPosition = canvasContainer.clientHeight - squareSize;
    }

    currentSquare.style.left = `${leftPosition}px`;
    currentSquare.style.top = `${topPosition}px`;
    currentSquare.style.width = `${squareSize - 3}px`;  // Ajustement pour éviter les dépassements
    currentSquare.style.height = `${squareSize - 3}px`;
});

canvasContainer.addEventListener('mouseup', () => {
    isDrawing = false;
});

// Pour le support tactile
// Pour le support tactile
canvasContainer.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Empêche le comportement par défaut (ex. défilement)
    const touch = e.touches[0];
    isDrawing = true;

    const rect = canvasContainer.getBoundingClientRect();
    startX = touch.clientX - rect.left;
    startY = touch.clientY - rect.top;

    currentSquare = document.createElement('div');
    currentSquare.classList.add('square');
    currentSquare.style.left = `${startX}px`;
    currentSquare.style.top = `${startY}px`;
    canvasContainer.appendChild(currentSquare);
});

canvasContainer.addEventListener('touchmove', (e) => {
    e.preventDefault(); // Empêche le comportement par défaut (ex. défilement)
    if (!isDrawing) return;

    const touch = e.touches[0];
    const rect = canvasContainer.getBoundingClientRect();
    const currentX = touch.clientX - rect.left;
    const currentY = touch.clientY - rect.top;

    const deltaX = Math.abs(currentX - startX);
    const deltaY = Math.abs(currentY - startY);
    const squareSize = Math.min(deltaX, deltaY);

    let leftPosition = startX;
    let topPosition = startY;

    if (currentX < startX) leftPosition = startX - squareSize;
    if (currentY < startY) topPosition = startY - squareSize;

    if (leftPosition < 0) leftPosition = 0;
    if (topPosition < 0) topPosition = 0;
    if (leftPosition + squareSize > canvasContainer.clientWidth) {
        leftPosition = canvasContainer.clientWidth - squareSize;
    }
    if (topPosition + squareSize > canvasContainer.clientHeight) {
        topPosition = canvasContainer.clientHeight - squareSize;
    }

    currentSquare.style.left = `${leftPosition}px`;
    currentSquare.style.top = `${topPosition}px`;
    currentSquare.style.width = `${squareSize}px`;
    currentSquare.style.height = `${squareSize}px`;
});


// Arrête le dessin quand la souris ou le touch est relâché
document.addEventListener('mouseup', () => isDrawing = false);
document.addEventListener('touchend', () => isDrawing = false);

// Fonction pour nettoyer le canevas
function clearCanvas() {
    while (canvasContainer.firstChild) {
        canvasContainer.removeChild(canvasContainer.firstChild);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('clear-button').addEventListener('click', clearCanvas);
});

