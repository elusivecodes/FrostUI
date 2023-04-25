import { $ } from './../../globals.js';

/**
 * Update the arrow.
 * @param {string} placement The placement of the Popper.
 * @param {string} position The position of the Popper.
 */
export function _updateArrow(placement, position) {
    const nodeBox = $.rect(this._node, { offset: true });
    const referenceBox = $.rect(this._options.reference, { offset: true });

    const arrowStyles = {
        position: 'absolute',
        top: '',
        right: '',
        bottom: '',
        left: '',
    };
    $.setStyle(this._options.arrow, arrowStyles);

    const arrowBox = $.rect(this._options.arrow, { offset: true });

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

        arrowStyles.left = $._clamp(offset, min, max);
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

        arrowStyles.top = $._clamp(offset, min, max);
    }

    $.setStyle(this._options.arrow, arrowStyles);
};
