// Carousel default options
Carousel.defaults = {
    interval: 5000,
    transition: 500,
    keyboard: true,
    ride: false,
    pause: true,
    wrap: true,
    swipe: true
};

UI.initComponent('carousel', Carousel);

UI.Carousel = Carousel;
