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
            arrowStyles[placement === 'top' ? 'bottom' : 'top'] = -arrowBox.height;
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

            arrowStyles.left = Core.clamp(offset, min, max);
        } else {
            arrowStyles[placement === 'right' ? 'left' : 'right'] = -arrowBox.width;

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
            }

            arrowStyles.top = Core.clamp(offset, min, max);
        }

        dom.setStyle(this._settings.arrow, arrowStyles);
    }

});
