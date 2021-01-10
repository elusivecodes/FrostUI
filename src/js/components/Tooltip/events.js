/**
 * Tooltip Events
 */

Object.assign(Tooltip.prototype, {

    /**
     * Attach events for the Tooltip.
     */
    _events() {
        if (this._triggers.includes('hover')) {
            dom.addEvent(this._node, 'mouseover.ui.tooltip', _ => {
                this.show();
            });

            dom.addEvent(this._node, 'mouseout.ui.tooltip', _ => {
                this.hide();
            });
        }

        if (this._triggers.includes('focus')) {
            dom.addEvent(this._node, 'focus.ui.tooltip', _ => {
                this.show();
            });

            dom.addEvent(this._node, 'blur.ui.tooltip', _ => {
                this.hide();
            });
        }

        if (this._triggers.includes('click')) {
            dom.addEvent(this._node, 'click.ui.tooltip', e => {
                e.preventDefault();

                this.toggle();
            });
        }

        if (this._modal) {
            dom.addEvent(this._modal, 'hide.ui.modal', _ => {
                this.hide();
            });
        }
    }

});
