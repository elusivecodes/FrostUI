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
