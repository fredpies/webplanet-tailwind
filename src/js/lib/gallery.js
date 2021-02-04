let $gallery;
let galleryContents;

function initReflections() {
    $('.gallery-item img').reflect({opacity: 0.2, height: 0.185});
}

function initRefs() {
    $('.ref-button').on('click', function () {
        window.open($(this).data().href,'_blank');
    })
}

function adjustGallery() {

    $gallery.data('carousel').deactivate();
    $gallery.attr('style', '');
    $gallery.html('').html(galleryContents);

    initGallery();
}

export function initGallery() {

    $gallery = $("#gallery");
    galleryContents = $gallery.html();
    $(window).off('resize', adjustGallery);
    $(window).on('resize', adjustGallery);

    initRefs();

    if (window.innerWidth >= 1024) {

        $gallery.Cloud9Carousel({
            buttonLeft: $("#buttons > .left"),
            buttonRight: $("#buttons > .right"),
            autoPlay: true,
            bringToFront: true,
            farScale: 0.35,
            yRadius: 140,
            xRadius: 480,
            fps: 60,

            itemClass: 'gallery-item',
            frontItemClass: 'gallery-front-item',
            onLoaded: () => {
                $gallery.css('display', 'none');
                $gallery.css('visibility', 'visible');
                $gallery.fadeIn(300);
                initReflections();

            }
        });
    }


}

