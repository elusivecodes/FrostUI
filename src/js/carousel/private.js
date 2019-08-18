/**
 * Carousel Private
 */

Object.assign(Carousel.prototype, {

    /**
     * Update the position of the Carousel items.
     * @param {Node} nodeIn The new node.
     * @param {Node} nodeOut The old node.
     * @param {number} progress The progress of the cycle.
     * @param {string} direction The direction to cycle to.
     */
    _update(nodeIn, nodeOut, progress, direction) {
        if (progress < 1) {
            const inverse = direction === 'right';
            DOMNode.setStyle(nodeOut, 'display', 'block');
            DOMNode.setStyle(
                nodeOut,
                'transform',
                `translateX(${Math.round(progress * 100) * (inverse ? -1 : 1)}%)`
            );
            DOMNode.setStyle(
                nodeIn,
                'transform',
                `translateX(${Math.round((1 - progress) * 100) * (inverse ? 1 : -1)}%)`
            );
        } else {
            DOMNode.setStyle(nodeOut, 'display', '');
            DOMNode.setStyle(nodeOut, 'transform', '');
            DOMNode.setStyle(nodeIn, 'transform', '');
        }
    },

    /**
     * Attach events for the Carousel.
     */
    _events() {
        this._clickNextEvent = e => {
            e.preventDefault();

            try {
                this.next();
            } catch (e) { }
        };

        this._clickPrevEvent = e => {
            e.preventDefault();

            try {
                this.prev();
            } catch (e) { }
        };

        this._clickSlideEvent = e => {
            e.preventDefault();

            const slideTo = dom.getDataset(e.currentTarget, 'slideTo');

            try {
                this.show(slideTo);
            } catch (e) { }
        };

        this._keyDownEvent = e => {
            if (this._sliding || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) {
                return;
            }

            e.preventDefault();

            try {
                if (e.key === 'ArrowLeft') {
                    this.prev();
                } else if (e.key === 'ArrowRight') {
                    this.next();
                }
            } catch (e) { }
        };

        this._mouseEnterEvent = _ => this.pause();

        this._mouseLeaveEvent = _ => this._setTimer();

        dom.addEventDelegate(this._node, 'click.frost.carousel', '.carousel-next', this._clickNextEvent);
        dom.addEventDelegate(this._node, 'click.frost.carousel', '.carousel-prev', this._clickPrevEvent);
        dom.addEventDelegate(this._node, 'click.frost.carousel', '[data-slide-to]', this._clickSlideEvent);

        if (this._settings.keyboard) {
            dom.addEvent(this._node, 'keydown.frost.carousel', this._keyDownEvent);
        }

        if (this._settings.pause) {
            dom.addEvent(this._node, 'mouseenter.frost.carousel', this._mouseEnterEvent);
            dom.addEvent(this._node, 'mouseleave.frost.carousel', this._mouseLeaveEvent);
        }
    },

    /**
     * Set a timer for the next Carousel cycle.
     */
    _setTimer() {
        this._timer = setTimeout(_ => {
            try {
                this.cycle();
            } catch (e) { }
        }, this._settings.interval);
    }

});
