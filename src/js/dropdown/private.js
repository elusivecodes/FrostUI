/**
 * Dropdown Private
 */

Object.assign(Dropdown.prototype, {

    /**
     * Attach events for the Dropdown.
     */
    _events() {
        this._clickEvent = e => {
            e.preventDefault();

            this.toggle().catch(_ => { });
        };

        this._keyUpEvent = e => {
            if (e.key !== ' ') {
                return;
            }

            e.preventDefault();

            this.toggle().catch(_ => { });
        };

        this._keyDownEvent = e => {
            if (!['ArrowDown', 'ArrowUp'].includes(e.key)) {
                return;
            }

            e.preventDefault();

            this.show().then(_ => {
                const next = dom.findOne('.dropdown-item', this._menuNode);
                dom.focus(next);
            }).catch(_ => { });
        };

        this._menuKeyDownEvent = e => {
            if (!['ArrowDown', 'ArrowUp'].includes(e.key)) {
                return;
            }

            e.preventDefault();

            if (e.key === 'ArrowDown') {
                const next = dom.nextAll(e.currentTarget, '.dropdown-item').shift();
                dom.focus(next);
            } else if (e.key === 'ArrowUp') {
                const prev = dom.prevAll(e.currentTarget, '.dropdown-item').shift();
                dom.focus(prev);
            }
        };

        this._documentClickEvent = e => {
            if (dom.isSame(e.target, this._menuNode) || dom.hasDescendent(this._menuNode, e.target)) {
                return;
            }

            this.hide().catch(_ => { });
        };

        dom.addEvent(this._node, 'click.frost.dropdown', this._clickEvent);
        dom.addEvent(this._node, 'keyup.frost.dropdown', this._keyUpEvent);
        dom.addEvent(this._node, 'keydown.frost.dropdown', this._keyDownEvent);
        dom.addEventDelegate(this._menuNode, 'keydown.frost.dropdown', '.dropdown-item', this._menuKeyDownEvent);
    }

});
