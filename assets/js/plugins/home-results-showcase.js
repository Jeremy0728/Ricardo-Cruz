(function () {
  'use strict';

  function ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
      return;
    }

    callback();
  }

  function initHomeResultsShowcase(successResultsEl) {
    if (!successResultsEl || successResultsEl.swiper || typeof Swiper === 'undefined') {
      return;
    }

    var successSection = successResultsEl.closest('.rts-success-gallery-area');

    if (!successSection) {
      return;
    }

    var successTabs = successSection.querySelectorAll('.results-category-tab');
    var successPagination = successSection.querySelector('.success-results-pagination');
    var queuedSuccessSlideIndex = null;
    var successAutoplayRestartTimer = null;

    function setActiveSuccessTab(activeIndex) {
      successTabs.forEach(function (tab, index) {
        var isActive = index === activeIndex;
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
      });
    }

    function getValidSuccessSlideIndex(swiperInstance, index) {
      var slideIndex = Number(index);
      var maxIndex = swiperInstance.slides.length - 1;

      if (Number.isNaN(slideIndex) || slideIndex < 0 || slideIndex > maxIndex) {
        return null;
      }

      return slideIndex;
    }

    function stopSuccessAutoplay(swiperInstance) {
      clearTimeout(successAutoplayRestartTimer);

      if (!swiperInstance.autoplay) {
        return;
      }

      swiperInstance.autoplay.stop();
    }

    function restartSuccessAutoplay(swiperInstance) {
      clearTimeout(successAutoplayRestartTimer);

      if (!swiperInstance.autoplay) {
        return;
      }

      swiperInstance.autoplay.stop();
      successAutoplayRestartTimer = window.setTimeout(function () {
        swiperInstance.autoplay.start();
      }, 0);
    }

    function goToSuccessSlide(swiperInstance, index) {
      var targetIndex = getValidSuccessSlideIndex(swiperInstance, index);

      if (targetIndex === null) {
        return;
      }

      stopSuccessAutoplay(swiperInstance);

      if (swiperInstance.animating) {
        queuedSuccessSlideIndex = targetIndex;
        setActiveSuccessTab(targetIndex);
        return;
      }

      queuedSuccessSlideIndex = null;
      setActiveSuccessTab(targetIndex);

      if (swiperInstance.activeIndex === targetIndex) {
        restartSuccessAutoplay(swiperInstance);
        return;
      }

      swiperInstance.slideTo(targetIndex);

      if (!swiperInstance.animating) {
        restartSuccessAutoplay(swiperInstance);
      }
    }

    function flushQueuedSuccessSlide(swiperInstance) {
      var targetIndex;

      if (queuedSuccessSlideIndex === null) {
        restartSuccessAutoplay(swiperInstance);
        return;
      }

      targetIndex = queuedSuccessSlideIndex;
      queuedSuccessSlideIndex = null;

      if (swiperInstance.activeIndex === targetIndex) {
        restartSuccessAutoplay(swiperInstance);
        return;
      }

      stopSuccessAutoplay(swiperInstance);
      setActiveSuccessTab(targetIndex);
      swiperInstance.slideTo(targetIndex);

      if (!swiperInstance.animating) {
        restartSuccessAutoplay(swiperInstance);
      }
    }

    var successSwiperOptions = {
      slidesPerView: 1,
      spaceBetween: 0,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      speed: 450,
      allowTouchMove: true,
      threshold: 50,
      grabCursor: true,
      autoplay: {
        delay: 10000,
        disableOnInteraction: true,
      },
      on: {
        init: function () {
          setActiveSuccessTab(this.activeIndex);
        },
        slideChange: function () {
          setActiveSuccessTab(this.activeIndex);
        },
        slideChangeTransitionEnd: function () {
          flushQueuedSuccessSlide(this);
        },
        touchStart: function () {
          stopSuccessAutoplay(this);
        },
        touchEnd: function () {
          if (!this.animating) {
            restartSuccessAutoplay(this);
          }
        },
      },
    };

    if (successPagination) {
      successSwiperOptions.pagination = {
        el: successPagination,
        clickable: true,
      };
    }

    var successResultsSwiper = new Swiper(successResultsEl, successSwiperOptions);

    if (successTabs.length) {
      successTabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          goToSuccessSlide(successResultsSwiper, tab.dataset.slide);
        });
      });
    }

    if (successPagination) {
      successPagination.addEventListener('click', function (event) {
        var bullet = event.target.closest('.swiper-pagination-bullet');
        var bullets;
        var bulletIndex;

        if (!bullet) {
          return;
        }

        bullets = Array.prototype.slice.call(successPagination.querySelectorAll('.swiper-pagination-bullet'));
        bulletIndex = bullets.indexOf(bullet);

        if (bulletIndex < 0) {
          return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();
        goToSuccessSlide(successResultsSwiper, bulletIndex);
      }, true);
    }
  }

  ready(function () {
    document.querySelectorAll('.mySwiper-success-results').forEach(initHomeResultsShowcase);
  });
})();
