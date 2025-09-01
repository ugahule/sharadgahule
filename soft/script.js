document.addEventListener('DOMContentLoaded', function() {
    const photos = document.querySelectorAll('.photo');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentPhoto = 0;

    function showPhoto(index) {
        photos.forEach(photo => photo.classList.remove('active'));
        photos[index].classList.add('active');
    }

    prevBtn.addEventListener('click', () => {
        currentPhoto = currentPhoto === 0 ? photos.length - 1 : currentPhoto - 1;
        showPhoto(currentPhoto);
    });

    nextBtn.addEventListener('click', () => {
        currentPhoto = currentPhoto === photos.length - 1 ? 0 : currentPhoto + 1;
        showPhoto(currentPhoto);
    });

    // Touch/swipe support
    let startX = 0;
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    document.addEventListener('touchend', (e) => {
        if (!startX) return;
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;

        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                currentPhoto = currentPhoto === photos.length - 1 ? 0 : currentPhoto + 1;
            } else {
                currentPhoto = currentPhoto === 0 ? photos.length - 1 : currentPhoto - 1;
            }
            showPhoto(currentPhoto);
        }
        startX = 0;
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentPhoto = currentPhoto === 0 ? photos.length - 1 : currentPhoto - 1;
            showPhoto(currentPhoto);
        } else if (e.key === 'ArrowRight') {
            currentPhoto = currentPhoto === photos.length - 1 ? 0 : currentPhoto + 1;
            showPhoto(currentPhoto);
        }
    });

    // Auto-slide every 4 seconds
    setInterval(() => {
        currentPhoto = currentPhoto === photos.length - 1 ? 0 : currentPhoto + 1;
        showPhoto(currentPhoto);
    }, 4000);

    // Preload images
    for (let i = 1; i <= 5; i++) {
        const img = new Image();
        img.src = `https://picsum.photos/400/300?random=${i}`;
    }
});