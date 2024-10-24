const navLinks = [...document.querySelectorAll("nav a")];
const sections = [...document.querySelectorAll("section")];

let sectionsPosition;

function positionCalculation() {
  sectionsPosition = sections.map(section => section.getBoundingClientRect().top + window.scrollY);
}

positionCalculation();

navLinks.forEach(link => {
  link.addEventListener("click", addScrollSmooth);
  link.addEventListener("touchstart", addScrollSmooth); // Ajout d'un gestionnaire d'événement pour les écrans tactiles
});

function addScrollSmooth(e) {
  e.preventDefault(); // Empêcher le comportement par défaut du lien
  const linkIndex = navLinks.indexOf(e.target);
  window.scrollTo({
    top: sectionsPosition[linkIndex],
    behavior: "smooth"
  });
}
/*BOUTON SUIVANT - PRECEDENT*/
document.addEventListener("DOMContentLoaded", function () {
  const nextButtons = document.querySelectorAll('.next-button');

  nextButtons.forEach(button => {
      button.addEventListener('click', scrollToNextSection);
      button.addEventListener('touchstart', scrollToNextSection);
  });

  const previousButtons = document.querySelectorAll('.previous-button');

  previousButtons.forEach(button => {
      button.addEventListener('click', scrollToPreviousSection);
      button.addEventListener('touchstart', scrollToPreviousSection);
  });
});

function scrollToNextSection() {
  const currentSection = this.closest('section');
  const currentIndex = [...document.querySelectorAll('.scroll-section')].indexOf(currentSection);
  const nextSection = document.querySelectorAll('.scroll-section')[currentIndex + 1];

  if (nextSection) {
      // Afficher la section suivante à droite
      nextSection.classList.remove('hidden');
      nextSection.scrollIntoView({ behavior: 'smooth' });

      // Faire défiler la section correspondante à gauche
      const correspondingLeftSection = document.querySelector(`.content1 .section-${currentIndex + 2}`);
      if (correspondingLeftSection) {
          correspondingLeftSection.classList.remove('hidden');
          correspondingLeftSection.scrollIntoView({ behavior: 'smooth' });
      }
  }
}

function scrollToPreviousSection() {
  const currentSection = this.closest('section');
  const currentIndex = [...document.querySelectorAll('.scroll-section')].indexOf(currentSection);
  const previousSection = document.querySelectorAll('.scroll-section')[currentIndex - 1];

  if (previousSection) {
      // Faire défiler vers la section précédente à droite
      previousSection.scrollIntoView({ behavior: 'smooth' });

      // Faire défiler la section correspondante à gauche
      const correspondingLeftSection = document.querySelector(`.content1 .section-${currentIndex}`);
      if (correspondingLeftSection) {
          correspondingLeftSection.classList.remove('hidden');
          correspondingLeftSection.scrollIntoView({ behavior: 'smooth' });
      }
  }
}


/*BOUTON SUIVANT - PRECEDENT*/
/*document.addEventListener("DOMContentLoaded", function () {
  const nextButtons = document.querySelectorAll('.next-button');

  nextButtons.forEach(button => {
    button.addEventListener('click', scrollToNextSection);
    button.addEventListener('touchstart', scrollToNextSection); // Ajout d'un gestionnaire d'événement pour les écrans tactiles
  });

  const previousButtons = document.querySelectorAll('.previous-button');

  previousButtons.forEach(button => {
    button.addEventListener('click', scrollToPreviousSection);
    button.addEventListener('touchstart', scrollToPreviousSection); // Ajout d'un gestionnaire d'événement pour les écrans tactiles
  });
});

function scrollToNextSection() {
  const currentSection = this.closest('section');
  const nextSection = currentSection.nextElementSibling;

  if (nextSection) {
    nextSection.classList.remove('hidden'); // Affiche la section suivante
    nextSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function scrollToPreviousSection() {
  const currentSection = this.closest('section');
  const currentSectionIndex = sections.indexOf(currentSection);
  const previousSection = sections[currentSectionIndex - 1];

  if (previousSection) {
    previousSection.scrollIntoView({ behavior: 'smooth' });
  }
}*/
