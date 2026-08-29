// main.js
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("hide");
  }, 300);
});

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileOverlay = document.getElementById("mobileOverlay");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenuBtn.classList.toggle("active");
  mobileOverlay.classList.toggle("active");
});

function closeMobileMenu() {
  mobileMenuBtn.classList.remove("active");
  mobileOverlay.classList.remove("active");
}

let currentIndex = 0;
const slides = document.querySelectorAll(".bg-slide");
const cards = document.querySelectorAll(".feature-card");

function updateSlider(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  cards.forEach((card) => card.classList.remove("active"));

  slides[index].classList.add("active");
  cards[index].classList.add("active");
  currentIndex = index;
}

function setSlide(index) {
  updateSlider(index);
}

const track = document.getElementById("carouselTrack");
const items = document.querySelectorAll(".carousel-item");
const dotsContainer = document.getElementById("carouselDots");
let currentCarouselIndex = 0;

function getVisibleItems() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

function getMaxIndex() {
  return items.length - getVisibleItems();
}

function createDots() {
  dotsContainer.innerHTML = "";
  const maxIdx = getMaxIndex();
  for (let i = 0; i <= maxIdx; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === currentCarouselIndex) dot.classList.add("active");
    dot.addEventListener("click", () => goToCarouselSlide(i));
    dotsContainer.appendChild(dot);
  }
}

function updateCarousel() {
  const itemWidth = items[0].getBoundingClientRect().width + 20;
  track.style.transform = `translateX(-${currentCarouselIndex * itemWidth}px)`;

  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentCarouselIndex);
  });
}

function moveCarousel(direction) {
  const maxIdx = getMaxIndex();
  currentCarouselIndex += direction;

  if (currentCarouselIndex < 0) currentCarouselIndex = 0;
  if (currentCarouselIndex > maxIdx) currentCarouselIndex = maxIdx;

  updateCarousel();
}

function goToCarouselSlide(index) {
  currentCarouselIndex = index;
  updateCarousel();
}

createDots();

window.addEventListener("resize", () => {
  if (currentCarouselIndex > getMaxIndex()) {
    currentCarouselIndex = getMaxIndex();
  }
  createDots();
  updateCarousel();
});

// Copyright FazoDesign / Abdughafur 2026