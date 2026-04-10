/*Portfolio Script*/

const scrollHeader = document.getElementById("scrollHeader");
const heroSection = document.getElementById("home");
const heroName = document.querySelector(".name");
const navLinks = document.querySelectorAll(".nav-link");
const canvas = document.getElementById("circuit-canvas");
const ctx = canvas ? canvas.getContext("2d") : null;


// Intro Animation
window.addEventListener("DOMContentLoaded", () => {
  // Main Title Reveal
  if (heroName) {
    heroName.animate(
      [
        { opacity: 0, transform: "translateY(50px)", filter: "blur(14px)" },
        { opacity: 1, transform: "translateY(0)", filter: "blur(0px)" }
      ],
      { duration: 1800, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "forwards" }
    );
  }

  // Staggered Navigation Link Reveal
  if (navLinks.length > 0) {
    navLinks.forEach((link, index) => {
      link.animate(
        [
          { opacity: 0, transform: "translateY(30px)" },
          { opacity: 1, transform: "translateY(0)" }
        ],
        { 
          duration: 1000, 
          delay: 800 + (index * 150), 
          easing: "cubic-bezier(0.22, 1, 0.36, 1)", 
          fill: "forwards" 
        }
      );
    });
  }
});


// Header Scroll Reveal Logic
function handleScroll() {
  if (!scrollHeader || !heroSection) return;

  // Trigger header visibility when user scrolls past 80% of hero height
  const triggerPoint = heroSection.offsetHeight * 0.8;

  if (window.scrollY > triggerPoint) {
    if (!scrollHeader.classList.contains("show")) {
      scrollHeader.classList.add("show");
    }
  } else {
    scrollHeader.classList.remove("show");
  }
}
//Scroll Listener for High Performance
let isScrolling = false;
window.addEventListener("scroll", () => {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      handleScroll();
      isScrolling = false;
    });
    isScrolling = true;
  }
}, { passive: true });


// Intreactive Particle Network Background (Canvas)
if (canvas && ctx) {
  let width, height;
  const mouse = { x: -9999, y: -9999 };
  const gridSize = 40; // The spacing between the hardware "pins"
  let dataBuses = [];

  // Setup Canvas
  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  // Handle Resize and Mouse
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener("mouseout", () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  // The Data Packets that shoot across the screen
  class DataBus {
    constructor() {
      this.isVertical = Math.random() > 0.5;
      
      if (this.isVertical) {
        // Snap to a vertical grid line
        this.x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
        this.y = Math.random() < 0.5 ? 0 : height; // Start at top or bottom
        this.length = Math.random() * 150 + 100;
        this.speed = (Math.random() * 1.5 + 1) * (this.y === 0 ? 1 : -1);
      } else {
        // Snap to a horizontal grid line
        this.y = Math.floor(Math.random() * (height / gridSize)) * gridSize;
        this.x = Math.random() < 0.5 ? 0 : width; // Start at left or right
        this.length = Math.random() * 150 + 100;
        this.speed = (Math.random() * 1.5 + 1) * (this.x === 0 ? 1 : -1);
      }
      this.opacity = Math.random() * 0.5 + 0.3; // Glow intensity
    }

    update() {
      if (this.isVertical) {
        this.y += this.speed;
      } else {
        this.x += this.speed;
      }
    }

    draw() {
      ctx.beginPath();
      let gradient;
      
      // Draw a fading comet-tail line
      if (this.isVertical) {
        gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y - this.length * Math.sign(this.speed));
        gradient.addColorStop(0, `rgba(0, 255, 204, ${this.opacity})`);
        gradient.addColorStop(1, "rgba(0, 255, 204, 0)");
        ctx.strokeStyle = gradient;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - this.length * Math.sign(this.speed));
      } else {
        gradient = ctx.createLinearGradient(this.x, this.y, this.x - this.length * Math.sign(this.speed), this.y);
        gradient.addColorStop(0, `rgba(0, 255, 204, ${this.opacity})`);
        gradient.addColorStop(1, "rgba(0, 255, 204, 0)");
        ctx.strokeStyle = gradient;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.length * Math.sign(this.speed), this.y);
      }
      
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    isOffScreen() {
      if (this.isVertical) {
        return (this.speed > 0 && this.y - this.length > height) || (this.speed < 0 && this.y + this.length < 0);
      } else {
        return (this.speed > 0 && this.x - this.length > width) || (this.speed < 0 && this.x + this.length < 0);
      }
    }
  }

  // Core Animation Loop
  function animateSchematic() {
    ctx.clearRect(0, 0, width, height);

    // 1. Draw Background Blueprint Grid
    ctx.fillStyle = "rgba(255, 255, 255, 0.04)"; // Faint ambient dots
    for (let x = 0; x <= width; x += gridSize) {
      for (let y = 0; y <= height; y += gridSize) {
        ctx.fillRect(x - 1, y - 1, 2, 2);
        
        // 2. Mouse Interaction: The "Hardware Scanner"
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // If mouse is near, light up the grid 
        if (dist < 180) {
          ctx.beginPath();
          ctx.moveTo(x - 5, y);
          ctx.lineTo(x + 5, y);
          ctx.moveTo(x, y - 5);
          ctx.lineTo(x, y + 5);
          // Opacity fades as it gets further from mouse
          ctx.strokeStyle = `rgba(0, 255, 204, ${0.8 - (dist / 180)})`; 
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Firing Logic
    if (Math.random() < 0.08) { // Chance to spawn a new data packet each frame
      dataBuses.push(new DataBus());
    }

    // 4. Update and Draw Data Buses
    for (let i = dataBuses.length - 1; i >= 0; i--) {
      dataBuses[i].update();
      dataBuses[i].draw();
      
      // Garbage collection: remove lines that left the screen
      if (dataBuses[i].isOffScreen()) {
        dataBuses.splice(i, 1);
      }
    }

    requestAnimationFrame(animateSchematic);
  }

  // Start the system
  resizeCanvas();
  animateSchematic();
}
//  Event Listener to Check Scroll Position on Page Load (for refresh scenarios)
window.addEventListener("load", () => {
  handleScroll(); // Check scroll position immediately on refresh
});