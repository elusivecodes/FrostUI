/**
 * Tooltip Helpers
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
    },

    /**
     * Render the Tooltip element.
     */
    _render() {
        this._tooltip = dom.parseHTML(this._settings.template).shift();
        if (this._settings.customClass) {
            dom.addClass(this._tooltip, this._settings.customClass);
        }
        this._arrow = dom.find('.tooltip-arrow', this._tooltip);
        this._tooltipInner = dom.find('.tooltip-inner', this._tooltip);
    },

    /**
     * Update the Tooltip and append to the DOM.
     */
    _show() {
        if (this._settings.appendTo) {
            dom.append(this._settings.appendTo, this._tooltip);
        } else {
            dom.after(this._node, this._tooltip);
        }

        this._popper = new Popper(
            this._tooltip,
            {
                reference: this._node,
                arrow: this._arrow,
                placement: this._settings.placement,
                position: this._settings.position,
                fixed: this._settings.fixed,
                spacing: this._settings.spacing,
                minContact: this._settings.minContact
            }
        );
    }

});
