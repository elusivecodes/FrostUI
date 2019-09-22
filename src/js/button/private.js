/**
 * Button Private
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
        }
    },

    /**
     * Toggle a radio-type Button.
     */
    _toggleRadio() {
        dom.addClass(this._node, 'active');

        dom.setProperty(this._input, 'checked', true);

        if (this._siblings.length) {
            dom.removeClass(this._siblings, 'active');
        }
    }

});
