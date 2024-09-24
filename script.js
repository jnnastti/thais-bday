// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Button hover effect
const primaryButton = document.querySelector('.btn-primary');

primaryButton.addEventListener('mouseover', () => {
    primaryButton.style.backgroundColor = '#FFF700';
    primaryButton.style.color = '#000';
});

primaryButton.addEventListener('mouseout', () => {
    primaryButton.style.backgroundColor = 'transparent';
    primaryButton.style.color = '#FFF';
});

// Scroll to top button (for smooth scroll)
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// Função de animação para contagem
function animateCount(id, start, end, duration, suffix = '') {
    let obj = document.getElementById(id);
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    
    let timer = setInterval(() => {
        current += increment;
        obj.textContent = current + suffix;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Função para iniciar as animações quando o elemento estiver visível
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCount('marketCount', 0, 15, 2000, '+');  // Contagem de 0 a 15
            animateCount('accuracyCount', 0, 75, 2000, '%');  // Contagem de 0% a 65%
            observer.unobserve(entry.target);  // Parar de observar após a animação ser acionada
        }
    });
}

// Configurar o IntersectionObserver
let observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.5  // Executa quando 50% do elemento está visível
});

// Começar a observar o elemento de contagem
window.onload = function() {
    let target = document.querySelector('.stats-section');
    observer.observe(target);

    document.getElementById("startButton").addEventListener("click", function(e) {
        e.preventDefault(); // Impede o comportamento padrão do link
    
        const target = document.querySelector("#go");
        window.scrollTo({
            top: target.offsetTop,
            behavior: "smooth" // Efeito de deslizar
        });
    });
};

