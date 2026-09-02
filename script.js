document.addEventListener('DOMContentLoaded', () => {
    const imageWrapper = document.querySelector('.image-wrapper');
    const image = document.getElementById('smooth-image');
    
    if (!imageWrapper || !image) return;

    let bounds;
    
    // Обновляем границы элемента при наведении
    imageWrapper.addEventListener('mouseenter', () => {
        bounds = imageWrapper.getBoundingClientRect();
    });

    imageWrapper.addEventListener('mousemove', (e) => {
        // Вычисляем позицию мыши относительно центра элемента
        const mouseX = e.clientX - bounds.left - bounds.width / 2;
        const mouseY = e.clientY - bounds.top - bounds.height / 2;
        
        // Смягчаем движение (делитель определяет силу эффекта)
        const xPos = mouseX / 10;
        const yPos = mouseY / 10;
        
        // Используем requestAnimationFrame для синхронизации с частотой кадров монитора
        requestAnimationFrame(() => {
            image.style.transform = `scale(1.05) translate(${xPos}px, ${yPos}px)`;
        });
    });

    imageWrapper.addEventListener('mouseleave', () => {
        requestAnimationFrame(() => {
            // Мягкий возврат в исходное положение
            image.style.transform = `scale(1) translate(0px, 0px)`;
        });
    });
});