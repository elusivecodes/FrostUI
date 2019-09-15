/**
 * Carousel Class
 * @class
 */
class Carousel {

    /**
     * New Carousel constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Carousel with.
     * @param {number} [settings.interval=5000] The duration of the interval.
     * @param {number} [settings.transition=500] The duration of the transition.
     * @param {Boolean} [settings.keyboard=true] Whether to all keyboard navigation.
     * @param {Boolean|string} [settings.ride=false] Set to "carousel" to automatically start the carousel.
     * @param {Boolean} [settings.pause=true] Whether to pause the carousel on mouseover.
     * @param {Boolean} [settings.wrap=true] Whether the carousel should cycle around.
     * @returns {Carousel} A new Carousel object.
     */
    constructor(node, settings) {
        this._node = node;

        this._settings = {
            ...Carousel.defaults,
            ...dom.getDataset(this._node),
            ...settings
        };

        this._items = dom.find('.carousel-item', this._node);

        this._index = this._items.findIndex(item => dom.hasClass(item, 'active'));

        this._queue = [];

        this._events();

        dom.setData(this._node, 'carousel', this);

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

        dom.removeEvent(this._node, 'click.frost.carousel', this._clickNextEvent);
        dom.removeEvent(this._node, 'click.frost.carousel', this._clickPrevEvent);
        dom.removeEvent(this._node, 'click.frost.carousel', this._clickSlideEvent);

        if (this._settings.keyboard) {
            dom.removeEvent(this._node, 'keydown.frost.carousel', this._keyDownEvent);
        }

        if (this._settings.pause) {
            dom.removeEvent(this._node, 'mouseenter.frost.carousel', this._mouseEnterEvent);
            dom.removeEvent(this._node, 'mouseleave.frost.carousel', this._mouseLeaveEvent);
        }

        dom.removeData(this._node, 'carousel');
    }

    /**
     * Cycle to the next Carousel item.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    next() {
        return this.slide();
    }

    /**
     * Stop the carousel from cycling through items.
     */
    pause() {
        if (this._timer) {
            clearTimeout(this._timer);
        }
    }

    /**
     * Cycle to the previous Carousel item.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    prev() {
        return this.slide(-1);
    }

    /**
     * Cycle to a specific Carousel item.
     * @param {number} index The item index to cycle to.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    show(index) {
        return this._show(index);
    }

    /**
     * Slide the Carousel in a specific direction.
     * @param {number} [direction=1] The direction to slide to.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    slide(direction = 1) {
        const index = this._queue.length ?
            this._queue[this._queue.length - 1].index :
            this._index;

        return this.show(index + direction);
    }

}
