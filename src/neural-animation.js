// Neural Network Animation for Mobile Compatibility
// This script creates smooth animations using CSS transforms instead of SVG attribute animations

export function initNeuralAnimation() {
    const pulses = document.querySelectorAll('.pulse');

    // Pulse paths with start and end coordinates
    const pulsePaths = [
        // Input to Hidden layer pulses
        { el: '.pulse-1', path: [{ x: 30, y: 40 }, { x: 100, y: 30 }], duration: 4000, delay: 0 },
        { el: '.pulse-2', path: [{ x: 30, y: 40 }, { x: 100, y: 70 }], duration: 4000, delay: 0 },
        { el: '.pulse-3', path: [{ x: 30, y: 40 }, { x: 100, y: 110 }], duration: 4000, delay: 0 },
        { el: '.pulse-4', path: [{ x: 30, y: 100 }, { x: 100, y: 30 }], duration: 4000, delay: 0 },
        { el: '.pulse-5', path: [{ x: 30, y: 100 }, { x: 100, y: 70 }], duration: 4000, delay: 0 },
        { el: '.pulse-6', path: [{ x: 30, y: 100 }, { x: 100, y: 110 }], duration: 4000, delay: 0 },

        // Hidden to Output layer pulses
        { el: '.pulse-7', path: [{ x: 100, y: 30 }, { x: 170, y: 50 }], duration: 4000, delay: 1000 },
        { el: '.pulse-8', path: [{ x: 100, y: 30 }, { x: 170, y: 90 }], duration: 4000, delay: 1000 },
        { el: '.pulse-9', path: [{ x: 100, y: 70 }, { x: 170, y: 50 }], duration: 4000, delay: 1000 },
        { el: '.pulse-10', path: [{ x: 100, y: 70 }, { x: 170, y: 90 }], duration: 4000, delay: 1000 },
        { el: '.pulse-11', path: [{ x: 100, y: 110 }, { x: 170, y: 50 }], duration: 4000, delay: 1000 },
        { el: '.pulse-12', path: [{ x: 100, y: 110 }, { x: 170, y: 90 }], duration: 4000, delay: 1000 },
    ];

    pulsePaths.forEach(config => {
        const pulse = document.querySelector(config.el);
        if (!pulse) return;

        animatePulse(pulse, config.path, config.duration, config.delay);
    });
}

function animatePulse(element, path, duration, initialDelay) {
    const [start, end] = path;
    const halfDuration = duration / 2;

    function runCycle() {
        // Forward animation (0-20% of 4s = 800ms)
        setTimeout(() => {
            element.style.opacity = '1';
            animatePosition(element, start, end, 800, () => {
                // Hide (20-25% of 4s = 200ms pause)
                setTimeout(() => {
                    element.style.opacity = '0';

                    // Wait until 75% (2200ms from hide)
                    setTimeout(() => {
                        element.style.opacity = '1';

                        // Backward animation (75-95% of 4s = 800ms)
                        animatePosition(element, end, start, 800, () => {
                            // Brief pause before next cycle
                            setTimeout(runCycle, 200);
                        });
                    }, 2200);
                }, 200);
            });
        }, initialDelay);
    }

    runCycle();
}

function animatePosition(element, from, to, duration, callback) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-in-out function
        const eased = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        const x = from.x + (to.x - from.x) * eased;
        const y = from.y + (to.y - from.y) * eased;

        element.setAttribute('cx', x);
        element.setAttribute('cy', y);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else if (callback) {
            callback();
        }
    }

    requestAnimationFrame(update);
}

// Node pulse animations
export function initNodeAnimations() {
    const nodes = {
        input: document.querySelectorAll('.node.input'),
        hidden: document.querySelectorAll('.node.hidden'),
        output: document.querySelectorAll('.node.output')
    };

    // Input nodes: glow at 0% and 95%
    nodes.input.forEach((node, index) => {
        animateNodeGlow(node, [0, 10, 20, 85, 95, 100], 4000, index * 100);
    });

    // Hidden nodes: glow at 20% and 70%
    nodes.hidden.forEach((node, index) => {
        animateNodeGlow(node, [20, 25, 30, 65, 70, 75], 4000, index * 150);
    });

    // Output nodes: glow at 45% and 55%
    nodes.output.forEach((node, index) => {
        animateNodeGlow(node, [45, 55], 4000, index * 100);
    });
}

function animateNodeGlow(element, glowPoints, cycleDuration, delay) {
    function runCycle() {
        setTimeout(() => {
            glowPoints.forEach((point, index) => {
                setTimeout(() => {
                    if (index % 2 === 0) {
                        // Glow on
                        element.style.filter = 'drop-shadow(0 0 12px rgba(0, 229, 255, 1))';
                        element.style.opacity = '1';
                    } else {
                        // Glow off
                        element.style.filter = 'drop-shadow(0 0 4px rgba(0, 229, 255, 0.5))';
                        element.style.opacity = '0.7';
                    }
                }, (point / 100) * cycleDuration);
            });

            setTimeout(runCycle, cycleDuration);
        }, delay);
    }

    runCycle();
}
