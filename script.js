const animatedElements = [...document.querySelectorAll(".animate-rise")];
const startTime = performance.now();

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function animate(now) {
    const elapsed = now - startTime;
    let stillRunning = false;

    animatedElements.forEach((element) => {
        const delay = Number(element.dataset.delay || 0);
        const duration = Number(element.dataset.duration || 1800);
        const moveFactor = Number(element.dataset.move || 0.2);

        const localElapsed = elapsed - delay;
        const progress = Math.max(0, Math.min(localElapsed / duration, 1));
        const eased = easeOutCubic(progress);

        const moveDistance = window.innerHeight * moveFactor;
        const currentY = moveDistance * (1 - eased);

        element.style.transform = `translateY(${currentY}px)`;
        element.style.opacity = eased;
        element.style.filter = `blur(${10 * (1 - eased)}px)`;

        const curtain = 50 * (1 - eased);
        element.style.clipPath = `inset(0 ${curtain}% 0 ${curtain}%)`;

        if (progress < 1) {
            stillRunning = true;
        }
    });

    if (stillRunning) {
        requestAnimationFrame(animate);
    }
}

requestAnimationFrame(animate);