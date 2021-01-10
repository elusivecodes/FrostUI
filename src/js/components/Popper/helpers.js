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
