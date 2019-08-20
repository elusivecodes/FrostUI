/**
 * Collapse Private
 */

Object.assign(Collapse.prototype, {

    /**
     * Attach events for the Collapse.
     */
    _events() {
        this._clickEvent = e => {
            e.preventDefault();

            this.toggle().catch(_ => { });
        };

        dom.addEvent(this._node, 'click.frost.collapse', this._clickEvent);
    }

});
