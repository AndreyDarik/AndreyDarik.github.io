document.addEventListener('DOMContentLoaded', () => {
    const parallaxLayers = document.querySelectorAll('.parallax-bg');
    const imageWrapper = document.querySelector('.image-wrapper');
    const profileImg = document.getElementById('smooth-image');

    // Целевые и текущие координаты мыши для плавной инерции (Lerp)
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    // Коэффициент сглаживания (чем меньше, тем мягче и плавнее инерция)
    const ease = 0.08;

    window.addEventListener('mousemove', (e) => {
        // Нормализуем координаты мыши от -0.5 до 0.5 относительно центра экрана
        targetX = (e.clientX / window.innerWidth) - 0.5;
        targetY = (e.clientY / window.innerHeight) - 0.5;
    });

    // Главный цикл рендеринга (работает на аппаратном ускорении браузера)
    function render() {
        // Линейная интерполяция (Lerp) для плавной доводки кадров
        currentX += (targetX - currentX) * ease;
        currentY += (targetY - currentY) * ease;

        // Двигаем все фоновые слои с разной скоростью для создания глубокого параллакса
        parallaxLayers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed')) || 20;
            const x = currentX * speed;
            const y = currentY * speed;
            layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });

        // Плавный 3D-наклон и смещение центральной аватарки
        if (imageWrapper && profileImg) {
            const imgSpeed = parseFloat(imageWrapper.getAttribute('data-speed')) || 40;
            const xImg = currentX * imgSpeed;
            const yImg = currentY * imgSpeed;
            
            // Комбинируем параллакс-смещение с мягким поворотом
            const rotateY = currentX * 25;
            const rotateX = -currentY * 25;

            profileImg.style.transform = `translate3d(${xImg}px, ${yImg}px, 0) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
        }

        requestAnimationFrame(render);
    }

    // Запуск цикла анимации
    requestAnimationFrame(render);

    // Возврат в исходную точку при уходе мыши за пределы экрана
    document.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
    });
});