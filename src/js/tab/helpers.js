/**
 * Tab Helpers
 */

Object.assign(Tab.prototype, {

    /**
     * Attach events for the Tab.
     */
    _events() {
        this._clickEvent = e => {
            e.preventDefault();

            this.show().catch(_ => { });
        };

        dom.addEvent(this._node, 'click.frost.tab', this._clickEvent);
    }

});
