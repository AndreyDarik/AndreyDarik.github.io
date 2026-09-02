document.addEventListener('DOMContentLoaded', () => {
    const imageWrapper = document.querySelector('.image-wrapper');
    const image = document.getElementById('smooth-image');
    
    if (!imageWrapper || !image) return;

    let bounds;
    
    imageWrapper.addEventListener('mouseenter', () => {
        bounds = imageWrapper.getBoundingClientRect();
    });

    imageWrapper.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX - bounds.left - bounds.width / 2;
        const mouseY = e.clientY - bounds.top - bounds.height / 2;
        
        const xPos = mouseX / 15;
        const yPos = mouseY / 15;
        
        requestAnimationFrame(() => {
            image.style.transform = `scale(1.08) translate(${xPos}px, ${yPos}px)`;
        });
    });

    imageWrapper.addEventListener('mouseleave', () => {
        requestAnimationFrame(() => {
            image.style.transform = `scale(1) translate(0px, 0px)`;
        });
    });
});