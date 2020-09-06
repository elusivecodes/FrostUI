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
            this.constructor.defaults,
            dom.getDataset(this._node),
            settings
        );

        this._fixed = dom.isFixed(this._settings.reference);
        this._scrollParent = this.constructor.getScrollParent(this._node);
        this._relativeParent = this.constructor.getRelativeParent(this._node);

        dom.setStyle(this._node, {
            position: this._fixed ?
                'fixed' :
                'absolute',
            top: 0,
            left: 0
        });

        PopperSet.add(this);

        if (this._scrollParent) {
            PopperSet.addOverflow(this._scrollParent, this);
        }

        dom.addEvent(this._node, 'remove.frost.popper', _ => {
            this.destroy();
        });

        this.update();

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

        // calculate boxes
        const nodeBox = dom.rect(this._node, !this._fixed);
        const referenceBox = dom.rect(this._settings.reference, !this._fixed);
        const windowBox = this.constructor.windowContainer(this._fixed);

        // check object could be seen
        if (this.constructor.isNodeHidden(nodeBox, referenceBox, windowBox, this._settings.spacing)) {
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
        const relativeBox = this._relativeParent && !this._fixed ?
            dom.rect(this._relativeParent, !this._fixed) :
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
            const newNodeBox = dom.rect(this._node, !this._fixed);
            this._updateArrow(newNodeBox, referenceBox, placement, position);
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

}
