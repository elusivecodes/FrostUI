/**
 * Toast Private
 */

Object.assign(Toast.prototype, {

    /**
     * Attach events for the Toast.
     */
    _events() {
        this._dismissEvent = e => {
            e.preventDefault();

            this.hide().catch(_ => { });
        };

        if (this._dismiss.length) {
            dom.addEvent(this._dismiss, 'click.frost.toast', this._dismissEvent);
        }

    }

});
