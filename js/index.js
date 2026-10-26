// 1. Relógio em Tempo Real
function updateClock() {
    const clockEl = document.getElementById('live-clock');
    if (clockEl) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockEl.textContent = `${hours}:${minutes}:${seconds}`;
    }
}
setInterval(updateClock, 1000);
updateClock();

// 2. Navegação do Carrossel de Projetos
const carousel = document.getElementById('carousel-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const counter = document.getElementById('card-counter');
const cards = document.querySelectorAll('.project-card');

let currentIndex = 0;

function updateCarousel(index) {
    if (!cards.length) return;
    
    // Limites
    if (index < 0) index = 0;
    if (index >= cards.length) index = cards.length - 1;
    
    currentIndex = index;

    // Rolar até o cartão ativo
    const cardWidth = cards[0].offsetWidth + 24;
    carousel.scrollTo({
        left: cardWidth * currentIndex,
        behavior: 'smooth'
    });

    // Atualizar classe do cartão ativo
    cards.forEach((card, idx) => {
        if (idx === currentIndex) {
            card.classList.add('active-card');
        } else {
            card.classList.remove('active-card');
        }
    });

    // Atualizar texto do contador
    if (counter) {
        counter.textContent = `0${currentIndex + 1} / 0${cards.length}`;
    }
}

// Eventos de clique nos botões
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        updateCarousel(currentIndex + 1);
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        updateCarousel(currentIndex - 1);
    });
}

// Navegação por setas do teclado (← e →)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        updateCarousel(currentIndex + 1);
    } else if (e.key === 'ArrowLeft') {
        updateCarousel(currentIndex - 1);
    }
});

// Alternador de Tom de Fundo
const themeToggle = document.getElementById('theme-toggle');
let isAltBg = false;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        isAltBg = !isAltBg;
        document.body.style.backgroundColor = isAltBg ? '#0B1329' : '#020617';
    });
}