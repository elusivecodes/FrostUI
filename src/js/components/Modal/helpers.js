/**
 * Modal Helpers
 */

Object.assign(Modal.prototype, {

    /**
     * Get the slide animation direction.
     * @returns {string} The animation direction.
     */
    _getDirection() {
        if (dom.hasClass(this._node, 'modal-left')) {
            return 'left';
        }

        if (dom.hasClass(this._node, 'modal-right')) {
            return 'right';
        }

        return 'top';
    }

});
