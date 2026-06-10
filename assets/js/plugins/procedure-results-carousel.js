(function () {
  'use strict';

  function ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
      return;
    }

    callback();
  }

  function initProcedureResultsCarousel(carousel) {
    if (carousel.swiper || typeof Swiper === 'undefined') {
      return;
    }

    var pagination = carousel.querySelector('.procedure-results-pagination');

    function syncComparisonWidths() {
      window.setTimeout(function () {
        if (window.jQuery) {
          window.jQuery(window).trigger('resize');
        } else {
          window.dispatchEvent(new Event('resize'));
        }
      }, 0);
    }

    new Swiper(carousel, {
      slidesPerView: 1,
      spaceBetween: 0,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      speed: 550,
      allowTouchMove: false,
      autoplay: {
        delay: 8000,
        disableOnInteraction: false,
        stopOnLastSlide: false,
      },
      pagination: pagination ? {
        el: pagination,
        clickable: true,
      } : false,
      on: {
        init: syncComparisonWidths,
        slideChangeTransitionEnd: syncComparisonWidths,
        resize: syncComparisonWidths,
      },
    });
  }

  ready(function () {
    document.querySelectorAll('[data-module-action~="procedure-results-carousel"]').forEach(initProcedureResultsCarousel);
  });
})();
