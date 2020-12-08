/**
 * Tooltip Helpers
 */

Object.assign(Tooltip.prototype, {

    /**
     * Attach events for the Tooltip.
     */
    _events() {
        if (this._triggers.includes('hover')) {
            dom.addEvent(this._node, 'mouseover.frost.popover', _ => {
                if (!this._enabled) {
                    return;
                }

                this.show();
            });

            dom.addEvent(this._node, 'mouseout.frost.popover', _ => {
                if (!this._enabled) {
                    return;
                }

                this.hide();
            });
        }

        if (this._triggers.includes('focus')) {
            dom.addEvent(this._node, 'focus.frost.popover', _ => {
                if (!this._enabled) {
                    return;
                }

                this.show();
            });

            dom.addEvent(this._node, 'blur.frost.popover', _ => {
                if (!this._enabled) {
                    return;
                }

                this.hide();
            });
        }

        if (this._triggers.includes('click')) {
            dom.addEvent(this._node, 'click.frost.popover', e => {
                e.preventDefault();

                if (!this._enabled) {
                    return;
                }

                this.toggle();
            });
        }

        if (this._modal) {
            this._hideModalEvent = _ => {
                this.hide();
            };

            dom.addEvent(this._modal, 'hide.frost.modal', this._hideModalEvent);
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
        const title = dom.getAttribute(this._node, 'title') || this._settings.title;
        const method = this._settings.html ? 'setHTML' : 'setText';

        dom[method](
            this._tooltipInner,
            this._settings.html && this._settings.sanitize ?
                this._settings.sanitize(title) :
                title
        );

        if (this._container) {
            dom.append(this._container, this._tooltip);
        } else {
            dom.before(this._node, this._tooltip);
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
