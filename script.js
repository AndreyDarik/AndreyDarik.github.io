document.addEventListener('DOMContentLoaded', () => {
    const emblem = document.getElementById('tilt-emblem');
    
    document.addEventListener('mousemove', (e) => {
        if (!emblem) return;
        const xAxis = (window.innerWidth / 2 - e.pageX) / 20;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 20;
        
        requestAnimationFrame(() => {
            emblem.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    });

    document.addEventListener('mouseleave', () => {
        if (!emblem) return;
        requestAnimationFrame(() => {
            emblem.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
            emblem.style.transition = 'transform 0.5s ease-out';
        });
    });

    document.addEventListener('mouseenter', () => {
        if (!emblem) return;
        emblem.style.transition = 'none';
    });
});