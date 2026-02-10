/**
 * Hero Slider
 * Rotating slider for popular tools showcase
 */

class HeroSlider {
  constructor(containerSelector = '.slider-container') {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.slides = this.container.querySelectorAll('.slide');
    this.currentIndex = 0;
    this.autoplayInterval = 4000; // 4 seconds
    this.transitionDuration = 600; // 600ms

    this.init();
  }

  init() {
    if (this.slides.length === 0) return;

    // Set initial state
    this.updateSlides();

    // Start autoplay
    this.startAutoplay();

    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.stopAutoplay());
    this.container.addEventListener('mouseleave', () => this.startAutoplay());

    console.log('[v0] Hero slider initialized with', this.slides.length, 'slides');
  }

  updateSlides() {
    this.slides.forEach((slide, index) => {
      slide.classList.remove('active', 'prev', 'next');

      if (index === this.currentIndex) {
        slide.classList.add('active');
      } else if (index === (this.currentIndex - 1 + this.slides.length) % this.slides.length) {
        slide.classList.add('prev');
      } else if (index === (this.currentIndex + 1) % this.slides.length) {
        slide.classList.add('next');
      }
    });
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateSlides();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.updateSlides();
  }

  startAutoplay() {
    if (this.autoplayTimer) return;

    this.autoplayTimer = setInterval(() => {
      this.next();
    }, this.autoplayInterval);
  }

  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  destroy() {
    this.stopAutoplay();
  }
}

// Initialize slider on page load
document.addEventListener('DOMContentLoaded', function() {
  const slider = new HeroSlider('.slider-container');
  window.heroSlider = slider;
});

// Cleanup on page unload
window.addEventListener('unload', function() {
  if (window.heroSlider) {
    window.heroSlider.destroy();
  }
});
