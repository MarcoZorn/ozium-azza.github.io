<div id="smoke-container"></div>

<script>
document.addEventListener("DOMContentLoaded", function() {
    const smokeContainer = document.getElementById('smoke-container');
    let mouseOffsetX = 0;

    if (!smokeContainer) {
        console.warn("Smoke container not found.");
        return;
    }

    // aggiorna la posizione del mouse rispetto al centro del contenitore
    document.addEventListener("mousemove", (e) => {
        const rect = smokeContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        mouseOffsetX = e.clientX - centerX;
    });

    function createSmokePuff() {
        const puff = document.createElement('div');
        puff.classList.add('smoke-puff');

        const isMobile = window.innerWidth <= 768;
        let drift;

        if (isMobile) {
            // fumo meno influenzato dal dito
            drift = (mouseOffsetX / 5) + (Math.random() * 30 - 15);
        } else {
            // drift verso il mouse con un po’ di random
            drift = (mouseOffsetX / 4) + (Math.random() * 100 - 50);
        }

        puff.style.setProperty('--drift', `${drift}px`);

        const size = 15 + Math.random() * 15; // dimensione 15–30px
        puff.style.width = `${size}px`;
        puff.style.height = `${size}px`;

        smokeContainer.appendChild(puff);

        puff.addEventListener('animationend', () => {
            puff.remove();
        });
    }

    setInterval(createSmokePuff, 200);
    createSmokePuff();
});
</script>
