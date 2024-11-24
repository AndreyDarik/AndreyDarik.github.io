// Скрипт для генерации цветов с использованием изображений
document.addEventListener('DOMContentLoaded', () => {
    const flowerContainer = document.querySelector('.falling-flowers');

    // Функция для создания цветка
    const createFlower = () => {
        const flower = document.createElement('div');
        flower.classList.add('flower');

        // Выбираем случайное изображение цветка
        const flowerImages = [
            'flower1.png', // Укажите пути к вашим изображениям
            'flower2.png',
            'flower3.png',
            'flower4.png'
        ];
        const randomFlower = flowerImages[Math.floor(Math.random() * flowerImages.length)];
        flower.style.backgroundImage = `url('${randomFlower}')`;

        // Устанавливаем случайное положение
        flower.style.setProperty('--flower-position', Math.random().toString());

        // Удаляем цветок после завершения анимации
        flower.addEventListener('animationend', () => {
            flower.remove();
        });

        flowerContainer.appendChild(flower);
    };

    // Создаем цветы каждые 500 мс
    setInterval(createFlower, 500);
});
