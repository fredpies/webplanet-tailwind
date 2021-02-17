export function initCarousel() {

    let $panels = $('.panels');
    $panels.removeClass('owl-carousel');
    $panels.trigger('destroy.owl.carousel');


    if (window.innerWidth >= 768 && window.innerWidth < 1200) {
        $panels.addClass('owl-carousel');

        $('.owl-carousel').owlCarousel({

            items: 2,

            autoplay: true,
            loop: true,
            slideBy: 1,
            dots: false,

            autoplayHoverPause: true,
            mouseDrag: false,
            touchDrag: true,
            pullDrag: true,
            margin: 25,
            autoplayTimeout: 8000,

        });
    }

}