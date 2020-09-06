// Carousel events
dom.addEventDelegate(document, 'click.frost.carousel', '.carousel-next, .carousel-prev, [data-slide], [data-slide-to]', e => {
    e.preventDefault();

    const target = UI.getTarget(e.currentTarget, '.carousel');
    const carousel = Carousel.init(target);
    const slideTo = dom.getDataset(e.currentTarget, 'slideTo');

    if (!Core.isUndefined(slideTo)) {
        carousel.show(slideTo);
    } else if (dom.hasClass(e.currentTarget, 'carousel-prev')) {
        carousel.prev();
    } else {
        carousel.next();
    }
});
