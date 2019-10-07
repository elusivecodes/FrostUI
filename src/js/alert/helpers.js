/**
 * Alert Helpers
 */

Object.assign(Alert.prototype, {

    /**
     * Attach events for the Alert.
     */
    _events() {
        this._dismissEvent = e => {
            e.preventDefault();

            this.close().catch(_ => { });
        };

        if (this._dismiss.length) {
            dom.addEvent(this._dismiss, 'click.frost.alert', this._dismissEvent);
        }

    }

});
