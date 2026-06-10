(function () {
  'use strict';

  function ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
      return;
    }

    callback();
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function normalizeAssetUrl(url, baseUrl) {
    if (!url) {
      return '#';
    }

    if (/^(?:[a-z]+:|\/|#)/i.test(url)) {
      return url;
    }

    return baseUrl + url.replace(/^\.?\//, '');
  }

  function hasAction(element, action) {
    return (element.getAttribute('data-module-action') || '').split(/\s+/).indexOf(action) !== -1;
  }

  function initServiceWide(serviceWideEl) {
    if (!serviceWideEl || serviceWideEl.swiper) {
      return;
    }

    if (serviceWideEl.getAttribute('data-scroll-mode') === 'continuous') {
      initContinuousServiceWide(serviceWideEl);
      return;
    }

    if (typeof Swiper === 'undefined') {
      return;
    }

    var serviceWideSection = serviceWideEl.closest('.service-wide-showcase');
    var serviceWideNextEl = serviceWideSection ? serviceWideSection.querySelector('.swiper-button-next') : null;
    var serviceWidePrevEl = serviceWideSection ? serviceWideSection.querySelector('.swiper-button-prev') : null;

    new Swiper(serviceWideEl, {
      slidesPerView: 'auto',
      spaceBetween: 40,
      loop: true,
      loopAdditionalSlides: 6,
      speed: 650,
      grabCursor: true,
      simulateTouch: true,
      allowTouchMove: true,
      followFinger: true,
      threshold: 3,
      touchAngle: 35,
      touchEventsTarget: 'container',
      touchStartPreventDefault: false,
      watchSlidesProgress: true,
      observer: true,
      observeParents: true,
      preventClicks: true,
      preventClicksPropagation: true,
      autoplay: {
        delay: 4200,
        disableOnInteraction: false,
      },
      navigation: serviceWideNextEl && serviceWidePrevEl ? {
        nextEl: serviceWideNextEl,
        prevEl: serviceWidePrevEl,
      } : undefined,
      breakpoints: {
        0: {
          spaceBetween: 18,
          centeredSlides: true,
        },
        576: {
          spaceBetween: 24,
          centeredSlides: false,
        },
        992: {
          spaceBetween: 40,
          centeredSlides: false,
        },
      },
    });
  }

  function initContinuousServiceWide(serviceWideEl) {
    if (serviceWideEl.getAttribute('data-cases-marquee-ready') === 'true') {
      return;
    }

    var wrapper = serviceWideEl.querySelector('.swiper-wrapper');

    if (!wrapper || !wrapper.children.length) {
      return;
    }

    Array.prototype.slice.call(wrapper.children).forEach(function (slide) {
      var clonedSlide = slide.cloneNode(true);

      clonedSlide.setAttribute('aria-hidden', 'true');
      clonedSlide.querySelectorAll('a, button, input, textarea, select, [tabindex]').forEach(function (focusableEl) {
        focusableEl.setAttribute('tabindex', '-1');
      });
      wrapper.appendChild(clonedSlide);
    });

    serviceWideEl.setAttribute('data-cases-marquee-ready', 'true');
    serviceWideEl.classList.add('is-cases-marquee-ready');
  }

  function renderCaseSlides(serviceWideEl) {
    var casesSrc = serviceWideEl.getAttribute('data-cases-src');
    var wrapper = serviceWideEl.querySelector('.swiper-wrapper');

    if (!casesSrc || !wrapper || !window.fetch) {
      return Promise.resolve();
    }

    return fetch(casesSrc, { cache: 'no-cache' })
      .then(function (response) {
        if (!response.ok) {
          throw new Error('No se pudo cargar casos: ' + casesSrc);
        }

        return response.json();
      })
      .then(function (data) {
        var cases = data && Array.isArray(data.casos) ? data.casos : [];

        if (serviceWideEl.getAttribute('data-cases-visible-only') === 'true') {
          cases = cases.filter(function (caseItem) {
            return caseItem.visibleEnVentana === true;
          });
        }

        if (!cases.length) {
          return;
        }

        wrapper.innerHTML = cases.map(function (caseItem) {
          return buildCaseSlide(serviceWideEl, caseItem);
        }).join('');
      });
  }

  function buildCaseSlide(serviceWideEl, caseItem) {
    var baseUrl = serviceWideEl.getAttribute('data-cases-base') || '';
    var kicker = serviceWideEl.getAttribute('data-case-kicker') || 'Caso';
    var bannerUrl = normalizeAssetUrl(caseItem.banner, baseUrl);
    var detailUrl = normalizeAssetUrl(caseItem.detalleUrl || caseItem.banner, baseUrl);
    var alt = caseItem.alt || 'Resultado de ' + kicker.toLowerCase();

    return '' +
      '<div class="swiper-slide">' +
        '<div class="single-dental-service-areas">' +
          '<a href="' + escapeHtml(detailUrl) + '" class="thumbnail">' +
            '<img src="' + escapeHtml(bannerUrl) + '" alt="' + escapeHtml(alt) + '">' +
          '</a>' +
          '<div class="inner-content">' +
            '<a href="' + escapeHtml(detailUrl) + '">' +
              '<span class="service-card-kicker">' + escapeHtml(kicker) + '</span>' +
            '</a>' +
            '<span class="service-card-action">Ver caso</span>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function initCaseShowcases() {
    document.querySelectorAll('[data-module-action~="service-wide-cases"]').forEach(function (serviceWideEl) {
      renderCaseSlides(serviceWideEl).then(function () {
        initServiceWide(serviceWideEl);
      }).catch(function () {
        initServiceWide(serviceWideEl);
      });
    });
  }

  function initStaticShowcases() {
    document.querySelectorAll('.mySwiper-service-wide').forEach(function (serviceWideEl) {
      if (hasAction(serviceWideEl, 'service-wide-cases')) {
        return;
      }

      initServiceWide(serviceWideEl);
    });
  }

  ready(function () {
    initCaseShowcases();
    initStaticShowcases();
  });
})();
