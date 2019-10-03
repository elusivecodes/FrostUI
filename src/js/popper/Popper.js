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
    }

}
