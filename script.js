document.addEventListener('DOMContentLoaded', () => {
    const emblemContainer = document.getElementById('tilt-emblem');

    // Эффект плавного 3D-наклона эмблемы за курсором
    document.addEventListener('mousemove', (e) => {
        if (!emblemContainer) return;

        // Вычисляем позицию курсора относительно центра экрана
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

        // Применяем трансформацию через requestAnimationFrame для максимальной плавности
        requestAnimationFrame(() => {
            emblemContainer.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    });

    // Сброс позиции, если мышь уходит за пределы окна
    document.addEventListener('mouseleave', () => {
        if (!emblemContainer) return;
        requestAnimationFrame(() => {
            emblemContainer.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
            emblemContainer.style.transition = 'transform 0.5s ease-out';
        });
    });

    // Убираем transition при движении мыши для моментального отклика
    document.addEventListener('mouseenter', () => {
        if (!emblemContainer) return;
        emblemContainer.style.transition = 'none';
    });
});