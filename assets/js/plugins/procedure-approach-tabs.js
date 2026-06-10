(function () {
  'use strict';

  function ready(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
      return;
    }

    callback();
  }

  function initApproachTabs(section) {
    if (section.getAttribute('data-procedure-approach-tabs-ready') === 'true') {
      return;
    }

    var tabs = Array.prototype.slice.call(section.querySelectorAll('.procedure-approach-tags .procedure-approach-tag'));
    var cards = Array.prototype.slice.call(section.querySelectorAll('.procedure-approach-card[id]'));
    var nav = section.querySelector('.procedure-approach-tags');
    var showcase = section.querySelector('.procedure-approach-showcase');
    var mediaImage = section.querySelector('.procedure-approach-media img');
    var defaultMedia = mediaImage ? {
      src: mediaImage.getAttribute('src') || '',
      srcset: mediaImage.getAttribute('srcset') || '',
      alt: mediaImage.getAttribute('alt') || '',
    } : null;
    var mobileQuery = window.matchMedia('(max-width: 767px)');
    var activeTab = tabs.find(function (tab) {
      return tab.classList.contains('is-active');
    }) || tabs[0];
    var activeId = getTargetId(activeTab) || (cards[0] ? cards[0].id : '');

    if (!tabs.length || !cards.length || !nav || !showcase) {
      return;
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function (event) {
        var targetId = getTargetId(tab);

        if (!targetId) {
          return;
        }

        event.preventDefault();
        setActive(targetId);
      });
    });

    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener('change', syncMode);
    } else if (mobileQuery.addListener) {
      mobileQuery.addListener(syncMode);
    }

    section.setAttribute('data-procedure-approach-tabs-ready', 'true');
    setActive(activeId);
    syncMode();

    function setActive(targetId) {
      var nextTab;
      var activeCard = null;

      if (!targetId) {
        return;
      }

      nextTab = tabs.find(function (tab) {
        return getTargetId(tab) === targetId;
      });

      if (!nextTab) {
        return;
      }

      activeId = targetId;

      tabs.forEach(function (tab) {
        var isActive = getTargetId(tab) === activeId;

        tab.classList.toggle('is-active', isActive);

        if (isActive) {
          tab.setAttribute('aria-current', 'true');
        } else {
          tab.removeAttribute('aria-current');
        }
      });

      cards.forEach(function (card) {
        var isActive = card.id === activeId;

        card.classList.toggle('is-active', isActive);
        card.setAttribute('aria-hidden', isActive ? 'false' : 'true');

        if (isActive) {
          activeCard = card;
        }
      });

      syncApproachMedia(activeCard);
      syncShowcasePosition(nextTab);
    }

    function syncApproachMedia(card) {
      var nextSrc;
      var nextSrcset;
      var nextAlt;

      if (!mediaImage || !defaultMedia || !card) {
        return;
      }

      nextSrc = card.getAttribute('data-procedure-image') || defaultMedia.src;
      nextSrcset = card.getAttribute('data-procedure-image-srcset') || defaultMedia.srcset;
      nextAlt = card.getAttribute('data-procedure-image-alt') || defaultMedia.alt;

      if (nextSrc && mediaImage.getAttribute('src') !== nextSrc) {
        mediaImage.setAttribute('src', nextSrc);
      }

      if (nextSrcset) {
        mediaImage.setAttribute('srcset', nextSrcset);
      } else {
        mediaImage.removeAttribute('srcset');
      }

      mediaImage.setAttribute('alt', nextAlt);
    }

    function syncMode() {
      section.classList.toggle('is-approach-tabs-ready', mobileQuery.matches);
      setActive(activeId);
    }

    function syncShowcasePosition(tab) {
      if (!tab) {
        return;
      }

      if (mobileQuery.matches) {
        tab.insertAdjacentElement('afterend', showcase);
        return;
      }

      if (showcase.nextElementSibling !== nav) {
        nav.parentNode.insertBefore(showcase, nav);
      }
    }
  }

  function getTargetId(tab) {
    var href = tab ? tab.getAttribute('href') : '';

    if (!href || href.charAt(0) !== '#') {
      return '';
    }

    return href.slice(1);
  }

  ready(function () {
    document.querySelectorAll('.procedure-approach-section').forEach(initApproachTabs);
  });
})();
