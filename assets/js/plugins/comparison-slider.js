(function ($) {
  'use strict';

  function hasAction(element, action) {
    return ($(element).attr('data-module-action') || '').split(/\s+/).indexOf(action) !== -1;
  }

  function syncResizeImageWidth(container) {
    var sliderHeight = container.height();
    var imageStyles = {
      width: container.width() + 'px',
    };

    if (sliderHeight > 0) {
      imageStyles.height = sliderHeight + 'px';
    }

    container.find('.resize img').css(imageStyles);
  }

  function getPageX(e) {
    if (e.pageX) {
      return e.pageX;
    }

    if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length) {
      return e.originalEvent.touches[0].pageX;
    }

    if (e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
      return e.originalEvent.changedTouches[0].pageX;
    }

    return 0;
  }

  function applyComparisonPosition(dragElement, resizeElement, container, pageX) {
    var containerOffset = container.offset().left;
    var containerWidth = container.outerWidth();
    var minX = containerOffset + 10;
    var maxX = containerOffset + containerWidth - 10;
    var clampedX = Math.max(minX, Math.min(pageX, maxX));
    var widthValue = (clampedX - containerOffset) * 100 / containerWidth + '%';

    dragElement.css('left', widthValue);
    resizeElement.css('width', widthValue);
  }

  function hoverCompare(dragElement, resizeElement, container) {
    var supportsHover = !window.matchMedia || window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (!supportsHover) {
      return;
    }

    container.on('mousemove.comparisonSliderHover', function (e) {
      if (dragElement.hasClass('draggable')) {
        return;
      }

      applyComparisonPosition(dragElement, resizeElement, container, getPageX(e));
    });
  }

  function drags(dragElement, resizeElement, container) {
    var touched = false;

    window.addEventListener('touchstart', function () {
      touched = true;
    });
    window.addEventListener('touchend', function () {
      touched = false;
    });

    dragElement.on('mousedown touchstart', function (e) {
      var startX;
      var dragWidth;
      var posX;
      var containerOffset;
      var containerWidth;
      var minLeft;
      var maxLeft;

      dragElement.addClass('draggable');
      resizeElement.addClass('resizable');

      startX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
      dragWidth = dragElement.outerWidth();
      posX = dragElement.offset().left + dragWidth - startX;
      containerOffset = container.offset().left;
      containerWidth = container.outerWidth();
      minLeft = containerOffset + 10;
      maxLeft = containerOffset + containerWidth - dragWidth - 10;

      dragElement.parents().on('mousemove touchmove', function (moveEvent) {
        var moveX;
        var leftValue;
        var widthValue;

        if (touched === false) {
          moveEvent.preventDefault();
        }

        moveX = moveEvent.pageX ? moveEvent.pageX : moveEvent.originalEvent.touches[0].pageX;
        leftValue = moveX + posX - dragWidth;

        if (leftValue < minLeft) {
          leftValue = minLeft;
        } else if (leftValue > maxLeft) {
          leftValue = maxLeft;
        }

        widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + '%';

        dragElement.css('left', widthValue).on('mouseup touchend touchcancel', function () {
          $(this).removeClass('draggable');
          resizeElement.removeClass('resizable');
        });

        resizeElement.css('width', widthValue);
      }).on('mouseup touchend touchcancel', function () {
        dragElement.removeClass('draggable');
        resizeElement.removeClass('resizable');
      });
    }).on('mouseup touchend touchcancel', function () {
      dragElement.removeClass('draggable');
      resizeElement.removeClass('resizable');
    });
  }

  function initComparisonSlider(slider) {
    var dragElement;
    var resizeElement;

    if (slider.attr('data-comparison-slider-ready') === 'true') {
      return;
    }

    dragElement = slider.find('.divider');
    resizeElement = slider.find('.resize');

    syncResizeImageWidth(slider);
    drags(dragElement, resizeElement, slider);

    if (hasAction(slider, 'before-after-hover')) {
      hoverCompare(dragElement, resizeElement, slider);
    }

    slider.attr('data-comparison-slider-ready', 'true');
  }

  $(document).ready(function () {
    $('.comparison-slider').each(function () {
      initComparisonSlider($(this));
    });

    $(window).on('resize.comparisonSlider', function () {
      $('.comparison-slider[data-comparison-slider-ready="true"]').each(function () {
        syncResizeImageWidth($(this));
      });
    });
  });
})(jQuery);
