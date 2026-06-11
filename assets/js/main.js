/*=== Javascript function indexing hear===========

1.counterUp ----------(Its use for counting number)
2.stickyHeader -------(header class sticky)
3.wowActive ----------( Waw js plugins activation)
4.swiperJs -----------(All swiper in this website hear)
5.salActive ----------(Sal animation for card and all text)
6.textChanger --------(Text flip for banner section)
7.timeLine -----------(History Time line)
8.datePicker ---------(On click date calender)
9.timePicker ---------(On click time picker)
10.timeLineStory -----(History page time line)
11.vedioActivation----(Vedio activation)
12.searchOption ------(search open)
13.cartBarshow -------(Cart sode bar)
14.sideMenu ----------(Open side menu for desktop)
15.Back to top -------(back to top)
16.filterPrice -------(Price filtering)

==================================================*/

(function ($) {
  'use strict';

  var rtsJs = {
    m: function (e) {
      rtsJs.d();
      rtsJs.methods();
    },
    d: function (e) {
      this._window = $(window),
        this._document = $(document),
        this._body = $('body'),
        this._html = $('html')
    },
    methods: function (e) {
      rtsJs.metismenu();
      rtsJs.swiperActive();
      rtsJs.wowActive();
      rtsJs.stickyHeader();
      rtsJs.backToTopInit();
      rtsJs.sideMenu();
      rtsJs.niceSelect();
      rtsJs.vedioActivation();
      rtsJs.menuCurrentLink();
      rtsJs.preloader();
      rtsJs.datePicker();
    },


    metismenu: function () {
      $('#mobile-menu-active').metisMenu();
    },

    swiperActive: function () {
      $(document).ready(function () {
        var swiper = new Swiper(".swiper-container-h1", {
          spaceBetween: 30,
          slidesPerView: 3,
          loop: true,
          speed: 1000,
          // autoplay: {
          //   delay: 3000,
          //   disableOnInteraction: false,
          // },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          breakpoints: {
            1500: {
              slidesPerView: 3,
            },
            1199: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 2,
            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });

      $(document).ready(function () {
        var swiper = new Swiper(".team-swiper-container-h1", {
          spaceBetween: 30,
          slidesPerView: 4,
          loop: true,
          speed: 1000,
          // autoplay: {
          //   delay: 3000,
          //   disableOnInteraction: false,
          // },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          breakpoints: {
            1500: {
              slidesPerView: 4,
            },
            1199: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 2,
            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });

      $(document).ready(function () {
        var swiper = new Swiper(".swiper-container-h1-team", {
          spaceBetween: 30,
          slidesPerView: 4,
          loop: true,
          speed: 1000,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          breakpoints: {
            1500: {
              slidesPerView: 3,
            },
            1199: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 3,
            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });
      $(document).ready(function () {
        var swiper = new Swiper(".swiper-container-h1-team-8", {
          spaceBetween: 150,
          slidesPerView: 4,
          loop: true,
          speed: 1000,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          breakpoints: {
            1500: {
              slidesPerView: 3,
            },
            1199: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 3,
            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });

      $(document).ready(function () {

        var swiper = new Swiper(".swiper-container-h3", {
          spaceBetween: 30,
          slidesPerView: 4,
          loop: true,
          speed: 1000,
          autoplay: {
            delay: 2000,
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          breakpoints: {
            1500: {
              slidesPerView: 3,
            },
            1199: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 2,
            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });

      $(document).ready(function () {
        var swiper = new Swiper(".swiper-container-h1.v3", {
          spaceBetween: 30,
          slidesPerView: 4,
          loop: true,
          speed: 1000,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
        });
        $('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
          // Update Swiper when the tab with swiper is shown
          swiper.update();
        });
      });


      $(document).ready(function () {
        var swiper = new Swiper(".swiper-container-h2", {
          spaceBetween: 30,
          slidesPerView: 4,
          loop: true,
          speed: 1000,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          breakpoints: {
            1500: {
              slidesPerView: 3,
            },
            1199: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 2,
            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 1,
            }
          },
        });
      });

      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-banner-2", {
          spaceBetween: 0,
          slidesPerView: 1,
          loop: true,
          speed: 2000,
          effect: "fade",
          autoplay: {
            delay: 4000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
      $(document).ready(function () {
        function updateBannerEightTitle(swiperInstance, sliderElement) {
          var titles = sliderElement.querySelectorAll(".banner-eight-title-rotator .title");
          if (!titles.length) {
            return;
          }

          titles.forEach(function (title, index) {
            title.classList.toggle("is-active", index === swiperInstance.realIndex);
          });
        }

        document.querySelectorAll(".mySwiper-banner-eight").forEach(function (sliderElement) {
          var wrapper = sliderElement.querySelector(".swiper-wrapper");
          var slideCount = wrapper ? wrapper.children.length : 0;
          var nextEl = sliderElement.querySelector(".swiper-button-next");
          var prevEl = sliderElement.querySelector(".swiper-button-prev");

          new Swiper(sliderElement, {
            spaceBetween: 0,
            slidesPerView: 1,
            loop: slideCount > 2,
            speed: 1000,
            effect: "fade",
            autoplay: slideCount > 1 ? {
              delay: 10000,
              disableOnInteraction: false,
            } : false,
            navigation: nextEl && prevEl ? {
              nextEl: nextEl,
              prevEl: prevEl,
            } : false,
            on: {
              init: function () {
                updateBannerEightTitle(this, sliderElement);
              },
              slideChange: function () {
                updateBannerEightTitle(this, sliderElement);
              },
            },
          });
        });
      });

      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-brand", {
          spaceBetween: 65,
          slidesPerView: 5,
          loop: true,
          speed: 2000,
          autoplay: {
            delay: 4000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          breakpoints: {
            1500: {
              slidesPerView: 4,
            },
            1199: {
              slidesPerView: 4,
            },
            991: {
              slidesPerView: 4,
            },
            767: {
              slidesPerView: 3,
            },
            575: {
              slidesPerView: 3,
            },
            0: {
              slidesPerView: 2,
            }
          },
        });
      });

      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-service-dental", {
          spaceBetween: 30,
          slidesPerView: 4,
          loop: true,
          speed: 2000,
          autoplay: {
            delay: 4000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          breakpoints: {
            1500: {
              slidesPerView: 4,
            },
            1199: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 2,
            },
            767: {
              slidesPerView: 2,
            },
            575: {
              slidesPerView: 1,
            },
            0: {
              slidesPerView: 2,
            }
          },
        });
      });

      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-banner-seven", {
          spaceBetween: 0,
          slidesPerView: 1,
          loop: true,
          speed: 2000,
          effect: 'fade',
          autoplay: {
            delay: 4000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });

      $(document).ready(function () {
        var swiper = new Swiper(".mySwiper-portfolio", {
          spaceBetween: 0,
          slidesPerView: 1,
          loop: true,
          speed: 1000,
          effect: 'fade',
          autoplay: {
            delay: 1500,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
      });
      $(document).ready(function () {
        $('.rts-testimonials-area').each(function () {
          var testimonialsArea = this;
          var testimonialsSwiper = testimonialsArea.querySelector('.mySwiper-testimonials-2');
          var testimonialsPagination = testimonialsArea.querySelector('.mySwiper-testimonials-2 .swiper-pagination');
          var testimonialsNext = testimonialsArea.querySelector('.title-between-area .swiper-button-next');
          var testimonialsPrev = testimonialsArea.querySelector('.title-between-area .swiper-button-prev');

          if (!testimonialsSwiper) {
            return;
          }

          var swiper = new Swiper(testimonialsSwiper, {
            spaceBetween: 0,
            slidesPerView: 1,
            loop: true,
            speed: 500,
            // autoplay: {
            //   delay: 2000,
            // },
            pagination: testimonialsPagination ? {
              el: testimonialsPagination,
              clickable: true
            } : false,
            navigation: testimonialsNext && testimonialsPrev ? {
              nextEl: testimonialsNext,
              prevEl: testimonialsPrev,
            } : false,
          });
        });
      });
    },

    wowActive: function () {
      new WOW().init();
    },

    stickyHeader: function (e) {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
          $('.header--sticky').addClass('sticky')
        } else {
          $('.header--sticky').removeClass('sticky')
        }
      })
    },

    backToTopInit: function () {
      $(document).ready(function () {
        "use strict";

        var progressPath = document.querySelector('.progress-wrap path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function () {
          var scroll = $(window).scrollTop();
          var height = $(document).height() - $(window).height();
          var progress = pathLength - (scroll * pathLength / height);
          progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 550;
        jQuery(window).on('scroll', function () {
          if (jQuery(this).scrollTop() > offset) {
            jQuery('.progress-wrap').addClass('active-progress');
          } else {
            jQuery('.progress-wrap').removeClass('active-progress');
          }
        });
        jQuery('.progress-wrap').on('click', function (event) {
          event.preventDefault();
          jQuery('html, body').animate({ scrollTop: 0 }, duration);
          return false;
        })


      });
    },

    sideMenu: function () {

      // collups menu side right
      $(document).on('click', '#menu-btn', function () {
        $("#side-bar").addClass("show");
        $("#anywhere-home").addClass("bgshow");
      });
      $(document).on('click', '.close-icon-menu', function () {
        $("#side-bar").removeClass("show");
        $("#anywhere-home").removeClass("bgshow");
      });
      $(document).on('click', '#anywhere-home', function () {
        $("#side-bar").removeClass("show");
        $("#anywhere-home").removeClass("bgshow");
      });
      $(document).on('click', '.onepage .mainmenu li a', function () {
        $("#side-bar").removeClass("show");
        $("#anywhere-home").removeClass("bgshow");
      });
    },


    niceSelect: function () {

      (function ($) {

        $.fn.niceSelect = function (method) {

          // Methods
          if (typeof method == 'string') {
            if (method == 'update') {
              this.each(function () {
                var $select = $(this);
                var $dropdown = $(this).next('.nice-select');
                var open = $dropdown.hasClass('open');

                if ($dropdown.length) {
                  $dropdown.remove();
                  create_nice_select($select);

                  if (open) {
                    $select.next().trigger('click');
                  }
                }
              });
            } else if (method == 'destroy') {
              this.each(function () {
                var $select = $(this);
                var $dropdown = $(this).next('.nice-select');

                if ($dropdown.length) {
                  $dropdown.remove();
                  $select.css('display', '');
                }
              });
              if ($('.nice-select').length == 0) {
                $(document).off('.nice_select');
              }
            } else {
              console.log('Method "' + method + '" does not exist.')
            }
            return this;
          }

          // Hide native select
          this.hide();

          // Create custom markup
          this.each(function () {
            var $select = $(this);

            if (!$select.next().hasClass('nice-select')) {
              create_nice_select($select);
            }
          });

          function create_nice_select($select) {
            $select.after($('<div></div>')
              .addClass('nice-select')
              .addClass($select.attr('class') || '')
              .addClass($select.attr('disabled') ? 'disabled' : '')
              .attr('tabindex', $select.attr('disabled') ? null : '0')
              .html('<span class="current"></span><ul class="list"></ul>')
            );

            var $dropdown = $select.next();
            var $options = $select.find('option');
            var $selected = $select.find('option:selected');

            $dropdown.find('.current').html($selected.data('display') || $selected.text());

            $options.each(function (i) {
              var $option = $(this);
              var display = $option.data('display');

              $dropdown.find('ul').append($('<li></li>')
                .attr('data-value', $option.val())
                .attr('data-display', (display || null))
                .addClass('option' +
                  ($option.is(':selected') ? ' selected' : '') +
                  ($option.is(':disabled') ? ' disabled' : ''))
                .html($option.text())
              );
            });
          }

          /* Event listeners */

          // Unbind existing events in case that the plugin has been initialized before
          $(document).off('.nice_select');

          // Open/close
          $(document).on('click.nice_select', '.nice-select', function (event) {
            var $dropdown = $(this);

            $('.nice-select').not($dropdown).removeClass('open');
            $dropdown.toggleClass('open');

            if ($dropdown.hasClass('open')) {
              $dropdown.find('.option');
              $dropdown.find('.focus').removeClass('focus');
              $dropdown.find('.selected').addClass('focus');
            } else {
              $dropdown.focus();
            }
          });

          // Close when clicking outside
          $(document).on('click.nice_select', function (event) {
            if ($(event.target).closest('.nice-select').length === 0) {
              $('.nice-select').removeClass('open').find('.option');
            }
          });

          // Option click
          $(document).on('click.nice_select', '.nice-select .option:not(.disabled)', function (event) {
            var $option = $(this);
            var $dropdown = $option.closest('.nice-select');

            $dropdown.find('.selected').removeClass('selected');
            $option.addClass('selected');

            var text = $option.data('display') || $option.text();
            $dropdown.find('.current').text(text);

            $dropdown.prev('select').val($option.data('value')).trigger('change');
          });

          // Keyboard events
          $(document).on('keydown.nice_select', '.nice-select', function (event) {
            var $dropdown = $(this);
            var $focused_option = $($dropdown.find('.focus') || $dropdown.find('.list .option.selected'));

            // Space or Enter
            if (event.keyCode == 32 || event.keyCode == 13) {
              if ($dropdown.hasClass('open')) {
                $focused_option.trigger('click');
              } else {
                $dropdown.trigger('click');
              }
              return false;
              // Down
            } else if (event.keyCode == 40) {
              if (!$dropdown.hasClass('open')) {
                $dropdown.trigger('click');
              } else {
                var $next = $focused_option.nextAll('.option:not(.disabled)').first();
                if ($next.length > 0) {
                  $dropdown.find('.focus').removeClass('focus');
                  $next.addClass('focus');
                }
              }
              return false;
              // Up
            } else if (event.keyCode == 38) {
              if (!$dropdown.hasClass('open')) {
                $dropdown.trigger('click');
              } else {
                var $prev = $focused_option.prevAll('.option:not(.disabled)').first();
                if ($prev.length > 0) {
                  $dropdown.find('.focus').removeClass('focus');
                  $prev.addClass('focus');
                }
              }
              return false;
              // Esc
            } else if (event.keyCode == 27) {
              if ($dropdown.hasClass('open')) {
                $dropdown.trigger('click');
              }
              // Tab
            } else if (event.keyCode == 9) {
              if ($dropdown.hasClass('open')) {
                return false;
              }
            }
          });

          // Detect CSS pointer-events support, for IE <= 10. From Modernizr.
          var style = document.createElement('a').style;
          style.cssText = 'pointer-events:auto';
          if (style.pointerEvents !== 'auto') {
            $('html').addClass('no-csspointerevents');
          }

          return this;

        };

      }(jQuery));

      /* Initialize */

      $(document).ready(function () {
        $('select').niceSelect();
      });

    },

    vedioActivation: function () {
      $(document).ready(function () {
        $('.popup-youtube, .popup-video').magnificPopup({
          type: 'iframe',
          mainClass: 'mfp-fade',
          removalDelay: 160,
          preloader: false,
          fixedContentPos: false
        });
      });
    },

    menuCurrentLink: function () {
      var currentPage = location.pathname.split("/"),
        current = currentPage[currentPage.length - 1];
      $('.parent-nav li > a').each(function () {
        var $this = $(this);
        if ($this.attr('href') === current) {
          $this.addClass('active');
          $this.parents('.has-dropdown').addClass('menu-item-open')
        }
      });
    },


    preloader: function () {
      window.addEventListener('load', function () {
        document.querySelector('body').classList.add("loaded")
      });
    },

    datePicker: function () {
      $(function () {
        $("#datepicker").datepicker({
          dateFormat: "dd-mm-yy"
          , duration: "fast"
        });
      });
    },


  }

  rtsJs.m();
})(jQuery, window)
