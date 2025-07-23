// Lista de links com títulos (mantida igual)
const links = [
  // ... (seus links permanecem os mesmos)
];

let currentIndex = 0;
let rotationInterval;
let isPaused = false;

// Elementos do DOM
const frameElement = document.getElementById('frame');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pauseBtn = document.getElementById('pauseBtn');

function showCurrentLink() {
  const currentLink = links[currentIndex];
  frameElement.src = currentLink.url;
}

function startRotation() {
  if (rotationInterval) clearInterval(rotationInterval);
  rotationInterval = setInterval(() => {
    if (!isPaused) {
      currentIndex = (currentIndex + 1) % links.length;
      showCurrentLink();
    }
  }, 30000); // Alterado para 30 segundos
}

function prevLink() {
  currentIndex = (currentIndex - 1 + links.length) % links.length;
  showCurrentLink();
  resetRotationTimer();
}

function nextLink() {
  currentIndex = (currentIndex + 1) % links.length;
  showCurrentLink();
  resetRotationTimer();
}

function togglePause() {
  isPaused = !isPaused;
  pauseBtn.innerHTML = isPaused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
  pauseBtn.title = isPaused ? "Continuar" : "Pausar";
  
  if (!isPaused) {
    startRotation();
  } else {
    clearInterval(rotationInterval);
  }
}

function resetRotationTimer() {
  if (!isPaused) {
    clearInterval(rotationInterval);
    startRotation();
  }
}

// Event listeners
prevBtn.addEventListener('click', prevLink);
nextBtn.addEventListener('click', nextLink);
pauseBtn.addEventListener('click', togglePause);

// Iniciar
showCurrentLink();
startRotation();
