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

                switch (e.code) {
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
                this._mousePaused = true;
                this.pause();
            });

            dom.addEvent(this._node, 'mouseleave.ui.carousel', _ => {
                this._mousePaused = false;
                this._paused = false;

                if (!this._sliding) {
                    this._setTimer();
                }
            });
        }

        if (this._settings.swipe) {
            const getClientX = e => {
                if ('touches' in e && e.touches.length) {
                    return e.touches[0].clientX;
                }

                return e.clientX;
            };

            let startX;
            let index = null;
            let progress;
            let direction;
            dom.addEvent(this._node, 'mousedown.ui.carousel touchstart.ui.carousel', dom.mouseDragFactory(
                e => {
                    if (
                        e.button ||
                        this._sliding ||
                        dom.is(e.target, '[data-ui-slide-to], [data-ui-slide]') ||
                        dom.closest(e.target, '[data-ui-slide]', this._node).length
                    ) {
                        return false;
                    }

                    this.pause();
                    this._sliding = true;

                    startX = getClientX(e);
                },
                e => {
                    const currentX = getClientX(e);
                    const width = dom.width(this._node);
                    const scrollX = width / 2;

                    let mouseDiffX = currentX - startX;
                    if (!this._settings.wrap) {
                        mouseDiffX = Core.clamp(
                            mouseDiffX,
                            -(this._items.length - 1 - this._index) * scrollX,
                            this._index * scrollX
                        );
                    }

                    progress = Core.map(Math.abs(mouseDiffX), 0, scrollX, 0, 1);

                    do {
                        const lastIndex = index;

                        if (mouseDiffX < 0) {
                            index = this._index + 1;
                        } else if (mouseDiffX > 0) {
                            index = this._index - 1;
                        } else {
                            index = this._index;
                            return;
                        }

                        const offset = this._getDirOffset(index);
                        index = this._getIndex(index);
                        direction = this._getDirection(offset, index);

                        if (progress >= 1) {
                            startX = currentX;

                            const oldIndex = this._setIndex(index);
                            this._update(this._items[this._index], this._items[oldIndex], progress, direction);
                            this._updateIndicators();

                            if (lastIndex !== this._index) {
                                this._resetStyles(lastIndex);
                            }

                            progress--;
                        } else {
                            this._update(this._items[index], this._items[this._index], progress, direction, true);

                            if (lastIndex !== index) {
                                this._resetStyles(lastIndex);
                            }
                        }
                    } while (progress > 1);
                },
                e => {
                    if (index === null || index === this._index) {
                        this._paused = false;
                        this._sliding = false;
                        this._setTimer();
                        return;
                    }

                    const oldIndex = this._setIndex(index);
                    this._resetStyles(this._index);
                    const progressRemaining = 1 - progress;
                    index = null;

                    dom.animate(
                        this._items[this._index],
                        (node, newProgress) => {
                            if (!this._items) {
                                return;
                            }

                            this._update(node, this._items[oldIndex], progress + (newProgress * progressRemaining), direction);
                        },
                        {
                            duration: this._settings.transition * progressRemaining
                        }
                    ).then(_ => {
                        this._updateIndicators();

                        this._paused = false;
                        this._setTimer();
                    }).finally(_ => {
                        this._sliding = false;
                    });
                }
            ));
        }
    },

    /**
     * Get the direction offset from an index.
     * @param {number} index The index.
     * @returns {number} The direction.
     */
    _getDirOffset(index) {
        if (index < 0) {
            return -1;
        }

        if (index > this._items.length - 1) {
            return 1;
        }

        return 0;
    },

    /**
     * Get the direction from an offset and index.
     * @param {number} offset The direction offset.
     * @param {number} index The item index.
     * @returns {string} The direction.
     */
    _getDirection(offset, index) {
        if (offset == -1 || (offset == 0 && index < this._index)) {
            return 'left';
        }

        return 'right';
    },

    /**
     * Get the real index from an index.
     * @param {number} index The item index.
     * @returns {number} The real item index.
     */
    _getIndex(index) {
        index %= this._items.length;

        if (index < 0) {
            return this._items.length + index;
        }

        return index;
    },

    /**
     * Reset styles of an item.
     * @param {number} index The item index.
     */
    _resetStyles(index) {
        dom.setStyle(this._items[index], 'display', '');
        dom.setStyle(this._items[index], 'transform', '');
    },

    /**
     * Set a new item index and update the items.
     * @param {number} index The new item index.
     * @returns {number} The old item index.
     */
    _setIndex(index) {
        const oldIndex = this._index;
        this._index = index;

        dom.addClass(this._items[this._index], 'active');
        dom.removeClass(this._items[oldIndex], 'active');

        return oldIndex;
    },

    /**
     * Set a timer for the next Carousel cycle.
     */
    _setTimer() {
        if (this._timer || this._paused || this._mousePaused) {
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

        const offset = this._getDirOffset(index);
        index = this._getIndex(index);

        if (index === this._index) {
            return;
        }

        const direction = this._getDirection(offset, index);

        const eventData = {
            direction,
            relatedTarget: this._items[index],
            from: this._index,
            to: index
        };

        if (!dom.triggerOne(this._node, 'slide.ui.carousel', eventData)) {
            return;
        }

        this._sliding = true
        this.pause();

        const oldIndex = this._setIndex(index);

        dom.animate(
            this._items[this._index],
            (node, progress) => {
                if (!this._items) {
                    return;
                }

                this._update(node, this._items[oldIndex], progress, direction);
            },
            {
                duration: this._settings.transition
            }
        ).then(_ => {
            this._updateIndicators();
            dom.triggerEvent(this._node, 'slid.ui.carousel', eventData);

            this._paused = false;
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
    _update(nodeIn, nodeOut, progress, direction, dragging = false) {
        const hiddenNode = dragging ? nodeIn : nodeOut;

        if (progress >= 1) {
            hiddenNode.style.setProperty('display', '');
            nodeOut.style.setProperty('transform', '');
            nodeIn.style.setProperty('transform', '');
            return;
        }

        hiddenNode.style.setProperty('display', 'block');

        const inverse = direction === 'right';
        nodeOut.style.setProperty(
            'transform',
            `translateX(${Math.round(progress * 100) * (inverse ? -1 : 1)}%)`
        );
        nodeIn.style.setProperty(
            'transform',
            `translateX(${Math.round((1 - progress) * 100) * (inverse ? 1 : -1)}%)`
        );
    },

    /**
     * Update the carousel indicators.
     */
    _updateIndicators() {
        const oldIndicator = dom.find('.active[data-ui-slide-to]', this._node);
        const newIndicator = dom.find('[data-ui-slide-to="' + this._index + '"]', this._node);
        dom.removeClass(oldIndicator, 'active');
        dom.addClass(newIndicator, 'active');
    }

});
