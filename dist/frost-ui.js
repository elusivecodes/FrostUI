/**
 * FrostUI v1.0
 * https://github.com/elusivecodes/FrostUI
 */
(function(global, factory) {
    'use strict';

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory;
    } else {
        Object.assign(global, factory(global));
    }

})(window, function(window) {
    'use strict';

    if (!window) {
        throw new Error('FrostUI requires a Window.');
    }

    if (!('DOM' in window)) {
        throw new Error('FrostUI requires FrostDOM.');
    }

    const Core = window.Core;
    const DOM = window.DOM;
    const dom = window.dom;
    const QuerySet = window.QuerySet;
    const document = window.document;

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
         * @param {number} [settings.duration=100] The duration of the animation.
         * @returns {Alert} A new Alert object.
         */
        constructor(node, settings) {
            this._node = node;

            this._settings = Core.extend(
                {},
                Alert.defaults,
                dom.getDataset(this._node),
                settings
            );

            this._dismiss = dom.find('[data-dismiss="alert"]', this._node);

            this._events();

            dom.setData(this._node, 'alert', this);
        }

        /**
         * Destroy the Alert.
         */
        destroy() {
            if (this._dismiss.length) {
                dom.removeEvent(this._dismiss, 'click.frost.alert', this._dismissEvent);
            }

            dom.removeData(this._node, 'alert');
        }

        /**
         * Close the Alert.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        close() {
            return new Promise((resolve, reject) => {

                if (dom.getDataset(this._node, 'animating')) {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'close.frost.alert')) {
                    return reject();
                }

                dom.setDataset(this._node, 'animating', true);

                dom.fadeOut(this._node, {
                    duration: this._settings.duration
                }).then(_ => {
                    dom.triggerEvent(this._node, 'closed.frost.alert');

                    dom.remove(this._node);

                    resolve();
                }).catch(e => {
                    dom.removeDataset(this._node, 'animating');

                    reject(e);
                });
            });
        }

    }


    // Default Alert options
    Alert.defaults = {
        duration: 100
    };

    // Auto-initialize Alert from data-toggle
    dom.addEventOnce(window, 'load', _ => {
        const nodes = dom.find('[data-toggle="alert"]');

        for (const node of nodes) {
            new Alert(node);
        }
    });

    // Add Alert QuerySet method
    if (QuerySet) {
        QuerySet.prototype.alert = function(a, ...args) {
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

                const alert = dom.hasData(node, 'alert') ?
                    dom.getData(node, 'alert') :
                    new Alert(node, options);

                if (index) {
                    return;
                }

                if (!method) {
                    result = alert;
                } else {
                    result = alert[method](...args);
                }
            });

            return result;
        };
    }

    UI.Alert = Alert;


    /**
     * Alert Helpers
     */

    Object.assign(Alert.prototype, {

        /**
         * Attach events for the Alert.
         */
        _events() {
            this._dismissEvent = e => {
                e.preventDefault();

                this.close().catch(_ => { });
            };

            if (this._dismiss.length) {
                dom.addEvent(this._dismiss, 'click.frost.alert', this._dismissEvent);
            }

        }

    });


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

            this._settings = Core.extend(
                {},
                Button.defaults,
                dom.getDataset(this._node),
                settings
            );

            this._input = dom.findOne('input[type="checkbox"], input[type="radio"]', this._node);
            this._isRadio = this._input && dom.is(this._input, '[type="radio"]');

            if (this._isRadio) {
                this._siblings = dom.siblings(this._node);
            }

            this._events();

            dom.setData(this._node, 'button', this);
        }

        /**
         * Destroy the Button.
         */
        destroy() {
            dom.removeEvent(this._node, 'frost.click.button', this._clickEvent);

            dom.removeData(this._node, 'button');
        }

        /**
         * Toggle the Button.
         */
        toggle() {
            this._isRadio ?
                this._toggleRadio() :
                this._toggleCheckbox();

        }

    }


    // Default Button options
    Button.defaults = {};

    // Auto-initialize Button from data-toggle
    dom.addEventOnce(window, 'load', _ => {
        const nodes = dom.find('[data-toggle="buttons"] > *, [data-toggle="button"]');

        for (const node of nodes) {
            new Button(node);
        }
    });

    // Add Button QuerySet method
    if (QuerySet) {
        QuerySet.prototype.button = function(a, ...args) {
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

                const button = dom.hasData(node, 'button') ?
                    dom.getData(node, 'button') :
                    new Button(node, options);

                if (index) {
                    return;
                }

                if (!method) {
                    result = button;
                } else {
                    result = button[method](...args);
                }
            });

            return result;
        };
    }

    UI.Button = Button;


    /**
     * Button Helpers
     */

    Object.assign(Button.prototype, {

        /**
         * Attach events for the Button.
         */
        _events() {
            this._clickEvent = e => {
                e.preventDefault();

                this.toggle();
            };

            dom.addEvent(this._node, 'click.frost.button', this._clickEvent);
        },

        /**
         * Toggle a checkbox-type Button.
         */
        _toggleCheckbox() {
            dom.toggleClass(this._node, 'active');

            if (this._input) {
                dom.setProperty(this._input, 'checked', !dom.getProperty(this._input, 'checked'));
                dom.triggerEvent(this._input, 'change');
            }
        },

        /**
         * Toggle a radio-type Button.
         */
        _toggleRadio() {
            dom.addClass(this._node, 'active');

            if (this._siblings) {
                dom.removeClass(this._siblings, 'active');
            }

            dom.setProperty(this._input, 'checked', true);
            dom.triggerEvent(this._input, 'change');
        }

    });


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
                Carousel.defaults,
                dom.getDataset(this._node),
                settings
            );

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
                this._queue[this._queue.length - 1] :
                this._index;

            return this.show(index + direction);
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
    dom.addEventOnce(window, 'load', _ => {
        const nodes = dom.find('[data-toggle="carousel"], [data-ride="carousel"]');

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

                if (index) {
                    return;
                }

                if (!method) {
                    result = carousel;
                } else {
                    result = carousel[method](...args);
                }
            });

            return result;
        };
    }

    UI.Carousel = Carousel;


    /**
     * Carousel Helpers
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
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        _show(index) {
            return new Promise((resolve, reject) => {
                if (dom.getDataset(this._node, 'sliding')) {
                    this._queue.push(index);

                    return;
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

                    resolve();

                    if (!this._queue.length) {
                        this._setTimer();
                        return;
                    }

                    const next = this._queue.shift();
                    return this._show(next);
                }).catch(reject);
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


    /**
     * Collapse Class
     * @class
     */
    class Collapse {

        /**
         * New Collapse constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Collapse with.
         * @param {string} [settings.direction=bottom] The direction to collapse the targets from/to.
         * @param {number} [settings.duration=300] The duration of the animation.
         * @returns {Collapse} A new Collapse object.
         */
        constructor(node, settings) {
            this._node = node;

            this._settings = Core.extend(
                {},
                Collapse.defaults,
                dom.getDataset(this._node),
                settings
            );

            this._targets = dom.find(this._settings.target);

            this._events();

            dom.setData(this._node, 'collapse', this);

            for (const target of this._targets) {
                if (!Collapse._toggles.has(target)) {
                    Collapse._toggles.set(target, []);
                }

                Collapse._toggles.get(target)
                    .push(this._node);
            }
        }

        /**
         * Destroy the Collapse.
         */
        destroy() {
            for (const target of this._targets) {
                const toggles = Collapse._toggles.get(target)
                    .filter(toggle => !dom.isSame(toggle, this._node));

                if (toggles.length) {
                    Collapse._toggles.set(target, toggles);
                } else {
                    Collapse._toggles.delete(target);
                }
            }

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
                    .filter(target => dom.hasClass(target, 'show') && !dom.getDataset(target, 'animating'));

                if (!targets.length) {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'hide.frost.collapse')) {
                    return reject();
                }

                dom.setDataset(targets, 'animating', true);

                dom.squeezeOut(targets, {
                    direction: this._settings.direction,
                    duration: this._settings.duration
                }).then(_ => {
                    dom.removeClass(targets, 'show');

                    this._setExpanded(targets, false);
                    dom.triggerEvent(this._node, 'hidden.frost.collapse');

                    resolve();
                }).catch(reject).finally(_ =>
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
                    .filter(target => dom.hasClass(target, 'show') && !dom.getDataset(target, 'animating'));

                if (!targets.length) {
                    return reject();
                }

                const accordion = this._getAccordion(hidden);

                if (!accordion) {
                    return reject();
                }

                for (const node of accordion.nodes) {
                    if (!DOM._triggerEvent(node, 'hide.frost.collapse')) {
                        return reject();
                    }
                }

                if (!DOM._triggerEvent(this._node, 'show.frost.collapse')) {
                    return reject();
                }

                const allTargets = [...targets];
                allTargets.push(...accordion.targets);

                dom.setDataset(allTargets, 'animating', true);

                const animations = allTargets.map(target => {
                    const animation = accordion.targets.includes(target) ?
                        'squeezeOut' : 'squeezeIn';

                    return dom[animation](target, {
                        direction: this._settings.direction,
                        duration: this._settings.duration,
                        type: 'linear'
                    });
                });

                dom.addClass(targets, 'show');

                Promise.all(animations).then(_ => {
                    if (accordion.targets.length) {
                        dom.removeClass(accordion.targets, 'show');
                        this._setExpanded(accordion.targets, false);
                    }

                    if (accordion.nodes.length) {
                        dom.triggerEvent(accordion.nodes, 'hidden.frost.collapse');
                    }

                    this._setExpanded(targets);
                    dom.triggerEvent(this._node, 'shown.frost.collapse');

                    resolve();
                }).catch(reject).finally(_ =>
                    dom.removeDataset(allTargets, 'animating')
                );
            });
        }

        /**
         * Toggle the target element.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        toggle() {
            return new Promise((resolve, reject) => {
                const targets = [];
                const hidden = [];
                const visible = [];
                for (const target of this._targets) {
                    if (dom.getDataset(target, 'animating')) {
                        continue;
                    }

                    targets.push(target);

                    if (dom.hasClass(target, 'show')) {
                        visible.push(target);
                    } else {
                        hidden.push(target);
                    }
                }

                if (!targets.length) {
                    return reject();
                }

                if (visible.length && !DOM._triggerEvent(this._node, 'hide.frost.collapse')) {
                    return reject();
                }

                const accordion = this._getAccordion(hidden);

                if (!accordion) {
                    return reject();
                }

                for (const node of accordion.nodes) {
                    if (!DOM._triggerEvent(node, 'hide.frost.collapse')) {
                        return reject();
                    }
                }

                if (hidden.length && !DOM._triggerEvent(this._node, 'show.frost.collapse')) {
                    return reject();
                }

                const allTargets = [...targets];
                allTargets.push(...accordion.targets);

                dom.setDataset(allTargets, 'animating', true);

                const animations = allTargets.map(target => {
                    const animation = visible.includes(target) || accordion.targets.includes(target) ?
                        'squeezeOut' : 'squeezeIn';

                    return dom[animation](target, {
                        direction: this._settings.direction,
                        duration: this._settings.duration,
                        type: 'linear'
                    });
                });

                dom.addClass(hidden, 'show')

                Promise.all(animations).then(_ => {
                    if (accordion.targets.length) {
                        dom.removeClass(accordion.targets, 'show');
                        this._setExpanded(accordion.targets, false);
                    }

                    if (accordion.nodes.length) {
                        dom.triggerEvent(accordion.nodes, 'hidden.frost.collapse');
                    }

                    if (visible.length) {
                        dom.removeClass(visible, 'show');
                        this._setExpanded(visible, false);
                        dom.triggerEvent(this._node, 'hidden.frost.collapse');
                    }

                    if (hidden.length) {
                        this._setExpanded(hidden);
                        dom.triggerEvent(this._node, 'shown.frost.collapse');
                    }

                    resolve();
                }).catch(reject).finally(_ =>
                    dom.removeDataset(allTargets, 'animating')
                );
            });
        }

    }


    // Default Collapse options
    Collapse.defaults = {
        direction: 'bottom',
        duration: 250
    };

    Collapse._toggles = new WeakMap;

    // Auto-initialize Collapse from data-ride
    dom.addEventOnce(window, 'load', _ => {
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

                if (index) {
                    return;
                }

                if (!method) {
                    result = collapse;
                } else {
                    result = collapse[method](...args);
                }
            });

            return result;
        };
    }

    UI.Collapse = Collapse;


    /**
     * Collapse Helpers
     */

    Object.assign(Collapse.prototype, {

        /**
         * Attach events for the Collapse.
         */
        _events() {
            this._clickEvent = e => {
                e.preventDefault();

                this.toggle().catch(_ => { });
            };

            dom.addEvent(this._node, 'click.frost.collapse', this._clickEvent);
        },

        /**
         * Get accordion toggles and targets for the target nodes.
         * @param {array} targets The target nodes.
         * @return {object} The accordion toggles and targets.
         */
        _getAccordion(targets) {
            const accordionToggles = [];
            const accordionTargets = [];

            for (const target of targets) {
                const parent = dom.getDataset(target, 'parent');
                if (!parent) {
                    continue;
                }

                const parentNode = dom.closest(target, parent);
                const collapseToggles = dom.find('[data-toggle="collapse"]', parentNode)
                    .filter(toggle => !dom.isSame(toggle, this._node) && dom.hasData(toggle, 'collapse'));

                for (const toggle of collapseToggles) {
                    if (accordionToggles.includes(toggle)) {
                        continue;
                    }

                    const collapse = dom.getData(toggle, 'collapse');
                    const collapseTargets = dom.find(collapse._settings.target)
                        .filter(target => !targets.includes(target) && !accordionTargets.includes(target) && dom.hasClass(target, 'show'));

                    if (!collapseTargets.length) {
                        continue;
                    }

                    if (collapseTargets.find(target => dom.getDataset(target, 'animating'))) {
                        return false;
                    }

                    accordionToggles.push(toggle);
                    accordionTargets.push(...collapseTargets);
                }
            }

            return {
                nodes: accordionToggles,
                targets: accordionTargets
            };
        },

        /**
         * Set the ARIA expanded attribute for all targets.
         * @param {array} targets The targets array.
         * @param {Boolean} [expanded=true] Whether the target is expanded.
         */
        _setExpanded(targets, expanded = true) {
            for (const target of targets) {
                const toggles = Collapse._toggles.get(target);
                for (const toggle of toggles) {
                    dom.setAttribute(toggle, 'aria-expanded', expanded);
                }
            }
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
         * @param {number} [settings.duration=100] The duration of the animation.
         * @param {string} [settings.placement=bottom] The placement of the dropdown relative to the toggle.
         * @param {string} [settings.position=start] The position of the dropdown relative to the toggle.
         * @param {Boolean} [settings.fixed=false] Whether the dropdown position is fixed.
         * @param {number} [settings.spacing=2] The spacing between the dropdown and the toggle.
         * @param {number} [settings.minContact=false] The minimum amount of contact the dropdown must make with the toggle.
         * @returns {Dropdown} A new Dropdown object.
         */
        constructor(node, settings) {
            this._node = node;

            this._settings = Core.extend(
                {},
                Dropdown.defaults,
                dom.getDataset(this._node),
                settings
            );

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
                    {
                        reference: this._referenceNode,
                        placement: this._settings.placement,
                        position: this._settings.position,
                        fixed: this._settings.fixed,
                        spacing: this._settings.spacing,
                        minContact: this._settings.minContact
                    }
                );
            }

            this._events();

            dom.setData(this._node, 'dropdown', this);
        }

        /**
         * Destroy the Dropdown.
         */
        destroy() {
            dom.stop(this._menuNode, true);

            if (this._popper) {
                this._popper.destroy();
            }

            dom.removeClass(this._containerNode, 'open');

            dom.removeEvent(document, 'click.frost.dropdown', this._documentClickEvent);
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
                if (!dom.hasClass(this._containerNode, 'open') || dom.getDataset(this._menuNode, 'animating')) {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'hide.frost.dropdown')) {
                    return reject();
                }

                dom.setDataset(this._menuNode, 'animating', true);

                dom.removeEvent(document, 'click.frost.dropdown', this._documentClickEvent);

                dom.fadeOut(this._menuNode, {
                    duration: this._settings.duration
                }).then(_ => {
                    dom.removeClass(this._containerNode, 'open');
                    dom.setAttribute(this._node, 'aria-expanded', false);

                    dom.triggerEvent(this._node, 'hidden.frost.dropdown');

                    resolve();
                }).catch(reject).finally(_ =>
                    dom.removeDataset(this._menuNode, 'animating')
                );
            });
        }

        /**
         * Show the Dropdown.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        show() {
            return new Promise((resolve, reject) => {
                if (dom.hasClass(this._containerNode, 'open') || dom.getDataset(this._menuNode, 'animating')) {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'show.frost.dropdown')) {
                    return reject();
                }

                dom.setDataset(this._menuNode, 'animating', true);

                dom.addClass(this._containerNode, 'open');

                dom.fadeIn(this._menuNode, {
                    duration: this._settings.duration
                }).then(_ => {
                    dom.setAttribute(this._node, 'aria-expanded', true);

                    dom.addEvent(document, 'click.frost.dropdown', this._documentClickEvent);

                    dom.triggerEvent(this._node, 'shown.frost.dropdown');

                    resolve();
                }).catch(reject).finally(_ =>
                    dom.removeDataset(this._menuNode, 'animating')
                );
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
        duration: 100,
        placement: 'bottom',
        position: 'start',
        fixed: false,
        spacing: 2,
        minContact: false
    };

    // Auto-initialize Dropdown from data-toggle
    dom.addEventOnce(window, 'load', _ => {
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

                if (index) {
                    return;
                }

                if (!method) {
                    result = dropdown;
                } else {
                    result = dropdown[method](...args);
                }
            });

            return result;
        };
    }

    UI.Dropdown = Dropdown;


    /**
     * Dropdown Helpers
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
                }).catch(_ => { });
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

            this._documentClickEvent = e => {
                if (
                    (
                        dom.isSame(e.target, this._menuNode) ||
                        dom.hasDescendent(this._menuNode, e.target)
                    ) &&
                    (
                        dom.getDataset(e.target, 'dropdownClose') === false ||
                        dom.closest(
                            e.target,
                            parent =>
                                dom.getDataset(parent, 'dropdownClose') === false,
                            this._menuNode
                        ).length
                    )
                ) {
                    return;
                }

                this.hide().catch(_ => { });
            };

            dom.addEvent(this._node, 'click.frost.dropdown', this._clickEvent);
            dom.addEvent(this._node, 'keyup.frost.dropdown', this._keyUpEvent);
            dom.addEvent(this._node, 'keydown.frost.dropdown', this._keyDownEvent);
            dom.addEventDelegate(this._menuNode, 'keydown.frost.dropdown', '.dropdown-item', this._menuKeyDownEvent);
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
         * @param {number} [settings.duration=250] The duration of the animation.
         * @param {Boolean} [settings.backdrop=true] Whether to display a backdrop for the modal.
         * @param {Boolean} [settings.focus=true] Whether to set focus on the modal when shown.
         * @param {Boolean} [settings.show=true] Whether to show the modal on initialization.
         * @param {Boolean} [settings.keyboard=true] Whether to close the modal when the escape key is pressed.
         * @returns {Modal} A new Modal object.
         */
        constructor(node, settings) {
            this._node = node;

            this._settings = Core.extend(
                {},
                Modal.defaults,
                dom.getDataset(node),
                settings
            );

            this._dialog = dom.child(this._node, '.modal-dialog').shift();

            this._dismiss = dom.find('[data-dismiss="modal"]', this._node);

            this._events();

            if (this._settings.show) {
                this.show();
            }

            dom.setData(this._node, 'modal', this);
        }

        /**
         * Destroy the Modal.
         */
        destroy() {
            if (Modal._toggles.has(this._node)) {
                const toggles = Modal._toggles.get(this._node);
                dom.removeEvent(toggles, 'click.frost.modal', this._clickEvent);
                Modal._toggles.delete(this._node);
            }

            if (this._dismiss.length) {
                dom.removeEvent(this._dismiss, 'click.frost.modal', this._dismissEvent);
            }

            if (this._settings.backdrop) {
                dom.removeEvent(document, 'click.frost.modal', this._documentClickEvent);
            }

            if (this._settings.keyboard) {
                dom.removeEvent(window, 'keydown.frost.modal', this._windowKeyDownEvent);
            }

            dom.removeData(this._node, 'modal');
        }

        /**
         * Hide the Modal.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        hide() {
            return new Promise((resolve, reject) => {
                if (!dom.hasClass(this._node, 'show') || dom.getDataset(this._dialog, 'animating')) {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'hide.frost.modal')) {
                    return reject();
                }

                dom.setDataset([this._dialog, this._backdrop], 'animating', true);

                if (this._settings.backdrop) {
                    dom.removeEvent(document, 'click.frost.modal', this._documentClickEvent);
                }

                if (this._settings.keyboard) {
                    dom.removeEvent(window, 'keydown.frost.modal', this._windowKeyDownEvent);
                }

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

                    dom.removeAttribute(this._node, 'aria-modal');
                    dom.setAttribute(this._node, 'aria-hidden', true);

                    dom.removeClass(this._node, 'show');
                    dom.removeClass(document.body, 'modal-open');

                    dom.triggerEvent(this._node, 'hidden.frost.modal');

                    resolve();
                }).catch(reject).finally(_ =>
                    dom.removeDataset([this._dialog, this._backdrop], 'animating')
                );
            });
        }

        /**
         * Show the Modal.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        show() {
            return new Promise((resolve, reject) => {
                if (dom.hasClass(this._node, 'show') || dom.getDataset(this._dialog, 'animating')) {
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

                dom.setDataset([this._dialog, this._backdrop], 'animating', true);

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
                    dom.removeAttribute(this._node, 'aria-hidden');
                    dom.setAttribute(this._node, 'aria-modal', true);

                    if (this._settings.backdrop) {
                        dom.addEvent(document, 'click.frost.modal', this._documentClickEvent);
                    }

                    if (this._settings.keyboard) {
                        dom.addEvent(window, 'keydown.frost.modal', this._windowKeyDownEvent);
                    }

                    if (this._settings.focus) {
                        dom.focus(this._node);
                    }

                    dom.triggerEvent(this._node, 'shown.frost.modal');

                    resolve();
                }).catch(reject).finally(_ =>
                    dom.removeDataset([this._dialog, this._backdrop], 'animating')
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

        static fromToggle(toggle, show = false) {
            const target = dom.getDataset(toggle, 'target');
            const element = dom.findOne(target);
            const modal = dom.hasData(element, 'modal') ?
                dom.getData(element, 'modal') :
                new this(element, {
                    show
                });

            if (!this._toggles.has(element)) {
                this._toggles.set(element, []);
            }

            this._toggles.get(element)
                .push(toggle);

            dom.addEvent(toggle, 'click.frost.modal', modal._clickEvent);
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

    Modal._toggles = new WeakMap;

    // Auto-initialize Modal from data-toggle
    dom.addEventOnce(window, 'load', _ => {
        const nodes = dom.find('[data-toggle="modal"]');

        for (const node of nodes) {
            Modal.fromToggle(node);
        }
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

                if (index) {
                    return;
                }

                if (!method) {
                    result = modal;
                } else {
                    result = modal[method](...args);
                }
            });

            return result;
        };
    }

    UI.Modal = Modal;


    /**
     * Modal Helpers
     */

    Object.assign(Modal.prototype, {

        /**
         * Attach events for the Modal.
         */
        _events() {
            this._clickEvent = e => {
                e.preventDefault();

                this.show().catch(_ => { });
            };

            this._dismissEvent = e => {
                e.preventDefault();

                this.hide().catch(_ => { });
            };

            this._documentClickEvent = e => {
                if (dom.isSame(e.target, this._dialog) || dom.hasDescendent(this._dialog, e.target)) {
                    return;
                }

                this.hide().catch(_ => { });
            };

            this._windowKeyDownEvent = e => {
                if (e.key !== 'Escape') {
                    return;
                }

                e.preventDefault();

                this.hide().catch(_ => { });
            };

            if (this._dismiss.length) {
                dom.addEvent(this._dismiss, 'click.frost.modal', this._dismissEvent);
            }
        }

    });


    /**
     * Popover Class
     * @class
     */
    class Popover {

        /**
         * New Popover constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Popover with.
         * @param {object} [settings.classes] The CSS classes to style the popover.
         * @param {string} [settings.classes.popover=popover] The CSS classes for the popover.
         * @param {string} [settings.classes.popoverHeader=popover-header] The CSS classes for the popover header.
         * @param {string} [settings.classes.popoverBody=popover-body] The CSS classes for the popover body.
         * @param {string} [settings.classes.arrow=arrow] The CSS classes for the arrow.
         * @param {number} [settings.duration=100] The duration of the animation.
         * @param {Boolean} [settings.enable=true] Whether the popover is enabled.
         * @param {Boolean} [settings.html=false] Whether to allow HTML in the popover.
         * @param {function} [settings.sanitize] The HTML sanitization function.
         * @param {string} [settings.trigger=click] The events to trigger the popover.
         * @param {string} [settings.placement=auto] The placement of the popover relative to the toggle.
         * @param {string} [settings.position=center] The position of the popover relative to the toggle.
         * @param {Boolean} [settings.fixed=false] Whether the popover position is fixed.
         * @param {number} [settings.spacing=7] The spacing between the popover and the toggle.
         * @param {number} [settings.minContact=false] The minimum amount of contact the popover must make with the toggle.
         * @returns {Popover} A new Popover object.
         */
        constructor(node, settings) {
            this._node = node;

            this._settings = Core.extend(
                {},
                Popover.defaults,
                dom.getDataset(this._node),
                settings
            );

            this._triggers = this._settings.trigger.split(' ');

            this._render();
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
            this._popper.destroy();

            dom.remove(this._popover);

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
                if (dom.getDataset(this._popover, 'animating')) {
                    dom.stop(this._tooltip);
                }

                if (!dom.isConnected(this._popover)) {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'hide.frost.popover')) {
                    return reject();
                }

                dom.setDataset(this._popover, 'animating', true);

                dom.fadeOut(this._popover, {
                    duration: this._settings.duration
                }).then(_ => {
                    dom.removeClass(this._popover, 'show');

                    dom.detach(this._popover);

                    dom.triggerEvent(this._node, 'hidden.frost.popover');

                    resolve();
                }).catch(reject).finally(_ =>
                    dom.removeDataset(this._popover, 'animating')
                );
            });
        }

        /**
         * Show the Popover.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        show() {
            return new Promise((resolve, reject) => {
                if (dom.getDataset(this._popover, 'animating')) {
                    dom.stop(this._tooltip);
                }

                if (dom.isConnected(this._popover)) {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'show.frost.popover')) {
                    return reject();
                }

                this._show();

                dom.setDataset(this._popover, 'animating', true);

                dom.addClass(this._popover, 'show');

                dom.fadeIn(this._popover, {
                    duration: this._settings.duration
                }).then(_ => {
                    dom.triggerEvent(this._node, 'shown.frost.popover')

                    resolve();
                }).catch(reject).finally(_ =>
                    dom.removeDataset(this._popover, 'animating')
                );
            });
        }

        /**
         * Toggle the Popover.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        toggle() {
            return dom.isConnected(this._popover) ?
                this.hide() :
                this.show();
        }

        /**
         * Update the Popover position.
         */
        update() {
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
        duration: 100,
        enable: true,
        html: false,
        sanitize: input => dom.sanitize(input),
        trigger: 'click',
        placement: 'auto',
        position: 'center',
        fixed: false,
        spacing: 3,
        minContact: false
    };

    // Auto-initialize Popover from data-toggle
    dom.addEventOnce(window, 'load', _ => {
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

                if (index) {
                    return;
                }

                if (!method) {
                    result = popover;
                } else {
                    result = popover[method](...args);
                }
            });

            return result;
        };
    }

    UI.Popover = Popover;


    /**
     * Popover Helpers
     */

    Object.assign(Popover.prototype, {

        /**
         * Attach events for the Popover.
         */
        _events() {
            this._hideEvent = _ => {
                if (!this._enabled || !dom.isConnected(this._tooltip)) {
                    return;
                }

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


            this._popoverHeader = dom.create('h3', {
                class: this._settings.classes.popoverHeader
            });

            this._popoverBody = dom.create('div', {
                class: this._settings.classes.popoverBody
            });

            dom.append(this._popover, arrow);
            dom.append(this._popover, this._popoverHeader);
            dom.append(this._popover, this._popoverBody);

            this._popper = new Popper(
                this._popover,
                {
                    reference: this._node,
                    arrow: arrow,
                    placement: this._settings.placement,
                    position: this._settings.position,
                    fixed: this._settings.fixed,
                    spacing: this._settings.spacing,
                    minContact: this._settings.minContact
                }
            )
        },

        /**
         * Update the Popover and append to the DOM.
         */
        _show() {
            const method = this._settings.html ? 'setHTML' : 'setText';
            const title = dom.getAttribute(this._node, 'title') || this._settings.title;
            const content = this._settings.content;

            dom[method](
                this._popoverHeader,
                this._settings.html && this._settings.sanitize ?
                    this._settings.sanitize(title) :
                    title
            );

            if (!title) {
                dom.hide(this._popoverHeader);
            } else {
                dom.show(this._popoverHeader);
            }

            dom[method](
                this._popoverBody,
                this._settings.html && this._settings.sanitize ?
                    this._settings.sanitize(content) :
                    content
            );

            if (this._container) {
                dom.append(this._container, this._popover);
            } else {
                dom.before(this._node, this._popover);
            }

            this._popper.update();
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
         * @param {object} settings The options to create the Popper with.
         * @param {HTMLElement} settings.referencee The node to use as the reference.
         * @param {HTMLElement} [settings.container] The node to use as the container.
         * @param {HTMLElement} [settings.arrow] The node to use as the arrow.
         * @param {string} [settings.placement=bottom] The placement of the node relative to the reference.
         * @param {string} [settings.position=center] The position of the node relative to the reference.
         * @param {Boolean} [settings.fixed=false] Whether the node position is fixed.
         * @param {number} [settings.spacing=0] The spacing between the node and the reference.
         * @param {number} [settings.minContact=false] The minimum amount of contact the node must make with the reference.
         * @param {Boolean} [settings.useGpu=true] Whether to use GPU acceleration.
         * @returns {Popper} A new Popper object.
         */
        constructor(node, settings) {
            this._node = node;

            this._settings = Core.extend(
                {},
                Popper.defaults,
                dom.getDataset(this._node),
                settings
            );

            this._fixed = dom.isFixed(this._settings.reference);

            this._relativeParent = Popper.getRelativeParent(this._node);

            this._scrollParent = Popper.getScrollParent(this._node);

            dom.setStyle(this._node, {
                position: this._fixed ?
                    'fixed' :
                    'absolute',
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
            const referenceBox = dom.rect(this._settings.reference, !this._fixed);
            const windowBox = Popper.windowContainer(this._fixed);

            // check object could be seen
            if (Popper.isNodeHidden(nodeBox, referenceBox, windowBox, this._settings.spacing)) {
                return;
            }

            dom.triggerEvent(this._node, 'update.frost.popper');

            const scrollBox = this._scrollParent ?
                dom.rect(this._scrollParent, !this._fixed) :
                null;

            const containerBox = this._settings.container ?
                dom.rect(this._settings.container, !this._fixed) :
                null;

            const minimumBox = {
                ...windowBox
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
            const placement = this._settings.fixed ?
                this._settings.placement :
                Popper.getPopperPlacement(
                    nodeBox,
                    referenceBox,
                    minimumBox,
                    this._settings.placement,
                    this._settings.spacing + 2
                );

            dom.setDataset(this._settings.reference, 'placement', placement);
            dom.setDataset(this._node, 'placement', placement);

            // get auto position
            const position = this._settings.position !== 'auto' ?
                this._settings.position :
                Popper.getPopperPosition(
                    nodeBox,
                    referenceBox,
                    minimumBox,
                    placement,
                    this._settings.position
                );

            // calculate actual offset
            const offset = {
                x: Math.round(referenceBox.x),
                y: Math.round(referenceBox.y)
            };

            // offset for relative parent
            const relativeBox = this._relativeParent && !this._fixed ?
                dom.rect(this._relativeParent, !this._fixed) :
                null;

            if (relativeBox) {
                offset.x -= Math.round(relativeBox.x);
                offset.y -= Math.round(relativeBox.y);
            }

            // offset for placement
            Popper.adjustPlacement(offset, nodeBox, referenceBox, placement, this._settings.spacing);

            // offset for position
            Popper.adjustPosition(offset, nodeBox, referenceBox, placement, position);

            // compensate for margins
            offset.x -= parseInt(dom.css(this._node, 'margin-left'));
            offset.y -= parseInt(dom.css(this._node, 'margin-top'));

            // corrective positioning
            Popper.adjustConstrain(offset, nodeBox, referenceBox, minimumBox, relativeBox, placement, this._settings.minContact);

            // compensate for scroll parent
            if (this._scrollParent) {
                offset.x += dom.getScrollX(this._scrollParent);
                offset.y += dom.getScrollY(this._scrollParent);
            }

            // update position
            const style = {};
            if (this._settings.useGpu) {
                style.transform = 'translate3d(' + offset.x + 'px , ' + offset.y + 'px , 0)'
            } else {
                style.marginLeft = offset.x;
                style.marginTop = offset.y;
            }

            dom.setStyle(this._node, style);

            // update arrow
            if (this._settings.arrow) {
                const newNodeBox = dom.rect(this._node, !this._fixed);
                this._updateArrow(newNodeBox, referenceBox, placement, position);
            }

            dom.triggerEvent(this._node, 'updated.frost.popper');
        }

    }


    // Default Popper options
    Popper.defaults = {
        reference: null,
        container: null,
        arrow: null,
        placement: 'bottom',
        position: 'center',
        fixed: false,
        spacing: 0,
        minContact: false,
        useGpu: true
    };

    Popper._overflowTypes = ['overflow', 'overflowX', 'overflowY'];
    Popper._overflowValues = ['auto', 'scroll'];

    UI.Popper = Popper;


    /**
     * Popper Helpers
     */

    Object.assign(Popper.prototype, {

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
         * Update the position of the arrow for the actual placement and position.
         * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
         * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
         * @param {string} placement The actual placement of the Popper.
         * @param {string} position The actual position of the Popper.
         */
        _updateArrow(nodeBox, referenceBox, placement, position) {
            const arrowStyles = {
                position: 'absolute',
                top: '',
                right: '',
                bottom: '',
                left: ''
            };
            dom.setStyle(this._settings.arrow, arrowStyles);

            const arrowBox = dom.rect(this._settings.arrow, !this._fixed);

            if (['top', 'bottom'].includes(placement)) {
                arrowStyles[placement === 'top' ? 'bottom' : 'top'] = -arrowBox.height;
                const diff = (referenceBox.width - nodeBox.width) / 2;

                let offset = (nodeBox.width / 2) - (arrowBox.width / 2);
                if (position === 'start') {
                    offset += diff;
                } else if (position === 'end') {
                    offset -= diff;
                }

                arrowStyles.left = Core.clamp(
                    offset,
                    Math.max(referenceBox.left, nodeBox.left) - arrowBox.left,
                    Math.min(referenceBox.right, nodeBox.right) - arrowBox.left - arrowBox.width
                );
            } else {
                arrowStyles[placement === 'right' ? 'left' : 'right'] = -arrowBox.width;
                const diff = (referenceBox.height - nodeBox.height) / 2;

                let offset = (nodeBox.height / 2) - arrowBox.height;
                if (position === 'start') {
                    offset += diff;
                } else if (position === 'end') {
                    offset -= diff;
                }

                arrowStyles.top = Core.clamp(
                    offset,
                    Math.max(referenceBox.top, nodeBox.top) - arrowBox.top,
                    Math.min(referenceBox.bottom, nodeBox.bottom) - arrowBox.top - arrowBox.height
                );
            }

            dom.setStyle(this._settings.arrow, arrowStyles);
        }

    });


    /**
     * Popper Static
     */

    Object.assign(Popper, {

        /**
         * Constrain the offset within the minimumBox.
         * @param {object} offset The offset object.
         * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
         * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
         * @param {object} minimumBox The computed minimum bounding rectangle of the container.
         * @param {DOMRect} [relativeBox] The computed bounding rectangle of the relative parent.
         * @param {string} placement The actual placement of the Popper.
         * @param {number} [minContact] The minimum amount of contact to make with the reference node.
         */
        adjustConstrain(offset, nodeBox, referenceBox, minimumBox, relativeBox, placement, minContact) {
            if (['left', 'right'].includes(placement)) {
                let offsetY = offset.y;
                let refTop = referenceBox.top;

                if (relativeBox) {
                    offsetY += relativeBox.top;
                    refTop -= relativeBox.top;
                }

                const minSize = minContact !== false ?
                    minContact :
                    referenceBox.height;

                if (offsetY + nodeBox.height > minimumBox.bottom) {
                    // bottom of offset node is below the container
                    const diff = offsetY + nodeBox.height - (minimumBox.bottom);
                    offset.y = Math.max(
                        refTop - nodeBox.height + minSize,
                        offset.y - diff
                    );
                } else if (offsetY < minimumBox.top) {
                    // top of offset node is above the container
                    const diff = offsetY - minimumBox.top;
                    offset.y = Math.min(
                        refTop + referenceBox.height - minSize,
                        offset.y - diff
                    );
                }
            } else {
                let offsetX = offset.x;
                let refLeft = referenceBox.left;

                if (relativeBox) {
                    offsetX += relativeBox.left;
                    refLeft -= relativeBox.left;
                }

                const minSize = minContact !== false ?
                    minContact :
                    referenceBox.width;

                if (offsetX + nodeBox.width > minimumBox.right) {
                    // right of offset node is to the right of the container
                    const diff = offsetX + nodeBox.width - minimumBox.right;
                    offset.x = Math.max(
                        refLeft - nodeBox.width + minSize,
                        offset.x - diff
                    );
                } else if (offsetX < minimumBox.left) {
                    // left of offset node is to the left of the container
                    const diff = offsetX - minimumBox.left;
                    offset.x = Math.min(
                        refLeft + referenceBox.width - minSize,
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
         * @param {number} spacing The amount of spacing to use.
         */
        adjustPlacement(offset, nodeBox, referenceBox, placement, spacing) {
            if (placement === 'top') {
                offset.y -= Math.round(nodeBox.height) + spacing
            } else if (placement === 'right') {
                offset.x += Math.round(referenceBox.width) + spacing
            } else if (placement === 'bottom') {
                offset.y += Math.round(referenceBox.height) + spacing
            } else if (placement === 'left') {
                offset.x -= Math.round(nodeBox.width) + spacing
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
        adjustPosition(offset, nodeBox, referenceBox, placement, position) {
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
         * Get the actual placement of the Popper.
         * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
         * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
         * @param {object} minimumBox The computed minimum bounding rectangle of the container.
         * @param {string} placement The initial placement of the Popper.
         * @param {number} spacing The amount of spacing to use.
         * @returns {string} The new placement of the Popper.
         */
        getPopperPlacement(nodeBox, referenceBox, minimumBox, placement, spacing) {
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

            return placement
        },

        /**
         * Get the actual position of the Popper.
         * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
         * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
         * @param {object} minimumBox The computed minimum bounding rectangle of the container.
         * @param {string} placement The actual placement of the Popper.
         * @param {string} position The initial position of the Popper.
         * @returns {string} The new position of the Popper.
         */
        getPopperPosition(nodeBox, referenceBox, minimumBox, placement, position) {

            const deltaX = nodeBox.width - referenceBox.width;
            const deltaY = nodeBox.height - referenceBox.height;

            if (['bottom', 'top'].includes(placement)) {
                const spaceLeft = referenceBox.left - minimumBox.left;
                const spaceRight = minimumBox.right - referenceBox.right;

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
                const spaceTop = referenceBox.top - minimumBox.top;
                const spaceBottom = minimumBox.bottom - referenceBox.bottom;

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

        /**
         * Get the relative parent of the node.
         * @param {HTMLElement} node The input node.
         * @return {HTMLElement} The relative parent.
         */
        getRelativeParent(node) {
            return dom.closest(
                node,
                parent =>
                    dom.css(parent, 'position') === 'relative',
                document.body
            ).shift();
        },

        /**
         * Get the scroll parent of the node.
         * @param {HTMLElement} node The input node.
         * @return {HTMLElement} The scroll parent.
         */
        getScrollParent(node) {
            return dom.closest(
                node,
                parent =>
                    !!this._overflowTypes.find(overflow =>
                        !!this._overflowValues.find(value =>
                            new RegExp(value)
                                .test(
                                    dom.css(parent, overflow)
                                )
                        )
                    ),
                document.body
            ).shift();
        },

        /**
         * Returns true if the node can not be visible inside the window.
         * @param {object} offset The offset object.
         * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
         * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
         * @param {object} windowContainer The computed bounding rectangle of the window.
         * @param {number} spacing The amount of spacing to use.
         * @returns {Boolean} TRUE if the node can not be visible inside the window, otherwise FALSE.
         */
        isNodeHidden(nodeBox, referenceBox, windowContainer, spacing) {
            return windowContainer.top > referenceBox.bottom + nodeBox.height + spacing ||
                windowContainer.left > referenceBox.right + nodeBox.width + spacing ||
                windowContainer.bottom < referenceBox.top - nodeBox.height - spacing ||
                windowContainer.right < referenceBox.left - nodeBox.width - spacing;
        },

        /**
         * Calculate the computed bounding rectangle of the window.
         * @param {Boolean} fixed Whether the Popper is fixed.
         * @returns {object} The computed bounding rectangle of the window.
         */
        windowContainer(fixed) {
            const scrollX = fixed ?
                0 :
                dom.getScrollX(window);
            const scrollY = fixed ?
                0 :
                dom.getScrollY(window);
            const windowWidth = dom.width(document);
            const windowHeight = dom.height(document);

            return {
                x: scrollX,
                y: scrollY,
                width: windowWidth,
                height: windowHeight,
                top: scrollY,
                right: scrollX + windowWidth,
                bottom: scrollY + windowHeight,
                left: scrollX
            };
        }

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
         * @param {number} [settings.duration=100] The duration of the animation.
         * @returns {Tab} A new Tab object.
         */
        constructor(node, settings) {
            this._node = node;

            this._settings = Core.extend(
                {},
                Tab.defaults,
                dom.getDataset(this._node),
                settings
            );

            if (!this._settings.target) {
                this._settings.target = dom.getAttribute(this._node, 'href');
            }

            this._target = dom.findOne(this._settings.target);
            this._siblings = dom.siblings(this._node);

            this._events();

            dom.setData(this._node, 'tab', this);
        }

        /**
         * Destroy the Tab.
         */
        destroy() {
            dom.removeEvent(this._node, 'click.frost.tab', this._clickEvent);

            dom.removeData(this._node, 'tab');
        }

        /**
         * Hide the current Tab.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        hide() {
            return new Promise((resolve, reject) => {
                if (!dom.hasClass(this._target, 'active') || dom.getDataset(this._target, 'animating')) {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'hide.frost.tab')) {
                    return reject();
                }

                dom.setDataset(this._target, 'animating', true);

                dom.fadeOut(this._target, {
                    duration: this._settings.duration
                }).then(_ => {
                    dom.removeClass(this._target, 'active');
                    dom.removeClass(this._node, 'active');
                    dom.setAttribute(this._node, 'aria-selected', false);

                    dom.triggerEvent(this._node, 'hidden.frost.tab');

                    resolve();
                }).catch(reject).finally(_ =>
                    dom.removeDataset(this._target, 'animating')
                );
            });
        }

        /**
         * Hide any active Tabs, and show the current Tab.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        show() {
            return new Promise((resolve, reject) => {
                if (dom.hasClass(this._target, 'active') || dom.getDataset(this._target, 'animating')) {
                    return reject();
                }

                const activeTab = this._siblings.find(sibling => dom.hasClass(sibling, 'active'));

                if (activeTab && !dom.hasData(activeTab, 'tab')) {
                    return reject();
                }

                (activeTab ?
                    dom.getData(activeTab, 'tab').hide() :
                    Promise.resolve()
                ).then(_ => {
                    if (!DOM._triggerEvent(this._node, 'show.frost.tab')) {
                        return reject();
                    }

                    dom.setDataset(this._target, 'animating', true);

                    dom.addClass(this._target, 'active');
                    dom.addClass(this._node, 'active');

                    return dom.fadeIn(this._target, {
                        duration: this._settings.duration
                    });
                }).then(_ => {
                    dom.setAttribute(this._node, 'aria-selected', true);

                    dom.triggerEvent(this._node, 'shown.frost.tab');

                    resolve();
                }).catch(reject).finally(_ =>
                    dom.removeDataset(this._target, 'animating')
                );
            });
        }

    }


    // Default Tab options
    Tab.defaults = {
        duration: 100
    };

    // Auto-initialize Tab from data-toggle
    dom.addEventOnce(window, 'load', _ => {
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

                if (index) {
                    return;
                }

                if (!method) {
                    result = tab;
                } else {
                    result = tab[method](...args);
                }
            });

            return result;
        };
    }

    UI.Tab = Tab;


    /**
     * Tab Helpers
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
         * @param {Boolean} [autohide=true] Whether to hide the toast after initialization.
         * @param {number} [settings.delay=5000] The duration to wait before hiding the toast.
         * @param {number} [settings.duration=100] The duration of the animation.
         * @returns {Toast} A new Toast object.
         */
        constructor(node, settings) {
            this._node = node;

            this._settings = Core.extend(
                {},
                Toast.defaults,
                dom.getDataset(this._node),
                settings
            );

            this._dismiss = dom.find('[data-dismiss="toast"]', this._node);

            this._events();

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
            if (this._dismiss.length) {
                dom.removeEvent(this._dismiss, 'click.frost.toast', this._dismissEvent);
            }

            dom.removeData(this._node, 'toast');
        }

        /**
         * Hide the Toast.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        hide() {
            return new Promise((resolve, reject) => {
                if (!dom.isVisible(this._node) || dom.getDataset(this._node, 'animating')) {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'hide.frost.toast')) {
                    return reject();
                }

                dom.setDataset(this._node, 'animating', true);

                return dom.fadeOut(this._node, {
                    duration: this._settings.duration
                }).then(_ => {
                    dom.hide(this._node);

                    dom.triggerEvent(this._node, 'hidden.frost.toast');

                    resolve();
                }).catch(reject).finally(_ =>
                    dom.removeDataset(this._node, 'animating')
                );
            });
        }

        /**
         * Show the Toast.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        show() {
            return new Promise((resolve, reject) => {
                if (dom.isVisible(this._node) || dom.getDataset(this._node, 'animating')) {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'show.frost.toast')) {
                    return reject();
                }

                dom.setDataset(this._node, 'animating', true);

                dom.show(this._node);

                return dom.fadeIn(this._node, {
                    duration: this._settings.duration
                }).then(_ => {
                    dom.triggerEvent(this._node, 'shown.frost.toast');

                    resolve();
                }).catch(reject).finally(_ =>
                    dom.removeDataset(this._node, 'animating')
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
    dom.addEventOnce(window, 'load', _ => {
        const nodes = dom.find('[data-toggle="toast"]');

        for (const node of nodes) {
            new Toast(node);
        }
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

                if (index) {
                    return;
                }

                if (!method) {
                    result = toast;
                } else {
                    result = toast[method](...args);
                }
            });

            return result;
        };
    }

    UI.Toast = Toast;


    /**
     * Toast Helpers
     */

    Object.assign(Toast.prototype, {

        /**
         * Attach events for the Toast.
         */
        _events() {
            this._dismissEvent = e => {
                e.preventDefault();

                this.hide().catch(_ => { });
            };

            if (this._dismiss.length) {
                dom.addEvent(this._dismiss, 'click.frost.toast', this._dismissEvent);
            }

        }

    });


    /**
     * Tooltip Class
     * @class
     */
    class Tooltip {

        /**
         * New Tooltip constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Tooltip with.
         * @param {object} [settings.classes] The CSS classes to style the tooltip.
         * @param {string} [settings.classes.tooltip=tooltip] The CSS classes for the tooltip.
         * @param {string} [settings.classes.tooltipInner=tooltip-inner] The CSS classes for the tooltip inner-element.
         * @param {string} [settings.classes.arrow=arrow] The CSS classes for the arrow.
         * @param {number} [settings.duration=100] The duration of the animation.
         * @param {Boolean} [settings.enable=true] Whether the tooltip is enabled.
         * @param {Boolean} [settings.html=false] Whether to allow HTML in the tooltip.
         * @param {function} [settings.sanitize] The HTML sanitization function.
         * @param {string} [settings.trigger=hover focus] The events to trigger the tooltip.
         * @param {string} [settings.placement=auto] The placement of the tooltip relative to the toggle.
         * @param {string} [settings.position=center] The position of the tooltip relative to the toggle.
         * @param {Boolean} [settings.fixed=false] Whether the tooltip position is fixed.
         * @param {number} [settings.spacing=2] The spacing between the tooltip and the toggle.
         * @param {number} [settings.minContact=false] The minimum amount of contact the tooltip must make with the toggle.
         * @returns {Tooltip} A new Tooltip object.
         */
        constructor(node, settings) {
            this._node = node;

            this._settings = Core.extend(
                {},
                Tooltip.defaults,
                dom.getDataset(this._node),
                settings
            );

            this._triggers = this._settings.trigger.split(' ');

            this._render();
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
            this._popper.destroy();

            dom.remove(this._tooltip);

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
                if (dom.getDataset(this._tooltip, 'animating')) {
                    dom.stop(this._tooltip);
                }

                if (!dom.isConnected(this._tooltip)) {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'hide.frost.tooltip')) {
                    return reject();
                }

                dom.setDataset(this._tooltip, 'animating', true);

                dom.fadeOut(this._tooltip, {
                    duration: this._settings.duration
                }).then(_ => {
                    dom.removeClass(this._tooltip, 'show');

                    dom.detach(this._tooltip);

                    dom.triggerEvent(this._node, 'hidden.frost.tooltip');

                    resolve();
                }).catch(reject).finally(_ =>
                    dom.removeDataset(this._tooltip, 'animating')
                );
            });
        }

        /**
         * Show the Tooltip.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        show() {
            return new Promise((resolve, reject) => {
                if (dom.getDataset(this._tooltip, 'animating')) {
                    dom.stop(this._tooltip);
                }

                if (dom.isConnected(this._tooltip)) {
                    return reject();
                }

                if (!DOM._triggerEvent(this._node, 'show.frost.tooltip')) {
                    return reject();
                }

                this._show();

                dom.setDataset(this._tooltip, 'animating', true);

                dom.addClass(this._tooltip, 'show');

                dom.fadeIn(this._tooltip, {
                    duration: this._settings.duration
                }).then(_ => {
                    dom.triggerEvent(this._node, 'shown.frost.tooltip');

                    resolve();
                }).catch(reject).finally(_ =>
                    dom.removeDataset(this._tooltip, 'animating')
                );
            });
        }

        /**
         * Toggle the Tooltip.
         * @returns {Promise} A new Promise that resolves when the animation has completed.
         */
        toggle() {
            return dom.isConnected(this._tooltip) ?
                this.hide() :
                this.show();
        }

        /**
         * Update the Tooltip position.
         */
        update() {
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
        duration: 100,
        enable: true,
        html: false,
        trigger: 'hover focus',
        sanitize: input => dom.sanitize(input),
        placement: 'auto',
        position: 'center',
        fixed: false,
        spacing: 2,
        minContact: false
    };

    // Auto-initialize Tooltip from data-toggle
    dom.addEventOnce(window, 'load', _ => {
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

                if (index) {
                    return;
                }

                if (!method) {
                    result = tooltip;
                } else {
                    result = tooltip[method](...args);
                }
            });

            return result;
        };
    }

    UI.Tooltip = Tooltip;


    /**
     * Tooltip Helpers
     */

    Object.assign(Tooltip.prototype, {

        /**
         * Attach events for the Tooltip.
         */
        _events() {
            this._hideEvent = _ => {
                if (!this._enabled || !dom.isConnected(this._tooltip)) {
                    return;
                }

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


            this._tooltipInner = dom.create('div', {
                class: this._settings.classes.tooltipInner
            });

            dom.append(this._tooltip, arrow);
            dom.append(this._tooltip, this._tooltipInner);

            this._popper = new Popper(
                this._tooltip,
                {
                    reference: this._node,
                    arrow: arrow,
                    placement: this._settings.placement,
                    position: this._settings.position,
                    fixed: this._settings.fixed,
                    spacing: this._settings.spacing,
                    minContact: this._settings.minContact
                }
            )
        },

        /**
         * Update the Tooltip and append to the DOM.
         */
        _show() {
            const title = dom.getAttribute(this._node, 'title') || this._settings.title;
            const method = this._settings.html ? 'setHTML' : 'setText';

            dom[method](
                this._tooltipInner,
                this._settings.html && this._settings.sanitize ?
                    this._settings.sanitize(title) :
                    title
            );

            if (this._container) {
                dom.append(this._container, this._tooltip);
            } else {
                dom.before(this._node, this._tooltip);
            }

            this._popper.update();
        }

    });

    return {
        UI
    };
});