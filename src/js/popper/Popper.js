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
