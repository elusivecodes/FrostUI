/**
 * Popover Events
 */

Object.assign(Popover.prototype, {

    /**
     * Attach events for the Popover.
     */
    _events() {
        const stop = _ => {
            if (this._enabled && this._animating) {
                dom.stop(this._popover);
                this._animating = false;
            }
        };

        if (this._triggers.includes('hover')) {
            dom.addEvent(this._node, 'mouseover.ui.popover', _ => {
                stop();
                this.show();
            });

            dom.addEvent(this._node, 'mouseout.ui.popover', _ => {
                stop();
                this.hide();
            });
        }

        if (this._triggers.includes('focus')) {
            dom.addEvent(this._node, 'focus.ui.popover', _ => {
                stop();
                this.show();
            });

            dom.addEvent(this._node, 'blur.ui.popover', _ => {
                stop();
                this.hide();
            });
        }

        if (this._triggers.includes('click')) {
            dom.addEvent(this._node, 'click.ui.popover', e => {
                e.preventDefault();

                stop();
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
