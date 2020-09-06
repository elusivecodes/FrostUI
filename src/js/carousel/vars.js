// Carousel default options
Carousel.defaults = {
    interval: 5000,
    transition: 500,
    keyboard: true,
    ride: false,
    pause: true,
    wrap: true
};

// Carousel init
dom.addEventOnce(window, 'load', _ => {
    const nodes = dom.find('[data-ride="carousel"]');

    for (const node of nodes) {
        Carousel.init(node);
    }
});

// Carousel QuerySet method
if (QuerySet) {
    QuerySet.prototype.carousel = function(a, ...args) {
        let settings, method;

        if (Core.isObject(a)) {
            settings = a;
        } else if (Core.isString(a)) {
            method = a;
        }

        for (const node of this) {
            if (!Core.isElement(node)) {
                continue;
            }

            const carousel = Carousel.init(node, settings);

            if (method) {
                carousel[method](...args);
            }
        }

        return this;
    };
}

UI.Carousel = Carousel;
