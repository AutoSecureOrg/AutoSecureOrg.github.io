document.addEventListener('DOMContentLoaded', () => {
    const featureLinks = document.querySelectorAll('.feature-nav a');
    const detailsModal = document.getElementById('details-modal');
    const detailsContentContainer = document.getElementById('details-content-container');
    const closeBtn = document.getElementById('close-btn');
    const bgVideo = document.getElementById('bg-video');
    const mouseMoveStrength = 50; // How much the background moves with the mouse
    const titleTrigger = document.getElementById('title-trigger');
    let activeLink = null;
    let isTouchDevice = false;
    let touchTimeout = null;

    // Detect touch device
    window.addEventListener('touchstart', function onFirstTouch() {
        isTouchDevice = true;
        window.removeEventListener('touchstart', onFirstTouch);
    });

    // Feature navigation and modal handling
    featureLinks.forEach(link => {
        // Handle click/touch for modal
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Only handle click for desktop or after animation for mobile
            if (!isTouchDevice || link.classList.contains('show-card')) {
                const targetId = link.getAttribute('data-target');
                const sourceContentElement = document.getElementById(targetId);

                if (sourceContentElement) {
                    const clonedContent = sourceContentElement.cloneNode(true);
                    clonedContent.style.display = 'block';
                    detailsContentContainer.innerHTML = '';
                    detailsContentContainer.appendChild(clonedContent);
                    detailsModal.classList.add('active');
                }
            }
        });

        // Handle touch for glitch effect
        if ('ontouchstart' in window) {
            link.addEventListener('touchstart', (e) => {
                e.preventDefault();

                // Clear any existing timeouts
                if (touchTimeout) {
                    clearTimeout(touchTimeout);
                }

                // Remove classes from previously active elements
                if (activeLink) {
                    activeLink.classList.remove('glitch-only', 'show-card');
                }
                if (titleTrigger.classList.contains('show-card')) {
                    titleTrigger.classList.remove('glitch-only', 'show-card');
                }

                // Start glitch animation
                link.classList.add('glitch-only');
                activeLink = link;

                // After glitch animation, show card
                touchTimeout = setTimeout(() => {
                    link.classList.remove('glitch-only');
                    link.classList.add('show-card');
                    // Trigger click event after showing card
                    link.click();
                }, 500);
            });
        }
    });

    // Title trigger touch handling
    if ('ontouchstart' in window) {
        titleTrigger.addEventListener('touchstart', (e) => {
            e.preventDefault();

            // Clear any existing timeouts
            if (touchTimeout) {
                clearTimeout(touchTimeout);
            }

            // Remove classes from previously active elements
            if (activeLink) {
                activeLink.classList.remove('glitch-only', 'show-card');
                activeLink = null;
            }
            titleTrigger.classList.remove('glitch-only', 'show-card');

            // Start glitch animation
            titleTrigger.classList.add('glitch-only');

            // After glitch animation, show info card
            touchTimeout = setTimeout(() => {
                titleTrigger.classList.remove('glitch-only');
                titleTrigger.classList.add('show-card');
            }, 1000);
        });

        // Add touch event to close info card when touching outside
        document.addEventListener('touchstart', (e) => {
            if (titleTrigger.classList.contains('show-card') &&
                !titleTrigger.contains(e.target)) {
                titleTrigger.classList.remove('glitch-only', 'show-card');
            }
        });
    }

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