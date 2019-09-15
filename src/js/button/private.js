/**
 * Button Private
 */

Object.assign(Button.prototype, {

    _toggleCheckbox() {
        dom.toggleClass(this._node, 'active');

        if (this._input) {
            dom.setProperty(this._input, 'checked', !dom.getProperty(this._input, 'checked'));
        }
    },

    _toggleRadio() {
        if (dom.hasClass(this._node, 'active')) {
            return;
        }

        dom.addClass(this._node, 'active');

        dom.setProperty(this._input, 'checked', true);

        if (this._siblings.length) {
            dom.removeClass(this._siblings, 'active');
        }
    }

});
