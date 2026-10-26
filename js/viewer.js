let currentScale = 1;
let isDragging = false;
let startX = 0, startY = 0;
let translateX = 0, translateY = 0;

const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');

// Función para actualizar la transformación visual (Zoom + Posición)
function updateTransform() {
    modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${currentScale})`;
}

// Abrir imagen en el visor
function openImageModal(imageSrc) {
    modalImg.src = imageSrc;
    resetZoom();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Cerrar el visor
function closeImageModal() {
    modal.classList.remove('active');
    modalImg.src = '';
    document.body.style.overflow = 'auto';
}

// Zoom In (+)
function zoomIn() {
    currentScale += 0.3;
    updateTransform();
}

// Zoom Out (-)
function zoomOut() {
    if (currentScale > 0.5) {
        currentScale -= 0.3;
        if (currentScale <= 1) {
            translateX = 0;
            translateY = 0;
        }
        updateTransform();
    }
}

// Restablecer Zoom y Posición
function resetZoom() {
    currentScale = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
}

// --- LÓGICA DE ARRASTRE (DRAG & PAN) ---
modalImg.addEventListener('mousedown', (e) => {
    if (currentScale > 1) {
        isDragging = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        modalImg.style.cursor = 'grabbing';
        e.preventDefault();
    }
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateTransform();
});

window.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        modalImg.style.cursor = currentScale > 1 ? 'grab' : 'default';
    }
});

// Soporte para Zoom con la Rueda del Mouse (Scroll)
modalImg.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
        zoomIn();
    } else {
        zoomOut();
    }
}, { passive: false });

// Tecla ESC para cerrar
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeImageModal();
    }
});

// Asignar evento a los botones "Ver"
document.addEventListener('DOMContentLoaded', function () {
    const viewButtons = document.querySelectorAll('.btn-view');

    viewButtons.forEach(btn => {
        const href = btn.getAttribute('href');
        if (href && href.match(/\.(jpeg|jpg|png|gif|webp)$/i)) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                openImageModal(href);
            });
        }
    });
});