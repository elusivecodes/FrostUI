/**
 * FrostUI v1.2.8
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
     * BaseComponent Class
     * @class
     */
    class BaseComponent {

        /**
         * New BaseComponent constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the BaseComponent with.
         * @returns {BaseComponent} A new BaseComponent object.
         */
        constructor(node, settings) {
            this._node = node;

            this._settings = Core.extend(
                {},
                this.constructor.defaults,
                UI.getDataset(this._node),
                settings
            );

            dom.addEvent(this._node, this.constructor.REMOVE_EVENT, _ => {
                this.dispose();
            });

            dom.setData(this._node, this.constructor.DATA_KEY, this);
        }

        /**
         * Dispose the BaseComponent.
         */
        dispose() {
            dom.removeEvent(this._node, this.constructor.REMOVE_EVENT);
            dom.removeData(this._node, this.constructor.DATA_KEY);
            this._node = null;
            this._settings = null;
        }

        /**
         * Initialize a BaseComponent.
         * @param {HTMLElement} node The input node.
         * @returns {BaseComponent} A new BaseComponent object.
         */
        static init(node, ...args) {
            return dom.hasData(node, this.DATA_KEY) ?
                dom.getData(node, this.DATA_KEY) :
                new this(node, ...args);
        }

    }

    UI.BaseComponent = BaseComponent;


    /**
     * Get normalized UI data from a node.
     * @param {HTMLElement} node The input node.
     * @returns {object} The normalized data.
     */
    UI.getDataset = node => {
        const dataset = dom.getDataset(node);

        const uiDataset = {};

        for (const key in dataset) {
            if (/ui[A-Z]/.test(key)) {
                const realKey = key.slice(2, 3).toLowerCase() + key.slice(3);
                uiDataset[realKey] = dataset[key];
            }
        }

        return uiDataset;
    };

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
        dom.getDataset(node, 'uiTarget') || dom.getAttribute(node, 'href');

    /**
     * Initialize a UI component.
     * @param {string} key The component key.
     * @param {class} component The component class.
     */
    UI.initComponent = (key, component) => {
        component.DATA_KEY = key;
        component.REMOVE_EVENT = `remove.ui.${key}`;

        QuerySet.prototype[key] = function(a, ...args) {
            let settings, method, firstResult;

            if (Core.isObject(a)) {
                settings = a;
            } else if (Core.isString(a)) {
                method = a;
            }

            for (const [index, node] of [...this].entries()) {
                if (!Core.isElement(node)) {
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
    };


    /**
     * Popper Class
     * @class
     */
    class Popper extends BaseComponent {

        /**
         * New Popper constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} settings The options to create the Popper with.
         * @returns {Popper} A new Popper object.
         */
        constructor(node, settings) {
            super(node, settings);

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
                this._resetStyle.marginLeft = 0;
                this._resetStyle.marginTop = 0;
            }

            PopperSet.add(this);

            this.update();
        }

        /**
         * Dispose the Popper.
         */
        dispose() {
            PopperSet.remove(this);

            this._resetStyle = null;

            super.dispose();
        }

        /**
         * Update the Popper position.
         * @returns {Popper} The Popper.
         */
        update() {
            if (!dom.isConnected(this._node) || !dom.isVisible(this._node)) {
                return this;
            }

            // reset position
            dom.setStyle(this._node, this._resetStyle);

            if (this._settings.beforeUpdate) {
                this._settings.beforeUpdate(this._node, this._settings.reference);
            }

            // calculate boxes
            const nodeBox = dom.rect(this._node, true);
            const referenceBox = dom.rect(this._settings.reference, true);
            const windowBox = this.constructor._scrollContainer(window, document);

            const scrollParent = this.constructor._getScrollParent(this._node);

            const scrollBox = scrollParent ?
                this.constructor._scrollContainer(scrollParent, scrollParent) :
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
            const placement = this._settings.fixed && this._settings.placement !== 'auto' ?
                this._settings.placement :
                this.constructor._getPopperPlacement(
                    nodeBox,
                    referenceBox,
                    minimumBox,
                    this._settings.placement,
                    this._settings.spacing + 2
                );

            if (!this._settings.noAttributes) {
                dom.setDataset(this._settings.reference, 'uiPlacement', placement);
            }

            dom.setDataset(this._node, 'uiPlacement', placement);

            // get auto position
            const position = this._settings.position;

            // calculate actual offset
            const offset = {
                x: Math.round(referenceBox.x),
                y: Math.round(referenceBox.y)
            };

            // offset for relative parent
            const relativeParent = this.constructor._getRelativeParent(this._node);
            const relativeBox = relativeParent ?
                dom.rect(relativeParent, true) :
                null;

            if (relativeBox) {
                offset.x -= Math.round(relativeBox.x);
                offset.y -= Math.round(relativeBox.y);
            }

            // offset for placement
            this.constructor._adjustPlacement(offset, nodeBox, referenceBox, placement, this._settings.spacing);

            // offset for position
            this.constructor._adjustPosition(offset, nodeBox, referenceBox, placement, position);

            // compensate for margins
            offset.x -= parseInt(dom.css(this._node, 'margin-left'));
            offset.y -= parseInt(dom.css(this._node, 'margin-top'));

            // corrective positioning
            this.constructor._adjustConstrain(offset, nodeBox, referenceBox, minimumBox, relativeBox, placement, this._settings.minContact);

            offset.x = Math.round(offset.x);
            offset.y = Math.round(offset.y);

            // compensate for scroll parent
            if (scrollParent) {
                offset.x += dom.getScrollX(scrollParent);
                offset.y += dom.getScrollY(scrollParent);
            }

            // update position
            const style = {};
            if (this._settings.useGpu) {
                style.transform = `translate3d(${offset.x}px , ${offset.y}px , 0)`;
            } else {
                style.marginLeft = `${offset.x}px`;
                style.marginTop = `${offset.y}px`;
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

            return this;
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
                'resize.ui.popper',
                DOM.debounce(_ => {
                    for (const popper of this._poppers) {
                        popper.update();
                    }
                })
            );

            dom.addEvent(
                document,
                'scroll.ui.popper',
                DOM.debounce(e => {
                    for (const popper of this._poppers) {
                        if (!Core.isDocument(e.target) && !dom.hasDescendent(e.target, popper._node)) {
                            continue;
                        }

                        popper.update();
                    }
                }),
                true
            );

            this._running = true;
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

            dom.removeEvent(window, 'resize.ui.popper scroll.ui.popper');
            this._running = false;
        }

    }


    /**
     * Popper Helpers
     */

    Object.assign(Popper.prototype, {

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

                arrowStyles.left = Core.clamp(offset, min, max);
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

                arrowStyles.top = Core.clamp(offset, min, max);
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
        _adjustConstrain(offset, nodeBox, referenceBox, minimumBox, relativeBox, placement, minContact) {
            if (['left', 'right'].includes(placement)) {
                let offsetY = offset.y;
                let refTop = referenceBox.top;

                if (relativeBox) {
                    offsetY += relativeBox.top;
                    refTop -= relativeBox.top;
                }

                const minSize = minContact !== false ?
                    minContact :
                    Math.min(referenceBox.height, nodeBox.height);

                if (offsetY + nodeBox.height > minimumBox.bottom) {
                    // bottom of offset node is below the container
                    const diff = offsetY + nodeBox.height - minimumBox.bottom;
                    offset.y = Math.max(
                        refTop - nodeBox.height + minSize,
                        offset.y - diff
                    );
                }

                if (offsetY < minimumBox.top) {
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
                    Math.min(referenceBox.width, nodeBox.width);

                if (offsetX + nodeBox.width > minimumBox.right) {
                    // right of offset node is to the right of the container
                    const diff = offsetX + nodeBox.width - minimumBox.right;
                    offset.x = Math.max(
                        refLeft - nodeBox.width + minSize,
                        offset.x - diff
                    );
                }

                if (offsetX < minimumBox.left) {
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
        _adjustPlacement(offset, nodeBox, referenceBox, placement, spacing) {
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
         * Get the actual placement of the Popper.
         * @param {DOMRect} nodeBox The computed bounding rectangle of the node.
         * @param {DOMRect} referenceBox The computed bounding rectangle of the reference.
         * @param {object} minimumBox The computed minimum bounding rectangle of the container.
         * @param {string} placement The initial placement of the Popper.
         * @param {number} spacing The amount of spacing to use.
         * @returns {string} The new placement of the Popper.
         */
        _getPopperPlacement(nodeBox, referenceBox, minimumBox, placement, spacing) {
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
         * Get the relative parent of the node.
         * @param {HTMLElement} node The input node.
         * @return {HTMLElement} The relative parent.
         */
        _getRelativeParent(node) {
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
        _getScrollParent(node) {
            return dom.closest(
                node,
                parent =>
                    dom.css(parent, 'position') === 'relative' &&
                    ['overflow', 'overflowX', 'overflowY'].some(overflow =>
                        ['auto', 'scroll'].includes(
                            dom.css(parent, overflow)
                        )
                    ),
                document.body
            ).shift();
        },

        /**
         * Calculate the computed bounding rectangle of a node (minus scroll bars).
         * @param {HTMLElement|Window} node The input node.
         * @param {HTMLElement|Document} scrollNode The scroll node.
         * @returns {object} The computed bounding rectangle of the node.
         */
        _scrollContainer(node, scrollNode) {
            const isWindow = Core.isWindow(node);
            const rect = isWindow ?
                this._windowContainer(node) :
                dom.rect(node, true);

            const scrollSizeX = UI.getScrollbarSize(node, scrollNode, 'x');
            const scrollSizeY = UI.getScrollbarSize(node, scrollNode, 'y');

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
        },

        /**
         * Calculate the computed bounding rectangle of a window.
         * @returns {object} The computed bounding rectangle of the window.
         */
        _windowContainer(node) {
            const scrollX = dom.getScrollX(node);
            const scrollY = dom.getScrollY(node);
            const width = dom.width(node);
            const height = dom.height(node);

            return {
                x: scrollX,
                y: scrollY,
                width,
                height,
                top: scrollY,
                right: scrollX + width,
                bottom: scrollY + height,
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
        useGpu: true,
        noAttributes: false
    };

    PopperSet._poppers = [];

    UI.initComponent('popper', Popper);

    UI.Popper = Popper;
    UI.PopperSet = PopperSet;


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
                this._animating ||
                !dom.triggerOne(this._node, 'close.ui.alert')
            ) {
                return this;
            }

            this._animating = true;

            dom.fadeOut(this._node, {
                duration: this._settings.duration
            }).then(_ => {
                dom.detach(this._node);
                dom.triggerEvent(this._node, 'closed.ui.alert');
                dom.remove(this._node);
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });

            return this;
        }

    }


    // Alert events
    dom.addEventDelegate(document, 'click.ui.alert', '[data-ui-dismiss="alert"]', e => {
        e.preventDefault();

        const target = UI.getTarget(e.currentTarget, '.alert');
        const alert = Alert.init(target);
        alert.close();
    });


    // Alert default options
    Alert.defaults = {
        duration: 100
    };

    UI.initComponent('alert', Alert);

    UI.Alert = Alert;


    /**
     * Button Class
     * @class
     */
    class Button extends BaseComponent {

        /**
         * Toggle the Button.
         * @returns {Button} The Button.
         */
        toggle() {
            dom.toggleClass(this._node, 'active');

            const pressed = dom.hasClass(this._node, 'active');
            dom.setAttribute(this._node, 'aria-pressed', pressed);

            return this;
        }

    }


    // Button events
    dom.addEventDelegate(document, 'click.ui.button', '[data-ui-toggle="button"]', e => {
        e.preventDefault();

        const button = Button.init(e.currentTarget);
        button.toggle();
    });


    // Button default settings
    Button.defaults = {};

    UI.initComponent('button', Button);

    UI.Button = Button;


    /**
     * Carousel Class
     * @class
     */
    class Carousel extends BaseComponent {

        /**
         * New Carousel constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Carousel with.
         * @returns {Carousel} A new Carousel object.
         */
        constructor(node, settings) {
            super(node, settings);

            this._items = dom.find('.carousel-item', this._node);

            this._index = this._items.findIndex(item =>
                dom.hasClass(item, 'active')
            );

            this._events();

            if (this._settings.ride === 'carousel') {
                this._setTimer();
            }
        }

        /**
         * Cycle to the next carousel item.
         * @returns {Carousel} The Carousel.
         */
        cycle() {
            if (!dom.isHidden(document)) {
                return this.slide(1);
            }

            this._paused = false;
            this._setTimer();

            return this;
        }

        /**
         * Dispose the Carousel.
         */
        dispose() {
            if (this._timer) {
                clearTimeout(this._timer);
            }

            if (this._settings.keyboard) {
                dom.removeEvent(this._node, 'keydown.ui.carousel');
            }

            if (this._settings.pause) {
                dom.removeEvent(this._node, 'mouseenter.ui.carousel');
                dom.removeEvent(this._node, 'mouseleave.ui.carousel');
            }

            if (this._settings.swipe) {
                dom.removeEvent(this._node, 'mousedown.ui.carousel');
            }

            this._items = null;

            super.dispose();
        }

        /**
         * Cycle to the next Carousel item.
         * @returns {Carousel} The Carousel.
         */
        next() {
            return this.slide();
        }

        /**
         * Stop the carousel from cycling through items.
         * @returns {Carousel} The Carousel.
         */
        pause() {
            clearTimeout(this._timer);
            this._timer = null;
            this._paused = true;

            return this;
        }

        /**
         * Cycle to the previous Carousel item.
         * @returns {Carousel} The Carousel.
         */
        prev() {
            return this.slide(-1);
        }

        /**
         * Cycle to a specific Carousel item.
         * @param {number} index The item index to cycle to.
         * @returns {Carousel} The Carousel.
         */
        show(index) {
            this._show(index);

            return this;
        }

        /**
         * Slide the Carousel in a specific direction.
         * @param {number} [direction=1] The direction to slide to.
         * @returns {Carousel} The Carousel.
         */
        slide(direction = 1) {
            return this.show(this._index + direction);
        }

    }


    // Carousel events
    dom.addEvent(window, 'load', _ => {
        const nodes = dom.find('[data-ui-ride="carousel"]');

        for (const node of nodes) {
            Carousel.init(node);
        }
    });

    dom.addEventDelegate(document, 'click.ui.carousel', '[data-ui-slide]', e => {
        e.preventDefault();

        const target = UI.getTarget(e.currentTarget, '.carousel');
        const carousel = Carousel.init(target);
        const slide = dom.getDataset(e.currentTarget, 'uiSlide');

        if (slide === 'prev') {
            carousel.prev();
        } else {
            carousel.next();
        }
    });

    dom.addEventDelegate(document, 'click.ui.carousel', '[data-ui-slide-to]', e => {
        e.preventDefault();

        const target = UI.getTarget(e.currentTarget, '.carousel');
        const carousel = Carousel.init(target);
        const slideTo = dom.getDataset(e.currentTarget, 'uiSlideTo');

        carousel.show(slideTo);
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
                            dom.is(e.target, '[data-ui-slide-to], [data-ui-slide], a, button') ||
                            dom.closest(e.target, '[data-ui-slide], a, button', this._node).length
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
                    _ => {
                        if (index === null || index === this._index) {
                            this._paused = false;
                            this._sliding = false;
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

                        dom.animate(
                            this._items[this._index],
                            (node, newProgress) => {
                                if (!this._items) {
                                    return;
                                }

                                if (progress > .25) {
                                    this._update(node, this._items[oldIndex], progress + (newProgress * progressRemaining), direction);
                                } else {
                                    this._update(node, this._items[oldIndex], (1 - progress) + (newProgress * progressRemaining), direction);
                                }
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


    // Carousel default options
    Carousel.defaults = {
        interval: 5000,
        transition: 500,
        keyboard: true,
        ride: false,
        pause: true,
        wrap: true,
        swipe: true
    };

    UI.initComponent('carousel', Carousel);

    UI.Carousel = Carousel;


    /**
     * Collapse Class
     * @class
     */
    class Collapse extends BaseComponent {

        /**
         * New Collapse constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Collapse with.
         * @returns {Collapse} A new Collapse object.
         */
        constructor(node, settings) {
            super(node, settings);

            const id = this._node.getAttribute('id');
            this._triggers = dom.find(
                `[data-ui-toggle="collapse"][data-ui-target="#${id}"]`
            );

            if (this._settings.parent) {
                this._parent = dom.findOne(this._settings.parent);
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
         * @returns {Collapse} The Collapse.
         */
        hide() {
            if (
                this._animating ||
                !dom.hasClass(this._node, 'show') ||
                !dom.triggerOne(this._node, 'hide.ui.collapse')
            ) {
                return this;
            }

            this._animating = true;
            dom.addClass(this._triggers, 'collapsed');
            dom.addClass(this._triggers, 'collapsing');

            dom.squeezeOut(this._node, {
                direction: this._settings.direction,
                duration: this._settings.duration
            }).then(_ => {
                dom.removeClass(this._node, 'show');
                dom.removeClass(this._triggers, 'collapsing');
                dom.setAttribute(this._triggers, 'aria-expanded', false);
                dom.triggerEvent(this._node, 'hidden.ui.collapse');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });

            return this;
        }

        /**
         * Show the element.
         * @returns {Collapse} The Collapse.
         */
        show() {
            if (
                this._animating ||
                dom.hasClass(this._node, 'show')
            ) {
                return this;
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

            if (!dom.triggerOne(this._node, 'show.ui.collapse')) {
                return this;
            }

            for (const collapse of collapses) {
                collapse.hide();
            }

            this._animating = true;
            dom.addClass(this._node, 'show');
            dom.removeClass(this._triggers, 'collapsed');
            dom.addClass(this._triggers, 'collapsing');

            dom.squeezeIn(this._node, {
                direction: this._settings.direction,
                duration: this._settings.duration
            }).then(_ => {
                dom.removeClass(this._triggers, 'collapsing');
                dom.setAttribute(this._triggers, 'aria-expanded', true);
                dom.triggerEvent(this._node, 'shown.ui.collapse');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });

            return this;
        }

        /**
         * Toggle the element.
         * @returns {Collapse} The Collapse.
         */
        toggle() {
            return dom.hasClass(this._node, 'show') ?
                this.hide() :
                this.show();
        }

    }


    // Collapse events
    dom.addEventDelegate(document, 'click.ui.collapse', '[data-ui-toggle="collapse"]', e => {
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

    UI.initComponent('collapse', Collapse);

    UI.Collapse = Collapse;


    /**
     * Dropdown Class
     * @class
     */
    class Dropdown extends BaseComponent {

        /**
         * New Dropdown constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Dropdown with.
         * @returns {Dropdown} A new Dropdown object.
         */
        constructor(node, settings) {
            super(node, settings);

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
         * @returns {Dropdown} The Dropdown.
         */
        hide() {
            if (
                this._animating ||
                !dom.hasClass(this._menuNode, 'show') ||
                !dom.triggerOne(this._node, 'hide.ui.dropdown')
            ) {
                return this;
            }

            this._animating = true;

            dom.fadeOut(this._menuNode, {
                duration: this._settings.duration
            }).then(_ => {
                if (this._popper) {
                    this._popper.dispose();
                    this._popper = null;
                }

                dom.removeClass(this._menuNode, 'show');
                dom.setAttribute(this._node, 'aria-expanded', false);
                dom.triggerEvent(this._node, 'hidden.ui.dropdown');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });

            return this;
        }

        /**
         * Show the Dropdown.
         * @returns {Dropdown} The Dropdown.
         */
        show() {
            if (
                this._animating ||
                dom.hasClass(this._menuNode, 'show') ||
                !dom.triggerOne(this._node, 'show.ui.dropdown')
            ) {
                return this;
            }

            this._animating = true;
            dom.addClass(this._menuNode, 'show');

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

            window.requestAnimationFrame(_ => {
                this.update();
            });

            dom.fadeIn(this._menuNode, {
                duration: this._settings.duration
            }).then(_ => {
                dom.setAttribute(this._node, 'aria-expanded', true);
                dom.triggerEvent(this._node, 'shown.ui.dropdown');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });

            return this;
        }

        /**
         * Toggle the Dropdown.
         * @returns {Dropdown} The Dropdown.
         */
        toggle() {
            return dom.hasClass(this._menuNode, 'show') ?
                this.hide() :
                this.show();
        }

        /**
         * Update the Dropdown position.
         * @returns {Dropdown} The Dropdown.
         */
        update() {
            if (this._popper) {
                this._popper.update();
            }

            return this;
        }

    }


    // Dropdown events
    dom.addEventDelegate(document, 'click.ui.dropdown keyup.ui.dropdown', '[data-ui-toggle="dropdown"]', e => {
        if (e.code && e.code !== 'Space') {
            return;
        }

        e.preventDefault();

        const dropdown = Dropdown.init(e.currentTarget);
        dropdown.toggle();
    });

    dom.addEventDelegate(document, 'keydown.ui.dropdown', '[data-ui-toggle="dropdown"]', e => {
        switch (e.code) {
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

    dom.addEventDelegate(document, 'keydown.ui.dropdown', '.dropdown-menu.show .dropdown-item', e => {
        let focusNode;

        switch (e.code) {
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

    dom.addEvent(document, 'click.ui.dropdown', e => {
        const target = UI.getClickTarget(e);
        const nodes = dom.find('.dropdown-menu.show');

        for (const node of nodes) {
            const toggle = dom.siblings(node, '[data-ui-toggle="dropdown"]').shift();
            const dropdown = Dropdown.init(toggle);
            const hasDescendent = dom.hasDescendent(dropdown._menuNode, target);
            const autoClose = dropdown._settings.autoClose;

            if (
                dom.isSame(dropdown._node, target) ||
                (
                    hasDescendent &&
                    (
                        dom.is(target, 'form') ||
                        dom.closest(target, 'form', dropdown._menuNode).length ||
                        autoClose === 'outside' ||
                        autoClose === false
                    )
                ) ||
                (
                    !hasDescendent &&
                    !dom.isSame(dropdown._menuNode, target) &&
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
    }, true);

    dom.addEvent(document, 'keyup.ui.dropdown', e => {
        if (!['Tab', 'Escape'].includes(e.code)) {
            return;
        }

        let stopped = false;
        const nodes = dom.find('.dropdown-menu.show');

        for (const node of nodes) {
            const toggle = dom.siblings(node, '[data-ui-toggle="dropdown"]').shift();
            const dropdown = Dropdown.init(toggle);

            if (
                (e.code === 'Tab' && dom.isSame(dropdown._node, e.target)) ||
                (
                    dom.hasDescendent(dropdown._menuNode, e.target) &&
                    (
                        e.code === 'Tab' ||
                        dom.is(e.target, 'form') ||
                        dom.closest(e.target, 'form', dropdown._menuNode).length
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
    }, true);


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

    UI.initComponent('dropdown', Dropdown);

    UI.Dropdown = Dropdown;


    /**
     * Modal Class
     * @class
     */
    class Modal extends BaseComponent {

        /**
         * New Modal constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Modal with.
         * @returns {Modal} A new Modal object.
         */
        constructor(node, settings) {
            super(node, settings);

            this._dialog = dom.child(this._node, '.modal-dialog').shift();

            if (this._settings.show) {
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
         * @returns {Modal} The Modal.
         */
        hide() {
            if (
                this._animating ||
                !dom.hasClass(this._node, 'show') ||
                !dom.triggerOne(this._node, 'hide.ui.modal')
            ) {
                return this;
            }

            dom.stop(this._dialog);

            this._animating = true;

            const stackSize = dom.find('.modal.show').length - 1;

            Promise.all([
                dom.fadeOut(this._dialog, {
                    duration: this._settings.duration
                }),
                dom.dropOut(this._dialog, {
                    duration: this._settings.duration,
                    direction: 'top'
                }),
                dom.fadeOut(this._backdrop, {
                    duration: this._settings.duration
                })
            ]).then(_ => {
                dom.removeAttribute(this._node, 'aria-modal');
                dom.setAttribute(this._node, 'aria-hidden', true);

                UI.resetScrollPadding(this._dialog);

                if (stackSize) {
                    dom.setStyle(this._node, 'zIndex', '');
                } else {
                    if (this._scrollPadding) {
                        UI.resetScrollPadding();
                        this._scrollPadding = false;
                    }

                    dom.removeClass(document.body, 'modal-open');
                }

                dom.removeClass(this._node, 'show');

                if (this._settings.backdrop) {
                    dom.remove(this._backdrop);
                    this._backdrop = null;
                }

                if (this._activeTarget) {
                    dom.focus(this._activeTarget);
                }

                dom.triggerEvent(this._node, 'hidden.ui.modal');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });

            return this;
        }

        /**
         * Show the Modal.
         * @param {HTMLElement} [activeTarget] The active target.
         * @returns {Modal} The Modal.
         */
        show(activeTarget) {
            if (
                this._animating ||
                dom.hasClass(this._node, 'show') ||
                !dom.triggerOne(this._node, 'show.ui.modal')
            ) {
                return this;
            }

            this._activeTarget = activeTarget;
            this._animating = true;

            const stackSize = dom.find('.modal.show').length;

            dom.removeClass(document.body, 'modal-open');

            UI.addScrollPadding(this._dialog);

            if (stackSize) {
                let zIndex = dom.css(this._node, 'zIndex');
                zIndex = parseInt(zIndex);
                zIndex += stackSize * 20;

                dom.setStyle(this._node, 'zIndex', zIndex);
            } else {
                if (!dom.findOne('.offcanvas.show')) {
                    this._scrollPadding = true;
                    UI.addScrollPadding();
                }
            }

            dom.addClass(document.body, 'modal-open');

            dom.addClass(this._node, 'show');

            if (this._settings.backdrop) {
                this._backdrop = dom.create('div', {
                    class: 'modal-backdrop'
                });

                dom.append(document.body, this._backdrop);

                if (stackSize) {
                    let zIndex = dom.css(this._backdrop, 'zIndex');
                    zIndex = parseInt(zIndex);
                    zIndex += stackSize * 20;

                    dom.setStyle(this._backdrop, 'zIndex', zIndex);
                }
            }

            Promise.all([
                dom.fadeIn(this._dialog, {
                    duration: this._settings.duration
                }),
                dom.dropIn(this._dialog, {
                    duration: this._settings.duration,
                    direction: 'top'
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

                dom.triggerEvent(this._node, 'shown.ui.modal');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });

            return this;
        }

        /**
         * Toggle the Modal.
         * @returns {Modal} The Modal.
         */
        toggle() {
            return dom.hasClass(this._node, 'show') ?
                this.hide() :
                this.show();
        }

        /**
         * Transform the modal (for static backdrop).
         */
        _transform() {
            if (this._animating) {
                return;
            }

            dom.stop(this._dialog);

            dom.animate(
                this._dialog,
                (node, progress) => {
                    if (progress >= 1) {
                        dom.setStyle(node, 'transform', '');
                        return;
                    }

                    const zoomOffset = (progress < .5 ? progress : (1 - progress)) / 20;
                    dom.setStyle(node, 'transform', `scale(${1 + zoomOffset})`);
                },
                {
                    duration: 200
                }
            ).catch(_ => { });
        }

        /**
         * Find the top visible modal (highest z-index).
         * @returns {Modal} The top visible modal.
         */
        static _topModal() {
            const elements = dom.find('.modal.show');

            if (!elements.length) {
                return null;
            }

            // find modal with highest zIndex
            let element;
            for (const temp of elements) {
                if (!element || dom.getStyle(temp, 'zIndex') > dom.getStyle(element, 'zIndex')) {
                    element = temp;
                }
            }

            return this.init(element);
        }

    }


    // Modal events
    dom.addEventDelegate(document, 'click.ui.modal', '[data-ui-toggle="modal"]', e => {
        e.preventDefault();

        const target = UI.getTarget(e.currentTarget, '.modal');
        const modal = Modal.init(target);
        modal.show(e.currentTarget);
    });

    dom.addEventDelegate(document, 'click.ui.modal', '[data-ui-dismiss="modal"]', e => {
        e.preventDefault();

        const target = UI.getTarget(e.currentTarget, '.modal');
        const modal = Modal.init(target);
        modal.hide();
    });

    // Events must be attached to the window, so offcanvas events are triggered first
    dom.addEvent(window, 'click.ui.modal', e => {
        const target = UI.getClickTarget(e);

        if (dom.is(target, '[data-ui-dismiss]')) {
            return;
        }

        const modal = Modal._topModal();

        if (
            !modal ||
            !modal._settings.backdrop ||
            (modal._node !== target && dom.hasDescendent(modal._node, target))
        ) {
            return;
        }

        if (modal._settings.backdrop === 'static') {
            modal._transform();
            return;
        }

        modal.hide();
    });

    dom.addEvent(window, 'keyup.ui.modal', e => {
        if (e.code !== 'Escape') {
            return;
        }

        const modal = Modal._topModal();

        if (!modal || !modal._settings.keyboard) {
            return;
        }

        if (modal._settings.backdrop === 'static') {
            modal._transform();
            return;
        }

        modal.hide();
    });


    // Modal default options
    Modal.defaults = {
        duration: 250,
        backdrop: true,
        focus: true,
        show: false,
        keyboard: true
    };

    UI.initComponent('modal', Modal);

    UI.Modal = Modal;


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
         * @returns {Offcanvas} The Offcanvas.
         */
        hide() {
            if (
                this._animating ||
                !dom.hasClass(this._node, 'show') ||
                !dom.triggerOne(this._node, 'hide.ui.offcanvas')
            ) {
                return this;
            }

            this._animating = true;

            Promise.all([
                dom.fadeOut(this._node, {
                    duration: this._settings.duration
                }),
                dom.dropOut(this._node, {
                    duration: this._settings.duration,
                    direction: this._getDirection()
                }),
                dom.fadeOut(this._backdrop, {
                    duration: this._settings.duration
                })
            ]).then(_ => {
                dom.removeAttribute(this._node, 'aria-modal');
                dom.setAttribute(this._node, 'aria-hidden', true);

                dom.removeClass(this._node, 'show');

                if (this._settings.backdrop) {
                    dom.removeClass(document.body, 'offcanvas-backdrop');
                }

                if (!this._settings.scroll) {
                    UI.resetScrollPadding();
                    dom.setStyle(document.body, 'overflow', '');
                }

                if (this._activeTarget) {
                    dom.focus(this._activeTarget);
                }

                dom.triggerEvent(this._node, 'hidden.ui.offcanvas');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });

            return this;
        }

        /**
         * Show the Offcanvas.
         * @param {HTMLElement} [activeTarget] The active target.
         * @returns {Offcanvas} The Offcanvas.
         */
        show(activeTarget) {
            if (
                this._animating ||
                dom.hasClass(this._node, 'show') ||
                dom.findOne('.offcanvas.show') ||
                !dom.triggerOne(this._node, 'show.ui.offcanvas')
            ) {
                return this;
            }

            this._activeTarget = activeTarget;
            this._animating = true;

            dom.addClass(this._node, 'show');

            if (this._settings.backdrop) {
                dom.addClass(document.body, 'offcanvas-backdrop');
            }

            if (!this._settings.scroll) {
                UI.addScrollPadding();
                dom.setStyle(document.body, 'overflow', 'hidden');
            }

            Promise.all([
                dom.fadeIn(this._node, {
                    duration: this._settings.duration
                }),
                dom.dropIn(this._node, {
                    duration: this._settings.duration,
                    direction: this._getDirection()
                }),
                dom.fadeIn(this._backdrop, {
                    duration: this._settings.duration
                })
            ]).then(_ => {
                dom.removeAttribute(this._node, 'aria-hidden');
                dom.setAttribute(this._node, 'aria-modal', true);

                dom.triggerEvent(this._node, 'shown.ui.offcanvas');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });

            return this;
        }

        /**
         * Toggle the Offcanvas.
         * @returns {Offcanvas} The Offcanvas.
         */
        toggle() {
            return dom.hasClass(this._node, 'show') ?
                this.hide() :
                this.show();
        }

    }


    // Offcanvas events
    dom.addEventDelegate(document, 'click.ui.offcanvas', '[data-ui-toggle="offcanvas"]', e => {
        e.preventDefault();

        const target = UI.getTarget(e.currentTarget, '.offcanvas');
        const offcanvas = Offcanvas.init(target);
        offcanvas.show(e.currentTarget);
    });

    dom.addEventDelegate(document, 'click.ui.offcanvas', '[data-ui-dismiss="offcanvas"]', e => {
        e.preventDefault();

        const target = UI.getTarget(e.currentTarget, '.offcanvas');
        const offcanvas = Offcanvas.init(target);
        offcanvas.hide();
    });

    dom.addEvent(document, 'click.ui.offcanvas', e => {
        const target = UI.getClickTarget(e);

        if (dom.is(target, '[data-ui-dismiss]') || dom.findOne('.modal.show')) {
            return;
        }

        const nodes = dom.find('.offcanvas.show');

        if (!nodes.length) {
            return;
        }

        for (const node of nodes) {
            const offcanvas = Offcanvas.init(node);

            if (
                !offcanvas._settings.backdrop ||
                dom.isSame(offcanvas._node, target) ||
                dom.hasDescendent(offcanvas._node, target)
            ) {
                continue;
            }

            offcanvas.hide();
        }
    });

    dom.addEvent(document, 'keyup.ui.offcanvas', e => {
        if (e.code !== 'Escape' || dom.findOne('.modal.show')) {
            return;
        }

        const nodes = dom.find('.offcanvas.show');

        if (!nodes.length) {
            return;
        }

        for (const node of nodes) {
            const offcanvas = Offcanvas.init(node);

            if (!offcanvas._settings.keyboard) {
                return;
            }

            offcanvas.hide();
        }
    });


    /**
     * Offcanvas Helpers
     */

    Object.assign(Offcanvas.prototype, {

        /**
         * Get the slide animation direction.
         * @returns {string} The animation direction.
         */
        _getDirection() {
            if (dom.hasClass(this._node, 'offcanvas-end')) {
                return 'right';
            }

            if (dom.hasClass(this._node, 'offcanvas-bottom')) {
                return 'bottom';
            }

            if (dom.hasClass(this._node, 'offcanvas-start')) {
                return 'left';
            }

            return 'top';
        }

    });


    // Offcanvas default options
    Offcanvas.defaults = {
        duration: 250,
        backdrop: true,
        keyboard: true,
        scroll: false
    };

    UI.initComponent('offcanvas', Offcanvas);

    UI.Offcanvas = Offcanvas;


    /**
     * Popover Class
     * @class
     */
    class Popover extends BaseComponent {

        /**
         * New Popover constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Popover with.
         * @returns {Popover} A new Popover object.
         */
        constructor(node, settings) {
            super(node, settings);

            this._modal = dom.closest(this._node, '.modal').shift();

            this._triggers = this._settings.trigger.split(' ');

            this._render();
            this._events();

            if (this._settings.enable) {
                this.enable();
            }

            this.refresh();
        }

        /**
         * Dispose the Popover.
         */
        dispose() {
            if (dom.hasDataset(this._node, 'uiOriginalTitle')) {
                const title = dom.getDataset(this._node, 'uiOriginalTitle');
                dom.setAttribute(this._node, 'title', title);
                dom.removeDataset(this._node, 'uiOriginalTitle');
            }

            if (this._popper) {
                this._popper.dispose();
                this._popper = null;
            }

            dom.remove(this._popover);

            if (this._triggers.includes('hover')) {
                dom.removeEvent(this._node, 'mouseover.ui.popover');
                dom.removeEvent(this._node, 'mouseout.ui.popover');
            }

            if (this._triggers.includes('focus')) {
                dom.removeEvent(this._node, 'focus.ui.popover');
                dom.removeEvent(this._node, 'blur.ui.popover');
            }

            if (this._triggers.includes('click')) {
                dom.removeEvent(this._node, 'click.ui.popover');
            }

            if (this._modal) {
                dom.removeEvent(this._modal, 'hide.ui.modal', this._hideModalEvent);
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
         * @returns {Popover} The Popover.
         */
        disable() {
            this._enabled = false;

            return this;
        }

        /**
         * Enable the Popover.
         * @returns {Popover} The Popover.
         */
        enable() {
            this._enabled = true;

            return this;
        }

        /**
         * Hide the Popover.
         * @returns {Popover} The Popover.
         */
        hide() {
            if (!this._enabled) {
                return this;
            }

            if (
                this._animating ||
                !dom.isConnected(this._popover) ||
                !dom.triggerOne(this._node, 'hide.ui.popover')
            ) {
                return this;
            }

            this._animating = true;

            dom.fadeOut(this._popover, {
                duration: this._settings.duration
            }).then(_ => {
                this._popper.dispose();
                this._popper = null;

                dom.detach(this._popover);
                dom.triggerEvent(this._node, 'hidden.ui.popover');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });

            return this;
        }

        /**
         * Refresh the Popover.
         * @returns {Popover} The Popover.
         */
        refresh() {
            if (dom.hasAttribute(this._node, 'title')) {
                const originalTitle = dom.getAttribute(this._node, 'title')
                dom.setDataset(this._node, 'uiOriginalTitle', originalTitle);
                dom.removeAttribute(this._node, 'title');
            }

            let title = '';
            if (dom.hasDataset(this._node, 'uiTitle')) {
                title = dom.getDataset(this._node, 'uiTitle');
            } else if (this._settings.title) {
                title = this._settings.title;
            } else if (dom.hasDataset(this._node, 'uiOriginalTitle')) {
                title = dom.getDataset(this._node, 'uiOriginalTitle', title);
            }

            let content = '';
            if (dom.hasDataset(this._node, 'uiContent')) {
                content = dom.getDataset(this._node, 'uiContent');
            } else if (this._settings.content) {
                content = this._settings.content;
            }

            const method = this._settings.html ? 'setHTML' : 'setText';

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

            return this.update();
        }

        /**
         * Show the Popover.
         * @returns {Popover} The Popover.
         */
        show() {
            if (!this._enabled) {
                return this;
            }

            if (
                this._animating ||
                dom.isConnected(this._popover) ||
                !dom.triggerOne(this._node, 'show.ui.popover')
            ) {
                return this;
            }

            this._animating = true;
            this.refresh();
            this._show();

            dom.fadeIn(this._popover, {
                duration: this._settings.duration
            }).then(_ => {
                dom.triggerEvent(this._node, 'shown.ui.popover');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });

            return this;
        }

        /**
         * Toggle the Popover.
         * @returns {Popover} The Popover.
         */
        toggle() {
            return dom.isConnected(this._popover) ?
                this.hide() :
                this.show();
        }

        /**
         * Update the Popover position.
         * @returns {Popover} The Popover.
         */
        update() {
            if (this._popper) {
                this._popper.update();
            }

            return this;
        }

    }


    /**
     * Popover Events
     */

    Object.assign(Popover.prototype, {

        /**
         * Attach events for the Popover.
         */
        _events() {
            if (this._triggers.includes('hover')) {
                dom.addEvent(this._node, 'mouseover.ui.popover', _ => {
                    this._stop();
                    this.show();
                });

                dom.addEvent(this._node, 'mouseout.ui.popover', _ => {
                    this._stop();
                    this.hide();
                });
            }

            if (this._triggers.includes('focus')) {
                dom.addEvent(this._node, 'focus.ui.popover', _ => {
                    this._stop();
                    this.show();
                });

                dom.addEvent(this._node, 'blur.ui.popover', _ => {
                    this._stop();
                    this.hide();
                });
            }

            if (this._triggers.includes('click')) {
                dom.addEvent(this._node, 'click.ui.popover', e => {
                    e.preventDefault();

                    this._stop();
                    this.toggle();
                });
            }

            if (this._modal) {
                dom.addEvent(this._modal, 'hide.ui.modal', _ => {
                    this._stop();
                    this.hide();
                });
            }
        }

    });


    /**
     * Popover Helpers
     */

    Object.assign(Popover.prototype, {

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
            if (this._settings.appendTo) {
                dom.append(this._settings.appendTo, this._popover);
            } else {
                dom.after(this._node, this._popover);
            }

            if (!this._settings.noAttributes) {
                const id = UI.generateId(this.constructor.DATA_KEY);
                dom.setAttribute(this._popover, 'id', id);
                dom.setAttribute(this._node, 'aria-described-by', id);
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
                    minContact: this._settings.minContact,
                    noAttributes: this._settings.noAttributes
                }
            );

            window.requestAnimationFrame(_ => {
                this.update();
            });
        },

        /**
         * Stop the animations.
         */
        _stop() {
            if (this._enabled && this._animating) {
                dom.stop(this._popover);
                this._animating = false;
            }
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
        appendTo: null,
        sanitize: input => dom.sanitize(input),
        trigger: 'click',
        placement: 'auto',
        position: 'center',
        fixed: false,
        spacing: 3,
        minContact: false,
        noAttributes: false
    };

    UI.initComponent('popover', Popover);

    UI.Popover = Popover;


    /**
     * Tab Class
     * @class
     */
    class Tab extends BaseComponent {

        /**
         * New Tab constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Tab with.
         * @returns {Tab} A new Tab object.
         */
        constructor(node, settings) {
            super(node, settings);

            const selector = UI.getTargetSelector(this._node);
            this._target = dom.findOne(selector);
            this._siblings = dom.siblings(this._node);
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
         * @returns {Tab} The Tab.
         */
        hide() {
            if (
                this._animating ||
                !dom.hasClass(this._target, 'active') ||
                !dom.triggerOne(this._node, 'hide.ui.tab')
            ) {
                return this;
            }

            this._animating = true;

            dom.fadeOut(this._target, {
                duration: this._settings.duration
            }).then(_ => {
                dom.removeClass(this._target, 'active');
                dom.removeClass(this._node, 'active');
                dom.setAttribute(this._node, 'aria-selected', false);
                dom.triggerEvent(this._node, 'hidden.ui.tab');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });

            return this;
        }

        /**
         * Hide any active Tabs, and show the current Tab.
         * @returns {Tab} The Tab.
         */
        show() {
            if (
                this._animating ||
                dom.hasClass(this._target, 'active') ||
                !dom.triggerOne(this._node, 'show.ui.tab')
            ) {
                return this;
            }

            const active = this._siblings.find(sibling =>
                dom.hasClass(sibling, 'active')
            );

            let activeTab;
            if (active) {
                activeTab = this.constructor.init(active);
                if (activeTab._animating) {
                    return this;
                }
            }

            if (!dom.triggerOne(this._node, 'show.ui.tab')) {
                return this;
            }

            const show = _ => {
                this._animating = true;
                dom.addClass(this._target, 'active');
                dom.addClass(this._node, 'active');

                dom.fadeIn(this._target, {
                    duration: this._settings.duration
                }).then(_ => {
                    dom.setAttribute(this._node, 'aria-selected', true);
                    dom.triggerEvent(this._node, 'shown.ui.tab');
                }).catch(_ => { }).finally(_ => {
                    this._animating = false;
                });
            };

            if (!activeTab) {
                show();

                return this;
            }

            if (!dom.triggerOne(active, 'hide.ui.tab')) {
                return this;
            }

            dom.addEventOnce(active, 'hidden.ui.tab', _ => {
                show();
            });

            activeTab.hide();

            return this;
        }

    }


    // Tab events
    dom.addEventDelegate(document, 'click.ui.tab', '[data-ui-toggle="tab"]', e => {
        e.preventDefault();

        const tab = Tab.init(e.currentTarget);
        tab.show();
    });


    // Tab default options
    Tab.defaults = {
        duration: 100
    };

    UI.initComponent('tab', Tab);

    UI.Tab = Tab;


    /**
     * Toast Class
     * @class
     */
    class Toast extends BaseComponent {

        /**
         * Hide the Toast.
         * @returns {Toast} The Toast.
         */
        hide() {
            if (
                this._animating ||
                !dom.isVisible(this._node) ||
                !dom.triggerOne(this._node, 'hide.ui.toast')
            ) {
                return this;
            }

            this._animating = true;

            dom.fadeOut(this._node, {
                duration: this._settings.duration
            }).then(_ => {
                dom.setStyle(this._node, 'display', 'none', true);
                dom.removeClass(this._node, 'show');
                dom.triggerEvent(this._node, 'hidden.ui.toast');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });

            return this;
        }

        /**
         * Show the Toast.
         */
        show() {
            if (
                this._animating ||
                dom.isVisible(this._node) ||
                !dom.triggerOne(this._node, 'show.ui.toast')
            ) {
                return this;
            }

            this._animating = true;
            dom.setStyle(this._node, 'display', '');
            dom.addClass(this._node, 'show');

            dom.fadeIn(this._node, {
                duration: this._settings.duration
            }).then(_ => {
                dom.triggerEvent(this._node, 'shown.ui.toast');

                if (this._settings.autohide) {
                    setTimeout(
                        _ => this.hide(),
                        this._settings.delay
                    );
                }
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });

            return this;
        }

    }


    // Toast events
    dom.addEventDelegate(document, 'click.ui.toast', '[data-ui-dismiss="toast"]', e => {
        e.preventDefault();

        const target = UI.getTarget(e.currentTarget, '.toast');
        const toast = Toast.init(target, { autohide: false });
        toast.hide();
    });


    // Toast default options
    Toast.defaults = {
        autohide: true,
        delay: 5000,
        duration: 100
    };

    UI.initComponent('toast', Toast);

    UI.Toast = Toast;


    /**
     * Tooltip Class
     * @class
     */
    class Tooltip extends BaseComponent {

        /**
         * New Tooltip constructor.
         * @param {HTMLElement} node The input node.
         * @param {object} [settings] The options to create the Tooltip with.
         * @returns {Tooltip} A new Tooltip object.
         */
        constructor(node, settings) {
            super(node, settings);

            this._modal = dom.closest(this._node, '.modal').shift();

            this._triggers = this._settings.trigger.split(' ');

            this._render();
            this._events();

            if (this._settings.enable) {
                this.enable();
            }

            this.refresh();
        }

        /**
         * Dispose the Tooltip.
         */
        dispose() {
            if (dom.hasDataset(this._node, 'uiOriginalTitle')) {
                const title = dom.getDataset(this._node, 'uiOriginalTitle');
                dom.setAttribute(this._node, 'title', title);
                dom.removeDataset(this._node, 'uiOriginalTitle');
            }

            if (this._popper) {
                this._popper.dispose();
                this._popper = null;
            }

            dom.remove(this._tooltip);

            if (this._triggers.includes('hover')) {
                dom.removeEvent(this._node, 'mouseover.ui.tooltip');
                dom.removeEvent(this._node, 'mouseout.ui.tooltip');
            }

            if (this._triggers.includes('focus')) {
                dom.removeEvent(this._node, 'focus.ui.tooltip');
                dom.removeEvent(this._node, 'blur.ui.tooltip');
            }

            if (this._triggers.includes('click')) {
                dom.removeEvent(this._node, 'click.ui.tooltip');
            }

            if (this._modal) {
                dom.removeEvent(this._modal, 'hide.ui.modal');
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
         * @returns {Tooltip} The Tooltip.
         */
        disable() {
            this._enabled = false;

            return this;
        }

        /**
         * Enable the Tooltip.
         * @returns {Tooltip} The Tooltip.
         */
        enable() {
            this._enabled = true;

            return this;
        }

        /**
         * Hide the Tooltip.
         * @returns {Tooltip} The Tooltip.
         */
        hide() {
            if (!this._enabled) {
                return this;
            }

            if (
                this._animating ||
                !dom.isConnected(this._tooltip) ||
                !dom.triggerOne(this._node, 'hide.ui.tooltip')
            ) {
                return this;
            }

            this._animating = true;

            dom.fadeOut(this._tooltip, {
                duration: this._settings.duration
            }).then(_ => {
                this._popper.dispose();
                this._popper = null;

                dom.removeClass(this._tooltip, 'show');
                dom.detach(this._tooltip);
                dom.triggerEvent(this._node, 'hidden.ui.tooltip');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });

            return this;
        }

        /**
         * Refresh the Tooltip.
         * @returns {Tooltip} The Tooltip.
         */
        refresh() {
            if (dom.hasAttribute(this._node, 'title')) {
                const originalTitle = dom.getAttribute(this._node, 'title')
                dom.setDataset(this._node, 'uiOriginalTitle', originalTitle);
                dom.removeAttribute(this._node, 'title');
            }

            let title = '';
            if (dom.hasDataset(this._node, 'uiTitle')) {
                title = dom.getDataset(this._node, 'uiTitle');
            } else if (this._settings.title) {
                title = this._settings.title;
            } else if (dom.hasDataset(this._node, 'uiOriginalTitle')) {
                title = dom.getDataset(this._node, 'uiOriginalTitle', title);
            }

            const method = this._settings.html ? 'setHTML' : 'setText';

            dom[method](
                this._tooltipInner,
                this._settings.html && this._settings.sanitize ?
                    this._settings.sanitize(title) :
                    title
            );

            return this.update();
        }

        /**
         * Show the Tooltip.
         * @returns {Tooltip} The Tooltip.
         */
        show() {
            if (!this._enabled) {
                return this;
            }

            if (
                this._animating ||
                dom.isConnected(this._tooltip) ||
                !dom.triggerOne(this._node, 'show.ui.tooltip')
            ) {
                return this;
            }

            this._animating = true;
            dom.addClass(this._tooltip, 'show');
            this.refresh();
            this._show();

            dom.fadeIn(this._tooltip, {
                duration: this._settings.duration
            }).then(_ => {
                dom.triggerEvent(this._node, 'shown.ui.tooltip');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });

            return this;
        }

        /**
         * Toggle the Tooltip.
         * @returns {Tooltip} The Tooltip.
         */
        toggle() {
            return dom.isConnected(this._tooltip) ?
                this.hide() :
                this.show();
        }

        /**
         * Update the Tooltip position.
         * @returns {Tooltip} The Tooltip.
         */
        update() {
            if (this._popper) {
                this._popper.update();
            }

            return this;
        }

    }


    /**
     * Tooltip Events
     */

    Object.assign(Tooltip.prototype, {

        /**
         * Attach events for the Tooltip.
         */
        _events() {
            if (this._triggers.includes('hover')) {
                dom.addEvent(this._node, 'mouseover.ui.tooltip', _ => {
                    this._stop();
                    this.show();
                });

                dom.addEvent(this._node, 'mouseout.ui.tooltip', _ => {
                    this._stop();
                    this.hide();
                });
            }

            if (this._triggers.includes('focus')) {
                dom.addEvent(this._node, 'focus.ui.tooltip', _ => {
                    this._stop();
                    this.show();
                });

                dom.addEvent(this._node, 'blur.ui.tooltip', _ => {
                    this._stop();
                    this.hide();
                });
            }

            if (this._triggers.includes('click')) {
                dom.addEvent(this._node, 'click.ui.tooltip', e => {
                    e.preventDefault();

                    this._stop();
                    this.toggle();
                });
            }

            if (this._modal) {
                dom.addEvent(this._modal, 'hide.ui.modal', _ => {
                    this._stop();
                    this.hide();
                });
            }
        }

    });


    /**
     * Tooltip Helpers
     */

    Object.assign(Tooltip.prototype, {

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
            if (this._settings.appendTo) {
                dom.append(this._settings.appendTo, this._tooltip);
            } else {
                dom.after(this._node, this._tooltip);
            }

            if (!this._settings.noAttributes) {
                const id = UI.generateId(this.constructor.DATA_KEY);
                dom.setAttribute(this._tooltip, 'id', id);
                dom.setAttribute(this._node, 'aria-described-by', id);
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
                    minContact: this._settings.minContact,
                    noAttributes: this._settings.noAttributes
                }
            );

            window.requestAnimationFrame(_ => {
                this.update();
            });
        },

        /**
         * Stop the animations.
         */
        _stop() {
            if (this._enabled && this._animating) {
                dom.stop(this._tooltip);
                this._animating = false;
            }
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
        appendTo: null,
        sanitize: input => dom.sanitize(input),
        placement: 'auto',
        position: 'center',
        fixed: false,
        spacing: 2,
        minContact: false,
        noAttributes: false
    };

    UI.initComponent('tooltip', Tooltip);

    UI.Tooltip = Tooltip;


    // Track the target of mousedown events
    dom.addEvent(window, 'mousedown.ui', e => {
        UI._clickTarget = e.target;
    }, true);

    dom.addEvent(window, 'mouseup.ui', _ => {
        setTimeout(_ => {
            UI._clickTarget = null;
        }, 0);
    }, true);


    /**
     * Add scrollbar padding to the body.
     */
    UI.addScrollPadding = (node = document.body) => {
        const scrollSizeY = UI.getScrollbarSize(window, document, 'y');
        const scrollSizeX = UI.getScrollbarSize(window, document, 'x');

        if (scrollSizeY) {
            const currentPaddingRight = dom.getStyle(node, 'paddingRight');
            const paddingRight = dom.css(node, 'paddingRight');

            dom.setDataset(node, 'uiPaddingRight', currentPaddingRight);
            dom.setStyle(node, 'paddingRight', `${scrollSizeY + parseInt(paddingRight)}px`);
        }

        if (scrollSizeX) {
            const currentPaddingBottom = dom.getStyle(node, 'paddingBottom');
            const paddingBottom = dom.css(node, 'paddingBottom');

            dom.setDataset(node, 'uiPaddingBottom', currentPaddingBottom);
            dom.setStyle(node, 'paddingBottom', `${scrollSizeX + parseInt(paddingBottom)}px`);
        }
    };

    /**
     * Generate a unique element ID.
     * @returns {string} The unique ID.
     */
    UI.generateId = prefix => {
        const id = `${prefix}${Core.randomInt(10000, 99999)}`;

        if (dom.findOne(`#${id}`)) {
            return UI.generateId(prefix);
        }

        return id;
    };

    /**
     * Get a click event target.
     * @param {Event} e The click event.
     * @returns {HTMLElement} The click event target.
     */
    UI.getClickTarget = e => {
        return UI._clickTarget || e.target;
    };

    /**
     * Get the scrollbar size for a given axis.
     * @param {HTMLElement|Window} node The input node.
     * @param {HTMLElement|Document} scrollNode The scroll node.
     * @param {string} [axis] The axis to check.
     * @returns {number} The scrollbar size.
     */
    UI.getScrollbarSize = (node = window, scrollNode = document, axis) => {
        const method = axis === 'x' ? 'width' : 'height';
        const size = dom[method](node);
        const scrollSize = dom[method](scrollNode, DOM.SCROLL_BOX);

        if (scrollSize > size) {
            return UI._calculateScrollbarSize();
        }

        return 0;
    };
    /**
     * Reset body scrollbar padding.
     */
    UI.resetScrollPadding = (node = document.body) => {
        const paddingRight = dom.getDataset(node, 'uiPaddingRight');
        const paddingBottom = dom.getDataset(node, 'uiPaddingBottom');

        dom.setStyle(node, { paddingRight, paddingBottom });

        dom.removeDataset(node, 'uiPaddingRight');
        dom.removeDataset(node, 'uiPaddingBottom');
    };

    /**
     * Get the size of the scrollbar.
     * @returns {number} The scrollbar size.
     */
    UI._calculateScrollbarSize = _ => {
        if (UI._scrollbarSize) {
            return UI._scrollbarSize;
        }

        const div = dom.create('div', {
            style: {
                width: '100px',
                height: '100px',
                overflow: 'scroll',
                position: 'absolute',
                top: '-9999px'
            }
        });
        dom.append(document.body, div);

        UI._scrollbarSize = dom.getProperty(div, 'offsetWidth') - dom.width(div);

        dom.detach(div);

        return UI._scrollbarSize;
    };


    // Clipboard events
    dom.addEventDelegate(document, 'click', '[data-ui-toggle="clipboard"]', e => {
        e.preventDefault();

        const node = e.currentTarget;
        const settings = Core.extend(
            {
                action: 'copy',
                text: false
            },
            UI.getDataset(node)
        );

        if (!['copy', 'cut'].includes(settings.action)) {
            throw new Error('Invalid clipboard action');
        }

        let text, input;
        if (settings.text) {
            text = settings.text;
        } else {
            const target = UI.getTarget(node);
            if (dom.is(target, 'input, textarea')) {
                input = target;
            } else {
                text = dom.getText(target);
            }
        }

        const customText = !input;
        if (customText) {
            input = dom.create(
                'textarea',
                {
                    class: 'visually-hidden position-fixed',
                    value: text
                }
            );

            dom.append(document.body, input);
        }

        dom.select(input);

        if (dom.exec(settings.action)) {
            dom.triggerEvent(node, 'copied.ui.clipboard', {
                detail: {
                    action: settings.action,
                    text: dom.getValue(input)
                }
            });
        }

        if (customText) {
            dom.remove(input);
        }
    });


    // Ripple events
    dom.addEventDelegate(document, 'mousedown.ui.ripple', '.ripple', e => {
        const target = e.currentTarget;
        const pos = dom.position(target, true);

        const width = dom.width(target);
        const height = dom.height(target);
        const scaleMultiple = Math.max(width, height) * 3;

        const isFixed = dom.isFixed(target);
        const mouseX = isFixed ? e.clientX : e.pageX;
        const mouseY = isFixed ? e.clientY : e.pageY;

        const prevRipple = dom.findOne(':scope > .ripple-effect', target);

        if (prevRipple) {
            dom.remove(prevRipple);
        }

        const ripple = dom.create('span', {
            class: 'ripple-effect',
            style: {
                left: mouseX - pos.x,
                top: mouseY - pos.y
            }
        });
        dom.append(target, ripple);

        const animation = dom.animate(
            ripple,
            (node, progress) => {
                dom.setStyle(node, {
                    transform: 'scale(' + Math.floor(progress * scaleMultiple) + ')'
                });
            },
            {
                duration: 500
            }
        );

        dom.addEventOnce(document, 'mouseup.ui.ripple', _ => {
            animation.finally(_ => {
                dom.animate(
                    ripple,
                    (node, progress) => {
                        dom.setStyle(node, {
                            opacity: 1 - Math.pow(progress, 2)
                        });
                    },
                    {
                        duration: 250
                    }
                ).finally(_ => {
                    dom.remove(ripple);
                });
            });
        });
    });


    // Text expand events
    dom.addEventDelegate(document, 'change.ui.expand input.ui.expand', '.text-expand', e => {
        const textArea = e.currentTarget;

        dom.setStyle(textArea, 'height', 'inherit');

        const borderTop = dom.css(textArea, 'borderTop');
        const borderBottom = dom.css(textArea, 'borderBottom');
        const height = dom.height(textArea, DOM.SCROLL_BOX) + parseInt(borderTop) + parseInt(borderBottom);

        dom.setStyle(textArea, 'height', height);
    });

    return {
        UI
    };
});