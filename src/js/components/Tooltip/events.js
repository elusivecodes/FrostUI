/**
 * Tooltip Events
 */

Object.assign(Tooltip.prototype, {

    /**
     * Attach events for the Tooltip.
     */
    _events() {
        const stop = _ => {
            if (this._enabled && this._animating) {
                dom.stop(this._tooltip);
                this._animating = false;
            }
        };

        if (this._triggers.includes('hover')) {
            dom.addEvent(this._node, 'mouseover.ui.tooltip', _ => {
                stop();
                this.show();
            });

            dom.addEvent(this._node, 'mouseout.ui.tooltip', _ => {
                stop();
                this.hide();
            });
        }

        if (this._triggers.includes('focus')) {
            dom.addEvent(this._node, 'focus.ui.tooltip', _ => {
                stop();
                this.show();
            });

            dom.addEvent(this._node, 'blur.ui.tooltip', _ => {
                stop();
                this.hide();
            });
        }

        if (this._triggers.includes('click')) {
            dom.addEvent(this._node, 'click.ui.tooltip', e => {
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
