document.addEventListener('DOMContentLoaded', () => {
    const featureLinks = document.querySelectorAll('.feature-nav a');
    const detailsModal = document.getElementById('details-modal');
    const detailsContentContainer = document.getElementById('details-content-container');
    const closeBtn = document.getElementById('close-btn');
    // const container = document.querySelector('.container'); // No longer needed for class toggling

    featureLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior

            const targetId = link.getAttribute('data-target');
            const sourceContentElement = document.getElementById(targetId);

            if (sourceContentElement) {
                // Clone the source content to avoid moving the original hidden div
                const clonedContent = sourceContentElement.cloneNode(true);
                clonedContent.style.display = 'block'; // Ensure the cloned content is visible

                detailsContentContainer.innerHTML = ''; // Clear previous content
                detailsContentContainer.appendChild(clonedContent);

                detailsModal.classList.add('active');
                // container.classList.add('panel-active'); // Remove this line
            } else {
                console.error(`Content for target ID '${targetId}' not found.`);
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        detailsModal.classList.remove('active');
       // container.classList.remove('panel-active'); // Remove this line
        // Optional: Clear content after transition for performance
         setTimeout(() => {
             if (!detailsModal.classList.contains('active')) {
                 detailsContentContainer.innerHTML = '';
             }
         }, 400); // Match CSS transition duration
    });

    // Close modal if clicking on the overlay background
    detailsModal.addEventListener('click', (e) => {
        // Check if the click is directly on the modal overlay, not the content card
        if (e.target === detailsModal) {
            closeBtn.click(); // Trigger the close button's click handler
        }
    });

    // Optional: Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && detailsModal.classList.contains('active')) {
            closeBtn.click();
        }
    });

    // --- New Background Image Logic ---
    const bgLayers = document.querySelectorAll('.bg-layer');
    let currentBgIndex = 0;
    const cycleInterval = 5000; // Time in ms (5 seconds)
    const mouseMoveStrength = 15; // How much the background moves with the mouse

    // Function to switch background
    function switchBackground() {
        const nextBgIndex = (currentBgIndex + 1) % bgLayers.length;

        bgLayers[currentBgIndex].classList.remove('visible');
        bgLayers[nextBgIndex].classList.add('visible');

        currentBgIndex = nextBgIndex;
    }

    // Initial setup
    if (bgLayers.length > 0) {
        bgLayers[currentBgIndex].classList.add('visible');
        setInterval(switchBackground, cycleInterval);
    }

    // Mouse move effect
    window.addEventListener('mousemove', (e) => {
        if (bgLayers.length > 0) {
            const currentLayer = bgLayers[currentBgIndex];
            const xPos = (e.clientX / window.innerWidth - 0.5) * mouseMoveStrength;
            const yPos = (e.clientY / window.innerHeight - 0.5) * mouseMoveStrength;

            // Apply the transform to the *currently visible* layer
            // Note: We invert the values slightly (-xPos, -yPos) so the background moves opposite to the mouse
            currentLayer.style.transform = `translate(${-xPos}px, ${-yPos}px)`;
        }
    });
});