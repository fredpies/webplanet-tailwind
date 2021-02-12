export function initCarousel() {

    let $panels = $('.panels');
    $panels.removeClass('owl-carousel');
    $panels.trigger('destroy.owl.carousel');

    if (window.innerWidth < 1280 && window.innerHeight >= 360 ) {

        let smallScreen = window.innerWidth > 480 && window.innerWidth < 1024;
        $panels.addClass('owl-carousel');

        if (smallScreen) {
            let carousel = $('.owl-carousel').owlCarousel({


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
                    // 480: {
                    //     items: 2
                    // },

                    768: {
                        items: 2,
                        margin: 40
                    },

                    1024: {
                        items: 3,
                        margin: 20
                    },

                }
            });
        }

    }
}