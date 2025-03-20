// Configuração do slider
let count = 1;
let timer = null;
const slideDuration = 5000; // Duração de cada slide em ms

// Inicia com o primeiro slide selecionado
document.getElementById("radio1").checked = true;

// Inicia o temporizador do slider quando a página carrega
window.addEventListener('DOMContentLoaded', () => {
    startSlideTimer();
    
    // Adiciona eventos de pausa no hover
    const slider = document.querySelector('.slider');
    if (slider) {
        slider.addEventListener('mouseenter', pauseSlideTimer);
        slider.addEventListener('mouseleave', startSlideTimer);
    }
    
    // Adiciona animação suave ao carregar a página
    animateOnScroll();
});

// Função para iniciar o temporizador do slider
function startSlideTimer() {
    // Limpa qualquer temporizador existente
    if (timer) clearInterval(timer);
    
    // Cria um novo temporizador
    timer = setInterval(() => {
        nextImage();
    }, slideDuration);
}

// Função para pausar o temporizador do slider
function pauseSlideTimer() {
    if (timer) clearInterval(timer);
}

// Função para avançar para a próxima imagem
function nextImage() {
    count++;
    if (count > 3) {
        count = 1;
    }
    
    document.getElementById("radio" + count).checked = true;
}

// Função para selecionar uma imagem específica
function selectImage(num) {
    count = num;
    document.getElementById("radio" + count).checked = true;
    
    // Reinicia o temporizador
    startSlideTimer();
}

// Detecta elementos para animar durante o scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.content, .about-section');
    
    // Função para verificar se o elemento está visível
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Função para adicionar animação aos elementos visíveis
    function checkVisibility() {
        elements.forEach(el => {
            if (isElementInViewport(el) && !el.classList.contains('animated')) {
                el.classList.add('animated');
            }
        });
    }
    
    // Verifica visibilidade inicialmente e durante o scroll
    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
}

// Adiciona transição suave ao navegar entre páginas
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', e => {
        // Aplica classes e estilos aos links do menu
        document.querySelectorAll('.menu a').forEach(item => {
            item.classList.remove('active');
        });
        link.classList.add('active');
    });
});