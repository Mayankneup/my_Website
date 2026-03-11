const animatedElements = document.querySelectorAll(".animate-rise");
const scrollHeader = document.getElementById("scrollHeader");
const heroSection = document.getElementById("home");

/* ============================= */
/* 1. Rise Animation */
/* ============================= */
animatedElements.forEach((element) => {
  const delay = Number(element.dataset.delay || 0);
  const duration = Number(element.dataset.duration || 1000);
  const move = Number(element.dataset.move || 0.15);

  element.animate(
    [
      {
        opacity: 0,
        transform: `translateY(${move * 100}px)`
      },
      {
        opacity: 1,
        transform: "translateY(0px)"
      }
    ],
    {
      duration,
      delay,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "forwards"
    }
  );
});

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
