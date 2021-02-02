/** Copyright by WebPlanet Design 2020 All rights reserved. */
(function () {
  'use strict';

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function setActiveItem($collection, idx) {
    $collection.removeClass('active');
    $collection.eq(idx).addClass('active');
  }

  var $menu, $menuItems, $hamburgerButton, $indicators;
  var $collections = [];
  var spyHeader, spyIndicators;
  var $targetMenuItem;

  function scrollToSection(sectionId) {
    var targetScroll = $(sectionId);
    var topPosition;
    topPosition = parseInt($(targetScroll).offset().top) - $('header').height();
    $(window).scrollTo(topPosition, {
      duration: 500,
      onAfter: function onAfter() {
        initScrollSpy();
      }
    });
  }

  function scrollToSectionHandler() {
    $targetMenuItem = $(this);
    var targetAnchor = $targetMenuItem.find('a').attr('href');
    spyHeader.destroy();
    spyIndicators.destroy();
    scrollToSection(targetAnchor);
  }

  function switchActiveState(ev, idx) {
    if (ev && idx === undefined) {
      ev.preventDefault();
      var $targetCollection = $(this).parents('ul').eq(0);
      idx = $targetCollection.find('li').index(this);
    }

    $collections.forEach(function ($collection) {
      return setActiveItem($collection, idx);
    });
  }

  function switchMenuVisible(ev) {
    ev.stopPropagation();
    $menu.toggleClass('menu-visible');
  }

  function initSwitchActiveMenuItem() {
    $menuItems = $('.menu li');
    $indicators = $('.indicator');
    $collections = [].concat(_toConsumableArray($collections), [$menuItems, $indicators]);
    $collections.forEach(function ($collection) {
      return $collection.on('click', switchActiveState);
    });
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
    initScrollSpy();
    $menuItems.on('click', scrollToSectionHandler);
    $indicators.on('click', scrollToSectionHandler);
    $('.logo').on('click', function () {
      $menuItems.eq(0).trigger('click');
    });
    $('button#see-more').on('click', function () {
      $menuItems.eq(1).trigger('click');
    });
  }
  function initScrollSpy() {
    // Get the header height
    var headerHeight = $('header').height();
    spyHeader = new Gumshoe('.menu a', {
      offset: headerHeight
    });
    spyIndicators = new Gumshoe('.indicators a', {
      offset: headerHeight
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
        dots: false,
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
          1440: {
            items: 3,
            margin: 75
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
  var $input, $counterElement;
  var $overlayContents, $sendOverlay;
  var $calculatorContainer, $calculatorInfoText;
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
  var $sendForm, validator;

  function getFixedPrice(type, currency) {
    if (currency === 'PLN') return priceListFixed[type][0];
    if (currency === 'EUR') return priceListFixed[type][1];
    return 0;
  }

  function getVariablePrice(type, currency, inputElement, currentValue, operator) {
    var counterValue = parseInt($counterElement.text());
    currentValue = parseInt(currentValue);

    if (currency === 'PLN') {
      if (counterValue === 0) {
        currentValue = 0;
      }

      if (counterValue === 1) {
        if (operator === 'plus') currentValue += priceListVariable[type][0][0];
        if (operator === 'minus') currentValue -= priceListVariable[type][0][1];
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
        if (operator === 'minus') currentValue -= priceListVariable[type][1][1];
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
    $counterElement = $parent.next('td');
    $input = $parent.find('input');
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
    $input[0].value = getVariablePrice($input[0].name, 'PLN', $input[0], $input[0].value, operator);
    updateSummary(2, getSummary(2));
    updateSummary(4, getSummary(4));
  }

  function sendQuote(ev) {
    ev.preventDefault();
    ev.stopPropagation(); // Show send overlay

    $sendOverlay = $('section#calculator .overlay-container.send');
    $overlayContents = $('section#calculator .overlay-contents');
    $sendOverlay.fadeIn(200);
    $overlayContents.fadeIn({
      duration: 150,
      start: function start() {
        this.style.display = 'flex';
      },
      complete: function complete() {
        document.body.style.overflowY = 'hidden'; // Init validator

        validator = $sendForm.validate({
          messages: {
            email: {
              required: 'Adres e-mail nie może być pusty.',
              email: 'Wpisany adres e-mail jest niepoprawny.'
            }
          }
        });
      }
    });
    $('button.send.send-quote').on('click', function () {
      $sendForm.validate();

      if ($sendForm.valid()) {
        //TODO: Sending emails must be implemented (email API on the server)
        $overlayContents.fadeOut(150);
        $sendOverlay.fadeOut({
          duration: 200,
          complete: function complete() {
            $(document.body).removeAttr('style');
            resetForm();
          }
        });
      }
    });
  }

  function switchButton(ev) {
    ev.preventDefault();
    var $target = $(this);
    var $parent = $(this).parent();
    var $input = $($parent).find('input');
    var currentVisibleClassName = $($parent).find('button:visible')[0].className; // Blog feature requires admin panel

    var $panelAddButton = $('#js-panel-add-button');
    var $blogRemoveButton = $('#js-blog-remove-button');
    var isBlogAddButton = $target.attr('id') === 'js-blog-add-button';
    var isPanelRemoveButton = $target.attr('id') === 'js-panel-remove-button';
    if (isBlogAddButton) $panelAddButton.trigger('click');

    if (isPanelRemoveButton && !$blogRemoveButton.is(':hidden')) {
      $blogRemoveButton.trigger('click');
    } //


    if (currentVisibleClassName === "add") $input[0].value = getFixedPrice($input[0].name, 'PLN');else $input[0].value = 0;
    $($parent).find('button').removeClass('hidden');
    $target.addClass('hidden');
    updateSummary(2, getSummary(2));
    updateSummary(4, getSummary(4));
  }

  function resetForm() {
    $sendForm[0].reset();

    if (validator) {
      validator.resetForm();
      validator.destroy();
    }
  }
  function initCalculator() {
    $sendForm = $('#send-form');
    $calculatorContainer = $('.calculator-container');
    $calculatorInfoText = $('.calculator-info-text');
    resetForm();

    if (window.innerWidth < 1024) {
      $calculatorContainer.hide();
      $calculatorInfoText.hide();
      $calculatorContainer.attr('id', '');
      $('button.add, button.remove').off('click', switchButton);
      $('button.plus, button.minus').off('click', calculateFeature);
      $('button.send').off('click', sendQuote);
    }

    if (window.innerWidth >= 1024) {
      $calculatorContainer = $('section:hidden');
      console.log($calculatorContainer);
      $calculatorContainer.attr('id', 'calculator');
      $calculatorContainer.show();
      form = $('form')[0];
      $('button.add, button.remove').on('click', switchButton);
      $('button.plus, button.minus').on('click', calculateFeature);
      $('button.send').on('click', sendQuote); // Tooltips

      $('.tooltip').tooltipster({
        theme: 'tooltipster-light',
        side: 'top',
        delay: 0,
        timer: 0
      });
      $('.tooltip-left').tooltipster({
        theme: 'tooltipster-light',
        side: ['right'],
        delay: 0,
        timer: 0,
        maxWidth: 300,
        contentCloning: true,
        contentAsHTML: true
      });
    }
  }

  var $overlay, $overlayContents$1;
  var $sendForm$1;

  function closeOverlay(ev) {
    ev.stopPropagation();

    if (ev.target.classList.contains('close')) {
      $overlayContents$1.fadeOut(150);
      $overlay.fadeOut({
        duration: 200,
        complete: function complete() {
          $(document.body).removeAttr('style');
          resetForm();
        }
      });
    }
  }

  function initOverlay() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.overlay-container';
    var contentsSelector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '.overlay-contents';
    $sendForm$1 = $('#send-form');
    $overlay = $(selector);
    $overlayContents$1 = $(contentsSelector);
    $overlayContents$1.on('click', closeOverlay);
  }

  $(window).on('load', function () {
    /* MAIN */
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
    /* Overlay */

    initOverlay('section#calculator .overlay-container.send', 'section#calculator .overlay-contents'); // Remove horizontal scroll block if switching to small devices

    $(window).on('resize', function () {
      if (window.innerWidth < 1024) {
        $('body').css('overflow', '');
        $('.overlay-container').hide();
        $('.overlay-contents').hide();
      }
    });
    /* Project calculator */

    initCalculator();
    $(window).on('resize', initCalculator);
  });

}());
