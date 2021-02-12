import {initSwitchActiveMenuItem, initToggleMobileMenu, initScrollToSection, initScrollSpy} from "./lib/header";
import {showStars} from "./lib/stars";
import {initCarousel} from "./lib/carousel";
import {initCalculator} from "./lib/calculator";
import {initGallery} from "./lib/gallery";

// import { initOverlay } from "./lib/overlay";

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
    if (window.innerWidth > 550 && window.innerWidth < 1024) initCarousel();
    $(window).on('resize', initCarousel);

    /* Scroll to section */
    initScrollToSection();

    /* 3d gallery */
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
