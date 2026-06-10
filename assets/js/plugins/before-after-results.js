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
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function initAll() {
    document.querySelectorAll('[data-module-action~="before-after-results"]').forEach(function (section) {
      initBeforeAfter(section);
    });
  }

  function initBeforeAfter(section) {
    if (section.getAttribute('data-before-after-results-ready') === 'true') {
      return;
    }

    var dataSrc = section.getAttribute('data-results-src');
    var filtersNode = section.querySelector('[data-before-after-results-filters]');
    var casesNode = section.querySelector('[data-before-after-results-cases]');
    var emptyNode = section.querySelector('[data-before-after-results-empty]');
    var loadingNode = section.querySelector('[data-before-after-results-loading]');
    var lightbox = section.querySelector('[data-before-after-results-lightbox]');
    var activeFilter = 'all';
    var cases = [];
    var currentCase = null;
    var currentIndex = 0;
    var touchStartX = 0;

    if (!dataSrc || !filtersNode || !casesNode || !lightbox) {
      return;
    }

    section.setAttribute('data-before-after-results-ready', 'true');

    fetch(dataSrc)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('No se pudo cargar la data de resultados.');
        }

        return response.json();
      })
      .then(function (data) {
        cases = Array.isArray(data.cases) ? data.cases.filter(hasImages) : [];
        renderFilters(Array.isArray(data.filters) ? data.filters : []);
        renderCases();
        bindSectionEvents();
      })
      .catch(function () {
        if (loadingNode) {
          loadingNode.hidden = true;
        }

        showEmpty('No pudimos cargar los casos en este momento.');
      });

    function hasImages(item) {
      return item && Array.isArray(item.images) && item.images.length > 0;
    }

    function renderFilters(filters) {
      var safeFilters = filters.length ? filters : [
        { id: 'all', label: 'Todos' },
        { id: 'facial', label: 'Cirug\u00eda facial' },
        { id: 'corporal', label: 'Cirug\u00eda corporal' },
        { id: 'mamaria', label: 'Cirug\u00eda mamaria' }
      ];

      filtersNode.innerHTML = safeFilters.map(function (filter) {
        var isActive = filter.id === activeFilter;

        return '<button class="before-after-results__filter' + (isActive ? ' is-active' : '') + '" type="button" data-before-after-results-filter="' + escapeHtml(filter.id) + '" aria-pressed="' + (isActive ? 'true' : 'false') + '">' + escapeHtml(filter.label) + '</button>';
      }).join('');
    }

    function renderCases() {
      var filteredCases = activeFilter === 'all'
        ? cases
        : cases.filter(function (item) {
          return item.category === activeFilter;
        });

      if (loadingNode) {
        loadingNode.hidden = true;
      }

      if (!filteredCases.length) {
        casesNode.innerHTML = '';
        showEmpty('Pronto agregaremos casos para esta categor\u00eda.');
        return;
      }

      if (emptyNode) {
        emptyNode.hidden = true;
      }

      casesNode.innerHTML = filteredCases.map(renderCase).join('');
      bindCaseEvents();
    }

    function showEmpty(message) {
      if (!emptyNode) {
        return;
      }

      emptyNode.textContent = message;
      emptyNode.hidden = false;
    }

    function renderCase(item) {
      var images = item.images || [];
      var mainImage = images[0] || {};
      var sliderImages = images.slice(1);
      var hasSlider = sliderImages.length > 0;
      var title = item.title || item.procedure || 'Caso cl\u00ednico';
      var views = item.views || sliderImages.map(function (image) {
        return image.label;
      }).filter(Boolean).join(' \u00b7 ');

      return [
        '<article class="before-after-results__case" data-before-after-results-case="' + escapeHtml(item.id) + '">',
        '<div class="before-after-results__case-grid">',
        '<button class="before-after-results__main-image" type="button" data-before-after-results-open="' + escapeHtml(item.id) + '" data-before-after-results-index="0" aria-label="Abrir imagen principal de ' + escapeHtml(title) + '">',
        '<img src="' + escapeHtml(mainImage.src) + '" alt="' + escapeHtml(mainImage.alt) + '" loading="lazy">',
        '<span>' + escapeHtml(mainImage.label || 'Antes / Despu\u00e9s') + '</span>',
        '</button>',
        '<div class="before-after-results__content">',
        '<p class="before-after-results__eyebrow">' + escapeHtml(item.procedure || 'Resultado cl\u00ednico') + '</p>',
        '<h2 class="before-after-results__case-title">' + escapeHtml(title) + '</h2>',
        '<p class="before-after-results__objective">' + escapeHtml(item.objective || '') + '</p>',
        views ? '<p class="before-after-results__views"><span>Vistas disponibles:</span> ' + escapeHtml(views) + '</p>' : '',
        hasSlider ? renderSlider(item, sliderImages) : '<p class="before-after-results__no-slider">Este caso tiene una vista disponible.</p>',
        '<div class="before-after-results__actions">',
        '<button class="rts-btn btn-primary before-after-results__case-button" type="button" data-before-after-results-open="' + escapeHtml(item.id) + '" data-before-after-results-index="0">Ver caso completo</button>',
        '<a class="rts-btn btn-primary before-after-results__case-button before-after-results__case-button--outline" href="' + escapeHtml(item.ctaHref || 'contacto.html') + '">Agendar evaluaci\u00f3n</a>',
        '</div>',
        '</div>',
        '</div>',
        '</article>'
      ].join('');
    }

    function renderSlider(item, sliderImages) {
      return [
        '<div class="before-after-results__slider-shell" data-before-after-results-slider>',
        '<button class="before-after-results__slider-control before-after-results__slider-control--prev" type="button" data-before-after-results-slide="-1" aria-label="Ver im\u00e1genes anteriores">&lsaquo;</button>',
        '<div class="before-after-results__slider" data-before-after-results-track>',
        sliderImages.map(function (image, index) {
          var imageIndex = index + 1;

          return [
            '<button class="before-after-results__thumb" type="button" data-before-after-results-open="' + escapeHtml(item.id) + '" data-before-after-results-index="' + imageIndex + '" aria-label="Abrir ' + escapeHtml(image.label || 'imagen') + ' de ' + escapeHtml(item.title || item.procedure || 'caso cl\u00ednico') + '">',
            '<img src="' + escapeHtml(image.src) + '" alt="' + escapeHtml(image.alt) + '" loading="lazy">',
            '<span>' + escapeHtml(image.label || 'Vista ' + imageIndex) + '</span>',
            '</button>'
          ].join('');
        }).join(''),
        '</div>',
        '<button class="before-after-results__slider-control before-after-results__slider-control--next" type="button" data-before-after-results-slide="1" aria-label="Ver im\u00e1genes siguientes">&rsaquo;</button>',
        '</div>'
      ].join('');
    }

    function bindSectionEvents() {
      filtersNode.addEventListener('click', function (event) {
        var button = event.target.closest('[data-before-after-results-filter]');

        if (!button) {
          return;
        }

        activeFilter = button.getAttribute('data-before-after-results-filter') || 'all';

        Array.prototype.forEach.call(filtersNode.querySelectorAll('[data-before-after-results-filter]'), function (item) {
          var isActive = item === button;
          item.classList.toggle('is-active', isActive);
          item.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        renderCases();
      });

      lightbox.addEventListener('click', function (event) {
        if (event.target.matches('[data-before-after-results-lightbox-close]') || event.target === lightbox) {
          closeLightbox();
          return;
        }

        var navButton = event.target.closest('[data-before-after-results-lightbox-nav]');

        if (navButton) {
          moveLightbox(parseInt(navButton.getAttribute('data-before-after-results-lightbox-nav'), 10));
        }

        var thumbButton = event.target.closest('[data-before-after-results-lightbox-thumb]');

        if (thumbButton) {
          currentIndex = parseInt(thumbButton.getAttribute('data-before-after-results-lightbox-thumb'), 10) || 0;
          renderLightbox();
        }
      });

      lightbox.addEventListener('touchstart', function (event) {
        touchStartX = event.changedTouches[0].screenX;
      }, { passive: true });

      lightbox.addEventListener('touchend', function (event) {
        var touchEndX = event.changedTouches[0].screenX;
        var delta = touchEndX - touchStartX;

        if (Math.abs(delta) < 40) {
          return;
        }

        moveLightbox(delta > 0 ? -1 : 1);
      }, { passive: true });

      document.addEventListener('keydown', function (event) {
        if (!lightbox.classList.contains('is-open')) {
          return;
        }

        if (event.key === 'Escape') {
          closeLightbox();
        } else if (event.key === 'ArrowLeft') {
          moveLightbox(-1);
        } else if (event.key === 'ArrowRight') {
          moveLightbox(1);
        }
      });
    }

    function bindCaseEvents() {
      casesNode.querySelectorAll('[data-before-after-results-open]').forEach(function (button) {
        button.addEventListener('click', function () {
          var caseId = button.getAttribute('data-before-after-results-open');
          var imageIndex = parseInt(button.getAttribute('data-before-after-results-index'), 10) || 0;

          openLightbox(caseId, imageIndex);
        });
      });

      casesNode.querySelectorAll('[data-before-after-results-slider]').forEach(function (slider) {
        var track = slider.querySelector('[data-before-after-results-track]');

        slider.querySelectorAll('[data-before-after-results-slide]').forEach(function (button) {
          button.addEventListener('click', function () {
            if (!track) {
              return;
            }

            var direction = parseInt(button.getAttribute('data-before-after-results-slide'), 10) || 1;
            track.scrollBy({
              left: direction * Math.max(220, track.clientWidth * .8),
              behavior: 'smooth'
            });
          });
        });
      });
    }

    function openLightbox(caseId, index) {
      currentCase = cases.find(function (item) {
        return item.id === caseId;
      });

      if (!currentCase || !currentCase.images || !currentCase.images.length) {
        return;
      }

      currentIndex = Math.max(0, Math.min(index, currentCase.images.length - 1));
      renderLightbox();
      lightbox.hidden = false;
      lightbox.classList.add('is-open');
      document.body.classList.add('is-before-after-results-open');

      var closeButton = lightbox.querySelector('[data-before-after-results-lightbox-close]');

      if (closeButton) {
        closeButton.focus();
      }
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.hidden = true;
      document.body.classList.remove('is-before-after-results-open');
      currentCase = null;
      currentIndex = 0;
    }

    function moveLightbox(direction) {
      if (!currentCase || !currentCase.images || currentCase.images.length < 2) {
        return;
      }

      currentIndex = (currentIndex + direction + currentCase.images.length) % currentCase.images.length;
      renderLightbox();
    }

    function renderLightbox() {
      if (!currentCase || !currentCase.images || !currentCase.images[currentIndex]) {
        return;
      }

      var image = currentCase.images[currentIndex];
      var imageNode = lightbox.querySelector('[data-before-after-results-lightbox-image]');
      var titleNode = lightbox.querySelector('[data-before-after-results-lightbox-title]');
      var countNode = lightbox.querySelector('[data-before-after-results-lightbox-count]');
      var thumbsNode = lightbox.querySelector('[data-before-after-results-lightbox-thumbs]');

      if (imageNode) {
        imageNode.src = image.src;
        imageNode.alt = image.alt || currentCase.title || '';
      }

      if (titleNode) {
        titleNode.textContent = currentCase.title || currentCase.procedure || '';
      }

      if (countNode) {
        countNode.textContent = 'Imagen ' + (currentIndex + 1) + ' de ' + currentCase.images.length;
      }

      if (thumbsNode) {
        thumbsNode.innerHTML = currentCase.images.map(function (item, index) {
          return [
            '<button class="before-after-results-lightbox__thumb' + (index === currentIndex ? ' is-active' : '') + '" type="button" data-before-after-results-lightbox-thumb="' + index + '" aria-label="Ver imagen ' + (index + 1) + '">',
            '<img src="' + escapeHtml(item.src) + '" alt="' + escapeHtml(item.alt) + '" loading="lazy">',
            '</button>'
          ].join('');
        }).join('');
      }
    }
  }

  ready(initAll);
})();
