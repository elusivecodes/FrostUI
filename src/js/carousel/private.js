/**
 * Carousel Private
 */

Object.assign(Carousel.prototype, {

    /**
     * Attach events for the Carousel.
     */
    _events() {
        this._clickNextEvent = e => {
            e.preventDefault();

            this.next().catch(_ => { });
        };

        this._clickPrevEvent = e => {
            e.preventDefault();

            this.prev().catch(_ => { });
        };

        this._clickSlideEvent = e => {
            e.preventDefault();

            const slideTo = dom.getDataset(e.currentTarget, 'slideTo');

            this.show(slideTo).catch(_ => { });
        };

        this._keyDownEvent = e => {
            if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
                return;
            }

            e.preventDefault();

            if (e.key === 'ArrowLeft') {
                this.prev().catch(_ => { });
            } else if (e.key === 'ArrowRight') {
                this.next().catch(_ => { });
            }
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
        const interval = dom.getDataset(this._items[this._index], 'interval');

        this._timer = setTimeout(
            _ => this.cycle(),
            interval ?
                interval :
                this._settings.interval
        );
    },

    /**
     * Cycle to a specific Carousel item.
     * @param {number} index The item index to cycle to.
     * @param {function} [queuedResolve] The queued resolve callback.
     * @param {function} [queuedReject] The queued reject callback.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    _show(index, queuedResolve, queuedReject) {
        return new Promise((resolve, reject) => {
            if (dom.getDataset(this._node, 'sliding')) {
                this._queue.push({
                    index: index,
                    resolve: resolve,
                    reject: reject
                });

                return;
            }

            const fullResolve = _ => {
                queuedResolve && queuedResolve();
                resolve();
            };

            const fullReject = _ => {
                queuedReject && queuedReject();
                reject();
            };

            index = parseInt(index);

            if (!this._settings.wrap &&
                (index < 0 || index > this._items.length - 1)
            ) {
                return fullReject();
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
                return fullReject();
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
                return fullReject();
            }

            const oldIndex = this._index;
            this._index = index;

            dom.setDataset(this._node, 'sliding', true);

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

                dom.removeDataset(this._node, 'sliding');

                dom.triggerEvent(this._node, 'slid.frost.carousel', eventData);

                fullResolve();

                if (!this._queue.length) {
                    this._setTimer();
                    return;
                }

                const next = this._queue.shift();
                return this._show(next.index, next.resolve, next.reject);
            });
        });
    },

    /**
     * Update the position of the Carousel items.
     * @param {Node} nodeIn The new node.
     * @param {Node} nodeOut The old node.
     * @param {number} progress The progress of the cycle.
     * @param {string} direction The direction to cycle to.
     */
    _update(nodeIn, nodeOut, progress, direction) {
        if (progress >= 1) {
            DOMNode.setStyle(nodeOut, 'display', '');
            DOMNode.setStyle(nodeOut, 'transform', '');
            DOMNode.setStyle(nodeIn, 'transform', '');
            return;
        }

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
    }

});
