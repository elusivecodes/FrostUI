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

        this._settings = Core.extend(
            {},
            this.constructor.defaults,
            dom.getDataset(this._node),
            settings
        );

        this._items = dom.find('.carousel-item', this._node);

        this._index = this._items.findIndex(item =>
            dom.hasClass(item, 'active')
        );

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

        if (this._settings.keyboard) {
            dom.removeEvent(this._node, 'keydown.frost.carousel');
        }

        if (this._settings.pause) {
            dom.removeEvent(this._node, 'mouseenter.frost.carousel');
            dom.removeEvent(this._node, 'mouseleave.frost.carousel');
        }

        dom.removeEvent(this._node, 'remove.frost.carousel');

        dom.removeData(this._node, 'carousel');
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

    /**
     * Initialize a Carousel.
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
    static init(node, settings) {
        return dom.hasData(node, 'carousel') ?
            dom.getData(node, 'carousel') :
            new this(node, settings);
    }

}
