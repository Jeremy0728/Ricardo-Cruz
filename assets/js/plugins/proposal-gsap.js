(function () {
  'use strict';

  if (!window.gsap) {
    return;
  }

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  function toArray(selector, scope) {
    return gsap.utils.toArray(selector, scope || document).filter(function (element) {
      return element && element.offsetParent !== null && !element.classList.contains('wow');
    });
  }

  function optionValue(options, key, fallback) {
    return options && Object.prototype.hasOwnProperty.call(options, key) ? options[key] : fallback;
  }

  function isNearInitialViewport(element) {
    var rect = element.getBoundingClientRect();
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    return rect.top < viewportHeight + 80 && rect.bottom > -80;
  }

  function hasAnimated(element) {
    if (!element || element.dataset.gsapAnimated === 'true') {
      return true;
    }

    element.dataset.gsapAnimated = 'true';
    return false;
  }

  function prepareReveal(selector, options) {
    toArray(selector).forEach(function (element) {
      if (element.dataset.gsapAnimated === 'true' || element.dataset.gsapPrepared === 'true') {
        return;
      }

      if (isNearInitialViewport(element)) {
        element.dataset.gsapAnimated = 'true';
        return;
      }

      gsap.set(element, {
        autoAlpha: 0,
        y: optionValue(options, 'y', 28),
        x: optionValue(options, 'x', 0),
        scale: optionValue(options, 'scale', 1)
      });
      element.dataset.gsapPrepared = 'true';
    });
  }

  function revealElements(elements, options) {
    var targets = gsap.utils.toArray(elements).filter(function (element) {
      return element && element.offsetParent !== null && !element.classList.contains('wow') && !hasAnimated(element);
    });

    if (!targets.length) {
      return;
    }

    options = options || {};

    targets.forEach(function (target) {
      if (target.dataset.gsapPrepared === 'true') {
        return;
      }

      gsap.set(target, {
        autoAlpha: 0,
        y: optionValue(options, 'y', 28),
        x: optionValue(options, 'x', 0),
        scale: optionValue(options, 'scale', 1)
      });
    });

    gsap.to(targets, {
        autoAlpha: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: optionValue(options, 'duration', 0.75),
        stagger: optionValue(options, 'stagger', 0.08),
        ease: optionValue(options, 'ease', 'power3.out'),
        overwrite: true,
        clearProps: optionValue(options, 'clearProps', 'transform,opacity,visibility')
      });
  }

  function revealOnScroll(selector, options) {
    if (!ScrollTrigger) {
      revealElements(toArray(selector), options);
      return;
    }

    prepareReveal(selector, options || {});

    ScrollTrigger.batch(selector, {
      start: options && options.start ? options.start : 'top 88%',
      once: true,
      interval: 0.08,
      batchMax: options && options.batchMax ? options.batchMax : 4,
      onEnter: function (batch) {
        revealElements(batch, options);
      }
    });
  }

  function getHeadingParts(heading) {
    return toArray(':scope > .pre-title, :scope > .pre, :scope > .section-kicker, :scope > .blog-kicker, :scope > .title, :scope > h1, :scope > h2, :scope > h3, :scope > .subtitle, :scope > .disc, :scope > p, :scope > .results-category-list', heading);
  }

  function prepareElements(elements, options) {
    gsap.utils.toArray(elements).forEach(function (element) {
      if (!element || element.offsetParent === null || element.classList.contains('wow')) {
        return;
      }

      if (element.dataset.gsapAnimated === 'true' || element.dataset.gsapPrepared === 'true') {
        return;
      }

      if (isNearInitialViewport(element)) {
        element.dataset.gsapAnimated = 'true';
        return;
      }

      gsap.set(element, {
        autoAlpha: 0,
        y: optionValue(options, 'y', 28),
        x: optionValue(options, 'x', 0),
        scale: optionValue(options, 'scale', 1)
      });
      element.dataset.gsapPrepared = 'true';
    });
  }

  function revealSectionHeading(heading) {
    var parts = getHeadingParts(heading);

    if (parts.length && hasAnimated(heading)) {
      return;
    }

    revealElements(parts.length ? parts : [heading], {
      y: 24,
      duration: 0.75,
      stagger: 0.07
    });
  }

  function revealHeadings() {
    if (!ScrollTrigger) {
      toArray([
        '.title-area-left',
        '.title-wrapper-left',
        '.success-gallery-heading',
        '.blog-list-heading',
        '.procedure-section-heading',
        '.procedure-transformations-heading',
        '.before-after-results__header',
        '.contact-title-area'
      ].join(', ')).forEach(revealSectionHeading);
      return;
    }

    toArray([
      '.title-area-left',
      '.title-wrapper-left',
      '.success-gallery-heading',
      '.blog-list-heading',
      '.procedure-section-heading',
      '.procedure-transformations-heading',
      '.before-after-results__header',
      '.contact-title-area'
    ].join(', ')).forEach(function (heading) {
      prepareElements(getHeadingParts(heading), {
        y: 24
      });

      ScrollTrigger.create({
        trigger: heading,
        start: 'top 84%',
        once: true,
        onEnter: function () {
          revealSectionHeading(heading);
        }
      });
    });
  }

  function revealHero() {
    var heroContent = document.querySelector('.mySwiper-banner-eight .swiper-slide-active .procedure-hero-content') ||
      document.querySelector('.mySwiper-banner-eight .swiper-slide-active .inner-content') ||
      document.querySelector('.procedure-hero-content') ||
      document.querySelector('.rts-breadcrumb-area .breadcrumb-inner, .rts-breadcrumb-area .container');

    if (!heroContent) {
      return;
    }

    var items = toArray(':scope > *', heroContent);
    var media = document.querySelector('.mySwiper-banner-eight .swiper-slide-active .procedure-hero, .mySwiper-banner-eight .swiper-slide-active .rts-banner-area-sergery');

    if (media && !hasAnimated(media)) {
      gsap.fromTo(media,
        { scale: 1.035 },
        { scale: 1, duration: 1.35, ease: 'power2.out', clearProps: 'transform' }
      );
    }

    revealElements(items, {
      y: 26,
      duration: 0.85,
      stagger: 0.1
    });
  }

  function revealDoctorBlocks() {
    toArray('.rts-appoinment-area').forEach(function (section) {
      if (!ScrollTrigger) {
        revealElements(toArray('.rts-apponemnt-area-5-content', section), { x: -28, y: 0 });
        revealElements(toArray('.doctor-image-rotator', section), { y: 0, scale: 0.96, duration: 0.9 });
        return;
      }

      ScrollTrigger.create({
        trigger: section,
        start: 'top 76%',
        once: true,
        onEnter: function () {
          revealElements(toArray('.rts-apponemnt-area-5-content', section), { x: -28, y: 0, duration: 0.85 });
          revealElements(toArray('.doctor-image-rotator', section), { y: 0, scale: 0.96, duration: 0.95 });
        }
      });
    });
  }

  function revealProcedurePages() {
    revealOnScroll('.procedure-section-copy, .procedure-intro-media', {
      start: 'top 82%',
      y: 34,
      batchMax: 2
    });

    revealOnScroll('.procedure-results-swiper, .procedure-faq-accordion .accordion-item', {
      start: 'top 86%',
      y: 30,
      batchMax: 3
    });
  }

  function revealCards() {
    revealOnScroll([
      '.rts-single-blog',
      '.single-blog-list-area',
      '.blog-detail-related-card',
      '.single-testimonials-style',
      '.single-brand',
      '.doctor-profile-section',
      '.doctor-profile-stat',
      '.contact-page-list li'
    ].join(', '), {
      start: 'top 88%',
      y: 30,
      duration: 0.72,
      stagger: 0.08,
      batchMax: 4
    });

    revealOnScroll('.rts-success-gallery-area .success-results-swiper:not(.wow)', {
      start: 'top 86%',
      y: 20,
      duration: 0.7,
      batchMax: 1
    });
  }

  function revealContactBlocks() {
    revealOnScroll('.contact-page-info, .contact-page-form-box, .contact-page-image, .contact-form-image:not(.wow), .contact-form-content:not(.wow)', {
      start: 'top 84%',
      y: 34,
      batchMax: 2
    });
  }

  function revealDynamicResults() {
    var container = document.querySelector('.before-after-results__cases');

    if (!container) {
      return;
    }

    function revealCases() {
      revealElements(toArray('.before-after-results__case', container), {
        y: 34,
        duration: 0.8,
        stagger: 0.09
      });

      if (ScrollTrigger) {
        ScrollTrigger.refresh();
      }
    }

    revealCases();

    if ('MutationObserver' in window) {
      new MutationObserver(function () {
        window.requestAnimationFrame(revealCases);
      }).observe(container, { childList: true });
    }
  }

  function refreshAfterAssets() {
    if (!ScrollTrigger) {
      return;
    }

    window.addEventListener('load', function () {
      ScrollTrigger.refresh();
    });
  }

  if (reduceMotion) {
    gsap.set('[data-gsap-animated]', { clearProps: 'all' });
    return;
  }

  document.addEventListener('DOMContentLoaded', function () {
    revealHero();
    revealHeadings();
    revealDoctorBlocks();
    revealProcedurePages();
    revealCards();
    revealContactBlocks();
    revealDynamicResults();
    refreshAfterAssets();
  });
}());
