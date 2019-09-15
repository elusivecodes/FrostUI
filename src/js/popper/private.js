/**
 * Popper Private
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
    }

});
