/**
 * Modal Private
 */

Object.assign(Modal.prototype, {

    /**
     * Attach events for the Modal.
     */
    _events() {
        this._clickEvent = e => {
            e.preventDefault();

            this.show().catch(_ => { });
        };

        this._dismissEvent = e => {
            e.preventDefault();

            this.hide().catch(_ => { });
        };

        this._documentClickEvent = e => {
            if (dom.isSame(e.target, this._dialog) || dom.hasDescendent(this._dialog, e.target)) {
                return;
            }

            this.hide().catch(_ => { });
        };

        this._windowKeyDownEvent = e => {
            if (e.key !== 'Escape') {
                return;
            }

            e.preventDefault();

            this.hide().catch(_ => { });
        };

        if (this._dismiss.length) {
            dom.addEvent(this._dismiss, 'click.frost.modal', this._dismissEvent);
        }
    },

    _eventToggle(toggle) {
        dom.addEvent(toggle, 'click.frost.modal', this._clickEvent);

        this._toggles.push(toggle);
    }

});
