/**
 * Button Helpers
 */

Object.assign(Button.prototype, {

    /**
     * Attach events for the Button.
     */
    _events() {
        this._clickEvent = e => {
            e.preventDefault();

            this.toggle();
        };

        dom.addEvent(this._node, 'click.frost.button', this._clickEvent);
    },

    /**
     * Toggle a checkbox-type Button.
     */
    _toggleCheckbox() {
        dom.toggleClass(this._node, 'active');

        if (this._input) {
            dom.setProperty(this._input, 'checked', !dom.getProperty(this._input, 'checked'));
            dom.triggerEvent(this._input, 'change');
        }
    },

    /**
     * Toggle a radio-type Button.
     */
    _toggleRadio() {
        dom.addClass(this._node, 'active');

        if (this._siblings) {
            dom.removeClass(this._siblings, 'active');
        }

        dom.setProperty(this._input, 'checked', true);
        dom.triggerEvent(this._input, 'change');
    }

});
