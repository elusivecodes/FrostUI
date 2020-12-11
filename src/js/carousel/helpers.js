/**
 * Carousel Helpers
 */

Object.assign(Carousel.prototype, {

    /**
     * Attach events for the Carousel.
     */
    _events() {
        if (this._settings.keyboard) {
            dom.addEvent(this._node, 'keydown.ui.carousel', e => {
                const target = e.target;
                if (dom.is(target, 'input, select')) {
                    return;
                }

                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.prev();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.next();
                        break;
                }
            });
        }

        if (this._settings.pause) {
            dom.addEvent(this._node, 'mouseenter.ui.carousel', _ => {
                this.pause();
            });

            dom.addEvent(this._node, 'mouseleave.ui.carousel', _ => {
                this._setTimer();
            });
        }
    },

    /**
     * Set a timer for the next Carousel cycle.
     */
    _setTimer() {
        if (this._timer) {
            return;
        }

        const interval = dom.getDataset(this._items[this._index], 'uiInterval');

        this._timer = setTimeout(
            _ => this.cycle(),
            interval || this._settings.interval
        );
    },

    /**
     * Cycle to a specific Carousel item.
     * @param {number} index The item index to cycle to.
     */
    _show(index) {
        if (this._sliding) {
            return;
        }

        index = parseInt(index);

        if (!this._settings.wrap &&
            (
                index < 0 ||
                index > this._items.length - 1
            )
        ) {
            return;
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
            return;
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

        if (!dom.triggerOne(this._node, 'slide.ui.carousel', eventData)) {
            return;
        }

        const oldIndex = this._index;
        this._index = index;

        this._sliding = true

        this.pause();

        dom.addClass(this._items[this._index], 'active');
        dom.removeClass(this._items[oldIndex], 'active');

        dom.animate(
            this._items[this._index],
            (node, progress) =>
                this._update(node, this._items[oldIndex], progress, direction),
            {
                duration: this._settings.transition
            }
        ).then(_ => {
            const oldIndicator = dom.find('.active[data-ui-slide-to]', this._node);
            const newIndicator = dom.find('[data-ui-slide-to="' + this._index + '"]', this._node);
            dom.removeClass(oldIndicator, 'active');
            dom.addClass(newIndicator, 'active');
            dom.triggerEvent(this._node, 'slid.ui.carousel', eventData);

            this._setTimer();
        }).finally(_ => {
            this._sliding = false;
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
            nodeOut.style.setProperty('display', '');
            nodeOut.style.setProperty('transform', '');
            nodeIn.style.setProperty('transform', '');
            return;
        }

        const inverse = direction === 'right';
        nodeOut.style.setProperty('display', 'block');
        nodeOut.style.setProperty(
            'transform',
            `translateX(${Math.round(progress * 100) * (inverse ? -1 : 1)}%)`
        );
        nodeIn.style.setProperty(
            'transform',
            `translateX(${Math.round((1 - progress) * 100) * (inverse ? 1 : -1)}%)`
        );
    }

});
