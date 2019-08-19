/**
 * Carousel Class
 * @class
 */
class Carousel {

    /**
     * New Carousel constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Carousel with.
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

        if (this._settings.ride === 'carousel') {
            this._setTimer();
        }

        dom.setData(this._node, 'carousel', this);
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

        dom.stop(this._node, true);

        dom.removeEvent(this._node, 'click.frost.carousel', this._clickNextEvent);
        dom.removeEvent(this._node, 'click.frost.carousel', this._clickPrevEvent);
        dom.removeEvent(this._node, 'click.frost.carousel', this._clickSlideEvent);
        dom.removeEvent(this._node, 'keydown.frost.carousel', this._keyDownEvent);
        dom.removeEvent(this._node, 'mouseenter.frost.carousel', this._mouseEnterEvent);
        dom.removeEvent(this._node, 'mouseleave.frost.carousel', this._mouseLeaveEvent);
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
        if (this._sliding) {
            dom.stop(this._items, true);
        }

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
        return new Promise((resolve, reject) => {
            if (this._sliding) {
                this._queue.push({
                    index: index
                });

                return reject();
            }

            index = parseInt(index);

            if (!this._settings.wrap &&
                (index < 0 || index > this._items.length - 1)
            ) {
                return reject();
            }

            let dir = 0;
            if (index < 0) {
                dir = -1;
            } else if (index > this._items.length - 1) {
                dir = 1;
            }

            index %= this._items.length;
            if (index < 0) {
                index = this._items.length + index;
            }

            if (index === this._index) {
                return reject();
            }

            const direction = dir == -1 || (dir == 0 && index < this._index) ?
                'left' :
                'right';

            const eventData = {
                direction,
                relatedTarget: this._items[index],
                from: this._index,
                to: index
            };

            if (!DOM._triggerEvent(this._node, 'slide.frost.carousel', eventData)) {
                return reject();
            }

            const oldIndex = this._index;
            this._index = index;
            this._sliding = true;
            this.pause();

            dom.addClass(this._items[this._index], 'active');
            dom.removeClass(this._items[oldIndex], 'active');
            dom.animate(
                this._items[this._index],
                (node, progress, options) =>
                    this._update(node, this._items[oldIndex], progress, options.direction),
                {
                    direction,
                    duration: this._settings.transition
                }
            ).then(_ => {
                dom.removeClass(
                    dom.find('.active[data-slide-to]', this._node),
                    'active'
                );

                dom.addClass(
                    dom.find('[data-slide-to="' + this._index + '"]', this._node),
                    'active'
                );

                this._sliding = false;

                dom.triggerEvent(this._node, 'slid.frost.carousel', eventData);

                if (!this._queue.length) {
                    this._setTimer();
                    return resolve();
                }

                const next = this._queue.shift();
                return next.dir ?
                    this.slide(next.dir) :
                    this.show(next.index);
            });
        });
    }

    /**
     * Slide the Carousel in a specific direction.
     * @param {number} [direction=1] The direction to slide to.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    slide(direction = 1) {
        if (this._sliding) {
            return this._queue.push({
                direction
            });
        }

        return this.show(this._index + direction)
    }

}
