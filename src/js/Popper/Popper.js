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
        if (!dom.isConnected(this._node)) {
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

        dom.setDataset(this._settings.reference, 'uiPlacement', placement);
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
