/**
 * Carousel Class
 * @class
 */
class Carousel extends BaseComponent {

    /**
     * New Carousel constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Carousel with.
     * @returns {Carousel} A new Carousel object.
     */
    constructor(node, settings) {
        super(node, settings);

        this._items = dom.find('.carousel-item', this._node);

        this._index = this._items.findIndex(item =>
            dom.hasClass(item, 'active')
        );

        this._events();

        if (this._settings.ride === 'carousel') {
            this._setTimer();
        }
    }

    /**
     * Cycle to the next carousel item.
     */
    cycle() {
        dom.isHidden(document) ?
            this._setTimer() :
            this.slide(1);
    }

    /**
     * Destroy the Carousel.
     */
    destroy() {
        if (this._timer) {
            clearTimeout(this._timer);
        }

        if (this._settings.keyboard) {
            dom.removeEvent(this._node, 'keydown.ui.carousel');
        }

        if (this._settings.pause) {
            dom.removeEvent(this._node, 'mouseenter.ui.carousel');
            dom.removeEvent(this._node, 'mouseleave.ui.carousel');
        }

        super.destroy();
    }

    /**
     * Cycle to the next Carousel item.
     */
    next() {
        this.slide();
    }

    /**
     * Stop the carousel from cycling through items.
     */
    pause() {
        clearTimeout(this._timer);
        this._timer = null;
    }

    /**
     * Cycle to the previous Carousel item.
     */
    prev() {
        this.slide(-1);
    }

    /**
     * Cycle to a specific Carousel item.
     * @param {number} index The item index to cycle to.
     */
    show(index) {
        this._show(index);
    }

    /**
     * Slide the Carousel in a specific direction.
     * @param {number} [direction=1] The direction to slide to.
     */
    slide(direction = 1) {
        this.show(this._index + direction);
    }

}
