(function () {
  'use strict';

  function ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
      return;
    }

    callback();
  }

  function initProcessFaqImages(area) {
    var triggers = Array.prototype.slice.call(area.querySelectorAll('[data-process-image]'));
    var activeTrigger = triggers.find(function (trigger) {
      return trigger.getAttribute('aria-expanded') === 'true';
    }) || triggers[0];

    if (!triggers.length) {
      return;
    }

    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        setProcessImage(area, trigger);
      });
    });

    setProcessImage(area, activeTrigger);
  }

  function setProcessImage(area, trigger) {
    var image = trigger ? trigger.getAttribute('data-process-image') : '';

    if (!image) {
      return;
    }

    area.style.setProperty('--process-faq-bg', "url('" + image + "')");
    area.style.backgroundImage = "url('" + image + "')";
  }

  ready(function () {
    document.querySelectorAll('.process-faq-area').forEach(initProcessFaqImages);
  });
})();
