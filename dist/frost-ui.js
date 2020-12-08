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
         * @param {number} [settings.duration=250] The duration of the animation.
         * @returns {Alert} A new Alert object.
         */
        constructor(node, settings) {
            this._node = node;

            this._settings = Core.extend(
                {},
                this.constructor.defaults,
                dom.getDataset(this._node),
                settings
            );

            dom.setData(this._node, 'alert', this);
        }

        /**
         * Destroy the Alert.
         */
        destroy() {
            dom.removeData(this._node, 'alert');
        }

        /**
         * Close the Alert.
         */
        close() {
            if (
                this._animating ||
                !dom.triggerOne(this._node, 'close.frost.alert')
            ) {
                return;
            }

            this._animating = true;

            dom.fadeOut(this._node, {
                duration: this._settings.duration
            }).then(_ => {
                dom.triggerEvent(this._node, 'closed.frost.alert');
                dom.remove(this._node);
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });
        }

        /**
         * Initialize an Alert.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Alert with.
         * @param {number} [settings.duration=250] The duration of the animation.
         * @returns {Alert} A new Alert object.
         */
        static init(node, settings) {
            return dom.hasData(node, 'alert') ?
                dom.getData(node, 'alert') :
                new this(node, settings);
        }

    }


    // Alert events
    dom.addEventDelegate(document, 'click.frost.alert', '[data-dismiss="alert"]', e => {
        e.preventDefault();

        const target = UI.getTarget(e.currentTarget, '.alert');
        const alert = Alert.init(target);
        alert.close();
    });


    // Alert default options
    Alert.defaults = {
        duration: 100
    };

    // Alert QuerySet method
    if (QuerySet) {
        QuerySet.prototype.alert = function(a, ...args) {
            let settings, method;

            if (Core.isObject(a)) {
                settings = a;
            } else if (Core.isString(a)) {
                method = a;
            }

            for (const node of this) {
                if (!Core.isElement(node)) {
                    continue;
                }

                const alert = Alert.init(node, settings);

                if (method) {
                    alert[method](...args);
                }
            }

            return this;
        };
    }

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

            this._settings = Core.extend(
                {},
                this.constructor.defaults,
                dom.getDataset(this._node),
                settings
            );

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
            dom.toggleClass(this._node, 'active');

            const pressed = dom.hasClass(this._node, 'active');
            dom.setAttribute('aria-pressed', pressed);
        }

        /**
         * Initialize a Button.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Button with.
         * @returns {Button} A new Button object.
         */
        static init(node, settings) {
            return dom.hasData(node, 'button') ?
                dom.getData(node, 'button') :
                new this(node, settings);
        }

    }


    // Button events
    dom.addEventDelegate(document, 'click.frost.button', '[data-toggle="button"]', e => {
        e.preventDefault();

        const button = Button.init(e.currentTarget);
        button.toggle();
    });


    // Button default settings
    Button.defaults = {};

    // Button QuerySet method
    if (QuerySet) {
        QuerySet.prototype.button = function(a, ...args) {
            let settings, method;

            if (Core.isObject(a)) {
                settings = a;
            } else if (Core.isString(a)) {
                method = a;
            }

            for (const node of this) {
                if (!Core.isElement(node)) {
                    continue;
                }

                const button = Button.init(node, settings);

                if (method) {
                    button[method](...args);
                }
            }

            return this;
        };
    }

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


    // Carousel events
    dom.addEventDelegate(document, 'click.frost.carousel', '.carousel-next, .carousel-prev, [data-slide], [data-slide-to]', e => {
        e.preventDefault();

        const target = UI.getTarget(e.currentTarget, '.carousel');
        const carousel = Carousel.init(target);
        const slideTo = dom.getDataset(e.currentTarget, 'slideTo');

        if (!Core.isUndefined(slideTo)) {
            carousel.show(slideTo);
        } else if (dom.hasClass(e.currentTarget, 'carousel-control-prev')) {
            carousel.prev();
        } else {
            carousel.next();
        }
    });


    /**
     * Carousel Helpers
     */

    Object.assign(Carousel.prototype, {

        /**
         * Attach events for the Carousel.
         */
        _events() {
            if (this._settings.keyboard) {
                console.log(this._node);
                dom.addEvent(this._node, 'keydown.frost.carousel', e => {
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
                dom.addEvent(this._node, 'mouseenter.frost.carousel', _ => {
                    this.pause();
                });

                dom.addEvent(this._node, 'mouseleave.frost.carousel', _ => {
                    this._setTimer();
                });
            }

            dom.addEvent(this._node, 'remove.frost.carousel', _ => {
                this.destroy();
            });
        },

        /**
         * Set a timer for the next Carousel cycle.
         */
        _setTimer() {
            if (this._timer) {
                return;
            }

            const interval = dom.getDataset(this._items[this._index], 'interval');

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

            if (!dom.triggerOne(this._node, 'slide.frost.carousel', eventData)) {
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
                const oldIndicator = dom.find('.active[data-slide-to]', this._node);
                const newIndicator = dom.find('[data-slide-to="' + this._index + '"]', this._node);
                dom.removeClass(oldIndicator, 'active');
                dom.addClass(newIndicator, 'active');
                dom.triggerEvent(this._node, 'slid.frost.carousel', eventData);

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


    // Carousel default options
    Carousel.defaults = {
        interval: 5000,
        transition: 500,
        keyboard: true,
        ride: false,
        pause: true,
        wrap: true
    };

    // Carousel init
    dom.addEventOnce(window, 'load', _ => {
        const nodes = dom.find('[data-ride="carousel"]');

        for (const node of nodes) {
            Carousel.init(node);
        }
    });

    // Carousel QuerySet method
    if (QuerySet) {
        QuerySet.prototype.carousel = function(a, ...args) {
            let settings, method;

            if (Core.isObject(a)) {
                settings = a;
            } else if (Core.isString(a)) {
                method = a;
            }

            for (const node of this) {
                if (!Core.isElement(node)) {
                    continue;
                }

                const carousel = Carousel.init(node, settings);

                if (method) {
                    carousel[method](...args);
                }
            }

            return this;
        };
    }

    UI.Carousel = Carousel;


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

            const id = this._node.getAttribute('id');
            this._triggers = dom.find(
                `[data-toggle="collapse"][data-target="#${id}"]`
            );
            console.log(this._triggers);

            this._settings = Core.extend(
                {},
                this.constructor.defaults,
                dom.getDataset(this._node),
                settings
            );

            if (this._settings.parent) {
                this._parent = dom.findOne(this._settings.parent);
            }

            dom.setData(this._node, 'collapse', this);
        }

        /**
         * Destroy the Collapse.
         */
        destroy() {
            dom.removeData(this._node, 'collapse');
        }

        /**
         * Hide the element.
         */
        hide() {
            if (
                this._animating ||
                !dom.hasClass(this._node, 'show') ||
                !dom.triggerOne(this._node, 'hide.frost.collapse')
            ) {
                return;
            }

            this._animating = true;
            dom.addClass(this._triggers, 'collapsed');

            dom.squeezeOut(this._node, {
                direction: this._settings.direction,
                duration: this._settings.duration
            }).then(_ => {
                dom.removeClass(this._node, 'show');
                dom.setAttribute(this._triggers, 'aria-expanded', false);
                dom.triggerEvent(this._node, 'hidden.frost.collapse');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });
        }

        /**
         * Show the element.
         */
        show() {
            if (
                this._animating ||
                dom.hasClass(this._node, 'show')
            ) {
                return;
            }

            const collapses = [];
            if (this._parent) {
                const siblings = dom.find('.collapse.show', this._parent);
                for (const sibling of siblings) {
                    const collapse = this.constructor.init(sibling);

                    if (this._parent !== collapse._parent) {
                        continue;
                    }

                    if (collapse._animating) {
                        return;
                    }

                    collapses.push(collapse);
                }
            }

            if (!dom.triggerOne(this._node, 'show.frost.collapse')) {
                return;
            }

            for (const collapse of collapses) {
                collapse.hide();
            }

            this._animating = true;
            dom.addClass(this._node, 'show');
            dom.removeClass(this._triggers, 'collapsed');

            dom.squeezeIn(this._node, {
                direction: this._settings.direction,
                duration: this._settings.duration
            }).then(_ => {
                dom.setAttribute(this._triggers, 'aria-expanded', true);
                dom.triggerEvent(this._node, 'shown.frost.collapse');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });
        }

        /**
         * Toggle the element.
         */
        toggle() {
            dom.hasClass(this._node, 'show') ?
                this.hide() :
                this.show();
        }

        /**
         * Initialize a Collapse.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Collapse with.
         * @param {string} [settings.direction=bottom] The direction to collapse the targets from/to.
         * @param {number} [settings.duration=300] The duration of the animation.
         * @returns {Collapse} A new Collapse object.
         */
        static init(node, settings) {
            return dom.hasData(node, 'collapse') ?
                dom.getData(node, 'collapse') :
                new this(node, settings);
        }

    }


    // Collapse events
    dom.addEventDelegate(document, 'click.frost.collapse', '[data-toggle="collapse"]', e => {
        e.preventDefault();

        const selector = UI.getTargetSelector(e.currentTarget);
        const targets = dom.find(selector);

        for (const target of targets) {
            const collapse = Collapse.init(target);
            collapse.toggle();
        }
    });


    // Collapse default options
    Collapse.defaults = {
        direction: 'bottom',
        duration: 250
    };

    // Collapse QuerySet method
    if (QuerySet) {
        QuerySet.prototype.collapse = function(a, ...args) {
            let options, method;

            if (Core.isObject(a)) {
                options = a;
            } else if (Core.isString(a)) {
                method = a;
            }

            for (const node of this) {
                if (!Core.isElement(node)) {
                    continue;
                }

                const collapse = Collapse.init(node, options);

                if (method) {
                    collapse[method](...args);
                }
            }

            return this;
        };
    }

    UI.Collapse = Collapse;


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
                this.constructor.defaults,
                dom.getDataset(this._node),
                settings
            );

            this._menuNode = dom.next(this._node, '.dropdown-menu').shift();

            if (this._settings.reference) {
                if (this._settings.reference === 'parent') {
                    this._referenceNode = dom.parent(this._node).shift();
                } else {
                    this._referenceNode = dom.findOne(this._settings.reference);
                }
            } else {
                this._referenceNode = this._node;
            }

            // Attach popper
            if (this._settings.display !== 'static' && dom.closest(this._node, '.navbar-nav').length) {
                this._settings.display = 'static';
            }

            if (this._settings.display === 'dynamic') {
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

            dom.addEvent(this._node, 'remove.frost.dropdown', _ => {
                this.destroy();
            });

            dom.setData(this._node, 'dropdown', this);
        }

        /**
         * Destroy the Dropdown.
         */
        destroy() {
            if (this._popper) {
                this._popper.destroy();
            }

            dom.removeEvent(this._node, 'keyup.frost.dropdown');
            dom.removeEvent(this._node, 'remove.frost.dropdown');
            dom.removeData(this._node, 'dropdown');
        }

        /**
         * Hide the Dropdown.
         */
        hide() {
            if (
                this._animating ||
                !dom.hasClass(this._menuNode, 'show') ||
                !dom.triggerOne(this._node, 'hide.frost.dropdown')
            ) {
                return;
            }

            this._animating = true;

            dom.fadeOut(this._menuNode, {
                duration: this._settings.duration
            }).then(_ => {
                dom.removeClass(this._menuNode, 'show');
                dom.setAttribute(this._node, 'aria-expanded', false);
                dom.triggerEvent(this._node, 'hidden.frost.dropdown');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });
        }

        /**
         * Show the Dropdown.
         */
        show() {
            if (
                this._animating ||
                dom.hasClass(this._menuNode, 'show') ||
                !dom.triggerOne(this._node, 'show.frost.dropdown')
            ) {
                return;
            }

            this._animating = true;
            dom.addClass(this._menuNode, 'show');

            dom.fadeIn(this._menuNode, {
                duration: this._settings.duration
            }).then(_ => {
                dom.setAttribute(this._node, 'aria-expanded', true);
                dom.triggerEvent(this._node, 'shown.frost.dropdown');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });
        }

        /**
         * Toggle the Dropdown.
         */
        toggle() {
            dom.hasClass(this._menuNode, 'show') ?
                this.hide() :
                this.show();
        }

        /**
         * Auto-hide all visible dropdowns.
         * @param {HTMLElement} [target] The target node.
         * @param {Boolean} [noHideSelf=false] Whether to force prevent hiding self.
         */
        static autoHide(target, noHideSelf = false) {
            if (!noHideSelf) {
                noHideSelf = dom.is(target, 'form');
            }

            const menus = dom.find('.dropdown-menu.show');

            for (const menu of menus) {
                if (
                    target &&
                    dom.hasDescendent(menu, target) &&
                    (
                        noHideSelf ||
                        dom.closest(target, 'form', menu).length
                    )
                ) {
                    continue;
                }

                const trigger = dom.prev(menu).shift();

                if (trigger === target) {
                    continue;
                }

                const dropdown = this.init(trigger);
                dropdown.hide();
            }
        }

        /**
         * Initialize a Dropdown.
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
        static init(node, settings) {
            return dom.hasData(node, 'dropdown') ?
                dom.getData(node, 'dropdown') :
                new this(node, settings);
        }

    }


    // Dropdown events
    dom.addEventDelegate(document, 'click.frost.dropdown keyup.frost.dropdown', '[data-toggle="dropdown"]', e => {
        if (e.key && e.key !== ' ') {
            return;
        }

        e.preventDefault();

        const dropdown = Dropdown.init(e.currentTarget);
        dropdown.toggle();
    });

    dom.addEventDelegate(document, 'keydown.frost.dropdown', '[data-toggle="dropdown"]', e => {
        switch (e.key) {
            case 'ArrowDown':
            case 'ArrowUp':
                e.preventDefault();

                const node = e.currentTarget;
                const dropdown = Dropdown.init(node);

                if (!dom.hasClass(dropdown._menuNode, 'show')) {
                    dropdown.show();
                }

                const focusNode = dom.findOne('.dropdown-item:not([tabindex="-1"])', dropdown._menuNode);
                dom.focus(focusNode);
                break;
        }
    });

    dom.addEventDelegate(document, 'keydown.frost.dropdown', '.dropdown-menu.show .dropdown-item', e => {
        let focusNode;

        switch (e.key) {
            case 'ArrowDown':
                focusNode = dom.nextAll(e.currentTarget, '.dropdown-item:not([tabindex="-1"])').shift();
                break;
            case 'ArrowUp':
                focusNode = dom.prevAll(e.currentTarget, '.dropdown-item:not([tabindex="-1"])').pop();
                break;
            default:
                return;
        }

        e.preventDefault();

        dom.focus(focusNode);
    });

    dom.addEvent(document, 'click.frost.dropdown', e => {
        Dropdown.autoHide(e.target);
    });

    dom.addEvent(document, 'keyup.frost.dropdown', e => {
        switch (e.key) {
            case 'Tab':
                Dropdown.autoHide(e.target, true);
                break;
            case 'Escape':
                Dropdown.autoHide();
                break;
        }
    });


    // Dropdown default options
    Dropdown.defaults = {
        display: 'dynamic',
        duration: 100,
        placement: 'bottom',
        position: 'start',
        fixed: false,
        spacing: 3,
        minContact: false
    };

    // Dropdown QuerySet method
    if (QuerySet) {
        QuerySet.prototype.dropdown = function(a, ...args) {
            let settings, method;

            if (Core.isObject(a)) {
                settings = a;
            } else if (Core.isString(a)) {
                method = a;
            }

            for (const node of this) {
                if (!Core.isElement(node)) {
                    continue;
                }

                const dropdown = Dropdown.init(node, settings);

                if (method) {
                    dropdown[method](...args);
                }
            }

            return this;
        };
    }

    UI.Dropdown = Dropdown;


    /**
     * Get a target from a node.
     * @param {HTMLElement} node The input node.
     * @param {string} [closestSelector] The default closest selector.
     * @return {HTMLElement} The target node.
     */
    UI.getTarget = (node, closestSelector) => {
        const selector = UI.getTargetSelector(node);

        let target;

        if (selector && selector !== '#') {
            target = dom.findOne(selector);
        } else if (closestSelector) {
            target = dom.closest(node, closestSelector).shift();
        }

        if (!target) {
            throw new Error('Target not found');
        }

        return target;
    };

    /**
     * Get the target selector from a node.
     * @param {HTMLElement} node The input node.
     * @return {string} The target selector.
     */
    UI.getTargetSelector = node =>
        dom.getDataset(node, 'target') || dom.getAttribute(node, 'href');


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
                this.constructor.defaults,
                dom.getDataset(node),
                settings
            );

            this._dialog = dom.child(this._node, '.modal-dialog').shift();

            if (dom.hasClass(this._node, 'modal-left')) {
                this._direction = 'left';
            } else if (dom.hasClass(this._node, 'modal-right')) {
                this._direction = 'right';
            } else {
                this._direction = 'top';
            }

            if (this._settings.show) {
                this.show();
            }

            dom.setData(this._node, 'modal', this);
        }

        /**
         * Destroy the Modal.
         */
        destroy() {
            dom.removeData(this._node, 'modal');
        }

        /**
         * Hide the Modal.
         */
        hide() {
            if (
                this._animating ||
                !dom.hasClass(this._node, 'show') ||
                !dom.triggerOne(this._node, 'hide.frost.modal')
            ) {
                return;
            }

            this._animating = true;

            Promise.all([
                dom.fadeOut(this._dialog, {
                    duration: this._settings.duration
                }),
                dom.dropOut(this._dialog, {
                    duration: this._settings.duration,
                    direction: this._direction
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

                if (this._activeTarget) {
                    dom.focus(this._activeTarget);
                }

                dom.triggerEvent(this._node, 'hidden.frost.modal');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });
        }

        /**
         * Show the Modal.
         * @param {HTMLElement} [activeTarget] The active target.
         */
        show(activeTarget) {
            if (
                this._animating ||
                dom.hasClass(this._node, 'show') ||
                !dom.triggerOne(this._node, 'show.frost.modal')
            ) {
                return;
            }

            if (this._settings.backdrop) {
                this._backdrop = dom.create('div', {
                    class: 'modal-backdrop'
                });
                dom.append(document.body, this._backdrop);
            }

            this._activeTarget = activeTarget;
            this._animating = true;

            dom.addClass(this._node, 'show');
            dom.addClass(document.body, 'modal-open');

            Promise.all([
                dom.fadeIn(this._dialog, {
                    duration: this._settings.duration
                }),
                dom.dropIn(this._dialog, {
                    duration: this._settings.duration,
                    direction: this._direction
                }),
                dom.fadeIn(this._backdrop, {
                    duration: this._settings.duration
                })
            ]).then(_ => {
                dom.removeAttribute(this._node, 'aria-hidden');
                dom.setAttribute(this._node, 'aria-modal', true);

                if (this._settings.focus) {
                    dom.focus(this._node);
                }

                dom.triggerEvent(this._node, 'shown.frost.modal');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });
        }

        /**
         * Toggle the Modal.
         */
        toggle() {
            dom.hasClass(this._node, 'show') ?
                this.hide() :
                this.show();
        }

        /**
         * Initialize a Modal.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Modal with.
         * @param {number} [settings.duration=250] The duration of the animation.
         * @param {Boolean} [settings.backdrop=true] Whether to display a backdrop for the modal.
         * @param {Boolean} [settings.focus=true] Whether to set focus on the modal when shown.
         * @param {Boolean} [settings.show=true] Whether to show the modal on initialization.
         * @param {Boolean} [settings.keyboard=true] Whether to close the modal when the escape key is pressed.
         * @returns {Modal} A new Modal object.
         */
        static init(node, settings) {
            return dom.hasData(node, 'modal') ?
                dom.getData(node, 'modal') :
                new this(node, settings);
        }

    }


    // Modal events
    dom.addEventDelegate(document, 'click.frost.modal', '[data-toggle="modal"]', e => {
        e.preventDefault();

        const target = UI.getTarget(e.currentTarget, '.modal');
        const modal = Modal.init(target);
        modal.show(e.currentTarget);
    });

    dom.addEventDelegate(document, 'click.frost.modal', '[data-dismiss="modal"]', e => {
        e.preventDefault();

        const target = UI.getTarget(e.currentTarget, '.modal');
        const modal = Modal.init(target);
        modal.hide();
    });

    dom.addEvent(document, 'click.frost.modal', e => {
        const backdrop = dom.findOne('.modal-backdrop');

        if (!backdrop) {
            return;
        }

        const targets = dom.find('.modal.show');

        for (const target of targets) {
            if (target !== e.target && dom.hasDescendent(target, e.target)) {
                continue;
            }

            const modal = Modal.init(target);

            if (modal._settings.backdrop === 'static') {
                continue;
            }

            modal.hide();
        }
    });

    dom.addEvent(document, 'keyup.frost.modal', e => {
        if (e.key !== 'Escape') {
            return;
        }

        const targets = dom.find('.modal.show');

        for (const target of targets) {
            const modal = Modal.init(target);

            if (!modal._settings.keyboard) {
                continue;
            }

            modal.hide();
        }
    });


    // Modal default options
    Modal.defaults = {
        duration: 250,
        backdrop: true,
        focus: true,
        show: false,
        keyboard: true
    };

    // Modal QuerySet method
    if (QuerySet) {
        QuerySet.prototype.modal = function(a, ...args) {
            let settings, method;

            if (Core.isObject(a)) {
                settings = a;
            } else if (Core.isString(a)) {
                method = a;
            }

            for (const node of this) {
                if (!Core.isElement(node)) {
                    continue;
                }

                const modal = Modal.init(node, settings);

                if (method) {
                    modal[method](...args);
                }
            }

            return this;
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
         * @param {string} [settings.template] The HTML template for the popover.
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
                this.constructor.defaults,
                dom.getDataset(this._node),
                settings
            );

            this._modal = dom.closest(this._node, '.modal').shift();

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
            if (this._popper) {
                this._popper.destroy();
            }

            dom.remove(this._popover);

            if (this._triggers.includes('hover')) {
                dom.removeEvent(this._node, 'mouseover.frost.popover');
                dom.removeEvent(this._node, 'mouseout.frost.popover');
            }

            if (this._triggers.includes('focus')) {
                dom.removeEvent(this._node, 'focus.frost.popover');
                dom.removeEvent(this._node, 'blur.frost.popover');
            }

            if (this._triggers.includes('click')) {
                dom.removeEvent(this._node, 'click.frost.popover');
            }

            if (this._modal) {
                dom.removeEvent(this._modal, 'hide.frost.modal', this._hideModalEvent);
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
         */
        hide() {
            if (this._animating) {
                dom.stop(this._popover);
            }

            if (
                !dom.isConnected(this._popover) ||
                !dom.triggerOne(this._node, 'hide.frost.popover')
            ) {
                return;
            }

            this._animating = true;

            dom.fadeOut(this._popover, {
                duration: this._settings.duration
            }).then(_ => {
                this._popper.destroy();
                dom.removeClass(this._popover, 'show');
                dom.detach(this._popover);
                dom.triggerEvent(this._node, 'hidden.frost.popover');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });
        }

        /**
         * Show the Popover.
         */
        show() {
            if (this._animating) {
                dom.stop(this._popover);
            }

            if (
                dom.isConnected(this._popover) ||
                !dom.triggerOne(this._node, 'show.frost.popover')
            ) {
                return;
            }

            this._show();

            this._animating = true;
            dom.addClass(this._popover, 'show');

            dom.fadeIn(this._popover, {
                duration: this._settings.duration
            }).then(_ => {
                dom.triggerEvent(this._node, 'shown.frost.popover');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });
        }

        /**
         * Toggle the Popover.
         */
        toggle() {
            dom.isConnected(this._popover) ?
                this.hide() :
                this.show();
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
         * Initialize a Popover.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Popover with.
         * @param {string} [settings.template] The HTML template for the popover.
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
        static init(node, settings) {
            return dom.hasData(node, 'popover') ?
                dom.getData(node, 'popover') :
                new this(node, settings);
        }

    }


    /**
     * Popover Helpers
     */

    Object.assign(Popover.prototype, {

        /**
         * Attach events for the Popover.
         */
        _events() {
            if (this._triggers.includes('hover')) {
                dom.addEvent(this._node, 'mouseover.frost.popover', _ => {
                    if (!this._enabled) {
                        return;
                    }

                    this.show();
                });

                dom.addEvent(this._node, 'mouseout.frost.popover', _ => {
                    if (!this._enabled) {
                        return;
                    }

                    this.hide();
                });
            }

            if (this._triggers.includes('focus')) {
                dom.addEvent(this._node, 'focus.frost.popover', _ => {
                    if (!this._enabled) {
                        return;
                    }

                    this.show();
                });

                dom.addEvent(this._node, 'blur.frost.popover', _ => {
                    if (!this._enabled) {
                        return;
                    }

                    this.hide();
                });
            }

            if (this._triggers.includes('click')) {
                dom.addEvent(this._node, 'click.frost.popover', e => {
                    e.preventDefault();

                    if (!this._enabled) {
                        return;
                    }

                    this.toggle();
                });
            }

            if (this._modal) {
                this._hideModalEvent = _ => {
                    this.hide();
                };

                dom.addEvent(this._modal, 'hide.frost.modal', this._hideModalEvent);
            }
        },

        /**
         * Render the Popover element.
         */
        _render() {
            this._popover = dom.parseHTML(this._settings.template).shift();
            if (this._settings.customClass) {
                dom.addClass(this._popover, this._settings.customClass);
            }
            this._arrow = dom.find('.popover-arrow', this._popover);
            this._popoverHeader = dom.find('.popover-header', this._popover);
            this._popoverBody = dom.find('.popover-body', this._popover);
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

            this._popper = new Popper(
                this._popover,
                {
                    reference: this._node,
                    arrow: this._arrow,
                    placement: this._settings.placement,
                    position: this._settings.position,
                    fixed: this._settings.fixed,
                    spacing: this._settings.spacing,
                    minContact: this._settings.minContact
                }
            );
        }

    });


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
        sanitize: input => dom.sanitize(input),
        trigger: 'click',
        placement: 'auto',
        position: 'center',
        fixed: false,
        spacing: 3,
        minContact: false
    };

    // Add Popover QuerySet method
    if (QuerySet) {
        QuerySet.prototype.popover = function(a, ...args) {
            let settings, method;

            if (Core.isObject(a)) {
                settings = a;
            } else if (Core.isString(a)) {
                method = a;
            }

            for (const node of this) {
                if (!Core.isElement(node)) {
                    continue;
                }

                const popover = Popover.init(node, settings);

                if (method) {
                    popover[method](...args);
                }
            }

            return this;
        };
    }

    UI.Popover = Popover;


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
         * @param {function} [settings.beforeUpdate] The callback to run before updating the Popper.
         * @param {function} [settings.afterUpdate] The callback to run after updating the Popper.
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
                this.constructor.defaults,
                dom.getDataset(this._node),
                settings
            );

            this._scrollParent = this.constructor.getScrollParent(this._node);

            dom.setStyle(this._node, {
                margin: 0,
                position: 'absolute',
                top: 0,
                right: 'initial',
                bottom: 'initial',
                left: 0
            });

            this._resetStyle = {};
            if (this._settings.useGpu) {
                this._resetStyle.transform = ''
            } else {
                this._resetStyle.marginLeft = ''
                this._resetStyle.marginTop = '';
            }

            PopperSet.add(this);

            if (this._scrollParent) {
                PopperSet.addOverflow(this._scrollParent, this);
            }

            dom.addEvent(this._node, 'remove.frost.popper', _ => {
                this.destroy();
            });

            window.requestAnimationFrame(_ => {
                this.update();
            });

            dom.setData(this._node, 'popper', this);
        }

        /**
         * Destroy the Popper.
         */
        destroy() {
            PopperSet.remove(this);

            if (this._scrollParent) {
                PopperSet.removeOverflow(this._scrollParent, this);
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

            // reset position
            dom.setStyle(this._node, this._resetStyle);

            if (this._settings.beforeUpdate) {
                this._settings.beforeUpdate(this._node, this._settings.reference);
            }

            // calculate boxes
            const nodeBox = dom.rect(this._node, true);
            const referenceBox = dom.rect(this._settings.reference, true);
            const windowBox = this.constructor.windowContainer();

            // check object could be seen
            if (this.constructor.isNodeHidden(nodeBox, referenceBox, windowBox, this._settings.spacing)) {
                return;
            }

            const scrollBox = this._scrollParent ?
                dom.rect(this._scrollParent, true) :
                null;

            const containerBox = this._settings.container ?
                dom.rect(this._settings.container, true) :
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
                this.constructor.getPopperPlacement(
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
                this.constructor.getPopperPosition(
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
            const relativeParent = this.constructor.getRelativeParent(this._node);
            const relativeBox = relativeParent ?
                dom.rect(relativeParent, true) :
                null;

            if (relativeBox) {
                offset.x -= Math.round(relativeBox.x);
                offset.y -= Math.round(relativeBox.y);
            }

            // offset for placement
            this.constructor.adjustPlacement(offset, nodeBox, referenceBox, placement, this._settings.spacing);

            // offset for position
            this.constructor.adjustPosition(offset, nodeBox, referenceBox, placement, position);

            // compensate for margins
            offset.x -= parseInt(dom.css(this._node, 'margin-left'));
            offset.y -= parseInt(dom.css(this._node, 'margin-top'));

            // compensate for borders

            // corrective positioning
            this.constructor.adjustConstrain(offset, nodeBox, referenceBox, minimumBox, relativeBox, placement, this._settings.minContact);

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
                const newNodeBox = dom.rect(this._node, true);
                this._updateArrow(newNodeBox, referenceBox, placement, position);
            }

            if (this._settings.afterUpdate) {
                this._settings.afterUpdate(this._node, this._settings.reference, placement, position);
            }
        }

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

            const arrowBox = dom.rect(this._settings.arrow, true);

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

    }


    /**
     * PopperSet Class
     * @class
     */
    class PopperSet {

        /**
         * Add a Popper to the set.
         * @param {Popper} popper The popper to add.
         */
        static add(popper) {
            this._poppers.push(popper);

            if (this._running) {
                return;
            }

            dom.addEvent(
                window,
                'resize.frost.popper scroll.frost.popper',
                DOM.debounce(_ => {
                    for (const popper of this._poppers) {
                        popper.update();
                    }
                })
            );
            this._running = true;
        }

        /**
         * Add a Popper to a scrolling parent set.
         * @param {HTMLElement} scrollParent The scrolling container element.
         * @param {Popper} popper The popper to add.
         */
        static addOverflow(scrollParent, popper) {
            if (!this._popperOverflows.has(scrollParent)) {
                this._popperOverflows.set(scrollParent, []);
                dom.addEvent(
                    scrollParent,
                    'scroll.frost.popper',
                    DOM.debounce(_ => {
                        for (const popper of this._popperOverflows.get(scrollParent)) {
                            popper.update();
                        }
                    })
                );
            }

            this._popperOverflows.get(scrollParent).push(popper);
        }

        /**
         * Remove a Popper from the set.
         * @param {Popper} popper The popper to remove.
         */
        static remove(popper) {
            this._poppers = this._poppers.filter(oldPopper => oldPopper !== popper);

            if (this._poppers.length) {
                return;
            }

            dom.removeEvent(window, 'resize.frost.popper scroll.frost.popper');
            this._running = false;
        }

        /**
         * Remove a Popper from a scrolling parent set.
         * @param {HTMLElement} scrollParent The scrolling container element.
         * @param {Popper} popper The popper to remove.
         */
        static removeOverflow(scrollParent, popper) {
            if (!this._popperOverflows.has(scrollParent)) {
                return;
            }

            const poppers = this._popperOverflows.get(scrollParent).filter(oldPopper => oldPopper !== popper);

            if (poppers.length) {
                this._popperOverflows.set(scrollParent, poppers);
                return;
            }

            this._popperOverflows.delete(scrollParent);
            dom.removeEvent(scrollParent, 'scroll.frost.popper');
        }

    }


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
         * Adjust the offset for the position.
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
                    !!['overflow', 'overflowX', 'overflowY'].find(overflow =>
                        !!['auto', 'scroll'].find(value =>
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
         * @returns {object} The computed bounding rectangle of the window.
         */
        windowContainer() {
            const scrollX = dom.getScrollX(window);
            const scrollY = dom.getScrollY(window);
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
        useGpu: true
    };

    PopperSet._poppers = [];
    PopperSet._popperOverflows = new Map;

    UI.Popper = Popper;
    UI.PopperSet = PopperSet;


    // Ripple events
    dom.addEventDelegate(document, 'mousedown.frost.ripple', '.ripple', e => {
        const pos = dom.position(e.currentTarget, true);

        UI.ripple(e.currentTarget, e.pageX - pos.x, e.pageY - pos.y);
    });


    /**
     * Create a ripple effect on a node.
     * @param {HTMLElement} node The input node.
     * @param {number} x The x position to start the ripple from.
     * @param {number} y The y position to start the ripple from.
     * @param {number} [duration=500] The duration of the ripple.
     */
    UI.ripple = (node, x, y, duration = 500) => {
        const width = dom.width(node);
        const height = dom.height(node);
        const scaleMultiple = Math.max(width, height) * 6;

        const ripple = dom.create('span', {
            class: 'ripple-effect',
            style: {
                left: x,
                top: y
            }
        });
        dom.append(node, ripple);

        dom.animate(
            ripple,
            (node, progress) => {
                dom.setStyle(node, {
                    transform: 'scale(' + Math.floor(progress * scaleMultiple) + ')',
                    opacity: 1 - Math.pow(progress, 2)
                });
            },
            {
                duration
            }
        ).finally(_ => {
            dom.remove(ripple);
        })
    };


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
                this.constructor.defaults,
                dom.getDataset(this._node),
                settings
            );

            const selector = UI.getTargetSelector(this._node);
            this._target = dom.findOne(selector);
            this._siblings = dom.siblings(this._node);

            dom.setData(this._node, 'tab', this);
        }

        /**
         * Destroy the Tab.
         */
        destroy() {
            dom.removeData(this._node, 'tab');
        }

        /**
         * Hide the current Tab.
         */
        hide() {
            if (
                this._animating ||
                !dom.hasClass(this._target, 'active') ||
                !dom.triggerOne(this._node, 'hide.frost.tab')
            ) {
                return;
            }

            this._animating = true;

            dom.fadeOut(this._target, {
                duration: this._settings.duration
            }).then(_ => {
                dom.removeClass(this._target, 'active');
                dom.removeClass(this._node, 'active');
                dom.setAttribute(this._node, 'aria-selected', false);
                dom.triggerEvent(this._node, 'hidden.frost.tab');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });
        }

        /**
         * Hide any active Tabs, and show the current Tab.
         */
        show() {
            if (
                this._animating ||
                dom.hasClass(this._target, 'active') ||
                !dom.triggerOne(this._node, 'show.frost.tab')
            ) {
                return;
            }

            const active = this._siblings.find(sibling =>
                dom.hasClass(sibling, 'active')
            );

            let activeTab;
            if (active) {
                activeTab = this.constructor.init(active);
                if (activeTab._animating) {
                    return;
                }
            }

            if (!dom.triggerOne(this._node, 'show.frost.tab')) {
                return;
            }

            const show = _ => {
                this._animating = true;
                dom.addClass(this._target, 'active');
                dom.addClass(this._node, 'active');

                dom.fadeIn(this._target, {
                    duration: this._settings.duration
                }).then(_ => {
                    dom.setAttribute(this._node, 'aria-selected', true);
                    dom.triggerEvent(this._node, 'shown.frost.tab');
                }).catch(_ => { }).finally(_ => {
                    this._animating = false;
                });
            };

            if (!activeTab) {
                return show();
            }

            if (!dom.triggerOne(active, 'hide.frost.tab')) {
                return;
            }

            dom.addEventOnce(active, 'hidden.frost.tab', _ => {
                show();
            });

            activeTab.hide();
        }

        /**
         * Initialize a Tab.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Tab with.
         * @param {number} [settings.duration=100] The duration of the animation.
         * @returns {Tab} A new Tab object.
         */
        static init(node, settings) {
            return dom.hasData(node, 'tab') ?
                dom.getData(node, 'tab') :
                new this(node, settings);
        }

    }


    // Tab default options
    Tab.defaults = {
        duration: 100
    };

    // Tab events
    dom.addEventDelegate(document, 'click.frost.tab', '[data-toggle="tab"]', e => {
        e.preventDefault();

        const tab = Tab.init(e.currentTarget);
        tab.show();
    });

    // Tab QuerySet method
    if (QuerySet) {
        QuerySet.prototype.tab = function(a, ...args) {
            let settings, method;

            if (Core.isObject(a)) {
                settings = a;
            } else if (Core.isString(a)) {
                method = a;
            }

            for (const node of this) {
                if (!Core.isElement(node)) {
                    continue;
                }

                const tab = Tab.init(node, settings);

                if (method) {
                    tab[method](...args);
                }
            }

            return this;
        };
    }

    UI.Tab = Tab;


    // Text expand events
    dom.addEventDelegate(document, 'input', '.text-expand', e => {
        const textArea = e.currentTarget;

        dom.setStyle(textArea, 'height', 'inherit');

        const borderTop = dom.css(textArea, 'borderTop');
        const borderBottom = dom.css(textArea, 'borderBottom');

        const height = dom.scrollHeight(textArea) + parseInt(borderTop) + parseInt(borderBottom);

        dom.setStyle(textArea, 'height', height);
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
                this.constructor.defaults,
                dom.getDataset(this._node),
                settings
            );

            if (this._settings.autohide) {
                setTimeout(
                    _ => this.hide(),
                    this._settings.delay
                );
            }

            dom.setData(this._node, 'toast', this);
        }

        /**
         * Destroy the Toast.
         */
        destroy() {
            dom.removeData(this._node, 'toast');
        }

        /**
         * Hide the Toast.
         */
        hide() {
            if (
                this._animating ||
                !dom.isVisible(this._node) ||
                !dom.triggerOne(this._node, 'hide.frost.toast')
            ) {
                return;
            }

            this._animating = true;

            dom.fadeOut(this._node, {
                duration: this._settings.duration
            }).then(_ => {
                dom.hide(this._node);
                dom.removeClass(this._node, 'show');
                dom.triggerEvent(this._node, 'hidden.frost.toast');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });
        }

        /**
         * Show the Toast.
         */
        show() {
            if (
                this._animating ||
                dom.isVisible(this._node) ||
                !dom.triggerOne(this._node, 'show.frost.toast')
            ) {
                return;
            }

            this._animating = true;
            dom.show(this._node);
            dom.addClass(this._node, 'show');

            dom.fadeIn(this._node, {
                duration: this._settings.duration
            }).then(_ => {
                dom.triggerEvent(this._node, 'shown.frost.toast');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });
        }

        /**
         * Initialize a Toast.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Toast with.
         * @param {Boolean} [autohide=true] Whether to hide the toast after initialization.
         * @param {number} [settings.delay=5000] The duration to wait before hiding the toast.
         * @param {number} [settings.duration=100] The duration of the animation.
         * @returns {Toast} A new Toast object.
         */
        static init(node, settings) {
            return dom.hasData(node, 'toast') ?
                dom.getData(node, 'toast') :
                new this(node, settings);
        }

    }


    // Toast default options
    Toast.defaults = {
        autohide: true,
        delay: 5000,
        duration: 100
    };

    // Auto-initialize Toast from data-toggle
    dom.addEventDelegate(document, 'click.frost.toast', '[data-dismiss="toast"]', e => {
        e.preventDefault();

        const target = UI.getTarget(e.currentTarget, '.toast');
        const toast = Toast.init(target, { autohide: false });
        toast.hide();
    });

    // Toast QuerySet method
    if (QuerySet) {
        QuerySet.prototype.toast = function(a, ...args) {
            let settings, method;

            if (Core.isObject(a)) {
                settings = a;
            } else if (Core.isString(a)) {
                method = a;
            }

            for (const node of this) {
                if (!Core.isElement(node)) {
                    continue;
                }

                const toast = Toast.init(node, settings);

                if (method) {
                    toast[method](...args);
                }
            }

            return this;
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
         * @param {string} [settings.template] The HTML template for the tooltip.
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
                this.constructor.defaults,
                dom.getDataset(this._node),
                settings
            );

            this._modal = dom.closest(this._node, '.modal').shift();

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
            if (this._popper) {
                this._popper.destroy();
            }

            dom.remove(this._tooltip);

            if (this._triggers.includes('hover')) {
                dom.removeEvent(this._node, 'mouseover.frost.tooltip');
                dom.removeEvent(this._node, 'mouseout.frost.tooltip');
            }

            if (this._triggers.includes('focus')) {
                dom.removeEvent(this._node, 'focus.frost.tooltip');
                dom.removeEvent(this._node, 'blur.frost.tooltip');
            }

            if (this._triggers.includes('click')) {
                dom.removeEvent(this._node, 'click.frost.tooltip');
            }

            if (this._modal) {
                dom.removeEvent(this._modal, 'hide.frost.modal', this._hideModalEvent);
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
         */
        hide() {
            if (this._animating) {
                dom.stop(this._tooltip);
            }

            if (
                !dom.isConnected(this._tooltip) ||
                !dom.triggerOne(this._node, 'hide.frost.tooltip')
            ) {
                return;
            }

            this._animating = true;

            dom.fadeOut(this._tooltip, {
                duration: this._settings.duration
            }).then(_ => {
                this._popper.destroy();
                dom.removeClass(this._tooltip, 'show');
                dom.detach(this._tooltip);
                dom.triggerEvent(this._node, 'hidden.frost.tooltip');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });
        }

        /**
         * Show the Tooltip.
         */
        show() {
            if (this._animating) {
                dom.stop(this._tooltip);
            }

            if (
                dom.isConnected(this._tooltip) ||
                !dom.triggerOne(this._node, 'show.frost.tooltip')
            ) {
                return;
            }

            this._show();

            this._animating = true;
            dom.addClass(this._tooltip, 'show');

            dom.fadeIn(this._tooltip, {
                duration: this._settings.duration
            }).then(_ => {
                dom.triggerEvent(this._node, 'shown.frost.tooltip');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });
        }

        /**
         * Toggle the Tooltip.
         */
        toggle() {
            dom.isConnected(this._tooltip) ?
                this.hide() :
                this.show();
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
         * Initialize a Tooltip.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Tooltip with.
         * @param {string} [settings.template] The HTML template for the tooltip.
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
        static init(node, settings) {
            return dom.hasData(node, 'tooltip') ?
                dom.getData(node, 'tooltip') :
                new this(node, settings);
        }

    }


    /**
     * Tooltip Helpers
     */

    Object.assign(Tooltip.prototype, {

        /**
         * Attach events for the Tooltip.
         */
        _events() {
            if (this._triggers.includes('hover')) {
                dom.addEvent(this._node, 'mouseover.frost.popover', _ => {
                    if (!this._enabled) {
                        return;
                    }

                    this.show();
                });

                dom.addEvent(this._node, 'mouseout.frost.popover', _ => {
                    if (!this._enabled) {
                        return;
                    }

                    this.hide();
                });
            }

            if (this._triggers.includes('focus')) {
                dom.addEvent(this._node, 'focus.frost.popover', _ => {
                    if (!this._enabled) {
                        return;
                    }

                    this.show();
                });

                dom.addEvent(this._node, 'blur.frost.popover', _ => {
                    if (!this._enabled) {
                        return;
                    }

                    this.hide();
                });
            }

            if (this._triggers.includes('click')) {
                dom.addEvent(this._node, 'click.frost.popover', e => {
                    e.preventDefault();

                    if (!this._enabled) {
                        return;
                    }

                    this.toggle();
                });
            }

            if (this._modal) {
                this._hideModalEvent = _ => {
                    this.hide();
                };

                dom.addEvent(this._modal, 'hide.frost.modal', this._hideModalEvent);
            }
        },

        /**
         * Render the Tooltip element.
         */
        _render() {
            this._tooltip = dom.parseHTML(this._settings.template).shift();
            if (this._settings.customClass) {
                dom.addClass(this._tooltip, this._settings.customClass);
            }
            this._arrow = dom.find('.tooltip-arrow', this._tooltip);
            this._tooltipInner = dom.find('.tooltip-inner', this._tooltip);
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

            this._popper = new Popper(
                this._tooltip,
                {
                    reference: this._node,
                    arrow: this._arrow,
                    placement: this._settings.placement,
                    position: this._settings.position,
                    fixed: this._settings.fixed,
                    spacing: this._settings.spacing,
                    minContact: this._settings.minContact
                }
            );
        }

    });


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
        sanitize: input => dom.sanitize(input),
        placement: 'auto',
        position: 'center',
        fixed: false,
        spacing: 2,
        minContact: false
    };

    // Tooltip QuerySet method
    if (QuerySet) {
        QuerySet.prototype.tooltip = function(a, ...args) {
            let settings, method;

            if (Core.isObject(a)) {
                settings = a;
            } else if (Core.isString(a)) {
                method = a;
            }

            for (const node of this) {
                if (!Core.isElement(node)) {
                    continue;
                }

                const tooltip = Tooltip.init(node, settings);

                if (method) {
                    tooltip[method](...args);
                }
            }

            return this;
        };
    }

    UI.Tooltip = Tooltip;

    return {
        UI
    };
});