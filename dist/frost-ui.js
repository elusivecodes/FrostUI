(function(global, factory) {
    'use strict';

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory;
    } else {
        Object.assign(global, factory(global));
    }

})(window, function(window) {
    'use strict';

    const document = window.document;
    const Core = window.Core;
    const DOM = window.DOM;
    const dom = window.dom;
    const QuerySet = window.QuerySet;

    const UI = {};

    /**
     * Alert Class
     * @class
     */
    class Alert {

        /**
         * New Alert constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Alert with.
         * @returns {Alert} A new Alert object.
         */
        constructor(node, settings) {
            this._node = node;
            this._settings = {
                ...Alert.defaults,
                ...dom.getDataset(this._node),
                ...settings
            };

            dom.setData(this._node, 'alert', this);
        }

        /**
         * Destroy the Alert.
         */
        destroy() {
            dom.stop(this._node, true);
            dom.removeData(this._node, 'alert');
        }

        /**
         * Close the Alert.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        close() {
            return new Promise((resolve, reject) => {
                if (dom.getDataset(this._node, 'animating') === 'true') {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'close.frost.alert')) {
                    return reject();
                }

                dom.setDataset(this._node, 'animating', 'true');

                dom.fadeOut(this._node, {
                    duration: this._settings.duration
                }).then(_ => {
                    dom.triggerEvent(this._node, 'closed.frost.alert');
                    dom.remove(this._node);
                    resolve();
                }).catch(_ => {
                    dom.removeDataset(this._node, 'animating');
                    reject();
                });
            });
        }

    }


    // Default Alert options
    Alert.defaults = {
        duration: 100
    };

    // Remove Alert from data-dismiss
    dom.addEventDelegate(document, 'click', '[data-dismiss="alert"]', e => {
        e.preventDefault();

        const element = dom.closest(e.currentTarget, '.alert').shift();
        const alert = dom.hasData(element, 'alert') ?
            dom.getData(element, 'alert') :
            new Alert(element);

        alert.close().catch(_ => { });
    });

    UI.Alert = Alert;


    /**
     * Button Class
     * @class
     */
    class Button {

        /**
         * New Button constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Button with.
         * @returns {Button} A new Button object.
         */
        constructor(node, settings) {
            this._node = node;
            this._settings = {
                ...Button.defaults,
                ...dom.getDataset(this._node),
                ...settings
            };

            const group = dom.closest(this._node, '[data-toggle="buttons"]');
            this._siblings = dom.find('.btn', group).filter(node => !dom.isSame(node, this._node));
            this._input = dom.findOne('input[type="checkbox"], input[type="radio"]', this._node);

            dom.setData(this._node, 'button', this);
        }

        /**
         * Destroy the Button.
         */
        destroy() {
            dom.removeData(this._node, 'button');
        }

        /**
         * Toggle the Button.
         */
        toggle() {
            if (!this._siblings.length) {
                if (this._input) {
                    dom.setProperty(this._input, 'checked', !dom.getProperty(this._input, 'checked'));
                }
                dom.toggleClass(this._node, 'active');
                return;
            }

            if (dom.hasClass(this._node, 'active')) {
                return;
            }
            dom.removeClass(this._siblings, 'active');
            dom.addClass(this._node, 'active');
            if (this._input) {
                dom.setProperty(this._input, 'checked', true);
            }
        }

    }


    // Default Button options
    Button.defaults = {};

    // Trigger Button from data-toggle
    dom.addEventDelegate(document, 'click', '[data-toggle="buttons"] > .btn, [data-toggle="button"]', e => {
        e.preventDefault();

        const button = dom.hasData(e.currentTarget, 'button') ?
            dom.getData(e.currentTarget, 'button') :
            new Button(e.currentTarget);

        button.toggle();
    });

    UI.Button = Button;


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
            return this.show(this._index + direction);
        }

    }


    // Default Carousel options
    Carousel.defaults = {
        interval: 5000,
        transition: 500,
        keyboard: true,
        ride: false,
        pause: true,
        wrap: true
    };

    // Auto-initialize Carousel from data-ride
    dom.addEvent(window, 'load', _ => {
        const nodes = dom.find('[data-ride="carousel"]');

        for (const node of nodes) {
            new Carousel(node);
        }
    });

    // Add Carousel QuerySet method
    if (QuerySet) {
        QuerySet.prototype.carousel = function(a, ...args) {
            let options, method;
            if (Core.isObject(a)) {
                options = a;
            } else if (Core.isString(a)) {
                method = a;
            }

            let result;
            this.each((node, index) => {
                if (!Core.isElement(node)) {
                    return;
                }

                const carousel = dom.hasData(node, 'carousel') ?
                    dom.getData(node, 'carousel') :
                    new Carousel(node, options);

                if (index || !method) {
                    return;
                }

                result = carousel[method](...args);
            });

            return method ?
                result :
                this;
        };
    }

    UI.Carousel = Carousel;


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
                if (this._sliding || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) {
                    return;
                }

                e.preventDefault();

                try {
                    if (e.key === 'ArrowLeft') {
                        this.prev().catch(_ => { });
                    } else if (e.key === 'ArrowRight') {
                        this.next().catch(_ => { });
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
            const interval = dom.getDataset(this._items[this._index], 'interval');
            this._timer = setTimeout(_ => {
                try {
                    this.cycle();
                } catch (e) { }
            }, interval ? interval : this._settings.interval);
        }

    });


    /**
     * Collapse Class
     * @class
     */
    class Collapse {

        /**
         * New Collapse constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Collapse with.
         * @returns {Collapse} A new Collapse object.
         */
        constructor(node, settings) {
            this._node = node;
            this._settings = {
                ...Collapse.defaults,
                ...dom.getDataset(this._node),
                ...settings
            };

            this._targets = dom.find(this._settings.target);
            this._hasAccordion = this._targets.find(target => dom.getDataset(target, 'parent'));

            dom.setData(this._node, 'collapse', this);
        }

        /**
         * Destroy the Collapse.
         */
        destroy() {
            dom.stop(this._target, true);
            dom.removeEvent(this._node, 'click.frost.collapse', this._clickEvent);
            dom.removeData(this._node, 'collapse');
        }

        /**
         * Hide the target element.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        hide() {
            return new Promise((resolve, reject) => {
                const targets = this._targets
                    .filter(target => dom.hasClass(target, 'show') && dom.getDataset(target, 'animating') !== 'true');

                if (!targets.length) {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'hide.frost.collapse')) {
                    return reject();
                }

                dom.setDataset(targets, 'animating', 'true');

                dom.squeezeOut(targets, {
                    direction: this._settings.direction,
                    duration: this._settings.duration
                }).then(_ => {
                    dom.removeClass(targets, 'show');
                    dom.triggerEvent(this._node, 'hidden.frost.collapse');
                    resolve();
                }).catch(_ =>
                    reject()
                ).finally(_ =>
                    dom.removeDataset(targets, 'animating')
                );
            });
        }

        /**
         * Show the target element.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        show() {
            return new Promise((resolve, reject) => {
                const targets = this._targets
                    .filter(target => dom.hasClass(target, 'show') && dom.getDataset(target, 'animating') !== 'true');

                if (!targets.length) {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'show.frost.collapse')) {
                    return reject();
                }

                if (this._hasAccordion && !this._hideAccordion(targets)) {
                    return reject();
                }

                dom.setDataset(targets, 'animating', 'true');

                dom.addClass(targets, 'show');
                dom.squeezeIn(targets, {
                    direction: this._settings.direction,
                    duration: this._settings.duration
                }).then(_ => {
                    dom.triggerEvent(this._node, 'shown.frost.collapse');
                    resolve();
                }).catch(_ =>
                    reject()
                ).finally(_ =>
                    dom.removeDataset(targets, 'animating')
                );
            });
        }

        /**
         * Toggle the target element.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        toggle() {
            return new Promise((resolve, reject) => {
                const targets = this._targets
                    .filter(target => dom.getDataset(target, 'animating') !== 'true');

                if (!targets.length) {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'show.frost.collapse')) {
                    return reject();
                }

                const hidden = targets.filter(target => !dom.hasClass(target, 'show'));

                if (this._hasAccordion && !this._hideAccordion(hidden)) {
                    return reject();
                }

                const visible = targets.filter(target => dom.hasClass(target, 'show'));

                dom.setDataset(targets, 'animating', 'true');

                const animations = targets.map(target => {
                    const animation = dom.hasClass(target, 'show') ?
                        'squeezeOut' : 'squeezeIn';

                    return dom[animation](target, {
                        direction: this._settings.direction,
                        duration: this._settings.duration
                    });
                });

                dom.addClass(hidden, 'show')
                Promise.all(animations).then(_ => {
                    dom.removeClass(visible, 'show');
                    dom.triggerEvent(this._node, 'shown.frost.collapse');
                    resolve();
                }).catch(_ =>
                    reject()
                ).finally(_ =>
                    dom.removeDataset(targets, 'animating')
                );
            });
        }

    }


    // Default Collapse options
    Collapse.defaults = {
        direction: 'bottom',
        duration: 300
    };

    // Trigger Collapse from data-toggle
    dom.addEventDelegate(document, 'click', '[data-toggle="collapse"]', e => {
        e.preventDefault();

        const collapse = dom.hasData(e.currentTarget, 'collapse') ?
            dom.getData(e.currentTarget, 'collapse') :
            new Collapse(e.currentTarget);

        collapse.toggle().catch(_ => { });
    });

    // Auto-initialize Collapse from data-toggle
    dom.addEvent(window, 'load', _ => {
        const nodes = dom.find('[data-toggle="collapse"]');

        for (const node of nodes) {
            new Collapse(node);
        }
    });

    // Add Collapse QuerySet method
    if (QuerySet) {
        QuerySet.prototype.collapse = function(a, ...args) {
            let options, method;
            if (Core.isObject(a)) {
                options = a;
            } else if (Core.isString(a)) {
                method = a;
            }

            let result;
            this.each((node, index) => {
                if (!Core.isElement(node)) {
                    return;
                }

                const collapse = dom.hasData(node, 'collapse') ?
                    dom.getData(node, 'collapse') :
                    new Collapse(node, options);

                if (index || !method) {
                    return;
                }

                result = collapse[method](...args);
            });

            return method ?
                result :
                this;
        };
    }

    UI.Collapse = Collapse;


    /**
     * Collapse Private
     */

    Object.assign(Collapse.prototype, {

        /**
         * Hide accordion nodes for all targets.
         * @param {array} targets The target nodes.
         */
        _hideAccordion(targets) {
            const parents = [];
            const collapses = [];

            for (const target of targets) {
                const parent = dom.getDataset(target, 'parent');
                if (!parent) {
                    continue;
                }

                const parentNode = dom.closest(target, parent);
                if (!parents.includes(parentNode)) {
                    parents.push(parentNode);
                }
            }

            for (const parent of parents) {
                const collapseToggle = dom.find('[data-toggle="collapse"]', parent);
                for (const toggle of collapseToggle) {
                    if (dom.isSame(this._node, toggle)) {
                        continue;
                    }

                    const collapse = dom.getData(toggle, 'collapse');
                    const targets = dom.find(collapse._settings.target);
                    const animating = targets.find(target => dom.getDataset(target, 'animating') === 'true');
                    if (animating) {
                        return false;
                    }

                    collapses.push(collapse);
                }
            }

            for (const collapse of collapses) {
                collapse.hide().catch(_ => { });
            }

            return true;
        }

    });


    /**
     * Dropdown Class
     * @class
     */
    class Dropdown {

        /**
         * New Dropdown constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Dropdown with.
         * @returns {Dropdown} A new Dropdown object.
         */
        constructor(node, settings) {
            this._node = node;
            this._settings = {
                ...Dropdown.defaults,
                ...dom.getDataset(this._node),
                ...settings
            };

            this._containerNode = dom.parent(this._node);

            this._menuNode = dom.siblings(this._node)
                .find(child => dom.hasClass(child, 'dropdown-menu'));

            if (this._settings.reference) {
                if (this._settings.reference === 'parent') {
                    this._referenceNode = this._containerNode;
                } else {
                    this._referenceNode = dom.findOne(this._settings.reference);
                }
            } else {
                this._referenceNode = this._node;
            }

            // Attach popper
            if (!dom.closest(this._node, '.navbar-nav').length) {
                this._popper = new Popper(
                    this._menuNode,
                    this._referenceNode,
                    {
                        placement: this._settings.placement,
                        position: this._settings.position,
                        fixed: this._settings.fixed,
                        spacing: this._settings.spacing,
                        width: this._settings.width,
                        zIndex: this._settings.zIndex
                    }
                );
                this._getDir = _ => dom.getDataset(this._referenceNode, 'placement');
            } else {
                this._getDir = this._settings.placement;
            }

            this._events();

            dom.setData(this._node, 'dropdown', this);
        }

        /**
         * Destroy the Dropdown.
         */
        destroy() {
            dom.stop(this._menuNode, true);
            this._popper.destroy();
            dom.removeClass(this._containerNode, 'open');
            dom.removeEvent(document, 'click.frost.dropdown', this._windowClickEvent);
            dom.removeEvent(this._node, 'click.frost.dropdown', this._clickEvent);
            dom.removeEvent(this._node, 'keyup.frost.dropdown', this._keyUpEvent);
            dom.removeEvent(this._node, 'keydown.frost.dropdown', this._keyDownEvent);
            dom.removeEventDelegate(this._menuNode, 'keydown.frost.dropdown', '.dropdown-item', this._menuKeyDownEvent);
            dom.removeData(this._node, 'dropdown');
        }

        /**
         * Hide the Dropdown.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        hide() {
            return new Promise((resolve, reject) => {
                if (!dom.hasClass(this._containerNode, 'open') || dom.getDataset(this._menuNode, 'animating') === 'true') {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'hide.frost.dropdown')) {
                    return reject();
                }

                dom.setDataset(this._menuNode, 'animating', 'true');

                dom.removeEvent(document, 'click.frost.dropdown', this._windowClickEvent);
                Promise.all([
                    dom.fadeOut(this._menuNode, {
                        duration: this._settings.duration
                    }),
                    dom.squeezeOut(this._menuNode, {
                        direction: this._getDir,
                        duration: this._settings.duration,
                        useGpu: false
                    }),
                    dom.animate(
                        this._menuNode,
                        _ => this._popper.update(),
                        {
                            duration: this._settings.duration
                        }
                    )
                ]).then(_ => {
                    dom.removeClass(this._containerNode, 'open');
                    dom.triggerEvent(this._node, 'hidden.frost.dropdown');
                    resolve();
                }).catch(_ =>
                    reject()
                ).finally(_ =>
                    dom.removeAttribute(this._menuNode, 'data-animating')
                );
            });
        }

        /**
         * Show the Dropdown.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        show() {
            return new Promise((resolve, reject) => {
                if (dom.hasClass(this._containerNode, 'open') || dom.getDataset(this._menuNode, 'animating') === 'true') {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'show.frost.dropdown')) {
                    return reject();
                }

                dom.setDataset(this._menuNode, 'animating', 'true');

                dom.addClass(this._containerNode, 'open');
                Promise.all([
                    dom.fadeIn(this._menuNode, {
                        duration: this._settings.duration
                    }),
                    dom.squeezeIn(this._menuNode, {
                        direction: this._getDir,
                        duration: this._settings.duration,
                        useGpu: false
                    }),
                    dom.animate(
                        this._menuNode,
                        _ => this._popper.update(),
                        {
                            duration: this._settings.duration
                        }
                    )
                ]).then(_ => {
                    this._popper.update();
                    dom.addEventOnce(document, 'click.frost.dropdown', this._windowClickEvent);
                    dom.triggerEvent(this._node, 'shown.frost.dropdown');
                    resolve();
                }).catch(_ =>
                    reject()
                ).finally(_ =>
                    dom.removeAttribute(this._menuNode, 'data-animating')
                );
                window.requestAnimationFrame(_ => this._popper.update());
            });
        }

        /**
         * Toggle the Dropdown.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        toggle() {
            return dom.hasClass(this._containerNode, 'open') ?
                this.hide() :
                this.show();
        }

    }

    // Default Dropdown options
    Dropdown.defaults = {
        duration: 150,
        placement: 'bottom',
        position: 'start',
        fixed: false,
        spacing: 2,
        width: false,
        zIndex: 1000
    };

    // Auto-initialize Dropdown from data-toggle
    dom.addEvent(window, 'load', _ => {
        const nodes = dom.find('[data-toggle="dropdown"]');

        for (const node of nodes) {
            new Dropdown(node);
        }
    });

    // Add Dropdown QuerySet method
    if (QuerySet) {
        QuerySet.prototype.dropdown = function(a, ...args) {
            let options, method;
            if (Core.isObject(a)) {
                options = a;
            } else if (Core.isString(a)) {
                method = a;
            }

            let result;
            this.each((node, index) => {
                if (!Core.isElement(node)) {
                    return;
                }

                const dropdown = dom.hasData(node, 'dropdown') ?
                    dom.getData(node, 'dropdown') :
                    new Dropdown(node, options);

                if (index || !method) {
                    return;
                }

                result = dropdown[method](...args);
            });

            return method ?
                result :
                this;
        };
    }

    UI.Dropdown = Dropdown;


    /**
     * Dropdown Private
     */

    Object.assign(Dropdown.prototype, {

        /**
         * Attach events for the Dropdown.
         */
        _events() {
            this._clickEvent = e => {
                e.preventDefault();

                this.toggle().catch(_ => { });
            };

            this._keyUpEvent = e => {
                if (e.key !== ' ') {
                    return;
                }

                e.preventDefault();

                this.toggle().catch(_ => { });
            };

            this._keyDownEvent = e => {
                if (!['ArrowDown', 'ArrowUp'].includes(e.key)) {
                    return;
                }

                e.preventDefault();

                this.show().then(_ => {
                    const next = dom.findOne('.dropdown-item', this._menuNode);
                    dom.focus(next);
                });
            };

            this._menuKeyDownEvent = e => {
                if (!['ArrowDown', 'ArrowUp'].includes(e.key)) {
                    return;
                }

                e.preventDefault();

                if (e.key === 'ArrowDown') {
                    const next = dom.nextAll(e.currentTarget, '.dropdown-item').shift();
                    dom.focus(next);
                } else if (e.key === 'ArrowUp') {
                    const prev = dom.prevAll(e.currentTarget, '.dropdown-item').shift();
                    dom.focus(prev);
                }
            };

            this._windowClickEvent = _ => this.hide();

            dom.addEvent(this._node, 'click.frost.dropdown', this._clickEvent);
            dom.addEvent(this._node, 'keyup.frost.dropdown', this._keyUpEvent);
            dom.addEvent(this._node, 'keydown.frost.dropdown', this._keyDownEvent);
            dom.addEventDelegate(this._menuNode, 'keydown.frost.dropdown', '.dropdown-item', this._menuKeyDownEvent);
            dom.addEvent(this._menuNode, 'click.frost.dropdown', e => {
                e.stopPropagation();
            });
        }

    });


    /**
     * Modal Class
     * @class
     */
    class Modal {

        /**
         * New Modal constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Modal with.
         * @returns {Modal} A new Modal object.
         */
        constructor(node, settings) {
            this._node = node;
            this._settings = {
                ...Modal.defaults,
                ...dom.getDataset(node),
                ...settings
            };

            this._dialog = dom.child(this._node, '.modal-dialog').shift();

            this._dialogClickEvent = e => {
                if (dom.is(e.target, '[data-dismiss="modal"]') || dom.closest(e.target, '[data-dismiss="modal"]').length) {
                    return;
                }

                e.stopPropagation();
            };

            dom.addEvent(this._dialog, 'click.frost.modal', this._dialogClickEvent);

            this._windowKeyDownEvent = e => {
                if (e.key !== 'Escape') {
                    return;
                }

                e.preventDefault();

                this.hide();
            };

            if (this._settings.show) {
                this.show();
            }

            dom.setData(this._node, 'modal', this);
        }

        /**
         * Destroy the Modal.
         */
        destroy() {
            dom.stop([this._dialog, this._backdrop], true);

            if (this._settings.keyboard) {
                dom.removeEvent(window, 'keydown.frost.modal', this._windowKeyDownEvent);
            }

            dom.removeEvent(this._dialog, 'click.frost.modal', this._dialogClickEvent);

            dom.removeData(this._node, 'modal');
        }

        /**
         * Hide the Modal.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        hide() {
            return new Promise((resolve, reject) => {
                if (!dom.hasClass(this._node, 'show') || dom.getDataset(this._dialog, 'animating') === 'true') {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'hide.frost.modal')) {
                    return reject();
                }

                dom.setDataset([this._dialog, this._backdrop], 'animating', 'true');

                dom.removeEvent(this._backdrop, 'click.frost.autocomplete');
                Promise.all([
                    dom.fadeOut(this._dialog, {
                        duration: this._settings.duration
                    }),
                    dom.dropOut(this._dialog, {
                        duration: this._settings.duration
                    }),
                    dom.fadeOut(this._backdrop, {
                        duration: this._settings.duration
                    })
                ]).then(_ => {
                    if (this._settings.backdrop) {
                        dom.remove(this._backdrop);
                        this._backdrop = null;
                    }

                    if (this._settings.keyboard) {
                        dom.removeEvent(window, 'keydown.frost.modal', this._windowKeyDownEvent);
                    }

                    dom.removeClass(this._node, 'show');
                    dom.removeClass(document.body, 'modal-open');
                    dom.triggerEvent(this._node, 'hidden.frost.modal');
                    resolve();
                }).catch(_ =>
                    reject()
                ).finally(_ =>
                    dom.removeAttribute([this._dialog, this._backdrop], 'data-animating')
                );
            });
        }

        /**
         * Show the Modal.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        show() {
            return new Promise((resolve, reject) => {
                if (dom.hasClass(this._node, 'show') || dom.getDataset(this._dialog, 'animating') === 'true') {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'show.frost.modal')) {
                    return reject();
                }

                if (this._settings.backdrop) {
                    this._backdrop = dom.create('div', {
                        class: 'modal-backdrop'
                    });
                    dom.append(document.body, this._backdrop);
                }

                dom.setDataset([this._dialog, this._backdrop], 'animating', 'true');

                dom.addClass(this._node, 'show');
                dom.addClass(document.body, 'modal-open');

                Promise.all([
                    dom.fadeIn(this._dialog, {
                        duration: this._settings.duration
                    }),
                    dom.dropIn(this._dialog, {
                        duration: this._settings.duration
                    })
                    , dom.fadeIn(this._backdrop, {
                        duration: this._settings.duration
                    })
                ]).then(_ => {
                    if (this._settings.backdrop) {
                        dom.addEventOnce(document.body, 'click.frost.modal', _ => {
                            this.hide();
                        });
                    }

                    if (this._settings.keyboard) {
                        dom.addEvent(window, 'keydown.frost.modal', this._windowKeyDownEvent);
                    }

                    if (this._settings.focus) {
                        dom.focus(this._node);
                    }

                    dom.triggerEvent(this._node, 'shown.frost.modal');
                    resolve();
                }).catch(_ =>
                    reject()
                ).finally(_ =>
                    dom.removeAttribute([this._dialog, this._backdrop], 'data-animating')
                );
            });
        }

        /**
         * Toggle the Modal.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        toggle() {
            return dom.hasClass(this._node, 'show') ?
                this.hide() :
                this.show();
        }

    }


    // Default Modal options
    Modal.defaults = {
        duration: 250,
        backdrop: true,
        focus: true,
        show: true,
        keyboard: true
    };

    // Initialize Modal from data-toggle
    dom.addEventDelegate(document, 'click', '[data-toggle="modal"]', e => {
        e.preventDefault();

        const target = dom.getDataset(e.currentTarget, 'target');
        const element = dom.findOne(target);

        if (dom.hasData(element, 'modal')) {
            dom.getData(element, 'modal').show().catch(_ => { });
        } else {
            new Modal(element);
        }
    });

    // Hide Modal from data-dismiss
    dom.addEventDelegate(document, 'click', '[data-dismiss="modal"]', e => {
        e.preventDefault();

        const element = dom.closest(e.currentTarget, '.modal');
        const modal = dom.hasData(element, 'modal') ?
            dom.getData(element, 'modal') :
            new Modal(element);

        modal.hide().catch(_ => { });
    });

    // Add Modal QuerySet method
    if (QuerySet) {
        QuerySet.prototype.modal = function(a, ...args) {
            let options, method;
            if (Core.isObject(a)) {
                options = a;
            } else if (Core.isString(a)) {
                method = a;
            }

            let result;
            this.each((node, index) => {
                if (!Core.isElement(node)) {
                    return;
                }

                const modal = dom.hasData(node, 'modal') ?
                    dom.getData(node, 'modal') :
                    new Modal(node, options);

                if (index || !method) {
                    return;
                }

                result = modal[method](...args);
            });

            return method ?
                result :
                this;
        };
    }

    UI.Modal = Modal;


    /**
     * Popover Class
     * @class
     */
    class Popover {

        /**
         * New Popover constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Popover with.
         * @returns {Popover} A new Popover object.
         */
        constructor(node, settings) {
            this._node = node;
            this._settings = {
                ...Popover.defaults,
                ...dom.getDataset(this._node),
                ...settings
            };

            if (this._settings.container) {
                this._container = dom.findOne(this._settings.container);
            }

            this._triggers = this._settings.trigger.split(' ');

            this._events();

            if (this._settings.enable) {
                this.enable();
            }

            dom.setData(this._node, 'popover', this);
        }

        /**
         * Destroy the Popover.
         */
        destroy() {
            if (this._popover) {
                this._popper.destroy();
                dom.remove(this._popover);
                this._popover = null;
                this._popper = null;
            }

            if (this._triggers.includes('hover')) {
                dom.removeEvent(this._node, 'mouseover.frost.popover', this._hoverEvent);
                dom.removeEvent(this._node, 'mouseout.frost.popover', this._hideEvent);
            }

            if (this._triggers.includes('focus')) {
                dom.removeEvent(this._node, 'focus.frost.popover', this._focusEvent);
                dom.removeEvent(this._node, 'blur.frost.popover', this._hideEvent);
            }

            if (this._triggers.includes('click')) {
                dom.removeEvent(this._node, 'click.frost.popover', this._clickEvent);
            }

            dom.removeData(this._node, 'popover', this);
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
         * @returns {Promise}
         */
        hide() {
            return new Promise((resolve, reject) => {
                if (!this._popover) {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'hide.frost.popover')) {
                    return reject();
                }

                dom.setDataset(this._popover, 'animating', 'true');

                dom.stop(this._popover);
                dom.fadeOut(this._popover, {
                    duration: this._settings.duration
                }).then(_ => {
                    this._popper.destroy();
                    dom.remove(this._popover);
                    this._popover = null;
                    this._popper = null;

                    dom.triggerEvent(this._node, 'hidden.frost.popover');
                    resolve();
                }).catch(_ => {
                    dom.removeAttribute(this._popover, 'data-animating');
                    reject()
                });
            });
        }

        /**
         * Show the Popover.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        show() {
            return new Promise((resolve, reject) => {
                if (this._popover) {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'show.frost.popover')) {
                    return reject();
                }

                this._render();

                dom.setDataset(this._popover, 'animating', 'true');

                dom.addClass(this._popover, 'show');
                dom.fadeIn(this._popover, {
                    duration: this._settings.duration
                }).then(_ => {
                    dom.triggerEvent(this._node, 'shown.frost.popover')
                    resolve();
                }).catch(_ =>
                    reject()
                ).finally(_ =>
                    dom.removeAttribute(this._popover, 'data-animating')
                );
            });
        }

        /**
         * Toggle the Popover.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        toggle() {
            return this._popover ?
                this.hide() :
                this.show();
        }

        /**
         * Update the Popover position.
         */
        update() {
            if (!this._popper) {
                return;
            }

            this._popper.update();
        }

    }


    // Default Popover options
    Popover.defaults = {
        classes: {
            popover: 'popover',
            popoverHeader: 'popover-header',
            popoverBody: 'popover-body',
            arrow: 'arrow'
        },
        delay: 0,
        duration: 100,
        enable: true,
        html: false,
        trigger: 'click',
        sanitize: input => dom.sanitize(input),
        placement: 'auto',
        position: 'center',
        fixed: false,
        spacing: 7,
        width: false,
        zIndex: 1000
    };

    // Auto-initialize Popover from data-toggle
    dom.addEvent(window, 'load', _ => {
        const nodes = dom.find('[data-toggle="popover"]');

        for (const node of nodes) {
            new Popover(node);
        }
    });

    // Add Popover QuerySet method
    if (QuerySet) {
        QuerySet.prototype.popover = function(a, ...args) {
            let options, method;
            if (Core.isObject(a)) {
                options = a;
            } else if (Core.isString(a)) {
                method = a;
            }

            let result;
            this.each((node, index) => {
                if (!Core.isElement(node)) {
                    return;
                }

                const popover = dom.hasData(node, 'popover') ?
                    dom.getData(node, 'popover') :
                    new Popover(node, options);

                if (index || !method) {
                    return;
                }

                result = popover[method](...args);
            });

            return method ?
                result :
                this;
        };
    }

    UI.Popover = Popover;


    /**
     * Popover Private
     */

    Object.assign(Popover.prototype, {

        /**
         * Attach events for the Popover.
         */
        _events() {
            this._hideEvent = _ => {
                if (!this._enabled || !this._popover) {
                    return;
                }

                dom.stop(this._popover);
                this.hide().catch(_ => { });
            };

            this._hoverEvent = _ => {
                if (!this._enabled) {
                    return;
                }

                dom.addEventOnce(this._node, 'mouseout.frost.popover', this._hideEvent);
                this.show().catch(_ => { });
            };

            this._focusEvent = _ => {
                if (!this._enabled) {
                    return;
                }

                dom.addEventOnce(this._node, 'blur.frost.popover', this._hideEvent);
                this.show().catch(_ => { });
            };

            this._clickEvent = e => {
                e.preventDefault();

                if (!this._enabled) {
                    return;
                }

                this.toggle().catch(_ => { });
            };

            if (this._triggers.includes('hover')) {
                dom.addEvent(this._node, 'mouseover.frost.popover', this._hoverEvent);
            }

            if (this._triggers.includes('focus')) {
                dom.addEvent(this._node, 'focus.frost.popover', this._focusEvent);
            }

            if (this._triggers.includes('click')) {
                dom.addEvent(this._node, 'click.frost.popover', this._clickEvent);
            }
        },

        /**
         * Render the Popover element.
         */
        _render() {
            this._popover = dom.create('div', {
                class: this._settings.classes.popover,
                attributes: {
                    role: 'tooltip'
                }
            });

            const arrow = dom.create('div', {
                class: this._settings.classes.arrow
            });
            dom.append(this._popover, arrow);

            const method = this._settings.html ? 'html' : 'text';

            const title = dom.getAttribute(this._node, 'title') || this._settings.title;
            if (title) {
                const popoverHeader = dom.create('h3', {
                    [method]: this._settings.html && this._settings.sanitize ?
                        this._settings.sanitize(title) :
                        title,
                    class: this._settings.classes.popoverHeader
                });
                dom.append(this._popover, popoverHeader);
            }

            const content = this._settings.content;
            if (content) {
                const popoverBody = dom.create('div', {
                    [method]: this._settings.html && this._settings.sanitize ?
                        this._settings.sanitize(content) :
                        content,
                    class: this._settings.classes.popoverBody
                });
                dom.append(this._popover, popoverBody);
            }

            if (this._container) {
                dom.append(this._container, this._popover);
            } else {
                dom.before(this._node, this._popover);
            }

            this._popper = new Popper(
                this._popover,
                this._node,
                {
                    arrow: arrow,
                    placement: this._settings.placement,
                    position: this._settings.position,
                    fixed: this._settings.fixed,
                    spacing: this._settings.spacing,
                    width: this._settings.width,
                    zIndex: this._settings.zIndex
                }
            )
        }

    });


    /**
     * Popper Class
     * @class
     */
    class Popper {

        /**
         * New Popper constructor.
         * @param {HTMLElement} node The input node.
         * @param {HTMLElement} reference The reference node.
         * @param {object} [settings] The options to create the Popper with.
         * @returns {Popper} A new Popper object.
         */
        constructor(node, reference, settings) {
            this._node = node;
            this._referenceNode = reference;

            this._fixed = dom.isFixed(this._referenceNode);

            this._settings = {
                ...Popper.defaults,
                ...dom.getDataset(this._node),
                ...settings
            };

            this._relativeParent = dom.closest(
                this._node,
                parent =>
                    dom.css(parent, 'position') === 'relative',
                document.body
            ).shift();

            const overflowTypes = ['overflow', 'overflowX', 'overflowY'];
            const overflowValues = ['auto', 'scroll'];
            this._scrollParent = dom.closest(
                this._node,
                parent =>
                    !!overflowTypes.find(overflow =>
                        !!overflowValues.find(value =>
                            new RegExp(value)
                                .test(
                                    dom.css(parent, overflow)
                                )
                        )
                    ),
                document.body
            ).shift();

            dom.setStyle(this._node, {
                position: 'absolute',
                top: 0,
                left: 0
            });

            this._events();

            this.update();

            dom.setData(this._node, 'popper', this);
        }

        /**
         * Destroy the Popper.
         */
        destroy() {
            dom.removeEvent(window, 'resize.frost.popper', this._updateEvent);
            dom.removeEvent(window, 'scroll.frost.popper', this._updateEvent);
            if (this._scrollParent) {
                dom.removeEvent(this._scrollParent, 'scroll.frost.popper', this._updateEvent);
            }
            dom.removeData(this._node, 'popper');
        }

        /**
         * Update the Popper position.
         */
        update() {
            if (!dom.isConnected(this._node)) {
                return;
            }

            // calculate boxes
            const nodeBox = dom.rect(this._node, !this._fixed);
            const referenceBox = dom.rect(this._referenceNode, !this._fixed);
            const windowContainer = this._windowContainer();

            // check object could be seen
            if (this._isNodeHidden(nodeBox, referenceBox, windowContainer)) {
                return;
            }

            const containerBox = this._scrollParent ?
                dom.rect(this._scrollParent, !this._fixed) :
                windowContainer;

            // check if reference is visible (within scroll parent)
            if (this._scrollParent) {
                if (containerBox.top > referenceBox.bottom ||
                    containerBox.right < referenceBox.left ||
                    containerBox.bottom < referenceBox.top ||
                    containerBox.left > referenceBox.right) {
                    dom.hide(this._node);
                    return;
                }
                dom.show(this._node);
            }

            // get optimal placement
            const placement = this._settings.fixed ?
                this._settings.placement :
                Popper.getPopperPlacement(
                    nodeBox,
                    referenceBox,
                    containerBox,
                    this._settings.placement,
                    this._settings.spacing + 2
                );

            dom.setDataset(this._referenceNode, 'placement', placement);
            dom.setDataset(this._node, 'placement', placement);

            // get auto position
            const position = this._settings.position !== 'auto' ?
                this._settings.position :
                Popper.getPopperPosition(
                    nodeBox,
                    referenceBox,
                    containerBox,
                    placement,
                    this._settings.position
                );

            // calculate actual offset
            const offset = {
                x: Math.round(referenceBox.x),
                y: Math.round(referenceBox.y)
            };

            // offset for relative parent
            this._adjustRelative(offset, containerBox);

            // offset for placement
            this._adjustPlacement(offset, nodeBox, referenceBox, placement);

            // offset for position
            this._adjustPosition(offset, nodeBox, referenceBox, placement, position);

            // compensate for margins
            offset.x -= parseInt(dom.css(this._node, 'margin-left'));
            offset.y -= parseInt(dom.css(this._node, 'margin-top'));

            // compensate for fixed position
            if (this._fixed) {
                offset.x += dom.getScrollX(window);
                offset.y += dom.getScrollY(window);
            }

            // corrective positioning
            this._adjustConstrain(offset, nodeBox, referenceBox, containerBox, placement);

            // update arrow
            this._updateArrow(nodeBox, referenceBox, placement, position);

            // update position
            this._updatePosition(offset);

            if (this._settings.arrow) {
                const arrowBox = dom.rect(this._settings.arrow, !this._fixed);
                if (arrowBox.top < containerBox.top ||
                    arrowBox.right > containerBox.right ||
                    arrowBox.bottom > containerBox.bottom ||
                    arrowBox.left < containerBox.left) {
                    dom.hide(this._settings.arrow);
                }
            }
        }

    }


    // Default Popper options
    Popper.defaults = {
        placement: 'bottom',
        position: 'center',
        fixed: false,
        spacing: 0,
        useGpu: true
    };

    UI.Popper = Popper;


    /**
     * Popper Private
     */

    Object.assign(Popper.prototype, {

        /**
         * Constrain the offset within the containerBox.
         * @param {object} offset The offset object.
         * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
         * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
         * @param {DOMRect} containerBox The computed bounding rectangle of the container.
         * @param {string} placement The actual placement of the Popper.
         */
        _adjustConstrain(offset, nodeBox, referenceBox, containerBox, placement) {
            if (this._fixed) {
                return;
            }

            if (['left', 'right'].includes(placement)) {
                const offsetY = this._scrollParent || this._relativeParent ?
                    offset.y + containerBox.top :
                    offset.y;
                if (offsetY + nodeBox.height + this._settings.spacing > containerBox.bottom) {
                    // bottom of offset node is below the container
                    const diff = offsetY + nodeBox.height - (containerBox.bottom);
                    offset.y = Math.max(
                        referenceBox.height >= nodeBox.height ?
                            referenceBox.top :
                            referenceBox.top - (nodeBox.height - referenceBox.height),
                        offset.y - diff
                    );
                } else if (offsetY - this._settings.spacing < containerBox.top) {
                    // top of offset node is above the container
                    const diff = offsetY - containerBox.top;
                    offset.y = Math.min(
                        referenceBox.height >= nodeBox.height ?
                            referenceBox.top - (referenceBox.top - nodeBox.top) :
                            referenceBox.top,
                        offset.y - diff
                    );
                }
            } else {
                const offsetX = this._scrollParent || this._relativeParent ?
                    offset.x + containerBox.left :
                    offset.x;
                if (offsetX + nodeBox.width + this._settings.spacing > containerBox.right) {
                    // right of offset node is to the right of the container
                    const diff = offsetX + nodeBox.width - containerBox.right;
                    offset.x = Math.max(
                        referenceBox.width >= nodeBox.width ?
                            referenceBox.left :
                            referenceBox.left - (nodeBox.width - referenceBox.width),
                        offset.x - diff
                    );
                } else if (offsetX - this._settings.spacing < containerBox.left) {
                    // left of offset node is to the left of the container
                    const diff = offsetX - containerBox.left;
                    offset.x = Math.min(
                        referenceBox.width >= nodeBox.width ?
                            referenceBox.left - (referenceBox.width - nodeBox.width) :
                            referenceBox.left,
                        offset.x - diff
                    );
                }
            }
        },

        /**
         * Adjust the offset for the placement.
         * @param {object} offset The offset object.
         * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
         * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
         * @param {string} placement The actual placement of the Popper.
         */
        _adjustPlacement(offset, nodeBox, referenceBox, placement) {
            if (placement === 'top') {
                offset.y -= Math.round(nodeBox.height) + this._settings.spacing;
            } else if (placement === 'right') {
                offset.x += Math.round(referenceBox.width) + this._settings.spacing;
            } else if (placement === 'bottom') {
                offset.y += Math.round(referenceBox.height) + this._settings.spacing;
            } else if (placement === 'left') {
                offset.x -= Math.round(nodeBox.width) + this._settings.spacing;
            }
        },

        /**
         * Adjust the offset for the placement.
         * @param {object} offset The offset object.
         * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
         * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
         * @param {string} placement The actual placement of the Popper.
         * @param {string} position The actual position of the Popper.
         */
        _adjustPosition(offset, nodeBox, referenceBox, placement, position) {
            if (position === 'start') {
                return;
            }

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
        },

        /**
         * Adjust the offset for a relative positioned parent.
         * @param {object} offset The offset object.
         */
        _adjustRelative(offset) {
            if (!this._relativeParent) {
                return;
            }

            const relativeParentBox = dom.rect(this._relativeParent, !this._fixed);
            offset.x -= Math.round(relativeParentBox.x);
            offset.y -= Math.round(relativeParentBox.y);
        },

        /**
         * Attach events for the Popper.
         */
        _events() {
            this._updateEvent = Core.animation(_ => this.update());

            dom.addEvent(window, 'resize.frost.popper', this._updateEvent);
            dom.addEvent(window, 'scroll.frost.popper', this._updateEvent);
            if (this._scrollParent) {
                dom.addEvent(this._scrollParent, 'scroll.frost.popper', this._updateEvent);
            }
        },

        /**
         * Returns true if the node can not be visible inside the window.
         * @param {object} offset The offset object.
         * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
         * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
         * @param {object} windowContainer The computed bounding rectangle of the window.
         * @returns {Boolean} TRUE if the node can not be visible inside the window, otherwise FALSE.
         */
        _isNodeHidden(nodeBox, referenceBox, windowContainer) {
            return windowContainer.top > referenceBox.bottom + nodeBox.height + this._settings.spacing ||
                windowContainer.left > referenceBox.right + nodeBox.width + this._settings.spacing ||
                windowContainer.bottom < referenceBox.top - nodeBox.height - this._settings.spacing ||
                windowContainer.right < referenceBox.left - nodeBox.width - this._settings.spacing;
        },

        /**
         * Update the position of the arrow for the actual placement and position.
         * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
         * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
         * @param {string} placement The actual placement of the Popper.
         * @param {string} position The actual position of the Popper.
         */
        _updateArrow(nodeBox, referenceBox, placement, position) {
            if (!this._settings.arrow) {
                return;
            }

            dom.show(this._settings.arrow);

            const arrowBox = dom.rect(this._settings.arrow, !this._fixed);
            const arrowStyles = {
                top: '',
                right: '',
                bottom: '',
                left: ''
            };

            if (['top', 'bottom'].includes(placement)) {
                arrowStyles[placement === 'top' ? 'bottom' : 'top'] = -arrowBox.height;
                const diff = (referenceBox.width - nodeBox.width) / 2;
                let offset = (nodeBox.width / 2) - (arrowBox.width / 2);
                if (position === 'start') {
                    offset += diff;
                } else if (position === 'end') {
                    offset -= diff;
                }
                arrowStyles.left = offset;
            } else {
                arrowStyles[placement === 'right' ? 'left' : 'right'] = -arrowBox.width;
                const diff = (referenceBox.height - nodeBox.height) / 2;
                let offset = (nodeBox.height / 2) - arrowBox.height;
                if (position === 'start') {
                    offset += diff;
                } else if (position === 'end') {
                    offset -= diff;
                }
                arrowStyles.top = Core.clamp(offset, 0, nodeBox.height);
            }

            dom.setStyle(this._settings.arrow, arrowStyles);
        },

        /**
         * Update the position of the node.
         * @param {object} offset The offset object.
         */
        _updatePosition(offset) {
            const style = {};
            if (this._settings.useGpu) {
                style.transform = 'translate3d(' + offset.x + 'px , ' + offset.y + 'px , 0)'
            } else {
                style.marginLeft = offset.x;
                style.marginTop = offset.y;
            }

            dom.setStyle(this._node, style);
        },

        /**
         * Calculate the computed bounding rectangle of the window.
         * @returns {object} The computed bounding rectangle of the window.
         */
        _windowContainer() {
            const scrollX = this._fixed ?
                0 :
                dom.getScrollX(window);
            const scrollY = this._fixed ?
                0 :
                dom.getScrollY(window);
            const windowWidth = dom.width(document);
            const windowHeight = dom.height(document);

            return {
                x: scrollX,
                y: scrollY,
                w: windowWidth,
                h: windowHeight,
                top: scrollY,
                right: scrollX + windowWidth,
                bottom: scrollY + windowHeight,
                left: scrollX
            };
        }

    });


    /**
     * Popper Static
     */

    Object.assign(Popper, {

        /**
         * Get the actual placement of the Popper.
         * @param {object} nodeBox The computed bounding rectangle of the node.
         * @param {object} referenceBox The computed bounding rectangle of the reference.
         * @param {object} containerBox The computed bounding rectangle of the container.
         * @param {string} placement The initial placement of the Popper.
         * @param {number} spacing The amount of spacing to use.
         * @returns {string} The new placement of the Popper.
         */
        getPopperPlacement(nodeBox, referenceBox, containerBox, placement, spacing) {
            const spaceTop = referenceBox.top - containerBox.top;
            const spaceRight = containerBox.right - referenceBox.right;
            const spaceBottom = containerBox.bottom - referenceBox.bottom;
            const spaceLeft = referenceBox.left - containerBox.left;

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
                    maxHSpace > nodeBox.width + spacing &&
                    minVSpace + referenceBox.height - nodeBox.height > spacing
                ) {
                    if (spaceLeft > spaceRight) {
                        return 'left';
                    }

                    return 'right';
                }

                if (spaceBottom > spaceTop) {
                    return 'bottom';
                }

                return 'top';
            }

            return placement
        },

        /**
         * Get the actual position of the Popper.
         * @param {object} nodeBox The computed bounding rectangle of the node.
         * @param {object} referenceBox The computed bounding rectangle of the reference.
         * @param {object} containerBox The computed bounding rectangle of the container.
         * @param {string} placement The actual placement of the Popper.
         * @param {string} position The initial position of the Popper.
         * @returns {string} The new position of the Popper.
         */
        getPopperPosition(nodeBox, referenceBox, containerBox, placement, position) {

            const deltaX = nodeBox.width - referenceBox.width;
            const deltaY = nodeBox.height - referenceBox.height;

            if (['bottom', 'top'].includes(placement)) {
                const spaceLeft = referenceBox.left - containerBox.left;
                const spaceRight = containerBox.right - referenceBox.right;

                if (position === 'start') {
                    if (spaceRight < deltaX) {
                        if (spaceLeft >= deltaX / 2 && spaceRight >= deltaX / 2) {
                            return 'center';
                        }

                        if (spaceLeft >= deltaX) {
                            return 'end';
                        }
                    }

                } else if (position === 'center') {
                    if (spaceLeft < deltaX / 2 || spaceRight < deltaX / 2) {
                        if (spaceRight >= deltaX) {
                            return 'start';
                        }

                        if (spaceLeft >= deltaX) {
                            return 'end';
                        }
                    }

                } else if (position === 'end') {
                    if (spaceLeft < deltaX) {
                        if (spaceLeft >= deltaX / 2 && spaceRight >= deltaX / 2) {
                            return 'center';
                        }

                        if (spaceRight >= deltaX) {
                            return 'start';
                        }
                    }
                }

            } else {
                const spaceTop = referenceBox.top - containerBox.top;
                const spaceBottom = containerBox.bottom - referenceBox.bottom;

                if (position === 'start') {
                    if (spaceBottom < deltaY) {
                        if (spaceBottom >= deltaY / 2 && spaceTop >= deltaY / 2) {
                            return 'center';
                        }

                        if (spaceTop >= deltaY) {
                            return 'end';
                        }
                    }

                } else if (position === 'center') {
                    if (spaceTop < deltaY / 2 || spaceBottom < deltaY / 2) {
                        if (spaceBottom >= deltaY) {
                            return 'start';
                        }

                        if (spaceTop >= deltaY) {
                            return 'end';
                        }
                    }

                } else if (position === 'end') {
                    if (spaceTop < deltaY) {
                        if (spaceTop >= deltaY / 2 && spaceBottom >= deltaY / 2) {
                            return 'center';
                        }

                        if (spaceBottom >= deltaY) {
                            return 'start';
                        }
                    }

                }
            }

            return position;
        },

    });

    /**
     * Tab Class
     * @class
     */
    class Tab {

        /**
         * New Tab constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Tab with.
         * @returns {Tab} A new Tab object.
         */
        constructor(node, settings) {
            this._node = node;
            this._settings = {
                ...Tab.defaults,
                ...dom.getDataset(this._node),
                ...settings
            };

            if (!this._settings.target) {
                this._settings.target = dom.getAttribute(this._node, 'href');
            }

            this._target = dom.find(this._settings.target);

            this._events();

            dom.setData(this._node, 'tab', this);
        }

        /**
         * Destroy the Tab.
         */
        destroy() {
            dom.stop(this._target, true);
            dom.removeEvent(this._node, 'click.frost.tab', this._clickEvent);
            dom.removeData(this._node, 'tab');
        }

        /**
         * Hide the current Tab.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        hide() {
            return new Promise((resolve, reject) => {
                if (!dom.hasClass(this._target, 'active') || dom.getDataset(this._target, 'animating') === 'true') {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'hide.frost.tab')) {
                    return reject();
                }

                dom.setDataset(this._target, 'animating', 'true');

                dom.fadeOut(this._target, {
                    duration: this._settings.duration
                }).then(_ => {
                    dom.removeClass(this._target, 'active');
                    dom.removeClass(this._node, 'active');
                    dom.triggerEvent(this._node, 'hidden.frost.tab');
                    resolve();
                }).catch(_ =>
                    reject()
                ).finally(_ =>
                    dom.removeAttribute(this._target, 'data-animating')
                );
            });
        }

        /**
         * Hide any active Tabs, and show the current Tab.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        show() {
            return new Promise((resolve, reject) => {
                if (dom.hasClass(this._target, 'active') || dom.getDataset(this._target, 'animating') === 'true') {
                    return reject();
                }

                const activeTab = dom.siblings(this._node, '.active').shift();

                if (!dom.hasData(activeTab, 'tab')) {
                    return reject();
                }

                dom.setDataset(this._target, 'animating', 'true');

                dom.getData(activeTab, 'tab').hide().then(_ => {
                    if (!DOM._triggerEvent(this._node, 'show.frost.tab')) {
                        return reject();
                    }

                    dom.addClass(this._target, 'active');
                    dom.addClass(this._node, 'active');
                    return dom.fadeIn(this._target, {
                        duration: this._settings.duration
                    });
                }).then(_ => {
                    dom.triggerEvent(this._node, 'shown.frost.tab');
                    resolve();
                }).catch(_ =>
                    reject()
                ).finally(_ =>
                    dom.removeAttribute(this._target, 'data-animating')
                );
            });
        }

    }


    // Default Tab options
    Tab.defaults = {
        duration: 100
    };

    // Auto-initialize Tab from data-toggle
    dom.addEvent(window, 'load', _ => {
        const nodes = dom.find('[data-toggle="tab"]');

        for (const node of nodes) {
            new Tab(node);
        }
    });

    // Add Tab QuerySet method
    if (QuerySet) {
        QuerySet.prototype.tab = function(a, ...args) {
            let options, method;
            if (Core.isObject(a)) {
                options = a;
            } else if (Core.isString(a)) {
                method = a;
            }

            let result;
            this.each((node, index) => {
                if (!Core.isElement(node)) {
                    return;
                }

                const tab = dom.hasData(node, 'tab') ?
                    dom.getData(node, 'tab') :
                    new Tab(node, options);

                if (index || !method) {
                    return;
                }

                result = tab[method](...args);
            });

            return method ?
                result :
                this;
        };
    }

    UI.Tab = Tab;


    /**
     * Tab Private
     */

    Object.assign(Tab.prototype, {

        /**
         * Attach events for the Tab.
         */
        _events() {
            this._clickEvent = e => {
                e.preventDefault();

                this.show().catch(_ => { });
            };

            dom.addEvent(this._node, 'click.frost.tab', this._clickEvent);
        }

    });


    /**
     * Toast Class
     * @class
     */
    class Toast {

        /**
         * New Toast constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Toast with.
         * @returns {Toast} A new Toast object.
         */
        constructor(node, settings) {
            this._node = node;
            this._settings = {
                ...Toast.defaults,
                ...dom.getDataset(this._node),
                ...settings
            };

            if (this._settings.autohide) {
                setTimeout(
                    _ => {
                        this.hide().catch(_ => { });
                    },
                    this._settings.delay
                );
            }

            dom.setData(this._node, 'toast', this);
        }

        /**
         * Destroy the Toast.
         */
        destroy() {
            dom.stop(this._node, true);
            dom.removeData(this._node, 'toast');
        }

        /**
         * Hide the Toast.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        hide() {
            return new Promise((resolve, reject) => {
                if (!dom.isVisible(this._node) || dom.getDataset(this._node, 'animating') === 'true') {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'hide.frost.toast')) {
                    return reject();
                }

                dom.setDataset(this._node, 'animating', 'true');

                return dom.fadeOut(this._node, {
                    duration: this._settings.duration
                }).then(_ => {
                    dom.hide(this._node);
                    dom.triggerEvent(this._node, 'hidden.frost.toast');
                    resolve();
                }).catch(_ =>
                    reject()
                ).finally(_ =>
                    dom.removeAttribute(this._node, 'data-animating')
                );
            });
        }

        /**
         * Show the Toast.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        show() {
            return new Promise((resolve, reject) => {
                if (dom.isVisible(this._node) || dom.getDataset(this._node, 'animating') === 'true') {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'show.frost.toast')) {
                    return reject();
                }

                dom.setDataset(this._node, 'animating', 'true');

                dom.show(this._node);
                return dom.fadeIn(this._node, {
                    duration: this._settings.duration
                }).then(_ => {
                    dom.triggerEvent(this._node, 'shown.frost.toast');
                    resolve();
                }).catch(_ =>
                    reject()
                ).finally(_ =>
                    dom.removeAttribute(this._node, 'data-animating')
                );
            });
        }

    }


    // Default Toast options
    Toast.defaults = {
        autohide: true,
        delay: 5000,
        duration: 100
    };

    // Auto-initialize Toast from data-toggle
    dom.addEvent(window, 'load', _ => {
        const nodes = dom.find('[data-toggle="toast"]');

        for (const node of nodes) {
            new Toast(node);
        }
    });

    // Hide Toast from data-dismiss
    dom.addEventDelegate(document, 'click', '[data-dismiss="toast"]', e => {
        e.preventDefault();

        const element = dom.closest(e.currentTarget, '.toast');
        const toast = dom.hasData(element, 'toast') ?
            dom.getData(element, 'toast') :
            new Toast(element);

        toast.hide().catch(_ => { });
    });

    // Add Toast QuerySet method
    if (QuerySet) {
        QuerySet.prototype.toast = function(a, ...args) {
            let options, method;
            if (Core.isObject(a)) {
                options = a;
            } else if (Core.isString(a)) {
                method = a;
            }

            let result;
            this.each((node, index) => {
                if (!Core.isElement(node)) {
                    return;
                }

                const toast = dom.hasData(node, 'toast') ?
                    dom.getData(node, 'toast') :
                    new Toast(node, options);

                if (index || !method) {
                    return;
                }

                result = toast[method](...args);
            });

            return method ?
                result :
                this;
        };
    }

    UI.Toast = Toast;


    /**
     * Tooltip Class
     * @class
     */
    class Tooltip {

        /**
         * New Tooltip constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Tooltip with.
         * @returns {Tooltip} A new Tooltip object.
         */
        constructor(node, settings) {
            this._node = node;
            this._settings = {
                ...Tooltip.defaults,
                ...dom.getDataset(this._node),
                ...settings
            };

            if (this._settings.container) {
                this._container = dom.findOne(this._settings.container);
            }

            this._triggers = this._settings.trigger.split(' ');

            this._events();

            if (this._settings.enable) {
                this.enable();
            }

            dom.setData(this._node, 'tooltip', this);
        }

        /**
         * Destroy the Tooltip.
         */
        destroy() {
            if (this._tooltip) {
                this._popper.destroy();
                dom.remove(this._tooltip);
                this._tooltip = null;
                this._popper = null;
            }

            if (this._triggers.includes('hover')) {
                dom.removeEvent(this._node, 'mouseover.frost.tooltip', this._hoverEvent);
                dom.removeEvent(this._node, 'mouseout.frost.tooltip', this._hideEvent);
            }

            if (this._triggers.includes('focus')) {
                dom.removeEvent(this._node, 'focus.frost.tooltip', this._focusEvent);
                dom.removeEvent(this._node, 'blur.frost.tooltip', this._hideEvent);
            }

            if (this._triggers.includes('click')) {
                dom.removeEvent(this._node, 'click.frost.tooltip', this._clickEvent);
            }

            dom.removeData(this._node, 'tooltip', this);
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
         * @returns {Promise}
         */
        hide() {
            return new Promise((resolve, reject) => {
                if (!this._tooltip) {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'hide.frost.tooltip')) {
                    return reject();
                }

                dom.setDataset(this._tooltip, 'animating', 'true');

                dom.stop(this._tooltip);
                dom.fadeOut(this._tooltip, {
                    duration: this._settings.duration
                }).then(_ => {
                    this._popper.destroy();
                    dom.remove(this._tooltip);
                    this._tooltip = null;
                    this._popper = null;

                    dom.triggerEvent(this._node, 'hidden.frost.tooltip');
                    resolve();
                }).catch(_ => {
                    dom.removeAttribute(this._tooltip, 'data-animating');
                    reject();
                });
            });
        }

        /**
         * Show the Tooltip.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        show() {
            return new Promise((resolve, reject) => {
                if (this._tooltip) {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'show.frost.tooltip')) {
                    return reject();
                }

                this._render();

                dom.setDataset(this._tooltip, 'animating', 'true');

                dom.addClass(this._tooltip, 'show');
                dom.fadeIn(this._tooltip, {
                    duration: this._settings.duration
                }).then(_ => {
                    dom.triggerEvent(this._node, 'shown.frost.tooltip');
                    resolve();
                }).catch(_ =>
                    reject()
                ).finally(_ =>
                    dom.removeAttribute(this._popover, 'data-animating')
                );
            });
        }

        /**
         * Toggle the Tooltip.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        toggle() {
            return this._tooltip ?
                this.hide() :
                this.show();
        }

        /**
         * Update the Tooltip position.
         */
        update() {
            if (!this._popper) {
                return;
            }

            this._popper.update();
        }

    }


    // Default Tooltip options
    Tooltip.defaults = {
        classes: {
            tooltip: 'tooltip',
            tooltipInner: 'tooltip-inner',
            arrow: 'arrow'
        },
        delay: 0,
        duration: 100,
        enable: true,
        html: false,
        trigger: 'hover focus',
        sanitize: input => dom.sanitize(input),
        placement: 'auto',
        position: 'center',
        fixed: false,
        spacing: 2,
        width: false,
        zIndex: 1000
    };

    // Auto-initialize Tooltip from data-toggle
    dom.addEvent(window, 'load', _ => {
        const nodes = dom.find('[data-toggle="tooltip"]');

        for (const node of nodes) {
            new Tooltip(node);
        }
    });

    // Add Tooltip QuerySet method
    if (QuerySet) {
        QuerySet.prototype.tooltip = function(a, ...args) {
            let options, method;
            if (Core.isObject(a)) {
                options = a;
            } else if (Core.isString(a)) {
                method = a;
            }

            let result;
            this.each((node, index) => {
                if (!Core.isElement(node)) {
                    return;
                }

                const tooltip = dom.hasData(node, 'tooltip') ?
                    dom.getData(node, 'tooltip') :
                    new Tooltip(node, options);

                if (index || !method) {
                    return;
                }

                result = tooltip[method](...args);
            });

            return method ?
                result :
                this;
        };
    }

    UI.Tooltip = Tooltip;


    /**
     * Tooltip Private
     */

    Object.assign(Tooltip.prototype, {

        /**
         * Attach events for the Tooltip.
         */
        _events() {
            this._hideEvent = _ => {
                if (!this._enabled || !this._tooltip) {
                    return;
                }

                dom.stop(this._tooltip);
                this.hide().catch(_ => { });
            };

            this._hoverEvent = _ => {
                if (!this._enabled) {
                    return;
                }

                dom.addEventOnce(this._node, 'mouseout.frost.tooltip', this._hideEvent);
                this.show().catch(_ => { });
            };

            this._focusEvent = _ => {
                if (!this._enabled) {
                    return;
                }

                dom.addEventOnce(this._node, 'blur.frost.tooltip', this._hideEvent)
                this.show().catch(_ => { });
            };

            this._clickEvent = e => {
                e.preventDefault();

                if (!this._enabled) {
                    return;
                }

                this.toggle().catch(_ => { });
            };

            if (this._triggers.includes('hover')) {
                dom.addEvent(this._node, 'mouseover.frost.tooltip', this._hoverEvent);
            }

            if (this._triggers.includes('focus')) {
                dom.addEvent(this._node, 'focus.frost.tooltip', this._focusEvent);
            }

            if (this._triggers.includes('click')) {
                dom.addEvent(this._node, 'click.frost.tooltip', this._clickEvent);
            }
        },

        /**
         * Render the Tooltip element.
         */
        _render() {
            this._tooltip = dom.create('div', {
                class: this._settings.classes.tooltip,
                attributes: {
                    role: 'tooltip'
                }
            });

            const arrow = dom.create('div', {
                class: this._settings.classes.arrow
            });
            dom.append(this._tooltip, arrow);

            const title = dom.getAttribute(this._node, 'title') || this._settings.title;
            const method = this._settings.html ? 'html' : 'text';

            const tooltipInner = dom.create('div', {
                [method]: this._settings.html && this._settings.sanitize ?
                    this._settings.sanitize(title) :
                    title,
                class: this._settings.classes.tooltipInner
            });
            dom.append(this._tooltip, tooltipInner);

            if (this._container) {
                dom.append(this._container, this._tooltip);
            } else {
                dom.before(this._node, this._tooltip);
            }

            this._popper = new Popper(
                this._tooltip,
                this._node,
                {
                    arrow: arrow,
                    placement: this._settings.placement,
                    position: this._settings.position,
                    fixed: this._settings.fixed,
                    spacing: this._settings.spacing,
                    width: this._settings.width,
                    zIndex: this._settings.zIndex
                }
            )
        }

    });

    return {
        UI
    };
});