/**
 * Tab Private
 */

Object.assign(Tab.prototype, {

    /**
     * Attach events for the Tab.
     */
    _events() {
        this._clickEvent = e => {
            e.preventDefault();

            this.show();
        };

        dom.addEvent(this._node, 'click.frost.tab', this._clickEvent);
    }

});
