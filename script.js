document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('parallax-container');
    
    if (!container) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    
    // Плавный коэффициент инерции
    const ease = 0.1;

    window.addEventListener('mousemove', (e) => {
        // Вычисляем смещение от центра экрана (-1 до 1)
        targetX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        targetY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    }, { passive: true });

    function updatePhysics() {
        // Интерполяция для шелковистой плавности без рывков
        currentX += (targetX - currentX) * ease;
        currentY += (targetY - currentY) * ease;

        // Параллакс-наклон аватарки
        const tiltX = currentY * -12; // Наклон по вертикали
        const tiltY = currentX * 12;  // Наклон по горизонтали
        const moveX = currentX * 10;  // Смещение по X
        const moveY = currentY * 10;  // Смещение по Y

        container.style.transform = `perspective(1000px) translate3d(${moveX}px, ${moveY}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

        requestAnimationFrame(updatePhysics);
    }

    requestAnimationFrame(updatePhysics);

    // Плавный сброс при выходе мыши за пределы окна
    document.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
    });
});