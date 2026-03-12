const scrollHeader = document.getElementById("scrollHeader");
const heroSection = document.getElementById("home");

const heroName = document.querySelector(".name");
const navLinks = document.querySelectorAll(".nav-link");
const socialContainer = document.querySelector(".social-container");

/* ============================= */
/* 1. Intro Animation */
/* ============================= */

// Name: starts lower + blurred, then sharpens as it rises
if (heroName) {
  heroName.animate(
    [
      {
        opacity: 0,
        transform: "translateY(180px)",
        filter: "blur(14px)"
      },
      {
        opacity: 1,
        transform: "translateY(0)",
        filter: "blur(0px)"
      }
    ],
    {
      duration: 2200,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "forwards"
    }
  );
}

// Nav links: come from bottom, one at a time
navLinks.forEach((link, index) => {
  link.animate(
    [
      {
        opacity: 0,
        transform: "translateY(90px)"
      },
      {
        opacity: 1,
        transform: "translateY(0)"
      }
    ],
    {
      duration: 1200,
      delay: 1200 + index * 220,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "forwards"
    }
  );
});

// Social panel: comes in after nav starts
if (socialContainer) {
  socialContainer.animate(
    [
      {
        opacity: 0,
        transform: "translateY(80px)"
      },
      {
        opacity: 1,
        transform: "translateY(0)"
      }
    ],
    {
      duration: 1400,
      delay: 1800,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "forwards"
    }
  );
}

/* ============================= */
/* 2. Show Header On Scroll */
/* ============================= */
function toggleScrollHeader() {
  const triggerPoint = heroSection.offsetHeight * 0.55;

  if (window.scrollY > triggerPoint) {
    scrollHeader.classList.add("show");
  } else {
    scrollHeader.classList.remove("show");
  }
}

window.addEventListener("scroll", toggleScrollHeader);
window.addEventListener("load", toggleScrollHeader);
window.addEventListener("resize", toggleScrollHeader);