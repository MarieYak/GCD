// Fonction pour faire défiler jusqu'à la carte suivante ou précédente
function scrollToCard(direction, containerId) {
  const sliderContainer = document.getElementById(containerId);

  if (!sliderContainer) {
      console.error(`Container with ID '${containerId}' not found.`);
      return; // Sortir de la fonction si le conteneur est introuvable
  }

  const card = sliderContainer.querySelector('.card');

  if (!card) {
      console.error("No card found in the specified container.");
      return; // Sortir de la fonction si aucune carte n'est trouvée
  }

  const cardWidth = card.offsetWidth;

  // Ajouter un délai pour s'assurer que tout est prêt pour le calcul du défilement
  setTimeout(() => {
      const currentScroll = sliderContainer.scrollLeft;
      const currentIndex = Math.round(currentScroll / cardWidth);
      let targetIndex;

      if (direction === 'next') {
          targetIndex = currentIndex + 1;
      } else if (direction === 'prev') {
          targetIndex = currentIndex - 1;
      }

      // Vérifier les limites pour éviter de sortir des bornes
      const totalCards = sliderContainer.querySelectorAll('.card').length;
      targetIndex = Math.max(0, Math.min(targetIndex, totalCards - 1));

      const targetScroll = targetIndex * cardWidth;

      sliderContainer.scrollTo({
          left: targetScroll,
          behavior: "smooth"
      });
  }, 50); // Délai de 50 millisecondes (peut être ajusté si nécessaire)
}

// Initialisation du défilement pour s'assurer qu'il commence à la bonne position
function initializeScroll(containerId) {
  const sliderContainer = document.getElementById(containerId);

  if (sliderContainer) {
      sliderContainer.scrollLeft = 0; // Assurer que le défilement commence à zéro
  }
}

// Ajout des gestionnaires d'événements pour les boutons de défilement
document.addEventListener('DOMContentLoaded', function() {
  // Sélection des boutons de défilement
  const prevButton = document.querySelector('.prev-btn');
  const nextButton = document.querySelector('.next-btn');

  // Vérification si les boutons existent avant d'ajouter les gestionnaires d'événements
  if (prevButton && nextButton) {
      // Récupération de l'ID du conteneur à partir des données du bouton
      const containerId = prevButton.dataset.container || nextButton.dataset.container;
      
      // Initialiser le défilement au chargement
      initializeScroll(containerId);

      // Fonction de gestion des événements pour les écrans tactiles
      function onTouchScroll(event) {
          const direction = event.currentTarget.dataset.direction;
          scrollToCard(direction, containerId);
      }

      // Ajout des gestionnaires d'événements pour les boutons de défilement
      prevButton.addEventListener('click', function() {
          scrollToCard('prev', containerId);
      });
      nextButton.addEventListener('click', function() {
          scrollToCard('next', containerId);
      });

      // Ajout des gestionnaires d'événements tactiles pour les boutons de défilement
      prevButton.addEventListener('touchstart', onTouchScroll);
      nextButton.addEventListener('touchstart', onTouchScroll);
  }
});
