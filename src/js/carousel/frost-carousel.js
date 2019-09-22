// Default Carousel options
Carousel.defaults = {
    interval: 5000,
    transition: 500,
    keyboard: true,
    ride: false,
    pause: true,
    wrap: true
};

// Auto-initialize Carousel from data-ride
dom.addEventOnce(window, 'load', _ => {
    const nodes = dom.find('[data-toggle="carousel"], [data-ride="carousel"]');

    for (const node of nodes) {
        new Carousel(node);
    }
});

// Add Carousel QuerySet method
if (QuerySet) {
    QuerySet.prototype.carousel = function(a, ...args) {
        let options, method;
        if (Core.isObject(a)) {
            options = a;
        } else if (Core.isString(a)) {
            method = a;
        }

        let result;
        this.each((node, index) => {
            if (!Core.isElement(node)) {
                return;
            }

            const carousel = dom.hasData(node, 'carousel') ?
                dom.getData(node, 'carousel') :
                new Carousel(node, options);

            if (index) {
                return;
            }

            if (!method) {
                result = carousel;
            } else {
                result = carousel[method](...args);
            }
        });

        return result;
    };
}

UI.Carousel = Carousel;
