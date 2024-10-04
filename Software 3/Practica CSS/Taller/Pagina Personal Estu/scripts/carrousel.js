let slides = Array.from(document.querySelectorAll('.slide'));
let currentSlide = 0;

setInterval(() => {
    slides[currentSlide].style.transform = 'translateX(-100%)';
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.transform = 'translateX(0)';
}, 3000); // Cambia las diapositivas cada 3 segundos