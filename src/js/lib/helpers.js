export function setActiveItem($collection, idx) {
    $collection.removeClass('active');
    $collection.eq(idx).addClass('active');
}