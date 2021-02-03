/** Copyright by WebPlanet Design 2020 All rights reserved. */
(function () {
    'use strict';

    function setActiveItem($collection, idx) {
      $collection.removeClass('active');
      $collection.eq(idx).addClass('active');
    }

    let $menu, $menuItems, $hamburgerButton, $indicators;
    let $collections = [];
    let spyHeader, spyIndicators;
    let $targetMenuItem;

    function scrollToSection(sectionId) {
      let targetScroll = $(sectionId);
      let topPosition;
      topPosition = parseInt($(targetScroll).offset().top) - $('header').height();

      if (spyHeader && spyIndicators) {
        spyHeader.destroy();
        spyIndicators.destroy();
        spyHeader = undefined;
        spyIndicators = undefined;
      }

      $(window).scrollTo(topPosition, {
        duration: 500,
        onAfter: () => {
          initScrollSpy();
        }
      });
    }

    function scrollToSectionHandler() {
      $targetMenuItem = $(this);
      let targetAnchor = $targetMenuItem.find('a').attr('href');
      scrollToSection(targetAnchor);
    }

    function switchActiveState(ev, idx) {
      if (ev && idx === undefined) {
        ev.preventDefault();
        let $targetCollection = $(this).parents('ul').eq(0);
        idx = $targetCollection.find('li').index(this);
      }

      $collections.forEach($collection => {
        setActiveItem($collection, idx);
      });
    }

    function switchMenuVisible(ev) {
      ev.stopPropagation();
      $menu.toggleClass('menu-visible');
    }

    function initSwitchActiveMenuItem() {
      $menuItems = $('.menu li');
      $indicators = $('.indicator');
      $collections = [...$collections, $menuItems, $indicators];
      $collections.forEach($collection => $collection.on('click', switchActiveState));
    }
    function initToggleMobileMenu() {
      $menu = $('.menu');
      $hamburgerButton = $('.hamburger');
      $hamburgerButton.on('click', switchMenuVisible);
      $(window).on('click', () => {
        $menu.removeClass('menu-visible');
      });
    }
    function initScrollToSection() {
      initScrollSpy();
      $menuItems.on('click', scrollToSectionHandler);
      $indicators.on('click', scrollToSectionHandler);
      $('.logo').on('click', () => {
        $menuItems.eq(0).trigger('click');
      });
      $('button#see-more').on('click', () => {
        $menuItems.eq(1).trigger('click');
      });
    }
    function initScrollSpy() {
      // Get the header height
      let headerHeight = $('header').height();
      spyHeader = new Gumshoe('.menu a', {
        offset: headerHeight + 10,
        // Event support
        events: true
      });
      spyIndicators = new Gumshoe('.indicators a', {
        offset: headerHeight + 10,
        // Event support
        events: true
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
      let $panels = $('.panels');
      $panels.removeClass('owl-carousel');
      $panels.trigger('destroy.owl.carousel');

      if (window.innerWidth < 1280 && window.innerHeight >= 360) {
        let smallScreen = window.innerWidth > 480 && window.innerWidth < 1024;
        $panels.addClass('owl-carousel');

        if (smallScreen) {
          $('.owl-carousel').owlCarousel({
            items: 1,
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
                items: 3,
                margin: 20
              }
            }
          });
        }
      }
    }

    let currency = 'PLN';
    let $input, $counterElement;
    let $overlayContents, $sendOverlay;
    let $calculatorContainer;
    let priceListFixed = {
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
    let priceListVariable = {
      pages: [[2500, 250], [1000, 250]],
      streaming: [[100, 50], [100, 50]],
      'streaming-multi': [[100, 50], [100, 50]],
      'animations': [[100, 80], [50, 50]],
      'animations-multi': [[100, 80], [50, 50]]
    };
    let $sendForm, validator;

    function getFixedPrice(type, currency) {
      if (currency === 'PLN') return priceListFixed[type][0];
      if (currency === 'EUR') return priceListFixed[type][1];
      return 0;
    }

    function getVariablePrice(type, currency, inputElement, currentValue, operator) {
      let counterValue = parseInt($counterElement.text());
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
      let arr = Array.from($(`tbody td:nth-of-type(${colNumber}) input.price`));
      let prices = [];

      if (arr.length > 0) {
        arr.forEach(input => {
          prices.push(parseInt(input.value));
        });
        return prices.reduce((a, price) => {
          return a += price;
        });
      }

      return 0;
    }

    function updateSummary(colNumber, value) {
      let $summaryElement = $(`tfoot td:nth-of-type(${colNumber}) .sum`);
      $summaryElement.text(`${currency} ${value}`);
    }

    function calculateFeature(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      let $target = $(this);
      let $parent = $target.parent();
      $counterElement = $parent.next('td');
      $input = $parent.find('input');
      let currentCounterValue = parseInt($counterElement.text());
      let operator = $target[0].className;

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
        start: function () {
          this.style.display = 'flex';
        },
        complete: function () {
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
      $('button.send.send-quote').on('click', () => {
        $sendForm.validate();

        if ($sendForm.valid()) {
          //TODO: Sending emails must be implemented (email API on the server)
          $overlayContents.fadeOut(150);
          $sendOverlay.fadeOut({
            duration: 200,
            complete: function () {
              $(document.body).removeAttr('style');
              resetForm();
            }
          });
        }
      });
    }

    function switchButton(ev) {
      ev.preventDefault();
      let $target = $(this);
      let $parent = $(this).parent();
      let $input = $($parent).find('input');
      let currentVisibleClassName = $($parent).find('button:visible')[0].className; // Blog feature requires admin panel

      let $panelAddButton = $('#js-panel-add-button');
      let $blogRemoveButton = $('#js-blog-remove-button');
      let isBlogAddButton = $target.attr('id') === 'js-blog-add-button';
      let isPanelRemoveButton = $target.attr('id') === 'js-panel-remove-button';
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
      resetForm();

      if (window.innerWidth < 1024) {
        $calculatorContainer.hide();
        $calculatorContainer.attr('id', '');
        $('.calculator-info-text').hide();
        $('button.add, button.remove').off('click', switchButton);
        $('button.plus, button.minus').off('click', calculateFeature);
        $('button.send').off('click', sendQuote);
      }

      if (window.innerWidth >= 1024) {
        $('#calculator').attr('id', 'calculator');
        $calculatorContainer.show();
        $('.calculator-info-text').show();
      }

      if (window.innerHeight < 1024) $('#calculator').css('height', 'auto');
      $('form')[0];
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
      }); // }
    }

    function initGallery() {
      let gallery = $("#gallery");
      gallery.Cloud9Carousel({
        buttonLeft: $("#buttons > .left"),
        buttonRight: $("#buttons > .right"),
        autoPlay: true,
        bringToFront: true,
        farScale: 0.55,
        yRadius: 200,
        xRadius: 480,
        itemClass: 'gallery-item',
        frontItemClass: 'gallery-front-item',
        onLoaded: () => {
          gallery.css('display', 'none');
          gallery.css('visibility', 'visible');
          gallery.fadeIn(300);
        }
      });
    }

    $(window).on('load', () => {
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

      if (window.innerWidth > 480 && window.innerWidth < 1024) initCarousel();
      $(window).on('resize', initCarousel);
      /* Scroll to section */

      initScrollToSection();
      initGallery();
      /* Fadeout preloader */

      $('.preloader').fadeOut();
      /* Overlay */
      // initOverlay('section#calculator .overlay-container.send', 'section#calculator .overlay-contents');
      // Remove horizontal scroll block if switching to small devices

      $(window).on('resize', () => {
        initCalculator();

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
