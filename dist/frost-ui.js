(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@fr0st/query')) :
    typeof define === 'function' && define.amd ? define(['exports', '@fr0st/query'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.UI = {}, global.fQuery));
})(this, (function (exports, fQuery) { 'use strict';

    let $;

    if (fQuery !== fQuery.query) {
        $ = fQuery(globalThis);
    } else {
        $ = fQuery;
    }

    if (!('fQuery' in globalThis)) {
        globalThis.fQuery = $;
    }

    const document = $.getContext();
    const window$1 = $.getWindow();

    let scrollbarSize;

    /**
     * Add scrollbar padding to a node.
     * @param {HTMLElement} [node=document.body] The node.
     */
    function addScrollPadding(node = document.body) {
        const scrollSizeY = getScrollbarSize(window$1, document, 'y');
        const scrollSizeX = getScrollbarSize(window$1, document, 'x');

        if (scrollSizeY) {
            const currentPaddingRight = $.getStyle(node, 'paddingRight');
            const paddingRight = $.css(node, 'paddingRight');

            $.setDataset(node, 'ui-padding-right', currentPaddingRight);
            $.setStyle(node, 'paddingRight', `${scrollSizeY + parseInt(paddingRight)}px`);
        }

        if (scrollSizeX) {
            const currentPaddingBottom = $.getStyle(node, 'paddingBottom');
            const paddingBottom = $.css(node, 'paddingBottom');

            $.setDataset(node, 'ui-padding-bottom', currentPaddingBottom);
            $.setStyle(node, 'paddingBottom', `${scrollSizeX + parseInt(paddingBottom)}px`);
        }
    }
    /**
     * Get the size of the scrollbar.
     * @return {number} The scrollbar size.
     */
    function calculateScrollbarSize() {
        if (scrollbarSize) {
            return scrollbarSize;
        }

        const div = $.create('div', {
            style: {
                width: '100px',
                height: '100px',
                overflow: 'scroll',
                position: 'absolute',
                top: '-9999px',
            },
        });
        $.append(document.body, div);

        scrollbarSize = $.getProperty(div, 'offsetWidth') - $.width(div);

        $.detach(div);

        return scrollbarSize;
    }
    /**
     * Generate a unique element ID.
     * @param {string} [prefix] The ID prefix.
     * @return {string} The unique ID.
     */
    function generateId(prefix) {
        const id = `${prefix}${$._randomInt(10000, 99999)}`;

        if ($.findOne(`#${id}`)) {
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
        const dataset = $.getDataset(node);

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
        const size = $[method](node);
        const scrollSize = $[method](scrollNode, { boxSize: $.SCROLL_BOX });

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
        const isWindow = $._isWindow(node);
        const rect = isWindow ?
            getWindowContainer(node) :
            $.rect(node, { offset: true });

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
            target = $.findOne(selector);
        } else if (closestSelector) {
            target = $.closest(node, closestSelector).shift();
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
        return $.getDataset(node, 'ui-target') || $.getAttribute(node, 'href');
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
        const scrollX = $.getScrollX(node);
        const scrollY = $.getScrollY(node);
        const width = $.width(node);
        const height = $.height(node);

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

        $.QuerySet.prototype[key] = function(a, ...args) {
            let settings; let method; let firstResult;

            if ($._isObject(a)) {
                settings = a;
            } else if ($._isString(a)) {
                method = a;
            }

            for (const [index, node] of this.get().entries()) {
                if (!$._isElement(node)) {
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
        const paddingRight = $.getDataset(node, 'ui-padding-right');
        const paddingBottom = $.getDataset(node, 'ui-padding-bottom');

        $.setStyle(node, { paddingRight, paddingBottom });

        $.removeDataset(node, 'ui-padding-right');
        $.removeDataset(node, 'ui-padding-bottom');
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

            this._options = $._extend(
                {},
                this.constructor.defaults,
                getDataset(this._node),
                options,
            );

            $.addEvent(this._node, this.constructor.REMOVE_EVENT, (_) => {
                this.dispose();
            });

            $.setData(this._node, this.constructor.DATA_KEY, this);
        }

        /**
         * Dispose the BaseComponent.
         */
        dispose() {
            $.removeEvent(this._node, this.constructor.REMOVE_EVENT);
            $.removeData(this._node, this.constructor.DATA_KEY);
            this._node = null;
            this._options = null;
        }

        /**
         * Initialize a BaseComponent.
         * @param {HTMLElement} node The input node.
         * @return {BaseComponent} A new BaseComponent object.
         */
        static init(node, ...args) {
            return $.hasData(node, this.DATA_KEY) ?
                $.getData(node, this.DATA_KEY) :
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
                $.getDataset(this._node, 'ui-animating') ||
                !$.triggerOne(this._node, 'close.ui.alert')
            ) {
                return;
            }

            $.setDataset(this._node, 'ui-animating', true);

            $.fadeOut(this._node, {
                duration: this._options.duration,
            }).then((_) => {
                $.detach(this._node);
                $.removeDataset(this._node, 'ui-animating');
                $.triggerEvent(this._node, 'closed.ui.alert');
                $.remove(this._node);
            }).catch((_) => {
                $.removeDataset(this._node, 'ui-animating');
            });
        }
    }

    initComponent('alert', Alert);

    // Alert default options
    Alert.defaults = {
        duration: 100,
    };

    // Alert events
    $.addEventDelegate(document, 'click.ui.alert', '[data-ui-dismiss="alert"]', (e) => {
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
            $.toggleClass(this._node, 'active');

            const active = $.hasClass(this._node, 'active');
            $.setAttribute(this._node, 'aria-pressed', active);
        }
    }

    initComponent('button', Button);

    // Button events
    $.addEventDelegate(document, 'click.ui.button', '[data-ui-toggle="button"]', (e) => {
        e.preventDefault();

        const button = Button.init(e.currentTarget);
        button.toggle();
    });

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

            this._items = $.find('.carousel-item', this._node);

            this._index = this._items.findIndex((item) =>
                $.hasClass(item, 'active'),
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
            if (!$.isHidden(document)) {
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
                $.removeEvent(this._node, 'keydown.ui.carousel');
            }

            if (this._options.pause) {
                $.removeEvent(this._node, 'mouseenter.ui.carousel');
                $.removeEvent(this._node, 'mouseleave.ui.carousel');
            }

            if (this._options.swipe) {
                $.removeEvent(this._node, 'mousedown.ui.carousel');
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

        /**
         * Attach events for the Carousel.
         */
        _events() {
            if (this._options.keyboard) {
                $.addEvent(this._node, 'keydown.ui.carousel', (e) => {
                    const target = e.target;
                    if ($.is(target, 'input, select')) {
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
                $.addEvent(this._node, 'mouseenter.ui.carousel', (_) => {
                    this._mousePaused = true;
                    this.pause();
                });

                $.addEvent(this._node, 'mouseleave.ui.carousel', (_) => {
                    this._mousePaused = false;
                    this._paused = false;

                    if (!$.getDataset(this._node, 'ui-sliding')) {
                        this._setTimer();
                    }
                });
            }

            if (this._options.swipe) {
                let startX;
                let index = null;
                let progress;
                let direction;
                $.addEvent(this._node, 'mousedown.ui.carousel touchstart.ui.carousel', $.mouseDragFactory(
                    (e) => {
                        if (
                            e.button ||
                            $.getDataset(this._node, 'ui-sliding') ||
                            $.is(e.target, '[data-ui-slide-to], [data-ui-slide], a, button') ||
                            $.closest(e.target, '[data-ui-slide], a, button', this._node).length
                        ) {
                            return false;
                        }

                        this.pause();
                        $.setDataset(this._node, 'ui-sliding', true);

                        const pos = getPosition(e);
                        startX = pos.x;
                    },
                    (e) => {
                        const pos = getPosition(e);
                        const currentX = pos.x;
                        const width = $.width(this._node);
                        const scrollX = width / 2;

                        let mouseDiffX = currentX - startX;
                        if (!this._options.wrap) {
                            mouseDiffX = $._clamp(
                                mouseDiffX,
                                -(this._items.length - 1 - this._index) * scrollX,
                                this._index * scrollX,
                            );
                        }

                        progress = $._map(Math.abs(mouseDiffX), 0, scrollX, 0, 1);

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
                    },
                    (_) => {
                        if (index === null || index === this._index) {
                            this._paused = false;
                            $.removeDataset(this._node, 'ui-sliding');
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

                        $.animate(
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
                            $.removeDataset(this._node, 'ui-sliding');

                            this._paused = false;
                            this._setTimer();
                        }).catch((_) => {
                            $.removeDataset(this._node, 'ui-sliding');
                        });
                    },
                ), { passive: true });
            }
        }

        /**
         * Reset styles of an item.
         * @param {number} index The item index.
         */
        _resetStyles(index) {
            $.setStyle(this._items[index], {
                display: '',
                transform: '',
            });
        }

        /**
         * Set a new item index and update the items.
         * @param {number} index The new item index.
         * @return {number} The old item index.
         */
        _setIndex(index) {
            const oldIndex = this._index;
            this._index = index;

            $.addClass(this._items[this._index], 'active');
            $.removeClass(this._items[oldIndex], 'active');

            return oldIndex;
        }

        /**
         * Set a timer for the next Carousel cycle.
         */
        _setTimer() {
            if (this._timer || this._paused || this._mousePaused) {
                return;
            }

            const interval = $.getDataset(this._items[this._index], 'ui-interval');

            this._timer = setTimeout(
                (_) => this.cycle(),
                interval || this._options.interval,
            );
        }

        /**
         * Cycle to a specific Carousel item.
         * @param {number} index The item index to cycle to.
         */
        _show(index) {
            if ($.getDataset(this._node, 'ui-sliding')) {
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

            if (!$.triggerOne(this._node, 'slide.ui.carousel', eventData)) {
                return;
            }

            $.setDataset(this._node, 'ui-sliding', true);
            this.pause();

            const oldIndex = this._setIndex(index);

            $.animate(
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
                $.removeDataset(this._node, 'ui-sliding');
                $.triggerEvent(this._node, 'slid.ui.carousel', eventData);

                this._paused = false;
                this._setTimer();
            }).catch((_) => {
                $.removeDataset(this._node, 'ui-sliding');
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
        _update(nodeIn, nodeOut, progress, { direction, dragging = false } = {}) {
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

            $.setStyle(nodeIn, inStyles);
            $.setStyle(nodeOut, outStyles);
        }

        /**
         * Update the carousel indicators.
         */
        _updateIndicators() {
            const oldIndicator = $.find('.active[data-ui-slide-to]', this._node);
            const newIndicator = $.find('[data-ui-slide-to="' + this._index + '"]', this._node);
            $.removeClass(oldIndicator, 'active');
            $.addClass(newIndicator, 'active');
        }
    }

    initComponent('carousel', Carousel);

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

    // Carousel events
    $((_) => {
        const nodes = $.find('[data-ui-ride="carousel"]');

        for (const node of nodes) {
            Carousel.init(node);
        }
    });

    $.addEventDelegate(document, 'click.ui.carousel', '[data-ui-slide]', (e) => {
        e.preventDefault();

        const target = getTarget(e.currentTarget, '.carousel');
        const carousel = Carousel.init(target);
        const slide = $.getDataset(e.currentTarget, 'ui-slide');

        if (slide === 'prev') {
            carousel.prev();
        } else {
            carousel.next();
        }
    });

    $.addEventDelegate(document, 'click.ui.carousel', '[data-ui-slide-to]', (e) => {
        e.preventDefault();

        const target = getTarget(e.currentTarget, '.carousel');
        const carousel = Carousel.init(target);
        const slideTo = $.getDataset(e.currentTarget, 'ui-slide-to');

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

            const id = $.getAttribute(this._node, 'id');
            this._triggers = $.find(
                `[data-ui-toggle="collapse"][data-ui-target="#${id}"]`,
            );

            if (this._options.parent) {
                this._parent = $.closest(this._node, this._options.parent).shift();
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
                $.getDataset(this._node, 'ui-animating') ||
                !$.hasClass(this._node, 'show') ||
                !$.triggerOne(this._node, 'hide.ui.collapse')
            ) {
                return;
            }

            $.setDataset(this._node, 'ui-animating', true);
            $.addClass(this._triggers, 'collapsed');
            $.addClass(this._triggers, 'collapsing');

            $.squeezeOut(this._node, {
                direction: this._options.direction,
                duration: this._options.duration,
            }).then((_) => {
                $.removeClass(this._node, 'show');
                $.removeClass(this._triggers, 'collapsing');
                $.setAttribute(this._triggers, 'aria-expanded', false);
                $.removeDataset(this._node, 'ui-animating');
                $.triggerEvent(this._node, 'hidden.ui.collapse');
            }).catch((_) => {
                $.removeDataset(this._node, 'ui-animating');
            });
        }

        /**
         * Show the element.
         */
        show() {
            if (
                $.getDataset(this._node, 'ui-animating') ||
                $.hasClass(this._node, 'show')
            ) {
                return;
            }

            const collapses = [];
            if (this._parent) {
                const siblings = $.find('.collapse.show', this._parent);

                for (const sibling of siblings) {
                    const collapse = this.constructor.init(sibling);

                    if (!$.isSame(this._parent, collapse._parent)) {
                        continue;
                    }

                    collapses.push(collapse);
                }
            }

            if (!$.triggerOne(this._node, 'show.ui.collapse')) {
                return;
            }

            for (const collapse of collapses) {
                collapse.hide();
            }

            $.setDataset(this._node, 'ui-animating', true);
            $.addClass(this._node, 'show');
            $.removeClass(this._triggers, 'collapsed');
            $.addClass(this._triggers, 'collapsing');

            $.squeezeIn(this._node, {
                direction: this._options.direction,
                duration: this._options.duration,
            }).then((_) => {
                $.removeClass(this._triggers, 'collapsing');
                $.setAttribute(this._triggers, 'aria-expanded', true);
                $.removeDataset(this._node, 'ui-animating');
                $.triggerEvent(this._node, 'shown.ui.collapse');
            }).catch((_) => {
                $.removeDataset(this._node, 'ui-animating');
            });
        }

        /**
         * Toggle the element.
         */
        toggle() {
            if ($.hasClass(this._node, 'show')) {
                this.hide();
            } else {
                this.show();
            }
        }
    }

    initComponent('collapse', Collapse);

    // Collapse default options
    Collapse.defaults = {
        direction: 'bottom',
        duration: 250,
    };

    // Collapse events
    $.addEventDelegate(document, 'click.ui.collapse', '[data-ui-toggle="collapse"]', (e) => {
        e.preventDefault();

        const selector = getTargetSelector(e.currentTarget);
        const targets = $.find(selector);

        for (const target of targets) {
            const collapse = Collapse.init(target);
            collapse.toggle();
        }
    });

    /**
     * Popper Helpers
     */

    const poppers = new Set();

    let running = false;

    /**
     * Add a Popper to the set, and attach the Popper events.
     * @param {Popper} popper The Popper.
     */
    function addPopper(popper) {
        poppers.add(popper);

        if (running) {
            return;
        }

        $.addEvent(
            window$1,
            'resize.ui.popper',
            $.debounce((_) => {
                for (const popper of poppers) {
                    popper.update();
                }
            }),
        );

        $.addEvent(
            document,
            'scroll.ui.popper',
            $.debounce((e) => {
                for (const popper of poppers) {
                    if (!$._isDocument(e.target) && !$.hasDescendent(e.target, popper.node)) {
                        continue;
                    }

                    popper.update();
                }
            }),
            true,
        );

        running = true;
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

        $.removeEvent(window$1, 'resize.ui.popper');
        $.removeEvent(document, 'scroll.ui.popper');

        running = false;
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

            $.setStyle(this._node, {
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
            removePopper(this);

            super.dispose();
        }

        /**
         * Update the Popper position.
         */
        update() {
            if (!$.isConnected(this._node) || !$.isVisible(this._node)) {
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

            $.setStyle(this._node, resetStyle);

            if (this._options.beforeUpdate) {
                this._options.beforeUpdate(this._node, this._options.reference);
            }

            // calculate boxes
            const nodeBox = $.rect(this._node, { offset: true });
            const referenceBox = $.rect(this._options.reference, { offset: true });
            const windowBox = getScrollContainer(window$1, document);

            const scrollParent = $.closest(
                this._node,
                (parent) =>
                    $.css(parent, 'position') === 'relative' &&
                    ['overflow', 'overflowX', 'overflowY'].some((overflow) =>
                        ['auto', 'scroll'].includes(
                            $.css(parent, overflow),
                        ),
                    ),
                document.body,
            ).shift();

            const scrollBox = scrollParent ?
                getScrollContainer(scrollParent, scrollParent) :
                null;

            const containerBox = this._options.container ?
                $.rect(this._options.container, { offset: true }) :
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
                $.setDataset(this._options.reference, 'ui-placement', placement);
            }

            $.setDataset(this._node, 'ui-placement', placement);

            // get auto position
            const position = this._options.position;

            // calculate actual offset
            const offset = {
                x: Math.round(referenceBox.x),
                y: Math.round(referenceBox.y),
            };

            // offset for relative parent
            const relativeParent = $.closest(
                this._node,
                (parent) =>
                    $.css(parent, 'position') === 'relative',
                document.body,
            ).shift();
            const relativeBox = relativeParent ?
                $.rect(relativeParent, { offset: true }) :
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
            offset.x -= parseInt($.css(this._node, 'margin-left'));
            offset.y -= parseInt($.css(this._node, 'margin-top'));

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
                offset.x += $.getScrollX(scrollParent);
                offset.y += $.getScrollY(scrollParent);
            }

            // update position
            const style = {};
            if (this._options.useGpu) {
                style.transform = `translate3d(${offset.x}px , ${offset.y}px , 0)`;
            } else {
                style.marginLeft = `${offset.x}px`;
                style.marginTop = `${offset.y}px`;
            }

            $.setStyle(this._node, style);

            // update arrow
            if (this._options.arrow) {
                this._updateArrow(placement, position);
            }

            if (this._options.afterUpdate) {
                this._options.afterUpdate(this._node, this._options.reference, placement, position);
            }
        }

        /**
         * Update the arrow.
         * @param {string} placement The placement of the Popper.
         * @param {string} position The position of the Popper.
         */
        _updateArrow(placement, position) {
            const nodeBox = $.rect(this._node, { offset: true });
            const referenceBox = $.rect(this._options.reference, { offset: true });

            const arrowStyles = {
                position: 'absolute',
                top: '',
                right: '',
                bottom: '',
                left: '',
            };
            $.setStyle(this._options.arrow, arrowStyles);

            const arrowBox = $.rect(this._options.arrow, { offset: true });

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

                arrowStyles.left = $._clamp(offset, min, max);
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

                arrowStyles.top = $._clamp(offset, min, max);
            }

            $.setStyle(this._options.arrow, arrowStyles);
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

            this._menuNode = $.next(this._node, '.dropdown-menu').shift();

            if (this._options.reference) {
                if (this._options.reference === 'parent') {
                    this._referenceNode = $.parent(this._node).shift();
                } else {
                    this._referenceNode = $.findOne(this._options.reference);
                }
            } else {
                this._referenceNode = this._node;
            }

            // Attach popper
            if (this._options.display !== 'static' && $.closest(this._node, '.navbar-nav').length) {
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
                $.getDataset(this._menuNode, 'ui-animating') ||
                !$.hasClass(this._menuNode, 'show') ||
                !$.triggerOne(this._node, 'hide.ui.dropdown')
            ) {
                return;
            }

            $.setDataset(this._menuNode, 'ui-animating', true);

            $.fadeOut(this._menuNode, {
                duration: this._options.duration,
            }).then((_) => {
                if (this._popper) {
                    this._popper.dispose();
                    this._popper = null;
                }

                $.removeClass(this._menuNode, 'show');
                $.setAttribute(this._node, 'aria-expanded', false);
                $.removeDataset(this._menuNode, 'ui-animating');
                $.triggerEvent(this._node, 'hidden.ui.dropdown');
            }).catch((_) => {
                $.removeDataset(this._menuNode, 'ui-animating');
            });
        }

        /**
         * Show the Dropdown.
         */
        show() {
            if (
                $.getDataset(this._menuNode, 'ui-animating') ||
                $.hasClass(this._menuNode, 'show') ||
                !$.triggerOne(this._node, 'show.ui.dropdown')
            ) {
                return;
            }

            $.setDataset(this._menuNode, 'ui-animating', true);
            $.addClass(this._menuNode, 'show');

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

            $.fadeIn(this._menuNode, {
                duration: this._options.duration,
            }).then((_) => {
                $.setAttribute(this._node, 'aria-expanded', true);
                $.removeDataset(this._menuNode, 'ui-animating');
                $.triggerEvent(this._node, 'shown.ui.dropdown');
            }).catch((_) => {
                $.removeDataset(this._menuNode, 'ui-animating');
            });
        }

        /**
         * Toggle the Dropdown.
         */
        toggle() {
            if ($.hasClass(this._menuNode, 'show')) {
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
    $.addEvent(window$1, 'mousedown.ui', (e) => {
        clickTarget = e.target;
    }, { capture: true });

    $.addEvent(window$1, 'mouseup.ui', (_) => {
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

    initComponent('dropdown', Dropdown);

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

    // Dropdown events
    $.addEventDelegate(document, 'click.ui.dropdown keyup.ui.dropdown', '[data-ui-toggle="dropdown"]', (e) => {
        if (e.code && e.code !== 'Space') {
            return;
        }

        e.preventDefault();

        const dropdown = Dropdown.init(e.currentTarget);
        dropdown.toggle();
    });

    $.addEventDelegate(document, 'keydown.ui.dropdown', '[data-ui-toggle="dropdown"]', (e) => {
        switch (e.code) {
            case 'ArrowDown':
            case 'ArrowUp':
                e.preventDefault();

                const node = e.currentTarget;
                const dropdown = Dropdown.init(node);

                if (!$.hasClass(dropdown._menuNode, 'show')) {
                    dropdown.show();
                }

                const focusNode = $.findOne('.dropdown-item:not([tabindex="-1"])', dropdown._menuNode);
                $.focus(focusNode);
                break;
        }
    });

    $.addEventDelegate(document, 'keydown.ui.dropdown', '.dropdown-menu.show .dropdown-item', (e) => {
        let focusNode;

        switch (e.code) {
            case 'ArrowDown':
                focusNode = $.nextAll(e.currentTarget, '.dropdown-item:not([tabindex="-1"])').shift();
                break;
            case 'ArrowUp':
                focusNode = $.prevAll(e.currentTarget, '.dropdown-item:not([tabindex="-1"])').pop();
                break;
            default:
                return;
        }

        e.preventDefault();

        $.focus(focusNode);
    });

    $.addEvent(document, 'click.ui.dropdown', (e) => {
        const target = getClickTarget(e);
        const nodes = $.find('.dropdown-menu.show');

        for (const node of nodes) {
            const toggle = $.siblings(node, '[data-ui-toggle="dropdown"]').shift();
            const dropdown = Dropdown.init(toggle);
            const hasDescendent = $.hasDescendent(dropdown._menuNode, target);
            const autoClose = dropdown._options.autoClose;

            if (
                $.isSame(dropdown._node, target) ||
                (
                    hasDescendent &&
                    (
                        $.is(target, 'form') ||
                        $.closest(target, 'form', dropdown._menuNode).length ||
                        autoClose === 'outside' ||
                        autoClose === false
                    )
                ) ||
                (
                    !hasDescendent &&
                    !$.isSame(dropdown._menuNode, target) &&
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

    $.addEvent(document, 'keyup.ui.dropdown', (e) => {
        if (!['Tab', 'Escape'].includes(e.code)) {
            return;
        }

        let stopped = false;
        const nodes = $.find('.dropdown-menu.show');

        for (const node of nodes) {
            const toggle = $.siblings(node, '[data-ui-toggle="dropdown"]').shift();
            const dropdown = Dropdown.init(toggle);

            if (
                (e.code === 'Tab' && $.isSame(dropdown._node, e.target)) ||
                (
                    $.hasDescendent(dropdown._menuNode, e.target) &&
                    (
                        e.code === 'Tab' ||
                        $.is(e.target, 'form') ||
                        $.closest(e.target, 'form', dropdown._menuNode).length
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

            this._dialog = $.child(this._node, '.modal-dialog').shift();

            if (this._options.show) {
                this.show();
            }
        }

        /**
         * Dispose the Modal.
         */
        dispose() {
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
                $.getDataset(this._dialog, 'ui-animating') ||
                !$.hasClass(this._node, 'show') ||
                !$.triggerOne(this._node, 'hide.ui.modal')
            ) {
                return;
            }

            $.stop(this._dialog);
            $.setDataset(this._dialog, 'ui-animating', true);

            const stackSize = $.find('.modal.show').length - 1;

            Promise.all([
                $.fadeOut(this._dialog, {
                    duration: this._options.duration,
                }),
                $.dropOut(this._dialog, {
                    duration: this._options.duration,
                    direction: 'top',
                }),
                $.fadeOut(this._backdrop, {
                    duration: this._options.duration,
                }),
            ]).then((_) => {
                $.removeAttribute(this._node, 'aria-modal');
                $.setAttribute(this._node, 'aria-hidden', true);

                resetScrollPadding(this._dialog);

                if (stackSize) {
                    $.setStyle(this._node, 'zIndex', '');
                } else {
                    if (this._scrollPadding) {
                        resetScrollPadding();
                        this._scrollPadding = false;
                    }

                    $.removeClass(document.body, 'modal-open');
                }

                $.removeClass(this._node, 'show');

                if (this._options.backdrop) {
                    $.remove(this._backdrop);
                    this._backdrop = null;
                }

                if (this._activeTarget) {
                    $.focus(this._activeTarget);
                    this._activeTarget = null;
                }

                $.removeDataset(this._dialog, 'ui-animating');
                $.triggerEvent(this._node, 'hidden.ui.modal');
            }).catch((_) => {
                $.removeDataset(this._dialog, 'ui-animating');
            });
        }

        /**
         * Show the Modal.
         */
        show() {
            if (
                $.getDataset(this._dialog, 'ui-animating') ||
                $.hasClass(this._node, 'show') ||
                !$.triggerOne(this._node, 'show.ui.modal')
            ) {
                return;
            }

            $.setDataset(this._dialog, 'ui-animating', true);

            const stackSize = $.find('.modal.show').length;

            $.removeClass(document.body, 'modal-open');

            addScrollPadding(this._dialog);

            if (stackSize) {
                let zIndex = $.css(this._node, 'zIndex');
                zIndex = parseInt(zIndex);
                zIndex += stackSize * 20;

                $.setStyle(this._node, 'zIndex', zIndex);
            } else {
                if (!$.findOne('.offcanvas.show')) {
                    this._scrollPadding = true;
                    addScrollPadding();
                }
            }

            $.addClass(document.body, 'modal-open');

            $.addClass(this._node, 'show');

            if (this._options.backdrop) {
                this._backdrop = $.create('div', {
                    class: 'modal-backdrop',
                });

                $.append(document.body, this._backdrop);

                if (stackSize) {
                    let zIndex = $.css(this._backdrop, 'zIndex');
                    zIndex = parseInt(zIndex);
                    zIndex += stackSize * 20;

                    $.setStyle(this._backdrop, 'zIndex', zIndex);
                }
            }

            Promise.all([
                $.fadeIn(this._dialog, {
                    duration: this._options.duration,
                }),
                $.dropIn(this._dialog, {
                    duration: this._options.duration,
                    direction: 'top',
                }),
                $.fadeIn(this._backdrop, {
                    duration: this._options.duration,
                }),
            ]).then((_) => {
                $.removeAttribute(this._node, 'aria-hidden');
                $.setAttribute(this._node, 'aria-modal', true);

                if (this._options.focus) {
                    $.focus(this._node);
                }

                $.removeDataset(this._dialog, 'ui-animating');
                $.triggerEvent(this._node, 'shown.ui.modal');
            }).catch((_) => {
                $.removeDataset(this._dialog, 'ui-animating');
            });
        }

        /**
         * Toggle the Modal.
         */
        toggle() {
            if ($.hasClass(this._node, 'show')) {
                this.hide();
            } else {
                this.show();
            }
        }

        /**
         * Start a zoom in/out animation.
         */
        _zoom() {
            if ($.getDataset(this._dialog, 'ui-animating')) {
                return;
            }

            $.stop(this._dialog);

            $.animate(
                this._dialog,
                (node, progress) => {
                    if (progress >= 1) {
                        $.setStyle(node, 'transform', '');
                        return;
                    }

                    const zoomOffset = (progress < .5 ? progress : (1 - progress)) / 20;
                    $.setStyle(node, 'transform', `scale(${1 + zoomOffset})`);
                },
                {
                    duration: 200,
                },
            ).catch((_) => {
                //
            });
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
        const nodes = $.find('.modal.show');

        if (!nodes.length) {
            return null;
        }

        // find modal with highest zIndex
        let node = nodes.shift();
        let highestZIndex = $.getStyle(node, 'zIndex');

        for (const otherNode of nodes) {
            const newZIndex = $.getStyle(otherNode, 'zIndex');

            if (newZIndex <= highestZIndex) {
                continue;
            }

            node = otherNode;
            highestZIndex = newZIndex;
        }

        return Modal.init(node);
    }

    initComponent('modal', Modal);

    // Modal default options
    Modal.defaults = {
        duration: 250,
        backdrop: true,
        focus: true,
        show: false,
        keyboard: true,
    };

    // Modal events
    $.addEventDelegate(document, 'click.ui.modal', '[data-ui-toggle="modal"]', (e) => {
        e.preventDefault();

        const target = getTarget(e.currentTarget, '.modal');
        const modal = Modal.init(target);
        modal._activeTarget = e.currentTarget;
        modal.show();
    });

    $.addEventDelegate(document, 'click.ui.modal', '[data-ui-dismiss="modal"]', (e) => {
        e.preventDefault();

        const target = getTarget(e.currentTarget, '.modal');
        const modal = Modal.init(target);
        modal.hide();
    });

    // Events must be attached to the window, so offcanvas events are triggered first
    $.addEvent(window$1, 'click.ui.modal', (e) => {
        const target = getClickTarget(e);

        if ($.is(target, '[data-ui-dismiss]')) {
            return;
        }

        const modal = getTopModal();

        if (
            !modal ||
            !modal._options.backdrop ||
            (modal._node !== target && $.hasDescendent(modal._node, target))
        ) {
            return;
        }

        if (modal._options.backdrop === 'static') {
            modal._zoom();
            return;
        }

        modal.hide();
    });

    $.addEvent(window$1, 'keyup.ui.modal', (e) => {
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
        if ($.hasClass(node, 'offcanvas-end')) {
            return 'right';
        }

        if ($.hasClass(node, 'offcanvas-bottom')) {
            return 'bottom';
        }

        if ($.hasClass(node, 'offcanvas-start')) {
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
         * Dispose the Offcanvas.
         */
        dispose() {
            this._activeTarget = null;

            super.dispose();
        }

        /**
         * Hide the Offcanvas.
         */
        hide() {
            if (
                $.getDataset(this._node, 'ui-animating') ||
                !$.hasClass(this._node, 'show') ||
                !$.triggerOne(this._node, 'hide.ui.offcanvas')
            ) {
                return;
            }

            $.setDataset(this._node, 'ui-animating', true);

            Promise.all([
                $.fadeOut(this._node, {
                    duration: this._options.duration,
                }),
                $.dropOut(this._node, {
                    duration: this._options.duration,
                    direction: getDirection(this._node),
                }),
            ]).then((_) => {
                $.removeAttribute(this._node, 'aria-modal');
                $.setAttribute(this._node, 'aria-hidden', true);

                $.removeClass(this._node, 'show');

                if (this._options.backdrop) {
                    $.removeClass(document.body, 'offcanvas-backdrop');
                }

                if (!this._options.scroll) {
                    resetScrollPadding();
                    $.setStyle(document.body, 'overflow', '');
                }

                if (this._activeTarget) {
                    $.focus(this._activeTarget);
                    this._activeTarget = null;
                }

                $.removeDataset(this._node, 'ui-animating');
                $.triggerEvent(this._node, 'hidden.ui.offcanvas');
            }).catch((_) => {
                $.removeDataset(this._node, 'ui-animating');
            });
        }

        /**
         * Show the Offcanvas.
         */
        show() {
            if (
                $.getDataset(this._node, 'ui-animating') ||
                $.hasClass(this._node, 'show') ||
                $.findOne('.offcanvas.show') ||
                !$.triggerOne(this._node, 'show.ui.offcanvas')
            ) {
                return;
            }

            $.setDataset(this._node, 'ui-animating', true);
            $.addClass(this._node, 'show');

            if (this._options.backdrop) {
                $.addClass(document.body, 'offcanvas-backdrop');
            }

            if (!this._options.scroll) {
                addScrollPadding();
                $.setStyle(document.body, 'overflow', 'hidden');
            }

            Promise.all([
                $.fadeIn(this._node, {
                    duration: this._options.duration,
                }),
                $.dropIn(this._node, {
                    duration: this._options.duration,
                    direction: getDirection(this._node),
                }),
            ]).then((_) => {
                $.removeAttribute(this._node, 'aria-hidden');
                $.setAttribute(this._node, 'aria-modal', true);
                $.removeDataset(this._node, 'ui-animating');
                $.triggerEvent(this._node, 'shown.ui.offcanvas');
            }).catch((_) => {
                $.removeDataset(this._node, 'ui-animating');
            });
        }

        /**
         * Toggle the Offcanvas.
         */
        toggle() {
            if ($.hasClass(this._node, 'show')) {
                this.hide();
            } else {
                this.show();
            }
        }
    }

    initComponent('offcanvas', Offcanvas);

    // Offcanvas default options
    Offcanvas.defaults = {
        duration: 250,
        backdrop: true,
        keyboard: true,
        scroll: false,
    };

    // Offcanvas events
    $.addEventDelegate(document, 'click.ui.offcanvas', '[data-ui-toggle="offcanvas"]', (e) => {
        e.preventDefault();

        const target = getTarget(e.currentTarget, '.offcanvas');
        const offcanvas = Offcanvas.init(target);
        offcanvas._activeTarget = e.currentTarget;
        offcanvas.show();
    });

    $.addEventDelegate(document, 'click.ui.offcanvas', '[data-ui-dismiss="offcanvas"]', (e) => {
        e.preventDefault();

        const target = getTarget(e.currentTarget, '.offcanvas');
        const offcanvas = Offcanvas.init(target);
        offcanvas.hide();
    });

    $.addEvent(document, 'click.ui.offcanvas', (e) => {
        const target = getClickTarget(e);

        if ($.is(target, '[data-ui-dismiss]') || $.findOne('.modal.show')) {
            return;
        }

        const nodes = $.find('.offcanvas.show');

        if (!nodes.length) {
            return;
        }

        for (const node of nodes) {
            const offcanvas = Offcanvas.init(node);

            if (
                !offcanvas._options.backdrop ||
                offcanvas._options.backdrop === 'static' ||
                $.isSame(offcanvas._node, target) ||
                $.hasDescendent(offcanvas._node, target)
            ) {
                continue;
            }

            offcanvas.hide();
        }
    });

    $.addEvent(document, 'keyup.ui.offcanvas', (e) => {
        if (e.code !== 'Escape' || $.findOne('.modal.show')) {
            return;
        }

        const nodes = $.find('.offcanvas.show');

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

            this._modal = $.closest(this._node, '.modal').shift();

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
            if ($.hasDataset(this._node, 'ui-original-title')) {
                const title = $.getDataset(this._node, 'ui-original-title');
                $.setAttribute(this._node, 'title', title);
                $.removeDataset(this._node, 'ui-original-title');
            }

            if (this._popper) {
                this._popper.dispose();
                this._popper = null;
            }

            $.remove(this._popover);

            if (this._triggers.includes('hover')) {
                $.removeEvent(this._node, 'mouseover.ui.popover');
                $.removeEvent(this._node, 'mouseout.ui.popover');
            }

            if (this._triggers.includes('focus')) {
                $.removeEvent(this._node, 'focus.ui.popover');
                $.removeEvent(this._node, 'blur.ui.popover');
            }

            if (this._triggers.includes('click')) {
                $.removeEvent(this._node, 'click.ui.popover');
            }

            if (this._modal) {
                $.removeEvent(this._modal, 'hide.ui.modal', this._hideModalEvent);
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
                $.getDataset(this._popover, 'ui-animating') ||
                !$.isConnected(this._popover) ||
                !$.triggerOne(this._node, 'hide.ui.popover')
            ) {
                return;
            }

            $.setDataset(this._popover, 'ui-animating', true);

            $.fadeOut(this._popover, {
                duration: this._options.duration,
            }).then((_) => {
                this._popper.dispose();
                this._popper = null;

                $.detach(this._popover);
                $.removeDataset(this._popover, 'ui-animating');
                $.triggerEvent(this._node, 'hidden.ui.popover');
            }).catch((_) => {
                $.removeDataset(this._popover, 'ui-animating');
            });
        }

        /**
         * Refresh the Popover.
         */
        refresh() {
            if ($.hasAttribute(this._node, 'title')) {
                const originalTitle = $.getAttribute(this._node, 'title');
                $.setDataset(this._node, 'ui-original-title', originalTitle);
                $.removeAttribute(this._node, 'title');
            }

            let title = '';
            if ($.hasDataset(this._node, 'uiTitle')) {
                title = $.getDataset(this._node, 'uiTitle');
            } else if (this._options.title) {
                title = this._options.title;
            } else if ($.hasDataset(this._node, 'ui-original-title')) {
                title = $.getDataset(this._node, 'ui-original-title', title);
            }

            let content = '';
            if ($.hasDataset(this._node, 'ui-content')) {
                content = $.getDataset(this._node, 'ui-content');
            } else if (this._options.content) {
                content = this._options.content;
            }

            const method = this._options.html ? 'setHTML' : 'setText';

            $[method](
                this._popoverHeader,
                this._options.html && this._options.sanitize ?
                    this._options.sanitize(title) :
                    title,
            );

            if (!title) {
                $.hide(this._popoverHeader);
            } else {
                $.show(this._popoverHeader);
            }

            $[method](
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
                $.getDataset(this._popover, 'ui-animating') ||
                $.isConnected(this._popover) ||
                !$.triggerOne(this._node, 'show.ui.popover')
            ) {
                return;
            }

            $.setDataset(this._popover, 'ui-animating', true);
            this.refresh();
            this._show();

            $.fadeIn(this._popover, {
                duration: this._options.duration,
            }).then((_) => {
                $.removeDataset(this._popover, 'ui-animating');
                $.triggerEvent(this._node, 'shown.ui.popover');
            }).catch((_) => {
                $.removeDataset(this._popover, 'ui-animating');
            });
        }

        /**
         * Toggle the Popover.
         */
        toggle() {
            if ($.isConnected(this._popover)) {
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

        /**
         * Attach events for the Popover.
         */
        _events() {
            if (this._triggers.includes('hover')) {
                $.addEvent(this._node, 'mouseover.ui.popover', (_) => {
                    this._stop();
                    this.show();
                });

                $.addEvent(this._node, 'mouseout.ui.popover', (_) => {
                    this._stop();
                    this.hide();
                });
            }

            if (this._triggers.includes('focus')) {
                $.addEvent(this._node, 'focus.ui.popover', (_) => {
                    this._stop();
                    this.show();
                });

                $.addEvent(this._node, 'blur.ui.popover', (_) => {
                    this._stop();
                    this.hide();
                });
            }

            if (this._triggers.includes('click')) {
                $.addEvent(this._node, 'click.ui.popover', (e) => {
                    e.preventDefault();

                    this._stop();
                    this.toggle();
                });
            }

            if (this._modal) {
                $.addEvent(this._modal, 'hide.ui.modal', (_) => {
                    this._stop();
                    this.hide();
                });
            }
        }

        /**
         * Render the Popover element.
         */
        _render() {
            this._popover = $.parseHTML(this._options.template).shift();
            if (this._options.customClass) {
                $.addClass(this._popover, this._options.customClass);
            }
            this._arrow = $.findOne('.popover-arrow', this._popover);
            this._popoverHeader = $.findOne('.popover-header', this._popover);
            this._popoverBody = $.findOne('.popover-body', this._popover);
        }

        /**
         * Update the Popover and append to the DOM.
         */
        _show() {
            if (this._options.appendTo) {
                $.append(this._options.appendTo, this._popover);
            } else {
                $.after(this._node, this._popover);
            }

            if (!this._options.noAttributes) {
                const id = generateId(this.constructor.DATA_KEY);
                $.setAttribute(this._popover, 'id', id);
                $.setAttribute(this._node, 'aria-described-by', id);
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
        _stop() {
            if (this._enabled && $.getDataset(this._popover, 'ui-animating')) {
                $.stop(this._popover);
                $.removeDataset(this._popover, 'ui-animating');
            }
        }
    }

    initComponent('popover', Popover);

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
        sanitize: (input) => $.sanitize(input),
        trigger: 'click',
        placement: 'auto',
        position: 'center',
        fixed: false,
        spacing: 3,
        minContact: false,
        noAttributes: false,
    };

    initComponent('popper', Popper);

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
            this._target = $.findOne(selector);
            this._siblings = $.siblings(this._node);
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
                $.getDataset(this._target, 'ui-animating') ||
                !$.hasClass(this._target, 'active') ||
                !$.triggerOne(this._node, 'hide.ui.tab')
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
                $.getDataset(this._target, 'ui-animating') ||
                $.hasClass(this._target, 'active') ||
                !$.triggerOne(this._node, 'show.ui.tab')
            ) {
                return;
            }

            const active = this._siblings.find((sibling) =>
                $.hasClass(sibling, 'active'),
            );

            if (!active) {
                this._show();
            } else {
                const activeTab = this.constructor.init(active);

                if (activeTab.animating) {
                    return;
                }

                if (!$.triggerOne(active, 'hide.ui.tab')) {
                    return;
                }

                $.addEventOnce(active, 'hidden.ui.tab', (_) => {
                    this._show();
                });

                activeTab._hide();
            }
        }

        /**
         * Hide the current Tab (forcefully).
         */
        _hide() {
            $.setDataset(this._target, 'ui-animating', true);

            $.fadeOut(this._target, {
                duration: this._options.duration,
            }).then((_) => {
                $.removeClass(this._target, 'active');
                $.removeClass(this._node, 'active');
                $.removeDataset(this._target, 'ui-animating');
                $.setAttribute(this._node, 'aria-selected', false);
                $.triggerEvent(this._node, 'hidden.ui.tab');
            }).catch((_) => {
                $.removeDataset(this._target, 'ui-animating');
            });
        }

        /**
         * Show the current Tab (forcefully).
         */
        _show() {
            $.setDataset(this._target, 'ui-animating', true);

            $.addClass(this._target, 'active');
            $.addClass(this._node, 'active');

            $.fadeIn(this._target, {
                duration: this._options.duration,
            }).then((_) => {
                $.setAttribute(this._node, 'aria-selected', true);
                $.removeDataset(this._target, 'ui-animating');
                $.triggerEvent(this._node, 'shown.ui.tab');
            }).catch((_) => {
                $.removeDataset(this._target, 'ui-animating');
            });
        }
    }

    initComponent('tab', Tab);

    // Tab default options
    Tab.defaults = {
        duration: 100,
    };

    // Tab events
    $.addEventDelegate(document, 'click.ui.tab', '[data-ui-toggle="tab"]', (e) => {
        e.preventDefault();

        const tab = Tab.init(e.currentTarget);
        tab.show();
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
                $.getDataset(this._node, 'ui-animating') ||
                !$.isVisible(this._node) ||
                !$.triggerOne(this._node, 'hide.ui.toast')
            ) {
                return;
            }

            $.setDataset(this._node, 'ui-animating', true);

            $.fadeOut(this._node, {
                duration: this._options.duration,
            }).then((_) => {
                $.setStyle(this._node, 'display', 'none', { important: true });
                $.removeClass(this._node, 'show');
                $.removeDataset(this._node, 'ui-animating');
                $.triggerEvent(this._node, 'hidden.ui.toast');
            }).catch((_) => {
                $.removeDataset(this._node, 'ui-animating');
            });
        }

        /**
         * Show the Toast.
         */
        show() {
            if (
                $.getDataset(this._node, 'ui-animating') ||
                $.isVisible(this._node) ||
                !$.triggerOne(this._node, 'show.ui.toast')
            ) {
                return;
            }

            $.setDataset(this._node, 'ui-animating', true);
            $.setStyle(this._node, 'display', '');
            $.addClass(this._node, 'show');

            $.fadeIn(this._node, {
                duration: this._options.duration,
            }).then((_) => {
                $.removeDataset(this._node, 'ui-animating');
                $.triggerEvent(this._node, 'shown.ui.toast');

                if (this._options.autohide) {
                    setTimeout(
                        (_) => this.hide(),
                        this._options.delay,
                    );
                }
            }).catch((_) => {
                $.removeDataset(this._node, 'ui-animating');
            });
        }
    }

    initComponent('toast', Toast);

    // Toast default options
    Toast.defaults = {
        autohide: true,
        delay: 5000,
        duration: 100,
    };

    // Toast events
    $.addEventDelegate(document, 'click.ui.toast', '[data-ui-dismiss="toast"]', (e) => {
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

            this._modal = $.closest(this._node, '.modal').shift();

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
            if ($.hasDataset(this._node, 'ui-original-title')) {
                const title = $.getDataset(this._node, 'ui-original-title');
                $.setAttribute(this._node, 'title', title);
                $.removeDataset(this._node, 'ui-original-title');
            }

            if (this._popper) {
                this._popper.dispose();
                this._popper = null;
            }

            $.remove(this._tooltip);

            if (this._triggers.includes('hover')) {
                $.removeEvent(this._node, 'mouseover.ui.tooltip');
                $.removeEvent(this._node, 'mouseout.ui.tooltip');
            }

            if (this._triggers.includes('focus')) {
                $.removeEvent(this._node, 'focus.ui.tooltip');
                $.removeEvent(this._node, 'blur.ui.tooltip');
            }

            if (this._triggers.includes('click')) {
                $.removeEvent(this._node, 'click.ui.tooltip');
            }

            if (this._modal) {
                $.removeEvent(this._modal, 'hide.ui.modal');
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
                $.getDataset(this._tooltip, 'ui-animating') ||
                !$.isConnected(this._tooltip) ||
                !$.triggerOne(this._node, 'hide.ui.tooltip')
            ) {
                return;
            }

            $.setDataset(this._tooltip, 'ui-animating', true);

            $.fadeOut(this._tooltip, {
                duration: this._options.duration,
            }).then((_) => {
                this._popper.dispose();
                this._popper = null;

                $.removeClass(this._tooltip, 'show');
                $.detach(this._tooltip);
                $.removeDataset(this._tooltip, 'ui-animating');
                $.triggerEvent(this._node, 'hidden.ui.tooltip');
            }).catch((_) => {
                $.removeDataset(this._tooltip, 'ui-animating');
            });
        }

        /**
         * Refresh the Tooltip.
         */
        refresh() {
            if ($.hasAttribute(this._node, 'title')) {
                const originalTitle = $.getAttribute(this._node, 'title');
                $.setDataset(this._node, 'ui-original-title', originalTitle);
                $.removeAttribute(this._node, 'title');
            }

            let title = '';
            if ($.hasDataset(this._node, 'uiTitle')) {
                title = $.getDataset(this._node, 'uiTitle');
            } else if (this._options.title) {
                title = this._options.title;
            } else if ($.hasDataset(this._node, 'ui-original-title')) {
                title = $.getDataset(this._node, 'ui-original-title', title);
            }

            const method = this._options.html ? 'setHTML' : 'setText';

            $[method](
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
                $.getDataset(this._tooltip, 'ui-animating') ||
                $.isConnected(this._tooltip) ||
                !$.triggerOne(this._node, 'show.ui.tooltip')
            ) {
                return;
            }

            $.setDataset(this._tooltip, 'ui-animating', true);
            $.addClass(this._tooltip, 'show');
            this.refresh();
            this._show();

            $.fadeIn(this._tooltip, {
                duration: this._options.duration,
            }).then((_) => {
                $.removeDataset(this._tooltip, 'ui-animating');
                $.triggerEvent(this._node, 'shown.ui.tooltip');
            }).catch((_) => {
                $.removeDataset(this._tooltip, 'ui-animating');
            });
        }

        /**
         * Toggle the Tooltip.
         */
        toggle() {
            if ($.isConnected(this._tooltip)) {
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

        /**
         * Attach events for the Tooltip.
         */
        _events() {
            if (this._triggers.includes('hover')) {
                $.addEvent(this._node, 'mouseover.ui.tooltip', (_) => {
                    this._stop();
                    this.show();
                });

                $.addEvent(this._node, 'mouseout.ui.tooltip', (_) => {
                    this._stop();
                    this.hide();
                });
            }

            if (this._triggers.includes('focus')) {
                $.addEvent(this._node, 'focus.ui.tooltip', (_) => {
                    this._stop();
                    this.show();
                });

                $.addEvent(this._node, 'blur.ui.tooltip', (_) => {
                    this._stop();
                    this.hide();
                });
            }

            if (this._triggers.includes('click')) {
                $.addEvent(this._node, 'click.ui.tooltip', (e) => {
                    e.preventDefault();

                    this._stop();
                    this.toggle();
                });
            }

            if (this._modal) {
                $.addEvent(this._modal, 'hide.ui.modal', (_) => {
                    this._stop();
                    this.hide();
                });
            }
        }

        /**
         * Render the Tooltip element.
         */
        _render() {
            this._tooltip = $.parseHTML(this._options.template).shift();
            if (this._options.customClass) {
                $.addClass(this._tooltip, this._options.customClass);
            }
            this._arrow = $.findOne('.tooltip-arrow', this._tooltip);
            this._tooltipInner = $.findOne('.tooltip-inner', this._tooltip);
        }

        /**
         * Update the Tooltip and append to the DOM.
         */
        _show() {
            if (this._options.appendTo) {
                $.append(this._options.appendTo, this._tooltip);
            } else {
                $.after(this._node, this._tooltip);
            }

            if (!this._options.noAttributes) {
                const id = generateId(this.constructor.DATA_KEY);
                $.setAttribute(this._tooltip, 'id', id);
                $.setAttribute(this._node, 'aria-described-by', id);
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
        _stop() {
            if (this._enabled && $.getDataset(this._tooltip, 'ui-animating')) {
                $.stop(this._tooltip);
                $.removeDataset(this._tooltip, 'ui-animating');
            }
        }
    }

    initComponent('tooltip', Tooltip);

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
        sanitize: (input) => $.sanitize(input),
        placement: 'auto',
        position: 'center',
        fixed: false,
        spacing: 2,
        minContact: false,
        noAttributes: false,
    };

    // Clipboard events
    $.addEventDelegate(document, 'click', '[data-ui-toggle="clipboard"]', (e) => {
        e.preventDefault();

        const node = e.currentTarget;
        let { action = 'copy', text = null } = getDataset(node);

        if (!['copy', 'cut'].includes(action)) {
            throw new Error('Invalid clipboard action');
        }

        let input;
        if (!text) {
            const target = getTarget(node);
            if ($.is(target, 'input, textarea')) {
                input = target;
            } else {
                text = $.getText(target);
            }
        }

        const customText = !input;
        if (customText) {
            input = $.create(
                'textarea',
                {
                    class: 'visually-hidden position-fixed',
                    value: text,
                },
            );

            $.append(document.body, input);
        }

        $.select(input);

        if ($.exec(action)) {
            $.triggerEvent(node, 'copied.ui.clipboard', {
                detail: {
                    action: action,
                    text: $.getValue(input),
                },
            });
        }

        if (customText) {
            $.detach(input);
        }
    });

    // Ripple events
    $.addEventDelegate(document, 'mousedown.ui.ripple', '.ripple', (e) => {
        const target = e.currentTarget;
        const pos = $.position(target, { offset: true });

        const width = $.width(target);
        const height = $.height(target);
        const scaleMultiple = Math.max(width, height) * 3;

        const isFixed = $.isFixed(target);
        const mouseX = isFixed ? e.clientX : e.pageX;
        const mouseY = isFixed ? e.clientY : e.pageY;

        const prevRipple = $.findOne(':scope > .ripple-effect', target);

        if (prevRipple) {
            $.remove(prevRipple);
        }

        const ripple = $.create('span', {
            class: 'ripple-effect',
            style: {
                left: mouseX - pos.x,
                top: mouseY - pos.y,
            },
        });
        $.append(target, ripple);

        const animation = $.animate(
            ripple,
            (node, progress) => {
                $.setStyle(node, {
                    transform: 'scale(' + Math.floor(progress * scaleMultiple) + ')',
                });
            },
            {
                duration: 500,
            },
        );

        $.addEventOnce(document, 'mouseup.ui.ripple', (_) => {
            animation.finally((_) => {
                $.animate(
                    ripple,
                    (node, progress) => {
                        $.setStyle(node, {
                            opacity: 1 - Math.pow(progress, 2),
                        });
                    },
                    {
                        duration: 250,
                    },
                ).finally((_) => {
                    $.detach(ripple);
                });
            });
        });
    });

    // Text expand events
    $.addEventDelegate(document, 'change.ui.expand input.ui.expand', '.text-expand', (e) => {
        const textArea = e.currentTarget;

        $.setStyle(textArea, 'height', 'inherit');

        let newHeight = $.height(textArea, { boxSize: $.SCROLL_BOX });
        newHeight += parseInt($.css(textArea, 'border-top'));
        newHeight += parseInt($.css(textArea, 'border-bottom'));

        $.setStyle(textArea, 'height', `${newHeight}px`);
    });

    exports.Alert = Alert;
    exports.BaseComponent = BaseComponent;
    exports.Button = Button;
    exports.Carousel = Carousel;
    exports.Collapse = Collapse;
    exports.Dropdown = Dropdown;
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
