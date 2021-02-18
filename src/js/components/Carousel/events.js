// Carousel events
dom.addEvent(window, 'load', _ => {
    const nodes = dom.find('[data-ui-ride="carousel"]');

    for (const node of nodes) {
        Carousel.init(node);
    }
});

dom.addEventDelegate(document, 'click.ui.carousel', '[data-ui-slide]', e => {
    e.preventDefault();

    const target = UI.getTarget(e.currentTarget, '.carousel');
    const carousel = Carousel.init(target);
    const slide = dom.getDataset(e.currentTarget, 'uiSlide');

    if (slide === 'prev') {
        carousel.prev();
    } else {
        carousel.next();
    }
});

dom.addEventDelegate(document, 'click.ui.carousel', '[data-ui-slide-to]', e => {
    e.preventDefault();

    const target = UI.getTarget(e.currentTarget, '.carousel');
    const carousel = Carousel.init(target);
    const slideTo = dom.getDataset(e.currentTarget, 'uiSlideTo');

    carousel.show(slideTo);
});
