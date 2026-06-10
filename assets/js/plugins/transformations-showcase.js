(function () {
  'use strict';

  function ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
      return;
    }

    callback();
  }

  function initAll() {
    document.querySelectorAll('[data-module-action~="transformations-showcase"]').forEach(function (section) {
      initTransformationsShowcase(section);
    });
  }

  function initTransformationsShowcase(section) {
    if (section.getAttribute('data-procedure-transformation-ready') === 'true') {
      return;
    }

    var showcase = section.querySelector('[data-procedure-transformations-showcase]');
    var cards = Array.prototype.slice.call(section.querySelectorAll('[data-procedure-transformation-card]'));
    var progress = section.querySelector('[data-procedure-transformation-progress]');
    var summary = section.querySelector('[data-procedure-transformation-summary]') || section.querySelector('.procedure-transformations-heading p');
    var tabletQuery = window.matchMedia('(max-width: 1024px)');
    var activeCard = cards.find(function (card) {
      return card.classList.contains('is-active');
    }) || cards[0];

    if (!showcase || !cards.length) {
      return;
    }

    cards.forEach(function (card) {
      card.addEventListener('click', function (event) {
        if (event.target.closest('a') || tabletQuery.matches) {
          return;
        }

        setActive(card);
      });
    });

    showcase.addEventListener('scroll', updateProgress, { passive: true });

    if (tabletQuery.addEventListener) {
      tabletQuery.addEventListener('change', syncMode);
    } else if (tabletQuery.addListener) {
      tabletQuery.addListener(syncMode);
    }

    section.setAttribute('data-procedure-transformation-ready', 'true');
    syncMode();
    updateProgress();

    function setActive(card) {
      if (!card) {
        return;
      }

      activeCard = card;

      cards.forEach(function (item) {
        var isActive = item === card;
        var toggle = item.querySelector('[data-procedure-transformation-toggle]');

        item.classList.toggle('is-active', isActive);

        if (toggle) {
          toggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        }
      });

      updateSummary(card);
    }

    function syncMode() {
      if (tabletQuery.matches) {
        section.classList.add('is-all-active');
        cards.forEach(function (item) {
          var toggle = item.querySelector('[data-procedure-transformation-toggle]');

          item.classList.add('is-active');

          if (toggle) {
            toggle.setAttribute('aria-expanded', 'true');
          }
        });
        updateSummary(activeCard || cards[0]);
        updateProgress();
        return;
      }

      section.classList.remove('is-all-active');
      setActive(activeCard || cards[0]);
    }

    function updateSummary(card) {
      var copy = card ? card.querySelector('.procedure-transformation-copy') : null;
      var text = card ? card.getAttribute('data-procedure-transformation-summary') : '';

      if (!summary) {
        return;
      }

      summary.textContent = text || (copy ? copy.textContent.trim() : summary.textContent);
    }

    function updateProgress() {
      if (!progress) {
        return;
      }

      var maxScroll = showcase.scrollWidth - showcase.clientWidth;

      if (maxScroll <= 0) {
        progress.style.transform = 'scaleX(1)';
        return;
      }

      var ratio = Math.max(.08, Math.min(1, showcase.scrollLeft / maxScroll));
      progress.style.transform = 'scaleX(' + ratio + ')';
    }
  }

  ready(initAll);
})();
