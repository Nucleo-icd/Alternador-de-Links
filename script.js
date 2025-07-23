// Lista completa de links dos painéis Power BI
const links = [
  {
    url: "https://app.powerbi.com/view?r=eyJrIjoiMTYxYmJiMjUtOGM4NC00OTg2LWI1MzktMjA4YTY4NzhkNGExIiwidCI6IjNhNzhiMGNkLTdjOGUtNDkyOS04M2Q1LTE5MGE2Y2MwMTM2NSJ9",
    title: "Ambulatório Geral"
  },
  {
    url: "https://app.powerbi.com/groups/0c7fa548-cc81-49df-a0e0-54509e00de10/reports/c217dced-53cc-4b4e-960b-2bdf7d8de437/ReportSection?ctid=3a78b0cd-7c8e-4929-83d5-190a6cc01365&experience=power-bi",
    title: "Gestão de Leitos"
  },
  {
    url: "https://app.powerbi.com/groups/0c7fa548-cc81-49df-a0e0-54509e00de10/reports/0d45d923-94cc-47d0-9fbd-021085ed7545/5612edbe8215d03e95a0?ctid=3a78b0cd-7c8e-4929-83d5-190a6cc01365&experience=power-bi",
    title: "Monitoramento de Exames"
  },
  {
    url: "https://app.powerbi.com/groups/71720c3b-80bf-4e5e-9655-a06c86515e14/reports/04ceb068-8f7a-4913-a5fa-cf6e4dd6a411/ReportSection?ctid=3a78b0cd-7c8e-4929-83d5-190a6cc01365&experience=power-bi",
    title: "Pronto Socorro Tempo Real"
  },
  {
    url: "https://app.powerbi.com/groups/7c44cc56-7568-44f1-a915-96913d67f723/reports/80f3097c-51ff-4d53-a576-09212837de19/2de2d4e7076b0a54c5a4?ctid=3a78b0cd-7c8e-4929-83d5-190a6cc01365&experience=power-bi",
    title: "Fila de Espera"
  },
  {
    url: "https://app.powerbi.com/view?r=eyJrIjoiYTViNGJiOTItNGUyYy00Y2EyLTkwZDgtZTZhMWI5NzUxODIzIiwidCI6IjNhNzhiMGNkLTdjOGUtNDkyOS04M2Q1LTE5MGE2Y2MwMTM2NSJ9",
    title: "Painel Pronto Socorro"
  },
  {
    url: "https://app.powerbi.com/view?r=eyJrIjoiYmQ0YWIwZDMtZjRkYS00ZjAwLTllY2UtYTRkZDMxMWJiNzc2IiwidCI6IjNhNzhiMGNkLTdjOGUtNDkyOS04M2Q1LTE5MGE2Y2MwMTM2NSJ9",
    title: "Painel Cirúrgico"
  },
  {
    url: "https://app.powerbi.com/view?r=eyJrIjoiMTAzNjYyNjYtYWNjMy00MDI1LTlhYWYtMDIyY2ZhYTg5YTc0IiwidCI6IjNhNzhiMGNkLTdjOGUtNDkyOS04M2Q1LTE5MGE2Y2MwMTM2NSJ9",
    title: "Painel Internação"
  },
  {
    url: "https://app.powerbi.com/view?r=eyJrIjoiMjVhODBmYWMtMmQ3ZS00MjE5LWE0MzYtNWM0NzYyNDgwMGIxIiwidCI6IjNhNzhiMGNkLTdjOGUtNDkyOS04M2Q1LTE5MGE2Y2MwMTM2NSJ9",
    title: "Médicos por Serviço"
  },
  {
    url: "https://app.powerbi.com/view?r=eyJrIjoiYThlZGZmZTYtM2MyYS00N2EwLWJkMzQtMzFjODJkMWYwNWE2IiwidCI6IjNhNzhiMGNkLTdjOGUtNDkyOS04M2Q1LTE5MGE2Y2MwMTM2NSJ9",
    title: "Portal Acolhimento"
  }
];

// Variáveis de controle
let currentIndex = 0;
let rotationInterval;
let isPaused = false;

// Elementos da DOM
const frameElement = document.getElementById('frame');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pauseBtn = document.getElementById('pauseBtn');

// Função para mostrar o link atual
function showCurrentLink() {
  const currentLink = links[currentIndex];
  frameElement.src = currentLink.url;
  
  // Atualiza o título da página
  document.title = `${currentLink.title} - Núcleo de Saúde`;
}

// Inicia a rotação automática (30 segundos)
function startRotation() {
  if (rotationInterval) clearInterval(rotationInterval);
  rotationInterval = setInterval(() => {
    if (!isPaused) {
      currentIndex = (currentIndex + 1) % links.length;
      showCurrentLink();
    }
  }, 30000); // 30 segundos
}

// Navega para o link anterior
function prevLink() {
  currentIndex = (currentIndex - 1 + links.length) % links.length;
  showCurrentLink();
  resetRotationTimer();
}

// Navega para o próximo link
function nextLink() {
  currentIndex = (currentIndex + 1) % links.length;
  showCurrentLink();
  resetRotationTimer();
}

// Pausa/continua a rotação automática
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

// Reinicia o temporizador quando há navegação manual
function resetRotationTimer() {
  if (!isPaused) {
    clearInterval(rotationInterval);
    startRotation();
  }
}

// Atalhos de teclado
document.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowLeft':
      prevLink();
      break;
    case 'ArrowRight':
      nextLink();
      break;
    case ' ':
      togglePause();
      break;
  }
});

// Event listeners para os botões
prevBtn.addEventListener('click', prevLink);
nextBtn.addEventListener('click', nextLink);
pauseBtn.addEventListener('click', togglePause);

// Inicialização
showCurrentLink();
startRotation();
