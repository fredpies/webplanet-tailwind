import {setActiveItem} from "./helpers";

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
        setActiveItem($collection, idx)
    });
}

function switchMenuVisible(ev) {
    ev.stopPropagation();
    $menu.toggleClass('menu-visible');
}

export function initSwitchActiveMenuItem() {

    $menuItems = $('.menu li');
    $indicators = $('.indicator');

    $collections = [...$collections, $menuItems, $indicators];
    $collections.forEach($collection => $collection.on('click', switchActiveState))

}

export function initToggleMobileMenu() {
    $menu = $('.menu');
    $hamburgerButton = $('.hamburger');
    $hamburgerButton.on('click', switchMenuVisible);
    $(window).on('click', () => {
        $menu.removeClass('menu-visible');
    });
}

export function initScrollToSection() {

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

export function initScrollSpy() {

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
