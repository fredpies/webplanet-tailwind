/** Copyright by WebPlanet Design 2020 All rights reserved. */
(function () {
    'use strict';

    function setActiveItem($collection, idx) {
      $collection.removeClass('active');
      $collection.eq(idx).addClass('active');
    }
    function scrollToSection(sectionId) {
      var targetScroll = $(sectionId);
      var topPosition;
      if (sectionId === '#top') topPosition = 0;else {
        topPosition = parseInt($(targetScroll).offset().top) - $('header').height();
      }
      $(window).scrollTo(topPosition, {
        duration: 500
      });
    }

    var $menu, $menuItems, $hamburgerButton, $indicators;

    function scrollToSectionHandler() {
      var $targetMenuItem = $(this);
      if ($targetMenuItem.hasClass('active')) scrollToSection($(this).data('target'));
    }

    function switchMenuItemActiveState() {
      var menuItemIndex = $menuItems.index(this);
      setActiveItem($menuItems, menuItemIndex);
      setActiveItem($indicators, menuItemIndex);
    }

    function switchIndicatorActiveState() {
      var indicatorIndex = $indicators.index(this);
      setActiveItem($menuItems, indicatorIndex);
      setActiveItem($indicators, indicatorIndex);
    }

    function switchMenuVisible(ev) {
      ev.stopPropagation();
      $menu.toggleClass('menu-visible');
    }

    function initSwitchActiveMenuItem() {
      $menuItems = $('.menu li');
      $menuItems.on('click', switchMenuItemActiveState);
    }
    function initSwitchIndicator() {
      $indicators = $('.indicator');
      $indicators.on('click', switchIndicatorActiveState);
    }
    function initToggleMobileMenu() {
      $menu = $('.menu');
      $hamburgerButton = $('.hamburger');
      $hamburgerButton.on('click', switchMenuVisible);
      $(window).on('click', function () {
        $menu.removeClass('menu-visible');
      });
    }
    function initScrollToSection() {
      $menuItems.on('click', scrollToSectionHandler);
      $indicators.on('click', scrollToSectionHandler);
      $('.logo').on('click', function () {
        $menuItems.eq(0).trigger('click');
      });
      $('button#see-more').on('click', function () {
        $menuItems.eq(1).trigger('click');
      });
    }

    function showStars() {
      particlesJS("stars", {
        "particles": {
          "number": {
            "value": 355,
            "density": {
              "enable": true,
              "value_area": 789.1476416322727
            }
          },
          "color": {
            "value": "#7ED4F6"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#7ED4F6"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.48927153781200905,
            "random": false,
            "anim": {
              "enable": true,
              "speed": 0.2,
              "opacity_min": 0,
              "sync": false
            }
          },
          "size": {
            "value": 2,
            "random": true,
            "anim": {
              "enable": true,
              "speed": 2,
              "size_min": 0,
              "sync": false
            }
          },
          "line_linked": {
            "enable": false,
            "distance": 150,
            "color": "#7ED4F6",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 0.2,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "bubble"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 83.91608391608392,
              "size": 1,
              "duration": 3,
              "opacity": 1,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      });
    }

    function initCarousel() {
      var $panels = $('.panels');
      $panels.removeClass('owl-carousel');
      $panels.trigger('destroy.owl.carousel');

      if (window.innerWidth > 480 && window.innerHeight >= 360) {
        var smallScreen = window.innerWidth <= 1024;
        $panels.addClass('owl-carousel');
        var carousel = $('.owl-carousel').owlCarousel({
          items: 3,
          autoplay: smallScreen,
          loop: smallScreen,
          slideBy: 1,
          autoplayHoverPause: true,
          mouseDrag: false,
          touchDrag: smallScreen,
          pullDrag: smallScreen,
          margin: 25,
          autoplayTimeout: 8000,
          responsive: {
            480: {
              items: 2
            },
            768: {
              items: 2,
              margin: 40
            },
            1024: {
              items: 2,
              margin: 170
            },
            1280: {
              items: 3,
              margin: 25
            },
            1366: {
              items: 3,
              margin: 50
            },
            1680: {
              margin: 140
            },
            1920: {
              margin: 140
            }
          }
        });
      }
    }

    var form;
    var currency = 'PLN';
    var priceListFixed = {
      'development': [2500, 1000],
      'panel': [1000, 800],
      'redesign': [1000, 1000],
      'redesign-multi': [2000, 1000],
      'gallery': [300, 100],
      'gallery-multi': [500, 150],
      'contact-form': [400, 100],
      'contact-form-multi': [500, 150],
      'parallax': [300, 150],
      'parallax-multi': [300, 150],
      'blog-multi': [800, 400]
    };
    var priceListVariable = {
      pages: [[2500, 250], [1000, 250]],
      streaming: [[100, 50], [100, 50]],
      'streaming-multi': [[100, 50], [100, 50]],
      'animations': [[100, 80], [50, 50]],
      'animations-multi': [[100, 80], [50, 50]]
    };

    function getFixedPrice(type, currency) {
      if (currency === 'PLN') return priceListFixed[type][0];
      if (currency === 'EUR') return priceListFixed[type][1];
      return 0;
    }

    function getVariablePrice(type, currency, counterValue, inputElement, operator) {
      var currentValue = parseInt(inputElement.value);

      if (currency === 'PLN') {
        if (counterValue === 0) {
          currentValue = 0;
        }

        if (counterValue === 1) {
          if (operator === 'plus') currentValue += priceListVariable[type][0][0];
          if (operator === 'minus') currentValue -= priceListVariable[type][0][0];
        }

        if (counterValue > 1) {
          if (operator === 'plus') currentValue += priceListVariable[type][0][1];
          if (operator === 'minus') currentValue -= priceListVariable[type][0][1];
        }
      }

      if (currency === 'EUR') {
        if (counterValue === 0) {
          currentValue = 0;
        }

        if (counterValue === 1) {
          if (operator === 'plus') currentValue += priceListVariable[type][1][0];
          if (operator === 'minus') currentValue -= priceListVariable[type][1][0];
        }

        if (counterValue > 1) {
          if (operator === 'plus') currentValue += priceListVariable[type][1][1];
          if (operator === 'minus') currentValue -= priceListVariable[type][1][1];
        }
      }

      return currentValue;
    }

    function getSummary(colNumber) {
      var arr = Array.from($("tbody td:nth-of-type(".concat(colNumber, ") input.price")));
      var prices = [];

      if (arr.length > 0) {
        arr.forEach(function (input) {
          prices.push(parseInt(input.value));
        });
        return prices.reduce(function (a, price) {
          return a += price;
        });
      }

      return 0;
    }

    function updateSummary(colNumber, value) {
      var $summaryElement = $("tfoot td:nth-of-type(".concat(colNumber, ") .sum"));
      $summaryElement.text("".concat(currency, " ").concat(value));
    }

    function calculateFeature(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      var $target = $(this);
      var $parent = $target.parent();
      var $counterElement = $parent.next('td');
      var $input = $parent.find('input');
      var currentCounterValue = parseInt($counterElement.text());
      var operator = $target[0].className;

      if (operator === 'plus') {
        currentCounterValue++;
      }

      if (operator === 'minus') {
        currentCounterValue--;
      }

      if (currentCounterValue < 0) currentCounterValue = 0;
      $counterElement.text(currentCounterValue);
      $input[0].value = getVariablePrice($input[0].name, 'PLN', currentCounterValue, $input[0], operator);
      updateSummary(2, getSummary(2));
      updateSummary(4, getSummary(4));
    }

    function switchButton(ev) {
      ev.preventDefault();
      var $target = $(this);
      var $parent = $(this).parent();
      var $input = $($parent).find('input');
      var currentVisibleClassName = $($parent).find('button:visible')[0].className;
      if (currentVisibleClassName === "add") $input[0].value = getFixedPrice($input[0].name, 'PLN');else $input[0].value = 0;
      $($parent).find('button').removeClass('hidden');
      $target.addClass('hidden');
      updateSummary(2, getSummary(2));
      updateSummary(4, getSummary(4));
    }

    function initCalculator() {
      form = $('form')[0];
      $('button.add, button.remove').on('click', switchButton);
      $('button.plus, button.minus').on('click', calculateFeature);
    }

    $(window).on('load', function () {
      /* MAIN */
      initSwitchIndicator();
      initSwitchActiveMenuItem();
      initToggleMobileMenu();
      /* Aos */

      AOS.init({
        disableMutationObserver: true,
        once: true
      });
      /* Stars */

      if (window.innerWidth >= 768) showStars();
      /* Carousel */

      if (window.innerWidth > 480) initCarousel();
      $(window).on('resize', initCarousel);
      /* Scroll to section */

      initScrollToSection();
      /* Fadeout preloader */

      $('.preloader').fadeOut();
      /* Project calculator */

      initCalculator();
    });

}());
