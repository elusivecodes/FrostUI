/**
 * Tooltip Helpers
 */

Object.assign(Tooltip.prototype, {

    /**
     * Attach events for the Tooltip.
     */
    _events() {
        this._hideEvent = _ => {
            if (!this._enabled || !dom.isConnected(this._tooltip)) {
                return;
            }

            this.hide().catch(_ => { });
        };

        this._hoverEvent = _ => {
            if (!this._enabled) {
                return;
            }

            dom.addEventOnce(this._node, 'mouseout.frost.tooltip', this._hideEvent);

            this.show().catch(console.error);
        };

        this._focusEvent = _ => {
            if (!this._enabled) {
                return;
            }

            dom.addEventOnce(this._node, 'blur.frost.tooltip', this._hideEvent)

            this.show().catch(_ => { });
        };

        this._clickEvent = e => {
            e.preventDefault();

            if (!this._enabled) {
                return;
            }

            this.toggle().catch(console.error);
        };

        if (this._triggers.includes('hover')) {
            dom.addEvent(this._node, 'mouseover.frost.tooltip', this._hoverEvent);
        }

        if (this._triggers.includes('focus')) {
            dom.addEvent(this._node, 'focus.frost.tooltip', this._focusEvent);
        }

        if (this._triggers.includes('click')) {
            dom.addEvent(this._node, 'click.frost.tooltip', this._clickEvent);
        }
    },

    /**
     * Render the Tooltip element.
     */
    _render() {
        this._tooltip = dom.create('div', {
            class: this._settings.classes.tooltip,
            attributes: {
                role: 'tooltip'
            }
        });

        this._arrow = dom.create('div', {
            class: this._settings.classes.arrow
        });


        this._tooltipInner = dom.create('div', {
            class: this._settings.classes.tooltipInner
        });

        dom.append(this._tooltip, this._arrow);
        dom.append(this._tooltip, this._tooltipInner);
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
