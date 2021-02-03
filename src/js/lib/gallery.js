export function initGallery() {

let gallery = $("#gallery");

gallery.Cloud9Carousel( {
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
} );

}

