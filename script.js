document.addEventListener('DOMContentLoaded', () => {
    const featureLinks = document.querySelectorAll('.feature-nav a');
    const detailsModal = document.getElementById('details-modal');
    const detailsContentContainer = document.getElementById('details-content-container');
    const closeBtn = document.getElementById('close-btn');
    const bgVideo = document.getElementById('bg-video');
    const mouseMoveStrength = 50; // How much the background moves with the mouse

    // Feature navigation and modal handling
    featureLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            const sourceContentElement = document.getElementById(targetId);

            if (sourceContentElement) {
                const clonedContent = sourceContentElement.cloneNode(true);
                clonedContent.style.display = 'block';
                detailsContentContainer.innerHTML = '';
                detailsContentContainer.appendChild(clonedContent);
                detailsModal.classList.add('active');
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        detailsModal.classList.remove('active');
        setTimeout(() => {
            if (!detailsModal.classList.contains('active')) {
                detailsContentContainer.innerHTML = '';
            }
        }, 400);
    });

    detailsModal.addEventListener('click', (e) => {
        if (e.target === detailsModal) {
            closeBtn.click();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && detailsModal.classList.contains('active')) {
            closeBtn.click();
        }
    });

    // Mouse move effect for video background
    window.addEventListener('mousemove', (e) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * mouseMoveStrength;
        const yPos = (e.clientY / window.innerHeight - 0.5) * mouseMoveStrength;

        if (bgVideo && bgVideo.parentElement) {
            bgVideo.parentElement.style.transform = `translate(${-xPos}px, ${-yPos}px)`;
        }
    });

    // Grained.js Initialization
    function initGrainedTexture() {
        const options = {
            animate: true,
            patternWidth: 200,
            patternHeight: 200,
            grainDensity: 3,
            grainWidth: 1,
            grainHeight: 1,
            grainOpacity: window.matchMedia("(min-width: 992px)").matches ? 0.35 : 0.15
        };

        if (document.getElementById('grain-overlay')) {
            grained('#grain-overlay', options);
        }
    }

    initGrainedTexture();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initGrainedTexture, 250);
    });
});