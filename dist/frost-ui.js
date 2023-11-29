(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@fr0st/query')) :
    typeof define === 'function' && define.amd ? define(['exports', '@fr0st/query'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.UI = {}, global.fQuery));
})(this, (function (exports, fQuery) { 'use strict';

    let $$1;

    if (fQuery !== fQuery.query) {
        $$1 = fQuery(globalThis);
    } else {
        $$1 = fQuery;
    }

    if (!('fQuery' in globalThis)) {
        globalThis.fQuery = $$1;
    }

    const document = $$1.getContext();
    const window$1 = $$1.getWindow();

    let scrollbarSize;

    /**
     * Add scrollbar padding to a node.
     * @param {HTMLElement} [node=document.body] The node.
     */
    function addScrollPadding(node = document.body) {
        const scrollSizeY = getScrollbarSize(window$1, document, 'y');
        const scrollSizeX = getScrollbarSize(window$1, document, 'x');

        if (!scrollSizeY && !scrollSizeX) {
            return;
        }

        const data = {};
        const style = {};

        if (scrollSizeY) {
            const currentPaddingRight = $$1.getStyle(node, 'paddingRight');
            const paddingRight = $$1.css(node, 'paddingRight');

            data.uiPaddingRight = currentPaddingRight;
            style.paddingRight = `${scrollSizeY + parseInt(paddingRight)}px`;
        }

        if (scrollSizeX) {
            const currentPaddingBottom = $$1.getStyle(node, 'paddingBottom');
            const paddingBottom = $$1.css(node, 'paddingBottom');

            data.uiPaddingBottom = currentPaddingBottom;
            style.paddingBottom = `${scrollSizeX + parseInt(paddingBottom)}px`;
        }

        $$1.setDataset(node, data);
        $$1.setStyle(node, style);
    }
    /**
     * Get the size of the scrollbar.
     * @return {number} The scrollbar size.
     */
    function calculateScrollbarSize() {
        if (scrollbarSize) {
            return scrollbarSize;
        }

        const div = $$1.create('div', {
            style: {
                width: '100px',
                height: '100px',
                overflow: 'scroll',
                position: 'absolute',
                top: '-9999px',
            },
        });
        $$1.append(document.body, div);

        scrollbarSize = $$1.getProperty(div, 'offsetWidth') - $$1.width(div);

        $$1.detach(div);

        return scrollbarSize;
    }
    /**
     * Generate a unique element ID.
     * @param {string} [prefix] The ID prefix.
     * @return {string} The unique ID.
     */
    function generateId(prefix) {
        const id = `${prefix}${$$1._randomInt(10000, 99999)}`;

        if ($$1.findOne(`#${id}`)) {
            return generateId(prefix);
        }

        return id;
    }
    /**
     * Get normalized UI data from a node.
     * @param {HTMLElement} node The input node.
     * @return {object} The normalized data.
     */
    function getDataset(node) {
        const dataset = $$1.getDataset(node);

        return Object.fromEntries(
            Object.entries(dataset)
                .map(([key, value]) => [key.slice(2, 3).toLowerCase() + key.slice(3), value]),
        );
    }
    /**
     * Get position from a mouse/touch event.
     * @param {Event} e The mouse/touch event.
     * @return {object} The position.
     */
    function getPosition(e) {
        if ('touches' in e && e.touches.length) {
            return {
                x: e.touches[0].pageX,
                y: e.touches[0].pageY,
            };
        }

        return {
            x: e.pageX,
            y: e.pageY,
        };
    }
    /**
     * Get the scrollbar size for a given axis.
     * @param {HTMLElement|Window} [node=window] The input node.
     * @param {HTMLElement|Document} [scrollNode=document] The scroll node.
     * @param {string} [axis] The axis to check.
     * @return {number} The scrollbar size.
     */
    function getScrollbarSize(node = window$1, scrollNode = document, axis) {
        const method = axis === 'x' ? 'width' : 'height';
        const size = $$1[method](node);
        const scrollSize = $$1[method](scrollNode, { boxSize: $$1.SCROLL_BOX });

        if (scrollSize > size) {
            return calculateScrollbarSize();
        }

        return 0;
    }
    /**
     * Calculate the computed bounding rectangle of a node (minus scroll bars).
     * @param {HTMLElement|Window} node The input node.
     * @param {HTMLElement|Document} scrollNode The scroll node.
     * @return {object} The computed bounding rectangle of the node.
     */
    function getScrollContainer(node, scrollNode) {
        const isWindow = $$1._isWindow(node);
        const rect = isWindow ?
            getWindowContainer(node) :
            $$1.rect(node, { offset: true });

        const scrollSizeX = getScrollbarSize(node, scrollNode, 'x');
        const scrollSizeY = getScrollbarSize(node, scrollNode, 'y');

        if (scrollSizeX) {
            rect.height -= scrollSizeX;

            if (isWindow) {
                rect.bottom -= scrollSizeX;
            }
        }

        if (scrollSizeY) {
            rect.width -= scrollSizeY;

            if (isWindow) {
                rect.right -= scrollSizeY;
            }
        }

        return rect;
    }
    /**
     * Get a target from a node.
     * @param {HTMLElement} node The input node.
     * @param {string} [closestSelector] The default closest selector.
     * @return {HTMLElement} The target node.
     */
    function getTarget(node, closestSelector) {
        const selector = getTargetSelector(node);

        let target;

        if (selector && selector !== '#') {
            target = $$1.findOne(selector);
        } else if (closestSelector) {
            target = $$1.closest(node, closestSelector).shift();
        }

        if (!target) {
            throw new Error('Target not found');
        }

        return target;
    }
    /**
     * Get the target selector from a node.
     * @param {HTMLElement} node The input node.
     * @return {string} The target selector.
     */
    function getTargetSelector(node) {
        return $$1.getDataset(node, 'uiTarget') || $$1.getAttribute(node, 'href');
    }
    /**
     * Get positions from a touch event.
     * @param {Event} e The touch event.
     * @return {array} The positions.
     */
    function getTouchPositions(e) {
        return Array.from(e.touches)
            .map((touch) => ({ x: touch.pageX, y: touch.pageY }));
    }
    /**
     * Calculate the computed bounding rectangle of a window.
     * @param {Window} node The window object.
     * @return {object} The computed bounding rectangle of the window.
     */
    function getWindowContainer(node) {
        const scrollX = $$1.getScrollX(node);
        const scrollY = $$1.getScrollY(node);
        const width = $$1.width(node);
        const height = $$1.height(node);

        return {
            x: scrollX,
            y: scrollY,
            width,
            height,
            top: scrollY,
            right: scrollX + width,
            bottom: scrollY + height,
            left: scrollX,
        };
    }
    /**
     * Initialize a UI component.
     * @param {string} key The component key.
     * @param {class} component The component class.
     */
    function initComponent(key, component) {
        component.DATA_KEY = key;
        component.REMOVE_EVENT = `remove.ui.${key}`;

        $$1.QuerySet.prototype[key] = function(a, ...args) {
            let settings; let method; let firstResult;

            if ($$1._isObject(a)) {
                settings = a;
            } else if ($$1._isString(a)) {
                method = a;
            }

            for (const [index, node] of this.get().entries()) {
                if (!$$1._isElement(node)) {
                    continue;
                }

                let result = component.init(node, settings);

                if (method) {
                    result = result[method](...args);
                }

                if (index === 0) {
                    firstResult = result;
                }
            }

            return firstResult;
        };
    }
    /**
     * Reset body scrollbar padding.
     * @param {HTMLElement} [node=document.body] The node.
     */
    function resetScrollPadding(node = document.body) {
        const paddingRight = $$1.getDataset(node, 'uiPaddingRight');
        const paddingBottom = $$1.getDataset(node, 'uiPaddingBottom');

        $$1.setStyle(node, { paddingRight, paddingBottom });

        $$1.removeDataset(node, 'uiPaddingRight');
        $$1.removeDataset(node, 'uiPaddingBottom');
    }

    /**
     * BaseComponent Class
     * @class
     */
    class BaseComponent {
        /**
         * New BaseComponent constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [options] The options to create the BaseComponent with.
         */
        constructor(node, options) {
            this._node = node;

            this._options = $$1._extend(
                {},
                this.constructor.defaults,
                getDataset(this._node),
                options,
            );

            $$1.addEvent(this._node, this.constructor.REMOVE_EVENT, (_) => {
                this.dispose();
            });

            $$1.setData(this._node, { [this.constructor.DATA_KEY]: this });
        }

        /**
         * Dispose the BaseComponent.
         */
        dispose() {
            $$1.removeEvent(this._node, this.constructor.REMOVE_EVENT);
            $$1.removeData(this._node, this.constructor.DATA_KEY);
            this._node = null;
            this._options = null;
        }

        /**
         * Initialize a BaseComponent.
         * @param {HTMLElement} node The input node.
         * @return {BaseComponent} A new BaseComponent object.
         */
        static init(node, ...args) {
            return $$1.hasData(node, this.DATA_KEY) ?
                $$1.getData(node, this.DATA_KEY) :
                new this(node, ...args);
        }
    }

    /**
     * Alert Class
     * @class
     */
    class Alert extends BaseComponent {
        /**
         * Close the Alert.
         */
        close() {
            if (
                $$1.getDataset(this._node, 'uiAnimating') ||
                !$$1.triggerOne(this._node, 'close.ui.alert')
            ) {
                return;
            }

            $$1.setDataset(this._node, { uiAnimating: 'out' });

            $$1.fadeOut(this._node, {
                duration: this._options.duration,
            }).then((_) => {
                $$1.detach(this._node);
                $$1.removeDataset(this._node, 'uiAnimating');
                $$1.triggerEvent(this._node, 'closed.ui.alert');
                $$1.remove(this._node);
            }).catch((_) => {
                if ($$1.getDataset(this._node, 'uiAnimating') === 'out') {
                    $$1.removeDataset(this._node, 'uiAnimating');
                }
            });
        }
    }

    // Alert default options
    Alert.defaults = {
        duration: 100,
    };

    // Alert init
    initComponent('alert', Alert);

    // Alert events
    $$1.addEventDelegate(document, 'click.ui.alert', '[data-ui-dismiss="alert"]', (e) => {
        e.preventDefault();

        const target = getTarget(e.currentTarget, '.alert');
        const alert = Alert.init(target);
        alert.close();
    });

    /**
     * Button Class
     * @class
     */
    class Button extends BaseComponent {
        /**
         * Toggle the Button.
         */
        toggle() {
            $$1.toggleClass(this._node, 'active');

            const active = $$1.hasClass(this._node, 'active');
            $$1.setAttribute(this._node, { 'aria-pressed': active });
        }
    }

    // Button init
    initComponent('button', Button);

    // Button events
    $$1.addEventDelegate(document, 'click.ui.button', '[data-ui-toggle="button"]', (e) => {
        e.preventDefault();

        const button = Button.init(e.currentTarget);
        button.toggle();
    });

    /**
     * Carousel Class
     * @class
     */
    class Carousel extends BaseComponent {
        /**
         * New Carousel constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [options] The options to create the Carousel with.
         */
        constructor(node, options) {
            super(node, options);

            this._items = $$1.find('.carousel-item', this._node);

            this._index = this._items.findIndex((item) =>
                $$1.hasClass(item, 'active'),
            );

            this._events();

            if (this._options.ride === 'carousel') {
                this._setTimer();
            }
        }

        /**
         * Cycle to the next carousel item.
         */
        cycle() {
            if (!$$1.isHidden(document)) {
                this.slide(1);
            } else {
                this._paused = false;
                this._setTimer();
            }
        }

        /**
         * Dispose the Carousel.
         */
        dispose() {
            if (this._timer) {
                clearTimeout(this._timer);
            }

            if (this._options.keyboard) {
                $$1.removeEvent(this._node, 'keydown.ui.carousel');
            }

            if (this._options.pause) {
                $$1.removeEvent(this._node, 'mouseenter.ui.carousel');
                $$1.removeEvent(this._node, 'mouseleave.ui.carousel');
            }

            if (this._options.swipe) {
                $$1.removeEvent(this._node, 'mousedown.ui.carousel');
            }

            this._items = null;

            super.dispose();
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
            this._paused = true;
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

    /**
     * Get the direction offset from an index.
     * @param {number} index The index.
     * @param {number} totalItems The total number of items.
     * @return {number} The direction.
     */
    function getDirOffset(index, totalItems) {
        if (index < 0) {
            return -1;
        }

        if (index > totalItems - 1) {
            return 1;
        }

        return 0;
    }
    /**
     * Get the direction from an offset and index.
     * @param {number} offset The direction offset.
     * @param {number} oldIndex The old item index.
     * @param {number} newIndex The new item index.
     * @return {string} The direction.
     */
    function getDirection$1(offset, oldIndex, newIndex) {
        if (offset == -1 || (offset == 0 && newIndex < oldIndex)) {
            return 'left';
        }

        return 'right';
    }
    /**
     * Get the real index from an index.
     * @param {number} index The item index.
     * @param {number} totalItems The total number of items.
     * @return {number} The real item index.
     */
    function getIndex(index, totalItems) {
        index %= totalItems;

        if (index < 0) {
            return totalItems + index;
        }

        return index;
    }

    /**
     * Attach events for the Carousel.
     */
    function _events$2() {
        if (this._options.keyboard) {
            $$1.addEvent(this._node, 'keydown.ui.carousel', (e) => {
                const target = e.target;
                if ($$1.is(target, 'input, select')) {
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

        if (this._options.pause) {
            $$1.addEvent(this._node, 'mouseenter.ui.carousel', (_) => {
                this._mousePaused = true;
                this.pause();
            });

            $$1.addEvent(this._node, 'mouseleave.ui.carousel', (_) => {
                this._mousePaused = false;
                this._paused = false;

                if (!$$1.getDataset(this._node, 'uiSliding')) {
                    this._setTimer();
                }
            });
        }

        if (this._options.swipe) {
            let startX;
            let index = null;
            let progress;
            let direction;

            const downEvent = (e) => {
                if (
                    e.button ||
                    $$1.getDataset(this._node, 'uiSliding') ||
                    (
                        !$$1.is(e.target, ':disabled, .disabled') &&
                        (
                            $$1.is(e.target, '[data-ui-slide-to], [data-ui-slide], a, button, input, textarea, select') ||
                            $$1.closest(e.target, '[data-ui-slide], a, button', (parent) => $$1.isSame(parent, this._node) || $$1.is(parent, ':disabled, .disabled')).length
                        )
                    )
                ) {
                    return false;
                }

                this.pause();
                $$1.setDataset(this._node, { uiSliding: true });

                const pos = getPosition(e);
                startX = pos.x;
            };

            const moveEvent = (e) => {
                const pos = getPosition(e);
                const currentX = pos.x;
                const width = $$1.width(this._node);
                const scrollX = width / 2;

                let mouseDiffX = currentX - startX;
                if (!this._options.wrap) {
                    mouseDiffX = $$1._clamp(
                        mouseDiffX,
                        -(this._items.length - 1 - this._index) * scrollX,
                        this._index * scrollX,
                    );
                }

                progress = $$1._map(Math.abs(mouseDiffX), 0, scrollX, 0, 1);

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

                    const offset = getDirOffset(index, this._items.length);
                    index = getIndex(index, this._items.length);
                    direction = getDirection$1(offset, this._index, index);

                    if (progress >= 1) {
                        startX = currentX;

                        const oldIndex = this._setIndex(index);
                        this._update(this._items[this._index], this._items[oldIndex], progress, { direction });
                        this._updateIndicators();

                        if (lastIndex !== this._index) {
                            this._resetStyles(lastIndex);
                        }

                        progress--;
                    } else {
                        this._update(this._items[index], this._items[this._index], progress, { direction, dragging: true });

                        if (lastIndex !== index) {
                            this._resetStyles(lastIndex);
                        }
                    }
                } while (progress > 1);
            };

            const upEvent = (_) => {
                if (index === null || index === this._index) {
                    this._paused = false;
                    $$1.removeDataset(this._node, 'uiSliding');
                    this._setTimer();
                    return;
                }

                let oldIndex;
                let progressRemaining;
                if (progress > .25) {
                    oldIndex = this._setIndex(index);
                    progressRemaining = 1 - progress;
                } else {
                    oldIndex = index;
                    progressRemaining = progress;
                    direction = direction === 'right' ? 'left' : 'right';
                }

                this._resetStyles(this._index);

                index = null;

                $$1.animate(
                    this._items[this._index],
                    (node, newProgress) => {
                        if (!this._items) {
                            return;
                        }

                        if (progress > .25) {
                            this._update(node, this._items[oldIndex], progress + (newProgress * progressRemaining), { direction });
                        } else {
                            this._update(node, this._items[oldIndex], (1 - progress) + (newProgress * progressRemaining), { direction });
                        }
                    },
                    {
                        duration: this._options.transition * progressRemaining,
                    },
                ).then((_) => {
                    this._updateIndicators();
                    $$1.removeDataset(this._node, 'uiSliding');

                    this._paused = false;
                    this._setTimer();
                }).catch((_) => {
                    $$1.removeDataset(this._node, 'uiSliding');
                });
            };

            const dragEvent = $$1.mouseDragFactory(downEvent, moveEvent, upEvent);

            $$1.addEvent(this._node, 'mousedown.ui.carousel touchstart.ui.carousel', dragEvent);
        }
    }

    /**
     * Reset styles of an item.
     * @param {number} index The item index.
     */
    function _resetStyles(index) {
        $$1.setStyle(this._items[index], {
            display: '',
            transform: '',
        });
    }
    /**
     * Set a new item index and update the items.
     * @param {number} index The new item index.
     * @return {number} The old item index.
     */
    function _setIndex(index) {
        const oldIndex = this._index;
        this._index = index;

        $$1.addClass(this._items[this._index], 'active');
        $$1.removeClass(this._items[oldIndex], 'active');

        return oldIndex;
    }
    /**
     * Set a timer for the next Carousel cycle.
     */
    function _setTimer() {
        if (this._timer || this._paused || this._mousePaused) {
            return;
        }

        const interval = $$1.getDataset(this._items[this._index], 'uiInterval');

        this._timer = setTimeout(
            (_) => this.cycle(),
            interval || this._options.interval,
        );
    }
    /**
     * Cycle to a specific Carousel item.
     * @param {number} index The item index to cycle to.
     */
    function _show$2(index) {
        if ($$1.getDataset(this._node, 'uiSliding')) {
            return;
        }

        index = parseInt(index);

        if (!this._options.wrap &&
            (
                index < 0 ||
                index > this._items.length - 1
            )
        ) {
            return;
        }

        const offset = getDirOffset(index, this._items.length);
        index = getIndex(index, this._items.length);

        if (index === this._index) {
            return;
        }

        const direction = getDirection$1(offset, this._index, index);

        const eventData = {
            direction,
            relatedTarget: this._items[index],
            from: this._index,
            to: index,
        };

        if (!$$1.triggerOne(this._node, 'slide.ui.carousel', { data: eventData })) {
            return;
        }

        $$1.setDataset(this._node, { uiSliding: true });
        this.pause();

        const oldIndex = this._setIndex(index);

        $$1.animate(
            this._items[this._index],
            (node, progress) => {
                if (!this._items) {
                    return;
                }

                this._update(node, this._items[oldIndex], progress, { direction });
            },
            {
                duration: this._options.transition,
            },
        ).then((_) => {
            this._updateIndicators();
            $$1.removeDataset(this._node, 'uiSliding');
            $$1.triggerEvent(this._node, 'slid.ui.carousel', { data: eventData });

            this._paused = false;
            this._setTimer();
        }).catch((_) => {
            $$1.removeDataset(this._node, 'uiSliding');
        });
    }
    /**
     * Update the position of the Carousel items.
     * @param {Node} nodeIn The new node.
     * @param {Node} nodeOut The old node.
     * @param {number} progress The progress of the cycle.
     * @param {object} options The options for updating the item positions.
     * @param {string} [options.direction] The direction to cycle to.
     * @param {Boolean} [options.dragging] Whether the item is being dragged.
     */
    function _update(nodeIn, nodeOut, progress, { direction, dragging = false } = {}) {
        const inStyles = {};
        const outStyles = {};

        if (progress >= 1) {
            if (dragging) {
                inStyles.display = '';
            } else {
                outStyles.display = '';
            }

            inStyles.transform = '';
            outStyles.transform = '';
        } else {
            const inverse = direction === 'right';

            if (dragging) {
                inStyles.display = 'block';
            } else {
                outStyles.display = 'block';
            }

            inStyles.transform = `translateX(${Math.round((1 - progress) * 100) * (inverse ? 1 : -1)}%)`;
            outStyles.transform = `translateX(${Math.round(progress * 100) * (inverse ? -1 : 1)}%)`;
        }

        $$1.setStyle(nodeIn, inStyles);
        $$1.setStyle(nodeOut, outStyles);
    }
    /**
     * Update the carousel indicators.
     */
    function _updateIndicators() {
        const oldIndicator = $$1.find('.active[data-ui-slide-to]', this._node);
        const newIndicator = $$1.find('[data-ui-slide-to="' + this._index + '"]', this._node);
        $$1.removeClass(oldIndicator, 'active');
        $$1.addClass(newIndicator, 'active');
    }

    // Carousel default options
    Carousel.defaults = {
        interval: 5000,
        transition: 500,
        keyboard: true,
        ride: false,
        pause: true,
        wrap: true,
        swipe: true,
    };

    // Carousel prototype
    const proto$4 = Carousel.prototype;

    proto$4._events = _events$2;
    proto$4._resetStyles = _resetStyles;
    proto$4._setIndex = _setIndex;
    proto$4._setTimer = _setTimer;
    proto$4._show = _show$2;
    proto$4._update = _update;
    proto$4._updateIndicators = _updateIndicators;

    // Carousel init
    initComponent('carousel', Carousel);

    // Carousel events
    $$1((_) => {
        const nodes = $$1.find('[data-ui-ride="carousel"]');

        for (const node of nodes) {
            Carousel.init(node);
        }
    });

    $$1.addEventDelegate(document, 'click.ui.carousel', '[data-ui-slide]', (e) => {
        e.preventDefault();

        const target = getTarget(e.currentTarget, '.carousel');
        const carousel = Carousel.init(target);
        const slide = $$1.getDataset(e.currentTarget, 'uiSlide');

        if (slide === 'prev') {
            carousel.prev();
        } else {
            carousel.next();
        }
    });

    $$1.addEventDelegate(document, 'click.ui.carousel', '[data-ui-slide-to]', (e) => {
        e.preventDefault();

        const target = getTarget(e.currentTarget, '.carousel');
        const carousel = Carousel.init(target);
        const slideTo = $$1.getDataset(e.currentTarget, 'uiSlideTo');

        carousel.show(slideTo);
    });

    /**
     * Collapse Class
     * @class
     */
    class Collapse extends BaseComponent {
        /**
         * New Collapse constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [options] The options to create the Collapse with.
         */
        constructor(node, options) {
            super(node, options);

            const id = $$1.getAttribute(this._node, 'id');
            this._triggers = $$1.find(
                `[data-ui-toggle="collapse"][data-ui-target="#${id}"]`,
            );

            if (this._options.parent) {
                this._parent = $$1.closest(this._node, this._options.parent).shift();
            }
        }

        /**
         * Dispose the Collapse.
         */
        dispose() {
            this._triggers = null;
            this._parent = null;

            super.dispose();
        }

        /**
         * Hide the element.
         */
        hide() {
            if (
                $$1.getDataset(this._node, 'uiAnimating') ||
                !$$1.hasClass(this._node, 'show') ||
                !$$1.triggerOne(this._node, 'hide.ui.collapse')
            ) {
                return;
            }

            $$1.setDataset(this._node, { uiAnimating: 'out' });
            $$1.addClass(this._triggers, 'collapsed');
            $$1.addClass(this._triggers, 'collapsing');

            $$1.squeezeOut(this._node, {
                direction: this._options.direction,
                duration: this._options.duration,
            }).then((_) => {
                $$1.removeClass(this._node, 'show');
                $$1.removeClass(this._triggers, 'collapsing');
                $$1.setAttribute(this._triggers, { 'aria-expanded': false });
                $$1.removeDataset(this._node, 'uiAnimating');
                $$1.triggerEvent(this._node, 'hidden.ui.collapse');
            }).catch((_) => {
                if ($$1.getDataset(this._node, 'uiAnimating') === 'out') {
                    $$1.removeDataset(this._node, 'uiAnimating');
                }
            });
        }

        /**
         * Show the element.
         */
        show() {
            if (
                $$1.getDataset(this._node, 'uiAnimating') ||
                $$1.hasClass(this._node, 'show')
            ) {
                return;
            }

            const collapses = [];
            if (this._parent) {
                const siblings = $$1.find('.collapse.show', this._parent);

                for (const sibling of siblings) {
                    const collapse = this.constructor.init(sibling);

                    if (!$$1.isSame(this._parent, collapse._parent)) {
                        continue;
                    }

                    collapses.push(collapse);
                }
            }

            if (!$$1.triggerOne(this._node, 'show.ui.collapse')) {
                return;
            }

            for (const collapse of collapses) {
                collapse.hide();
            }

            $$1.setDataset(this._node, { uiAnimating: 'in' });
            $$1.addClass(this._node, 'show');
            $$1.removeClass(this._triggers, 'collapsed');
            $$1.addClass(this._triggers, 'collapsing');

            $$1.squeezeIn(this._node, {
                direction: this._options.direction,
                duration: this._options.duration,
            }).then((_) => {
                $$1.removeClass(this._triggers, 'collapsing');
                $$1.setAttribute(this._triggers, { 'aria-expanded': true });
                $$1.removeDataset(this._node, 'uiAnimating');
                $$1.triggerEvent(this._node, 'shown.ui.collapse');
            }).catch((_) => {
                if ($$1.getDataset(this._node, 'uiAnimating') === 'in') {
                    $$1.removeDataset(this._node, 'uiAnimating');
                }
            });
        }

        /**
         * Toggle the element.
         */
        toggle() {
            if ($$1.hasClass(this._node, 'show')) {
                this.hide();
            } else {
                this.show();
            }
        }
    }

    // Collapse default options
    Collapse.defaults = {
        direction: 'bottom',
        duration: 250,
    };

    // Collapse init
    initComponent('collapse', Collapse);

    // Collapse events
    $$1.addEventDelegate(document, 'click.ui.collapse', '[data-ui-toggle="collapse"]', (e) => {
        e.preventDefault();

        const selector = getTargetSelector(e.currentTarget);
        const targets = $$1.find(selector);

        for (const target of targets) {
            const collapse = Collapse.init(target);
            collapse.toggle();
        }
    });

    /**
     * Popper Helpers
     */

    const poppers = new Set();

    let running$1 = false;

    /**
     * Add a Popper to the set, and attach the Popper events.
     * @param {Popper} popper The Popper.
     */
    function addPopper(popper) {
        poppers.add(popper);

        if (running$1) {
            return;
        }

        $$1.addEvent(
            window$1,
            'resize.ui.popper',
            $$1.debounce((_) => {
                for (const popper of poppers) {
                    popper.update();
                }
            }),
        );

        $$1.addEvent(
            document,
            'scroll.ui.popper',
            $$1.debounce((e) => {
                for (const popper of poppers) {
                    if (!$$1._isDocument(e.target) && !$$1.hasDescendent(e.target, popper.node)) {
                        continue;
                    }

                    popper.update();
                }
            }),
            true,
        );

        running$1 = true;
    }
    /**
     * Get the actual placement of the Popper.
     * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
     * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
     * @param {object} minimumBox The computed minimum bounding rectangle of the container.
     * @param {string} placement The initial placement of the Popper.
     * @param {number} spacing The amount of spacing to use.
     * @return {string} The new placement of the Popper.
     */
    function getPopperPlacement(nodeBox, referenceBox, minimumBox, placement, spacing) {
        const spaceTop = referenceBox.top - minimumBox.top;
        const spaceRight = minimumBox.right - referenceBox.right;
        const spaceBottom = minimumBox.bottom - referenceBox.bottom;
        const spaceLeft = referenceBox.left - minimumBox.left;

        if (placement === 'top') {
            // if node is bigger than space top and there is more room on bottom
            if (spaceTop < nodeBox.height + spacing &&
                spaceBottom > spaceTop) {
                return 'bottom';
            }
        } else if (placement === 'right') {
            // if node is bigger than space right and there is more room on left
            if (spaceRight < nodeBox.width + spacing &&
                spaceLeft > spaceRight) {
                return 'left';
            }
        } else if (placement === 'bottom') {
            // if node is bigger than space bottom and there is more room on top
            if (spaceBottom < nodeBox.height + spacing &&
                spaceTop > spaceBottom) {
                return 'top';
            }
        } else if (placement === 'left') {
            // if node is bigger than space left and there is more room on right
            if (spaceLeft < nodeBox.width + spacing &&
                spaceRight > spaceLeft) {
                return 'right';
            }
        } else if (placement === 'auto') {
            const maxVSpace = Math.max(spaceTop, spaceBottom);
            const maxHSpace = Math.max(spaceRight, spaceLeft);
            const minVSpace = Math.min(spaceTop, spaceBottom);

            if (
                maxHSpace > maxVSpace &&
                maxHSpace >= nodeBox.width + spacing &&
                minVSpace + referenceBox.height >= nodeBox.height + spacing - Math.max(0, nodeBox.height - referenceBox.height)
            ) {
                return spaceLeft > spaceRight ?
                    'left' :
                    'right';
            }

            const minHSpace = Math.min(spaceRight, spaceLeft);

            if (
                maxVSpace >= nodeBox.height + spacing &&
                minHSpace + referenceBox.width >= nodeBox.width + spacing - Math.max(0, nodeBox.width - referenceBox.width)
            ) {
                return spaceBottom > spaceTop ?
                    'bottom' :
                    'top';
            }

            const maxSpace = Math.max(maxVSpace, maxHSpace);

            if (spaceBottom === maxSpace && spaceBottom >= nodeBox.height + spacing) {
                return 'bottom';
            }

            if (spaceTop === maxSpace && spaceTop >= nodeBox.height + spacing) {
                return 'top';
            }

            if (spaceRight === maxSpace && spaceRight >= nodeBox.width + spacing) {
                return 'right';
            }

            if (spaceLeft === maxSpace && spaceLeft >= nodeBox.width + spacing) {
                return 'left';
            }

            return 'bottom';
        }

        return placement;
    }
    /**
     * Remove a Popper from the set, and detach the Popper events.
     * @param {Popper} popper The Popper.
     */
    function removePopper(popper) {
        poppers.delete(popper);

        if (poppers.size) {
            return;
        }

        $$1.removeEvent(window$1, 'resize.ui.popper');
        $$1.removeEvent(document, 'scroll.ui.popper');

        running$1 = false;
    }

    /**
     * Popper Class
     * @class
     */
    class Popper extends BaseComponent {
        /**
         * New Popper constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} options The options to create the Popper with.
         */
        constructor(node, options) {
            super(node, options);

            this._placement = $$1.getDataset(this._node, 'uiPlacement');

            $$1.setStyle(this._node, {
                margin: 0,
                position: 'absolute',
                top: 0,
                right: 'initial',
                bottom: 'initial',
                left: 0,
            });

            addPopper(this);

            this.update();
        }

        /**
         * Dispose the Popper.
         */
        dispose() {
            if (this._placement) {
                $$1.setDataset(this._node, { uiPlacement: this._placement });
            } else {
                $$1.removeDataset(this._node, 'uiPlacement');
            }

            if (!this._options.noAttributes) {
                $$1.removeDataset(this._options.reference, 'uiPlacement');
            }

            removePopper(this);

            super.dispose();
        }

        /**
         * Update the Popper position.
         */
        update() {
            if (!$$1.isConnected(this._node) || !$$1.isVisible(this._node)) {
                return;
            }

            // reset position
            const resetStyle = {};

            if (this._options.useGpu) {
                resetStyle.transform = '';
            } else {
                resetStyle.marginLeft = 0;
                resetStyle.marginTop = 0;
            }

            $$1.setStyle(this._node, resetStyle);

            if (this._options.beforeUpdate) {
                this._options.beforeUpdate(this._node, this._options.reference);
            }

            // calculate boxes
            const nodeBox = $$1.rect(this._node, { offset: true });
            const referenceBox = $$1.rect(this._options.reference, { offset: true });
            const windowBox = getScrollContainer(window$1, document);

            const scrollParent = $$1.closest(
                this._node,
                (parent) =>
                    $$1.css(parent, 'position') === 'relative' &&
                    ['overflow', 'overflowX', 'overflowY'].some((overflow) =>
                        ['auto', 'scroll'].includes(
                            $$1.css(parent, overflow),
                        ),
                    ),
                document.body,
            ).shift();

            const scrollBox = scrollParent ?
                getScrollContainer(scrollParent, scrollParent) :
                null;

            const containerBox = this._options.container ?
                $$1.rect(this._options.container, { offset: true }) :
                null;

            const minimumBox = {
                ...windowBox,
            };

            if (scrollBox) {
                minimumBox.top = Math.max(minimumBox.top, scrollBox.top);
                minimumBox.right = Math.min(minimumBox.right, scrollBox.right);
                minimumBox.bottom = Math.min(minimumBox.bottom, scrollBox.bottom);
                minimumBox.left = Math.max(minimumBox.left, scrollBox.left);
            }

            if (containerBox) {
                minimumBox.top = Math.max(minimumBox.top, containerBox.top);
                minimumBox.right = Math.min(minimumBox.right, containerBox.right);
                minimumBox.bottom = Math.min(minimumBox.bottom, containerBox.bottom);
                minimumBox.left = Math.max(minimumBox.left, containerBox.left);
            }

            if (scrollBox || containerBox) {
                minimumBox.x = minimumBox.left;
                minimumBox.y = minimumBox.top;
                minimumBox.width = minimumBox.right - minimumBox.left;
                minimumBox.height = minimumBox.bottom - minimumBox.top;
            }

            // get optimal placement
            const placement = this._options.fixed && this._options.placement !== 'auto' ?
                this._options.placement :
                getPopperPlacement(
                    nodeBox,
                    referenceBox,
                    minimumBox,
                    this._options.placement,
                    this._options.spacing + 2,
                );

            if (!this._options.noAttributes) {
                $$1.setDataset(this._options.reference, { uiPlacement: placement });
            }

            $$1.setDataset(this._node, { uiPlacement: placement });

            // get auto position
            const position = this._options.position;

            // calculate actual offset
            const offset = {
                x: Math.round(referenceBox.x),
                y: Math.round(referenceBox.y),
            };

            // offset for relative parent
            const relativeParent = $$1.closest(
                this._node,
                (parent) =>
                    $$1.css(parent, 'position') === 'relative',
                document.body,
            ).shift();
            const relativeBox = relativeParent ?
                $$1.rect(relativeParent, { offset: true }) :
                null;

            if (relativeBox) {
                offset.x -= Math.round(relativeBox.x);
                offset.y -= Math.round(relativeBox.y);
            }

            // offset for placement
            if (placement === 'top') {
                offset.y -= Math.round(nodeBox.height) + this._options.spacing;
            } else if (placement === 'right') {
                offset.x += Math.round(referenceBox.width) + this._options.spacing;
            } else if (placement === 'bottom') {
                offset.y += Math.round(referenceBox.height) + this._options.spacing;
            } else if (placement === 'left') {
                offset.x -= Math.round(nodeBox.width) + this._options.spacing;
            }

            // offset for position
            if (['top', 'bottom'].includes(placement)) {
                const deltaX = Math.round(nodeBox.width) - Math.round(referenceBox.width);

                if (position === 'center') {
                    offset.x -= Math.round(deltaX / 2);
                } else if (position === 'end') {
                    offset.x -= deltaX;
                }
            } else {
                const deltaY = Math.round(nodeBox.height) - Math.round(referenceBox.height);

                if (position === 'center') {
                    offset.y -= Math.round(deltaY / 2);
                } else if (position === 'end') {
                    offset.y -= deltaY;
                }
            }

            // compensate for margins
            offset.x -= parseInt($$1.css(this._node, 'marginLeft'));
            offset.y -= parseInt($$1.css(this._node, 'marginTop'));

            // corrective positioning
            if (['left', 'right'].includes(placement)) {
                let offsetY = offset.y;
                let refTop = referenceBox.top;

                if (relativeBox) {
                    offsetY += relativeBox.top;
                    refTop -= relativeBox.top;
                }

                const minSize = this._options.minContact !== null ?
                    this._options.minContact :
                    Math.min(referenceBox.height, nodeBox.height);

                if (offsetY + nodeBox.height > minimumBox.bottom) {
                    // bottom of offset node is below the container
                    const diff = offsetY + nodeBox.height - minimumBox.bottom;
                    offset.y = Math.max(
                        refTop - nodeBox.height + minSize,
                        offset.y - diff,
                    );
                }

                if (offsetY < minimumBox.top) {
                    // top of offset node is above the container
                    const diff = offsetY - minimumBox.top;
                    offset.y = Math.min(
                        refTop + referenceBox.height - minSize,
                        offset.y - diff,
                    );
                }
            } else {
                let offsetX = offset.x;
                let refLeft = referenceBox.left;

                if (relativeBox) {
                    offsetX += relativeBox.left;
                    refLeft -= relativeBox.left;
                }

                const minSize = this._options.minContact !== null ?
                    this._options.minContact :
                    Math.min(referenceBox.width, nodeBox.width);

                if (offsetX + nodeBox.width > minimumBox.right) {
                    // right of offset node is to the right of the container
                    const diff = offsetX + nodeBox.width - minimumBox.right;
                    offset.x = Math.max(
                        refLeft - nodeBox.width + minSize,
                        offset.x - diff,
                    );
                }

                if (offsetX < minimumBox.left) {
                    // left of offset node is to the left of the container
                    const diff = offsetX - minimumBox.left;
                    offset.x = Math.min(
                        refLeft + referenceBox.width - minSize,
                        offset.x - diff,
                    );
                }
            }

            offset.x = Math.round(offset.x);
            offset.y = Math.round(offset.y);

            // compensate for scroll parent
            if (scrollParent) {
                offset.x += $$1.getScrollX(scrollParent);
                offset.y += $$1.getScrollY(scrollParent);
            }

            // update position
            const style = {};
            if (this._options.useGpu) {
                style.transform = `translate3d(${offset.x}px , ${offset.y}px , 0)`;
            } else {
                style.marginLeft = `${offset.x}px`;
                style.marginTop = `${offset.y}px`;
            }

            $$1.setStyle(this._node, style);

            // update arrow
            if (this._options.arrow) {
                this._updateArrow(placement, position);
            }

            if (this._options.afterUpdate) {
                this._options.afterUpdate(this._node, this._options.reference, placement, position);
            }
        }
    }

    /**
     * Dropdown Class
     * @class
     */
    class Dropdown extends BaseComponent {
        /**
         * New Dropdown constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [options] The options to create the Dropdown with.
         */
        constructor(node, options) {
            super(node, options);

            this._menuNode = $$1.next(this._node, '.dropdown-menu').shift();

            if (this._options.reference) {
                if (this._options.reference === 'parent') {
                    this._referenceNode = $$1.parent(this._node).shift();
                } else {
                    this._referenceNode = $$1.findOne(this._options.reference);
                }
            } else {
                this._referenceNode = this._node;
            }

            // Attach popper
            if (this._options.display !== 'static' && $$1.closest(this._node, '.navbar-nav').length) {
                this._options.display = 'static';
            }
        }

        /**
         * Dispose the Dropdown.
         */
        dispose() {
            if (this._popper) {
                this._popper.dispose();
                this._popper = null;
            }

            this._menuNode = null;
            this._referenceNode = null;

            super.dispose();
        }

        /**
         * Hide the Dropdown.
         */
        hide() {
            if (
                $$1.getDataset(this._menuNode, 'uiAnimating') ||
                !$$1.hasClass(this._menuNode, 'show') ||
                !$$1.triggerOne(this._node, 'hide.ui.dropdown')
            ) {
                return;
            }

            $$1.setDataset(this._menuNode, { uiAnimating: 'out' });

            $$1.fadeOut(this._menuNode, {
                duration: this._options.duration,
            }).then((_) => {
                if (this._popper) {
                    this._popper.dispose();
                    this._popper = null;
                }

                $$1.removeClass(this._menuNode, 'show');
                $$1.setAttribute(this._node, { 'aria-expanded': false });
                $$1.removeDataset(this._menuNode, 'uiAnimating');
                $$1.triggerEvent(this._node, 'hidden.ui.dropdown');
            }).catch((_) => {
                if ($$1.getDataset(this._menuNode, 'uiAnimating') === 'out') {
                    $$1.removeDataset(this._menuNode, 'uiAnimating');
                }
            });
        }

        /**
         * Show the Dropdown.
         */
        show() {
            if (
                $$1.getDataset(this._menuNode, 'uiAnimating') ||
                $$1.hasClass(this._menuNode, 'show') ||
                !$$1.triggerOne(this._node, 'show.ui.dropdown')
            ) {
                return;
            }

            $$1.setDataset(this._menuNode, { uiAnimating: 'in' });
            $$1.addClass(this._menuNode, 'show');

            if (this._options.display === 'dynamic') {
                this._popper = new Popper(this._menuNode, {
                    reference: this._referenceNode,
                    placement: this._options.placement,
                    position: this._options.position,
                    fixed: this._options.fixed,
                    spacing: this._options.spacing,
                    minContact: this._options.minContact,
                });
            }

            window$1.requestAnimationFrame((_) => {
                this.update();
            });

            $$1.fadeIn(this._menuNode, {
                duration: this._options.duration,
            }).then((_) => {
                $$1.setAttribute(this._node, { 'aria-expanded': true });
                $$1.removeDataset(this._menuNode, 'uiAnimating');
                $$1.triggerEvent(this._node, 'shown.ui.dropdown');
            }).catch((_) => {
                if ($$1.getDataset(this._menuNode, 'uiAnimating') === 'in') {
                    $$1.removeDataset(this._menuNode, 'uiAnimating');
                }
            });
        }

        /**
         * Toggle the Dropdown.
         */
        toggle() {
            if ($$1.hasClass(this._menuNode, 'show')) {
                this.hide();
            } else {
                this.show();
            }
        }

        /**
         * Update the Dropdown position.
         */
        update() {
            if (this._popper) {
                this._popper.update();
            }
        }
    }

    let clickTarget;

    // Track the target of mousedown events
    $$1.addEvent(window$1, 'mousedown.ui', (e) => {
        clickTarget = e.target;
    }, { capture: true });

    $$1.addEvent(window$1, 'mouseup.ui', (_) => {
        setTimeout((_) => {
            clickTarget = null;
        }, 0);
    }, { capture: true });

    /**
     * Get a click event target.
     * @param {Event} e The click event.
     * @return {HTMLElement} The click event target.
     */
    function getClickTarget(e) {
        return clickTarget || e.target;
    }

    // Dropdown default options
    Dropdown.defaults = {
        display: 'dynamic',
        duration: 100,
        placement: 'bottom',
        position: 'start',
        fixed: false,
        spacing: 3,
        minContact: false,
    };

    // Dropdown init
    initComponent('dropdown', Dropdown);

    // Dropdown events
    $$1.addEventDelegate(document, 'click.ui.dropdown keyup.ui.dropdown', '[data-ui-toggle="dropdown"]', (e) => {
        if (e.code && e.code !== 'Space') {
            return;
        }

        e.preventDefault();

        const dropdown = Dropdown.init(e.currentTarget);
        dropdown.toggle();
    });

    $$1.addEventDelegate(document, 'keydown.ui.dropdown', '[data-ui-toggle="dropdown"]', (e) => {
        switch (e.code) {
            case 'ArrowDown':
            case 'ArrowUp':
                e.preventDefault();

                const node = e.currentTarget;
                const dropdown = Dropdown.init(node);

                if (!$$1.hasClass(dropdown._menuNode, 'show')) {
                    dropdown.show();
                }

                const focusNode = $$1.findOne('.dropdown-item:not([tabindex="-1"])', dropdown._menuNode);
                $$1.focus(focusNode);
                break;
        }
    });

    $$1.addEventDelegate(document, 'keydown.ui.dropdown', '.dropdown-menu.show .dropdown-item', (e) => {
        let focusNode;

        switch (e.code) {
            case 'ArrowDown':
                focusNode = $$1.next(e.currentTarget, '.dropdown-item:not([tabindex="-1"])').shift();
                break;
            case 'ArrowUp':
                focusNode = $$1.prev(e.currentTarget, '.dropdown-item:not([tabindex="-1"])').pop();
                break;
            default:
                return;
        }

        e.preventDefault();

        $$1.focus(focusNode);
    });

    $$1.addEvent(document, 'click.ui.dropdown', (e) => {
        const target = getClickTarget(e);
        const nodes = $$1.find('.dropdown-menu.show');

        for (const node of nodes) {
            const toggle = $$1.siblings(node, '[data-ui-toggle="dropdown"]').shift();
            const dropdown = Dropdown.init(toggle);
            const hasDescendent = $$1.hasDescendent(dropdown._menuNode, target);
            const autoClose = dropdown._options.autoClose;

            if (
                $$1.isSame(dropdown._node, target) ||
                (
                    hasDescendent &&
                    (
                        $$1.is(target, 'form') ||
                        $$1.closest(target, 'form', dropdown._menuNode).length ||
                        autoClose === 'outside' ||
                        autoClose === false
                    )
                ) ||
                (
                    !hasDescendent &&
                    !$$1.isSame(dropdown._menuNode, target) &&
                    (
                        autoClose === 'inside' ||
                        autoClose === false
                    )
                )
            ) {
                continue;
            }

            dropdown.hide();
        }
    }, { capture: true });

    $$1.addEvent(document, 'keyup.ui.dropdown', (e) => {
        if (!['Tab', 'Escape'].includes(e.code)) {
            return;
        }

        let stopped = false;
        const nodes = $$1.find('.dropdown-menu.show');

        for (const node of nodes) {
            const toggle = $$1.siblings(node, '[data-ui-toggle="dropdown"]').shift();
            const dropdown = Dropdown.init(toggle);

            if (
                (e.code === 'Tab' && $$1.isSame(dropdown._node, e.target)) ||
                (
                    $$1.hasDescendent(dropdown._menuNode, e.target) &&
                    (
                        e.code === 'Tab' ||
                        $$1.is(e.target, 'form') ||
                        $$1.closest(e.target, 'form', dropdown._menuNode).length
                    )
                )
            ) {
                continue;
            }

            if (!stopped) {
                stopped = true;
                e.stopPropagation();
            }

            dropdown.hide();
        }
    }, { capture: true });

    /**
     * FocusTrap Helpers
     */

    const focusTraps = new Set();

    let running = false;
    let reverse = false;

    /**
     * Add a FocusTrap to the set, and attach the FocusTrap events.
     * @param {FocusTrap} focusTrap The FocusTrap.
     */
    function addFocusTrap(focusTrap) {
        focusTraps.add(focusTrap);

        if (running) {
            return;
        }

        $$1.addEvent(document, 'focusin.ui.focustrap', (e) => {
            const activeTarget = [...focusTraps].pop()._node;

            if (
                $$1._isDocument(e.target) ||
                $$1.isSame(activeTarget, e.target) ||
                $$1.hasDescendent(activeTarget, e.target)
            ) {
                return;
            }

            const focusable = $$1.find('a, button, input, textarea, select, details, [tabindex], [contenteditable="true"]', activeTarget)
                .filter((node) => $$1.is(node, ':not(:disabled, .disabled)') && $$1.getAttribute(node, 'tabindex') >= 0 && $$1.isVisible(node));

            const focusTarget = reverse ?
                focusable.pop() :
                focusable.shift();

            $$1.focus(focusTarget || activeTarget);
        }, {
            capture: true,
        });

        $$1.addEvent(document, 'keydown.ui.focustrap', (e) => {
            if (e.key !== 'Tab') {
                return;
            }

            reverse = e.shiftKey;
        }, {
            capture: true,
        });

        running = true;
        reverse = false;
    }
    /**
     * Remove a FocusTrap from the set, and detach the FocusTrap events.
     * @param {FocusTrap} focusTrap The FocusTrap.
     */
    function removeFocusTrap(focusTrap) {
        focusTraps.delete(focusTrap);

        if (focusTraps.size) {
            return;
        }

        $$1.removeEvent(document, 'focusin.ui.focustrap');
        $$1.removeEvent(document, 'keydown.ui.focustrap');

        running = false;
    }

    /**
     * FocusTrap Class
     * @class
     */
    class FocusTrap extends BaseComponent {
        /**
         * Activate the FocusTrap.
         */
        activate() {
            if (this._active) {
                return;
            }

            addFocusTrap(this);

            if (this._options.autoFocus) {
                $.focus(this._node);
            }

            this._active = true;
        }

        /**
         * Deactivate the FocusTrap.
         */
        deactivate() {
            if (!this._active) {
                return;
            }

            removeFocusTrap(this);
            this._active = false;
        }

        /**
         * Dispose the FocusTrap.
         */
        dispose() {
            this.deactivate();

            super.dispose();
        }
    }

    // FocusTrap default options
    FocusTrap.defaults = {
        autoFocus: true,
    };

    // FocusTrap init
    initComponent('focustrap', FocusTrap);

    /**
     * Modal Class
     * @class
     */
    class Modal extends BaseComponent {
        /**
         * New Modal constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [options] The options to create the Modal with.
         */
        constructor(node, options) {
            super(node, options);

            this._dialog = $$1.child(this._node, '.modal-dialog').shift();

            if (this._options.show) {
                this.show();
            }

            if (this._options.focus) {
                this._focusTrap = FocusTrap.init(this._node);
            }
        }

        /**
         * Dispose the Modal.
         */
        dispose() {
            if (this._focusTrap) {
                this._focusTrap.dispose();
                this._focusTrap = null;
            }

            this._dialog = null;
            this._activeTarget = null;
            this._backdrop = null;

            super.dispose();
        }

        /**
         * Hide the Modal.
         */
        hide() {
            if (
                $$1.getDataset(this._dialog, 'uiAnimating') ||
                !$$1.hasClass(this._node, 'show') ||
                !$$1.triggerOne(this._node, 'hide.ui.modal')
            ) {
                return;
            }

            $$1.stop(this._dialog);
            $$1.setDataset(this._dialog, { uiAnimating: 'out' });

            if (this._focusTrap) {
                this._focusTrap.deactivate();
            }

            const stackSize = $$1.find('.modal.show').length - 1;

            Promise.all([
                $$1.fadeOut(this._dialog, {
                    duration: this._options.duration,
                }),
                $$1.dropOut(this._dialog, {
                    duration: this._options.duration,
                    direction: 'top',
                }),
                $$1.fadeOut(this._backdrop, {
                    duration: this._options.duration,
                }),
            ]).then((_) => {
                $$1.setAttribute(this._node, {
                    'aria-hidden': true,
                    'aria-modal': false,
                });

                resetScrollPadding(this._dialog);

                if (stackSize) {
                    $$1.setStyle(this._node, { zIndex: '' });
                } else {
                    if (this._scrollPadding) {
                        resetScrollPadding();
                        this._scrollPadding = false;
                    }

                    $$1.removeClass(document.body, 'modal-open');
                }

                $$1.removeClass(this._node, 'show');

                if (this._options.backdrop) {
                    $$1.remove(this._backdrop);
                    this._backdrop = null;
                }

                if (this._activeTarget) {
                    $$1.focus(this._activeTarget);
                    this._activeTarget = null;
                }

                $$1.removeDataset(this._dialog, 'uiAnimating');
                $$1.triggerEvent(this._node, 'hidden.ui.modal');
            }).catch((_) => {
                if ($$1.getDataset(this._dialog, 'uiAnimating') === 'out') {
                    $$1.removeDataset(this._dialog, 'uiAnimating');
                }
            });
        }

        /**
         * Show the Modal.
         */
        show() {
            if (
                $$1.getDataset(this._dialog, 'uiAnimating') ||
                $$1.hasClass(this._node, 'show') ||
                !$$1.triggerOne(this._node, 'show.ui.modal', { data: { relatedTarget: this._activeTarget } })
            ) {
                return;
            }

            $$1.setDataset(this._dialog, { uiAnimating: true });

            const stackSize = $$1.find('.modal.show').length;

            $$1.removeClass(document.body, 'modal-open');

            addScrollPadding(this._dialog);

            if (stackSize) {
                let zIndex = $$1.css(this._node, 'zIndex');
                zIndex = parseInt(zIndex);
                zIndex += stackSize * 20;

                $$1.setStyle(this._node, { zIndex });
            } else if (!$$1.findOne('.offcanvas.show')) {
                this._scrollPadding = true;
                addScrollPadding();
            }

            $$1.addClass(document.body, 'modal-open');

            $$1.addClass(this._node, 'show');

            if (this._options.backdrop) {
                this._backdrop = $$1.create('div', {
                    class: 'modal-backdrop',
                });

                $$1.append(document.body, this._backdrop);

                if (stackSize) {
                    let zIndex = $$1.css(this._backdrop, 'zIndex');
                    zIndex = parseInt(zIndex);
                    zIndex += stackSize * 20;

                    $$1.setStyle(this._backdrop, { zIndex });
                }
            }

            Promise.all([
                $$1.fadeIn(this._dialog, {
                    duration: this._options.duration,
                }),
                $$1.dropIn(this._dialog, {
                    duration: this._options.duration,
                    direction: 'top',
                }),
                $$1.fadeIn(this._backdrop, {
                    duration: this._options.duration,
                }),
            ]).then((_) => {
                $$1.setAttribute(this._node, {
                    'aria-hidden': false,
                    'aria-modal': true,
                });

                if (this._focusTrap) {
                    this._focusTrap.activate();
                }

                $$1.removeDataset(this._dialog, 'uiAnimating');
                $$1.triggerEvent(this._node, 'shown.ui.modal');
            }).catch((_) => {
                if ($$1.getDataset(this._dialog, 'uiAnimating') === 'in') {
                    $$1.removeDataset(this._dialog, 'uiAnimating');
                }
            });
        }

        /**
         * Toggle the Modal.
         */
        toggle() {
            if ($$1.hasClass(this._node, 'show')) {
                this.hide();
            } else {
                this.show();
            }
        }
    }

    /**
     * Modal Helpers
     */

    /**
     * Get the top modal.
     * @return {Modal} The Modal.
     */
    function getTopModal() {
        const nodes = $$1.find('.modal.show');

        if (!nodes.length) {
            return null;
        }

        // find modal with highest zIndex
        let node = nodes.shift();
        let highestZIndex = $$1.getStyle(node, 'zIndex');

        for (const otherNode of nodes) {
            const newZIndex = $$1.getStyle(otherNode, 'zIndex');

            if (newZIndex <= highestZIndex) {
                continue;
            }

            node = otherNode;
            highestZIndex = newZIndex;
        }

        return Modal.init(node);
    }

    /**
     * Start a zoom in/out animation.
     */
    function _zoom() {
        if ($$1.getDataset(this._dialog, 'uiAnimating')) {
            return;
        }

        $$1.stop(this._dialog);

        $$1.animate(
            this._dialog,
            (node, progress) => {
                if (progress >= 1) {
                    $$1.setStyle(node, { transform: '' });
                    return;
                }

                const zoomOffset = (progress < .5 ? progress : (1 - progress)) / 20;
                $$1.setStyle(node, { transform: `scale(${1 + zoomOffset})` });
            },
            {
                duration: 200,
            },
        ).catch((_) => {
            //
        });
    }

    // Modal default options
    Modal.defaults = {
        duration: 250,
        backdrop: true,
        focus: true,
        show: false,
        keyboard: true,
    };

    // Modal prototype
    const proto$3 = Modal.prototype;

    proto$3._zoom = _zoom;

    // Modal init
    initComponent('modal', Modal);

    // Modal events
    $$1.addEventDelegate(document, 'click.ui.modal', '[data-ui-toggle="modal"]', (e) => {
        e.preventDefault();

        const target = getTarget(e.currentTarget, '.modal');
        const modal = Modal.init(target);
        modal._activeTarget = e.currentTarget;
        modal.show();
    });

    $$1.addEventDelegate(document, 'click.ui.modal', '[data-ui-dismiss="modal"]', (e) => {
        e.preventDefault();

        const target = getTarget(e.currentTarget, '.modal');
        const modal = Modal.init(target);
        modal.hide();
    });

    // Events must be attached to the window, so offcanvas events are triggered first
    $$1.addEvent(window$1, 'click.ui.modal', (e) => {
        const target = getClickTarget(e);

        if ($$1.is(target, '[data-ui-dismiss]')) {
            return;
        }

        const modal = getTopModal();

        if (
            !modal ||
            !modal._options.backdrop ||
            (modal._node !== target && $$1.hasDescendent(modal._node, target))
        ) {
            return;
        }

        if (modal._options.backdrop === 'static') {
            modal._zoom();
            return;
        }

        modal.hide();
    });

    $$1.addEvent(window$1, 'keyup.ui.modal', (e) => {
        if (e.code !== 'Escape') {
            return;
        }

        const modal = getTopModal();

        if (!modal || !modal._options.keyboard) {
            return;
        }

        if (modal._options.backdrop === 'static') {
            modal._zoom();
            return;
        }

        modal.hide();
    });

    /**
     * Offcanvas Helpers
     */

    /**
     * Get the slide animation direction.
     * @param {HTMLElement} node The offcanvas node.
     * @return {string} The animation direction.
     */
    function getDirection(node) {
        if ($$1.hasClass(node, 'offcanvas-end')) {
            return 'right';
        }

        if ($$1.hasClass(node, 'offcanvas-bottom')) {
            return 'bottom';
        }

        if ($$1.hasClass(node, 'offcanvas-start')) {
            return 'left';
        }

        return 'top';
    }

    /**
     * Offcanvas Class
     * @class
     */
    class Offcanvas extends BaseComponent {
        /**
         * New Offcanvas constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [options] The options to create the Offcanvas with.
         */
        constructor(node, options) {
            super(node, options);

            if (!this._options.scroll || this._options.backdrop) {
                this._focusTrap = FocusTrap.init(this._node);
            }
        }

        /**
         * Dispose the Offcanvas.
         */
        dispose() {
            if (this._focusTrap) {
                this._focusTrap.dispose();
                this._focusTrap = null;
            }

            this._activeTarget = null;

            super.dispose();
        }

        /**
         * Hide the Offcanvas.
         */
        hide() {
            if (
                $$1.getDataset(this._node, 'uiAnimating') ||
                !$$1.hasClass(this._node, 'show') ||
                !$$1.triggerOne(this._node, 'hide.ui.offcanvas')
            ) {
                return;
            }

            $$1.setDataset(this._node, { uiAnimating: 'out' });

            if (this._focusTrap) {
                this._focusTrap.deactivate();
            }

            Promise.all([
                $$1.fadeOut(this._node, {
                    duration: this._options.duration,
                }),
                $$1.dropOut(this._node, {
                    duration: this._options.duration,
                    direction: getDirection(this._node),
                }),
            ]).then((_) => {
                $$1.setAttribute(this._node, {
                    'aria-hidden': true,
                    'aria-modal': false,
                });

                $$1.removeClass(this._node, 'show');

                if (this._options.backdrop) {
                    $$1.removeClass(document.body, 'offcanvas-backdrop');
                }

                if (!this._options.scroll) {
                    resetScrollPadding();
                    $$1.setStyle(document.body, { overflow: '' });
                }

                if (this._activeTarget) {
                    $$1.focus(this._activeTarget);
                    this._activeTarget = null;
                }

                $$1.removeDataset(this._node, 'uiAnimating');
                $$1.triggerEvent(this._node, 'hidden.ui.offcanvas');
            }).catch((_) => {
                if ($$1.getDataset(this._node, 'uiAnimating') === 'out') {
                    $$1.removeDataset(this._node, 'uiAnimating');
                }
            });
        }

        /**
         * Show the Offcanvas.
         */
        show() {
            if (
                $$1.getDataset(this._node, 'uiAnimating') ||
                $$1.hasClass(this._node, 'show') ||
                $$1.findOne('.offcanvas.show') ||
                !$$1.triggerOne(this._node, 'show.ui.offcanvas')
            ) {
                return;
            }

            $$1.setDataset(this._node, { uiAnimating: 'in' });
            $$1.addClass(this._node, 'show');

            if (this._options.backdrop) {
                $$1.addClass(document.body, 'offcanvas-backdrop');
            }

            if (!this._options.scroll) {
                addScrollPadding();
                $$1.setStyle(document.body, { overflow: 'hidden' });
            }

            Promise.all([
                $$1.fadeIn(this._node, {
                    duration: this._options.duration,
                }),
                $$1.dropIn(this._node, {
                    duration: this._options.duration,
                    direction: getDirection(this._node),
                }),
            ]).then((_) => {
                $$1.setAttribute(this._node, {
                    'aria-hidden': false,
                    'aria-modal': true,
                });

                if (this._focusTrap) {
                    this._focusTrap.activate();
                }

                $$1.removeDataset(this._node, 'uiAnimating');
                $$1.triggerEvent(this._node, 'shown.ui.offcanvas');
            }).catch((_) => {
                if ($$1.getDataset(this._node, 'uiAnimating') === 'in') {
                    $$1.removeDataset(this._node, 'uiAnimating');
                }
            });
        }

        /**
         * Toggle the Offcanvas.
         */
        toggle() {
            if ($$1.hasClass(this._node, 'show')) {
                this.hide();
            } else {
                this.show();
            }
        }
    }

    // Offcanvas default options
    Offcanvas.defaults = {
        duration: 250,
        backdrop: true,
        keyboard: true,
        scroll: false,
    };

    // Offcanvas init
    initComponent('offcanvas', Offcanvas);

    // Offcanvas events
    $$1.addEventDelegate(document, 'click.ui.offcanvas', '[data-ui-toggle="offcanvas"]', (e) => {
        e.preventDefault();

        const target = getTarget(e.currentTarget, '.offcanvas');
        const offcanvas = Offcanvas.init(target);
        offcanvas._activeTarget = e.currentTarget;
        offcanvas.show();
    });

    $$1.addEventDelegate(document, 'click.ui.offcanvas', '[data-ui-dismiss="offcanvas"]', (e) => {
        e.preventDefault();

        const target = getTarget(e.currentTarget, '.offcanvas');
        const offcanvas = Offcanvas.init(target);
        offcanvas.hide();
    });

    $$1.addEvent(document, 'click.ui.offcanvas', (e) => {
        const target = getClickTarget(e);

        if ($$1.is(target, '[data-ui-dismiss]') || $$1.findOne('.modal.show')) {
            return;
        }

        const nodes = $$1.find('.offcanvas.show');

        if (!nodes.length) {
            return;
        }

        for (const node of nodes) {
            const offcanvas = Offcanvas.init(node);

            if (
                !offcanvas._options.backdrop ||
                offcanvas._options.backdrop === 'static' ||
                $$1.isSame(offcanvas._node, target) ||
                $$1.hasDescendent(offcanvas._node, target)
            ) {
                continue;
            }

            offcanvas.hide();
        }
    });

    $$1.addEvent(document, 'keyup.ui.offcanvas', (e) => {
        if (e.code !== 'Escape' || $$1.findOne('.modal.show')) {
            return;
        }

        const nodes = $$1.find('.offcanvas.show');

        if (!nodes.length) {
            return;
        }

        for (const node of nodes) {
            const offcanvas = Offcanvas.init(node);

            if (!offcanvas._options.keyboard) {
                return;
            }

            offcanvas.hide();
        }
    });

    /**
     * Popover Class
     * @class
     */
    class Popover extends BaseComponent {
        /**
         * New Popover constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [options] The options to create the Popover with.
         */
        constructor(node, options) {
            super(node, options);

            this._modal = $$1.closest(this._node, '.modal').shift();

            this._triggers = this._options.trigger.split(' ');

            this._render();
            this._events();

            if (this._options.enable) {
                this.enable();
            }

            this.refresh();
        }

        /**
         * Dispose the Popover.
         */
        dispose() {
            if ($$1.hasDataset(this._node, 'uiOriginalTitle')) {
                const title = $$1.getDataset(this._node, 'uiOriginalTitle');
                $$1.setAttribute(this._node, { title });
                $$1.removeDataset(this._node, 'uiOriginalTitle');
            }

            if (this._popper) {
                this._popper.dispose();
                this._popper = null;
            }

            $$1.remove(this._popover);

            if (this._triggers.includes('hover')) {
                $$1.removeEvent(this._node, 'mouseover.ui.popover');
                $$1.removeEvent(this._node, 'mouseout.ui.popover');
            }

            if (this._triggers.includes('focus')) {
                $$1.removeEvent(this._node, 'focus.ui.popover');
                $$1.removeEvent(this._node, 'blur.ui.popover');
            }

            if (this._triggers.includes('click')) {
                $$1.removeEvent(this._node, 'click.ui.popover');
            }

            if (this._modal) {
                $$1.removeEvent(this._modal, 'hide.ui.modal', this._hideModalEvent);
            }

            this._modal = null;
            this._triggers = null;
            this._popover = null;
            this._popoverHeader = null;
            this._popoverBody = null;
            this._arrow = null;

            super.dispose();
        }

        /**
         * Disable the Popover.
         */
        disable() {
            this._enabled = false;
        }

        /**
         * Enable the Popover.
         */
        enable() {
            this._enabled = true;
        }

        /**
         * Hide the Popover.
         */
        hide() {
            if (
                !this._enabled ||
                $$1.getDataset(this._popover, 'uiAnimating') ||
                !$$1.isConnected(this._popover) ||
                !$$1.triggerOne(this._node, 'hide.ui.popover')
            ) {
                return;
            }

            $$1.setDataset(this._popover, { uiAnimating: 'out' });

            $$1.fadeOut(this._popover, {
                duration: this._options.duration,
            }).then((_) => {
                this._popper.dispose();
                this._popper = null;

                $$1.detach(this._popover);
                $$1.removeDataset(this._popover, 'uiAnimating');
                $$1.triggerEvent(this._node, 'hidden.ui.popover');
            }).catch((_) => {
                if ($$1.getDataset(this._popover, 'uiAnimating') === 'out') {
                    $$1.removeDataset(this._popover, 'uiAnimating');
                }
            });
        }

        /**
         * Refresh the Popover.
         */
        refresh() {
            if ($$1.hasAttribute(this._node, 'title')) {
                const originalTitle = $$1.getAttribute(this._node, 'title');
                $$1.setDataset(this._node, { uiOriginalTitle: originalTitle });
                $$1.removeAttribute(this._node, 'title');
            }

            let title = '';
            if ($$1.hasDataset(this._node, 'uiTitle')) {
                title = $$1.getDataset(this._node, 'uiTitle');
            } else if (this._options.title) {
                title = this._options.title;
            } else if ($$1.hasDataset(this._node, 'uiOriginalTitle')) {
                title = $$1.getDataset(this._node, 'uiOriginalTitle', title);
            }

            let content = '';
            if ($$1.hasDataset(this._node, 'uiContent')) {
                content = $$1.getDataset(this._node, 'uiContent');
            } else if (this._options.content) {
                content = this._options.content;
            }

            const method = this._options.html ? 'setHTML' : 'setText';

            $$1[method](
                this._popoverHeader,
                this._options.html && this._options.sanitize ?
                    this._options.sanitize(title) :
                    title,
            );

            if (!title) {
                $$1.hide(this._popoverHeader);
            } else {
                $$1.show(this._popoverHeader);
            }

            $$1[method](
                this._popoverBody,
                this._options.html && this._options.sanitize ?
                    this._options.sanitize(content) :
                    content,
            );
        }

        /**
         * Show the Popover.
         */
        show() {
            if (
                !this._enabled ||
                $$1.getDataset(this._popover, 'uiAnimating') ||
                $$1.isConnected(this._popover) ||
                !$$1.triggerOne(this._node, 'show.ui.popover')
            ) {
                return;
            }

            $$1.setDataset(this._popover, { uiAnimating: 'in' });
            this.refresh();
            this._show();

            $$1.fadeIn(this._popover, {
                duration: this._options.duration,
            }).then((_) => {
                $$1.removeDataset(this._popover, 'uiAnimating');
                $$1.triggerEvent(this._node, 'shown.ui.popover');
            }).catch((_) => {
                if ($$1.getDataset(this._popover, 'uiAnimating') === 'in') {
                    $$1.removeDataset(this._popover, 'uiAnimating');
                }
            });
        }

        /**
         * Toggle the Popover.
         */
        toggle() {
            if ($$1.isConnected(this._popover)) {
                this.hide();
            } else {
                this.show();
            }
        }

        /**
         * Update the Popover position.
         */
        update() {
            if (this._popper) {
                this._popper.update();
            }
        }
    }

    /**
     * Attach events for the Popover.
     */
    function _events$1() {
        if (this._triggers.includes('hover')) {
            $$1.addEvent(this._node, 'mouseover.ui.popover', (_) => {
                this._stop();
                this.show();
            });

            $$1.addEvent(this._node, 'mouseout.ui.popover', (_) => {
                this._stop();
                this.hide();
            });
        }

        if (this._triggers.includes('focus')) {
            $$1.addEvent(this._node, 'focus.ui.popover', (_) => {
                this._stop();
                this.show();
            });

            $$1.addEvent(this._node, 'blur.ui.popover', (_) => {
                this._stop();
                this.hide();
            });
        }

        if (this._triggers.includes('click')) {
            $$1.addEvent(this._node, 'click.ui.popover', (e) => {
                e.preventDefault();

                this._stop();
                this.toggle();
            });
        }

        if (this._modal) {
            $$1.addEvent(this._modal, 'hide.ui.modal', (_) => {
                this._stop();
                this.hide();
            });
        }
    }

    /**
     * Update the arrow.
     * @param {string} placement The placement of the Popper.
     * @param {string} position The position of the Popper.
     */
    function _updateArrow(placement, position) {
        const nodeBox = $$1.rect(this._node, { offset: true });
        const referenceBox = $$1.rect(this._options.reference, { offset: true });

        const arrowStyles = {
            position: 'absolute',
            top: '',
            right: '',
            bottom: '',
            left: '',
        };
        $$1.setStyle(this._options.arrow, arrowStyles);

        const arrowBox = $$1.rect(this._options.arrow, { offset: true });

        if (['top', 'bottom'].includes(placement)) {
            arrowStyles[placement === 'top' ? 'bottom' : 'top'] = -Math.floor(arrowBox.height);
            const diff = (referenceBox.width - nodeBox.width) / 2;

            let offset = (nodeBox.width / 2) - (arrowBox.width / 2);
            if (position === 'start') {
                offset += diff;
            } else if (position === 'end') {
                offset -= diff;
            }

            let min = Math.max(referenceBox.left, nodeBox.left) - arrowBox.left;
            let max = Math.min(referenceBox.right, nodeBox.right) - arrowBox.left - arrowBox.width;

            if (referenceBox.width < arrowBox.width) {
                min -= arrowBox.width / 2 - referenceBox.width / 2;
                max -= arrowBox.width / 2 - referenceBox.width / 2;
            }

            offset = Math.round(offset);
            min = Math.round(min);
            max = Math.round(max);

            arrowStyles.left = $$1._clamp(offset, min, max);
        } else {
            arrowStyles[placement === 'right' ? 'left' : 'right'] = -Math.floor(arrowBox.width);

            const diff = (referenceBox.height - nodeBox.height) / 2;

            let offset = (nodeBox.height / 2) - arrowBox.height;
            if (position === 'start') {
                offset += diff;
            } else if (position === 'end') {
                offset -= diff;
            }

            let min = Math.max(referenceBox.top, nodeBox.top) - arrowBox.top;
            let max = Math.min(referenceBox.bottom, nodeBox.bottom) - arrowBox.top - arrowBox.height;

            if (referenceBox.height < arrowBox.height * 2) {
                min -= arrowBox.height - referenceBox.height / 2;
                max -= arrowBox.height - referenceBox.height / 2;
            } else {
                max -= arrowBox.height;
            }

            offset = Math.round(offset);
            min = Math.round(min);
            max = Math.round(max);

            arrowStyles.top = $$1._clamp(offset, min, max);
        }

        $$1.setStyle(this._options.arrow, arrowStyles);
    }

    // Popper default options
    Popper.defaults = {
        reference: null,
        container: null,
        arrow: null,
        afterUpdate: null,
        beforeUpdate: null,
        placement: 'bottom',
        position: 'center',
        fixed: false,
        spacing: 0,
        minContact: null,
        useGpu: true,
        noAttributes: false,
    };

    // Popper prototype
    const proto$2 = Popper.prototype;

    proto$2._updateArrow = _updateArrow;

    // Popper init
    initComponent('popper', Popper);

    /**
     * Update the Popover and append to the DOM.
     */
    function _show$1() {
        if (this._options.appendTo) {
            $$1.append(this._options.appendTo, this._popover);
        } else {
            $$1.after(this._node, this._popover);
        }

        if (!this._options.noAttributes) {
            const id = generateId(this.constructor.DATA_KEY);
            $$1.setAttribute(this._popover, { id });
            $$1.setAttribute(this._node, { 'aria-described-by': id });
        }

        this._popper = new Popper(
            this._popover,
            {
                reference: this._node,
                arrow: this._arrow,
                placement: this._options.placement,
                position: this._options.position,
                fixed: this._options.fixed,
                spacing: this._options.spacing,
                minContact: this._options.minContact,
                noAttributes: this._options.noAttributes,
            },
        );

        window.requestAnimationFrame((_) => {
            this.update();
        });
    }
    /**
     * Stop the animations.
     */
    function _stop$1() {
        if (!this._enabled) {
            return;
        }

        const animating = $$1.getDataset(this._popover, 'uiAnimating');

        if (!animating) {
            return;
        }

        $$1.stop(this._popover, { finish: false });
        $$1.removeDataset(this._popover, 'uiAnimating');

        if (animating === 'out') {
            this._popper.dispose();
            this._popper = null;

            $$1.detach(this._popover);
        }
    }

    /**
     * Render the Popover element.
     */
    function _render$1() {
        this._popover = $$1.parseHTML(this._options.template).shift();
        if (this._options.customClass) {
            $$1.addClass(this._popover, this._options.customClass);
        }
        this._arrow = $$1.findOne('.popover-arrow', this._popover);
        this._popoverHeader = $$1.findOne('.popover-header', this._popover);
        this._popoverBody = $$1.findOne('.popover-body', this._popover);
    }

    // Popover default options
    Popover.defaults = {
        template: '<div class="popover" role="tooltip">' +
            '<div class="popover-arrow"></div>' +
            '<h3 class="popover-header"></h3>' +
            '<div class="popover-body"></div>' +
            '</div>',
        customClass: null,
        duration: 100,
        enable: true,
        html: false,
        appendTo: null,
        sanitize: (input) => $$1.sanitize(input),
        trigger: 'click',
        placement: 'auto',
        position: 'center',
        fixed: false,
        spacing: 3,
        minContact: false,
        noAttributes: false,
    };

    // Popover prototype
    const proto$1 = Popover.prototype;

    proto$1._events = _events$1;
    proto$1._render = _render$1;
    proto$1._show = _show$1;
    proto$1._stop = _stop$1;

    // Popover init
    initComponent('popover', Popover);

    /**
     * Tab Class
     * @class
     */
    class Tab extends BaseComponent {
        /**
         * New Tab constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [options] The options to create the Tab with.
         */
        constructor(node, options) {
            super(node, options);

            const selector = getTargetSelector(this._node);
            this._target = $$1.findOne(selector);
            this._siblings = $$1.siblings(this._node);
        }

        /**
         * Dispose the Tab.
         */
        dispose() {
            this._target = null;
            this._siblings = null;

            super.dispose();
        }

        /**
         * Hide the current Tab.
         */
        hide() {
            if (
                $$1.getDataset(this._target, 'uiAnimating') ||
                !$$1.hasClass(this._target, 'active') ||
                !$$1.triggerOne(this._node, 'hide.ui.tab')
            ) {
                return;
            }

            this._hide();
        }

        /**
         * Hide any active Tabs, and show the current Tab.
         */
        show() {
            if (
                $$1.getDataset(this._target, 'uiAnimating') ||
                $$1.hasClass(this._target, 'active') ||
                !$$1.triggerOne(this._node, 'show.ui.tab')
            ) {
                return;
            }

            const active = this._siblings.find((sibling) =>
                $$1.hasClass(sibling, 'active'),
            );

            if (!active) {
                this._show();
            } else {
                const activeTab = this.constructor.init(active);

                if (activeTab.animating) {
                    return;
                }

                if (!$$1.triggerOne(active, 'hide.ui.tab')) {
                    return;
                }

                $$1.addEventOnce(active, 'hidden.ui.tab', (_) => {
                    this._show();
                });

                activeTab._hide();
            }
        }

        /**
         * Hide the current Tab (forcefully).
         */
        _hide() {
            $$1.setDataset(this._target, { uiAnimating: 'out' });

            $$1.fadeOut(this._target, {
                duration: this._options.duration,
            }).then((_) => {
                $$1.removeClass(this._target, 'active');
                $$1.removeClass(this._node, 'active');
                $$1.removeDataset(this._target, 'uiAnimating');
                $$1.setAttribute(this._node, { 'aria-selected': false });
                $$1.triggerEvent(this._node, 'hidden.ui.tab');
            }).catch((_) => {
                if ($$1.getDataset(this._target, 'uiAnimating') === 'out') {
                    $$1.removeDataset(this._target, 'uiAnimating');
                }
            });
        }

        /**
         * Show the current Tab (forcefully).
         */
        _show() {
            $$1.setDataset(this._target, { uiAnimating: 'in' });

            $$1.addClass(this._target, 'active');
            $$1.addClass(this._node, 'active');

            $$1.fadeIn(this._target, {
                duration: this._options.duration,
            }).then((_) => {
                $$1.setAttribute(this._node, { 'aria-selected': true });
                $$1.removeDataset(this._target, 'uiAnimating');
                $$1.triggerEvent(this._node, 'shown.ui.tab');
            }).catch((_) => {
                if ($$1.getDataset(this._target, 'uiAnimating') === 'in') {
                    $$1.removeDataset(this._target, 'uiAnimating');
                }
            });
        }
    }

    // Tab default options
    Tab.defaults = {
        duration: 100,
    };

    // Tab init
    initComponent('tab', Tab);

    // Tab events
    $$1.addEventDelegate(document, 'click.ui.tab', '[data-ui-toggle="tab"]', (e) => {
        e.preventDefault();

        const tab = Tab.init(e.currentTarget);
        tab.show();
    });

    $$1.addEventDelegate(document, 'keydown.ui.tab', '[data-ui-toggle="tab"]', (e) => {
        let newTarget;

        switch (e.code) {
            case 'ArrowDown':
            case 'ArrowRight':
                newTarget = $$1.next(e.currentTarget, '[data-ui-toggle="tab"]:not(.disabled)').shift();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                newTarget = $$1.prev(e.currentTarget, '[data-ui-toggle="tab"]:not(.disabled)').pop();
                break;
            case 'Home':
                newTarget = $$1.prevAll(e.currentTarget, '[data-ui-toggle="tab"]:not(.disabled)').shift();
                break;
            case 'End':
                newTarget = $$1.nextAll(e.currentTarget, '[data-ui-toggle="tab"]:not(.disabled)').pop();
                break;
            default:
                return;
        }

        if (!newTarget) {
            return;
        }

        e.preventDefault();

        $$1.focus(newTarget);
    });

    /**
     * Toast Class
     * @class
     */
    class Toast extends BaseComponent {
        /**
         * Hide the Toast.
         */
        hide() {
            if (
                $$1.getDataset(this._node, 'uiAnimating') ||
                !$$1.isVisible(this._node) ||
                !$$1.triggerOne(this._node, 'hide.ui.toast')
            ) {
                return;
            }

            $$1.setDataset(this._node, { uiAnimating: 'out' });

            $$1.fadeOut(this._node, {
                duration: this._options.duration,
            }).then((_) => {
                $$1.setStyle(this._node, { display: 'none' }, null, { important: true });
                $$1.removeClass(this._node, 'show');
                $$1.removeDataset(this._node, 'uiAnimating');
                $$1.triggerEvent(this._node, 'hidden.ui.toast');
            }).catch((_) => {
                if ($$1.getDataset(this._node, 'uiAnimating') === 'out') {
                    $$1.removeDataset(this._node, 'uiAnimating');
                }
            });
        }

        /**
         * Show the Toast.
         */
        show() {
            if (
                $$1.getDataset(this._node, 'uiAnimating') ||
                $$1.isVisible(this._node) ||
                !$$1.triggerOne(this._node, 'show.ui.toast')
            ) {
                return;
            }

            $$1.setDataset(this._node, { uiAnimating: 'in' });
            $$1.setStyle(this._node, { display: '' });
            $$1.addClass(this._node, 'show');

            $$1.fadeIn(this._node, {
                duration: this._options.duration,
            }).then((_) => {
                $$1.removeDataset(this._node, 'uiAnimating');
                $$1.triggerEvent(this._node, 'shown.ui.toast');

                if (this._options.autohide) {
                    setTimeout(
                        (_) => this.hide(),
                        this._options.delay,
                    );
                }
            }).catch((_) => {
                if ($$1.getDataset(this._node, 'uiAnimating') === 'in') {
                    $$1.removeDataset(this._node, 'uiAnimating');
                }
            });
        }
    }

    // Toast default options
    Toast.defaults = {
        autohide: true,
        delay: 5000,
        duration: 100,
    };

    // Toast init
    initComponent('toast', Toast);

    // Toast events
    $$1.addEventDelegate(document, 'click.ui.toast', '[data-ui-dismiss="toast"]', (e) => {
        e.preventDefault();

        const target = getTarget(e.currentTarget, '.toast');
        const toast = Toast.init(target, { autohide: false });
        toast.hide();
    });

    /**
     * Tooltip Class
     * @class
     */
    class Tooltip extends BaseComponent {
        /**
         * New Tooltip constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [options] The options to create the Tooltip with.
         */
        constructor(node, options) {
            super(node, options);

            this._modal = $$1.closest(this._node, '.modal').shift();

            this._triggers = this._options.trigger.split(' ');

            this._render();
            this._events();

            if (this._options.enable) {
                this.enable();
            }

            this.refresh();
        }

        /**
         * Dispose the Tooltip.
         */
        dispose() {
            if ($$1.hasDataset(this._node, 'uiOriginalTitle')) {
                const title = $$1.getDataset(this._node, 'uiOriginalTitle');
                $$1.setAttribute(this._node, { title });
                $$1.removeDataset(this._node, 'uiOriginalTitle');
            }

            if (this._popper) {
                this._popper.dispose();
                this._popper = null;
            }

            $$1.remove(this._tooltip);

            if (this._triggers.includes('hover')) {
                $$1.removeEvent(this._node, 'mouseover.ui.tooltip');
                $$1.removeEvent(this._node, 'mouseout.ui.tooltip');
            }

            if (this._triggers.includes('focus')) {
                $$1.removeEvent(this._node, 'focus.ui.tooltip');
                $$1.removeEvent(this._node, 'blur.ui.tooltip');
            }

            if (this._triggers.includes('click')) {
                $$1.removeEvent(this._node, 'click.ui.tooltip');
            }

            if (this._modal) {
                $$1.removeEvent(this._modal, 'hide.ui.modal');
            }

            this._modal = null;
            this._triggers = null;
            this._tooltip = null;
            this._tooltipInner = null;
            this._arrow = null;

            super.dispose();
        }

        /**
         * Disable the Tooltip.
         */
        disable() {
            this._enabled = false;
        }

        /**
         * Enable the Tooltip.
         */
        enable() {
            this._enabled = true;
        }

        /**
         * Hide the Tooltip.
         */
        hide() {
            if (
                !this._enabled ||
                $$1.getDataset(this._tooltip, 'uiAnimating') ||
                !$$1.isConnected(this._tooltip) ||
                !$$1.triggerOne(this._node, 'hide.ui.tooltip')
            ) {
                return;
            }

            $$1.setDataset(this._tooltip, { uiAnimating: 'out' });

            $$1.fadeOut(this._tooltip, {
                duration: this._options.duration,
            }).then((_) => {
                this._popper.dispose();
                this._popper = null;

                $$1.removeClass(this._tooltip, 'show');
                $$1.detach(this._tooltip);
                $$1.removeDataset(this._tooltip, 'uiAnimating');
                $$1.triggerEvent(this._node, 'hidden.ui.tooltip');
            }).catch((_) => {
                if ($$1.getDataset(this._tooltip, 'uiAnimating') === 'out') {
                    $$1.removeDataset(this._tooltip, 'uiAnimating');
                }
            });
        }

        /**
         * Refresh the Tooltip.
         */
        refresh() {
            if ($$1.hasAttribute(this._node, 'title')) {
                const originalTitle = $$1.getAttribute(this._node, 'title');
                $$1.setDataset(this._node, { uiOriginalTitle: originalTitle });
                $$1.removeAttribute(this._node, 'title');
            }

            let title = '';
            if ($$1.hasDataset(this._node, 'uiTitle')) {
                title = $$1.getDataset(this._node, 'uiTitle');
            } else if (this._options.title) {
                title = this._options.title;
            } else if ($$1.hasDataset(this._node, 'uiOriginalTitle')) {
                title = $$1.getDataset(this._node, 'uiOriginalTitle', title);
            }

            const method = this._options.html ? 'setHTML' : 'setText';

            $$1[method](
                this._tooltipInner,
                this._options.html && this._options.sanitize ?
                    this._options.sanitize(title) :
                    title,
            );

            this.update();
        }

        /**
         * Show the Tooltip.
         */
        show() {
            if (
                !this._enabled ||
                $$1.getDataset(this._tooltip, 'uiAnimating') ||
                $$1.isConnected(this._tooltip) ||
                !$$1.triggerOne(this._node, 'show.ui.tooltip')
            ) {
                return;
            }

            $$1.setDataset(this._tooltip, { uiAnimating: 'in' });
            $$1.addClass(this._tooltip, 'show');
            this.refresh();
            this._show();

            $$1.fadeIn(this._tooltip, {
                duration: this._options.duration,
            }).then((_) => {
                $$1.removeDataset(this._tooltip, 'uiAnimating');
                $$1.triggerEvent(this._node, 'shown.ui.tooltip');
            }).catch((_) => {
                if ($$1.getDataset(this._tooltip, 'uiAnimating') === 'in') {
                    $$1.removeDataset(this._tooltip, 'uiAnimating');
                }
            });
        }

        /**
         * Toggle the Tooltip.
         */
        toggle() {
            if ($$1.isConnected(this._tooltip)) {
                this.hide();
            } else {
                this.show();
            }
        }

        /**
         * Update the Tooltip position.
         */
        update() {
            if (this._popper) {
                this._popper.update();
            }
        }
    }

    /**
     * Attach events for the Tooltip.
     */
    function _events() {
        if (this._triggers.includes('hover')) {
            $$1.addEvent(this._node, 'mouseover.ui.tooltip', (_) => {
                this._stop();
                this.show();
            });

            $$1.addEvent(this._node, 'mouseout.ui.tooltip', (_) => {
                this._stop();
                this.hide();
            });
        }

        if (this._triggers.includes('focus')) {
            $$1.addEvent(this._node, 'focus.ui.tooltip', (_) => {
                this._stop();
                this.show();
            });

            $$1.addEvent(this._node, 'blur.ui.tooltip', (_) => {
                this._stop();
                this.hide();
            });
        }

        if (this._triggers.includes('click')) {
            $$1.addEvent(this._node, 'click.ui.tooltip', (e) => {
                e.preventDefault();

                this._stop();
                this.toggle();
            });
        }

        if (this._modal) {
            $$1.addEvent(this._modal, 'hide.ui.modal', (_) => {
                this._stop();
                this.hide();
            });
        }
    }

    /**
     * Update the Tooltip and append to the DOM.
     */
    function _show() {
        if (this._options.appendTo) {
            $$1.append(this._options.appendTo, this._tooltip);
        } else {
            $$1.after(this._node, this._tooltip);
        }

        if (!this._options.noAttributes) {
            const id = generateId(this.constructor.DATA_KEY);
            $$1.setAttribute(this._tooltip, { id });
            $$1.setAttribute(this._node, { 'aria-described-by': id });
        }

        this._popper = new Popper(
            this._tooltip,
            {
                reference: this._node,
                arrow: this._arrow,
                placement: this._options.placement,
                position: this._options.position,
                fixed: this._options.fixed,
                spacing: this._options.spacing,
                minContact: this._options.minContact,
                noAttributes: this._options.noAttributes,
            },
        );

        window.requestAnimationFrame((_) => {
            this.update();
        });
    }
    /**
     * Stop the animations.
     */
    function _stop() {
        if (!this._enabled) {
            return;
        }

        const animating = $$1.getDataset(this._tooltip, 'uiAnimating');

        if (!animating) {
            return;
        }

        $$1.stop(this._tooltip, { finish: false });
        $$1.removeDataset(this._tooltip, 'uiAnimating');

        if (animating === 'out') {
            this._popper.dispose();
            this._popper = null;

            $$1.removeClass(this._tooltip, 'show');
            $$1.detach(this._tooltip);
        }
    }

    /**
     * Render the Tooltip element.
     */
    function _render() {
        this._tooltip = $$1.parseHTML(this._options.template).shift();
        if (this._options.customClass) {
            $$1.addClass(this._tooltip, this._options.customClass);
        }
        this._arrow = $$1.findOne('.tooltip-arrow', this._tooltip);
        this._tooltipInner = $$1.findOne('.tooltip-inner', this._tooltip);
    }

    // Tooltip default options
    Tooltip.defaults = {
        template: '<div class="tooltip" role="tooltip">' +
            '<div class="tooltip-arrow"></div>' +
            '<div class="tooltip-inner"></div>' +
            '</div>',
        customClass: null,
        duration: 100,
        enable: true,
        html: false,
        trigger: 'hover focus',
        appendTo: null,
        sanitize: (input) => $$1.sanitize(input),
        placement: 'auto',
        position: 'center',
        fixed: false,
        spacing: 2,
        minContact: false,
        noAttributes: false,
    };

    // Tooltip prototype
    const proto = Tooltip.prototype;

    proto._events = _events;
    proto._render = _render;
    proto._show = _show;
    proto._stop = _stop;

    // Tooltip init
    initComponent('tooltip', Tooltip);

    // Clipboard events
    $$1.addEventDelegate(document, 'click', '[data-ui-toggle="clipboard"]', (e) => {
        e.preventDefault();

        const node = e.currentTarget;
        let { action = 'copy', text = null } = getDataset(node);

        if (!['copy', 'cut'].includes(action)) {
            throw new Error('Invalid clipboard action');
        }

        let input;
        if (!text) {
            const target = getTarget(node);
            if ($$1.is(target, 'input, textarea')) {
                input = target;
                text = $$1.getValue(input);
            } else {
                text = $$1.getText(target);
            }
        }

        const customText = !input;
        if (customText) {
            input = $$1.create(
                'textarea',
                {
                    class: 'visually-hidden position-fixed',
                    value: text,
                },
            );

            $$1.append(document.body, input);
        }

        $$1.select(input);

        if ($$1.exec(action)) {
            $$1.triggerEvent(node, 'copied.ui.clipboard', {
                data: {
                    action: action,
                    text,
                },
            });
        }

        if (customText) {
            $$1.detach(input);
        }
    });

    // Ripple events
    $$1.addEventDelegate(document, 'mousedown.ui.ripple', '.ripple', (e) => {
        const target = e.currentTarget;
        const pos = $$1.position(target, { offset: true });

        const width = $$1.width(target);
        const height = $$1.height(target);
        const scaleMultiple = Math.max(width, height) * 3;

        const isFixed = $$1.isFixed(target);
        const mouseX = isFixed ? e.clientX : e.pageX;
        const mouseY = isFixed ? e.clientY : e.pageY;

        const prevRipple = $$1.findOne(':scope > .ripple-effect', target);

        if (prevRipple) {
            $$1.remove(prevRipple);
        }

        const ripple = $$1.create('span', {
            class: 'ripple-effect',
            style: {
                left: mouseX - pos.x,
                top: mouseY - pos.y,
            },
        });
        $$1.append(target, ripple);

        const animation = $$1.animate(
            ripple,
            (node, progress) => {
                $$1.setStyle(node, {
                    transform: 'scale(' + Math.floor(progress * scaleMultiple) + ')',
                });
            },
            {
                duration: 500,
            },
        );

        $$1.addEventOnce(document, 'mouseup.ui.ripple', (_) => {
            animation.finally((_) => {
                $$1.animate(
                    ripple,
                    (node, progress) => {
                        $$1.setStyle(node, {
                            opacity: 1 - Math.pow(progress, 2),
                        });
                    },
                    {
                        duration: 250,
                    },
                ).finally((_) => {
                    $$1.detach(ripple);
                });
            });
        });
    });

    // Text expand events
    $$1.addEventDelegate(document, 'change.ui.expand input.ui.expand', '.text-expand', (e) => {
        const textArea = e.currentTarget;

        $$1.setStyle(textArea, { height: 'inherit' });

        let newHeight = $$1.height(textArea, { boxSize: $$1.SCROLL_BOX });
        newHeight += parseInt($$1.css(textArea, 'borderTop'));
        newHeight += parseInt($$1.css(textArea, 'borderBottom'));

        $$1.setStyle(textArea, { height: `${newHeight}px` });
    });

    exports.Alert = Alert;
    exports.BaseComponent = BaseComponent;
    exports.Button = Button;
    exports.Carousel = Carousel;
    exports.Collapse = Collapse;
    exports.Dropdown = Dropdown;
    exports.FocusTrap = FocusTrap;
    exports.Modal = Modal;
    exports.Offcanvas = Offcanvas;
    exports.Popover = Popover;
    exports.Popper = Popper;
    exports.Tab = Tab;
    exports.Toast = Toast;
    exports.Tooltip = Tooltip;
    exports.addScrollPadding = addScrollPadding;
    exports.generateId = generateId;
    exports.getClickTarget = getClickTarget;
    exports.getDataset = getDataset;
    exports.getPosition = getPosition;
    exports.getScrollContainer = getScrollContainer;
    exports.getScrollbarSize = getScrollbarSize;
    exports.getTarget = getTarget;
    exports.getTargetSelector = getTargetSelector;
    exports.getTouchPositions = getTouchPositions;
    exports.initComponent = initComponent;
    exports.resetScrollPadding = resetScrollPadding;

}));
//# sourceMappingURL=frost-ui.js.map
