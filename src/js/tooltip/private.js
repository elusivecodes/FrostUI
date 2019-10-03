/**
 * Tooltip Private
 */

Object.assign(Tooltip.prototype, {

    /**
     * Attach events for the Tooltip.
     */
    _events() {
        this._hideEvent = _ => {
            if (!this._enabled || !this._tooltip) {
                return;
            }

            dom.stop(this._tooltip);
            this.hide().catch(_ => { });
        };

        this._hoverEvent = _ => {
            if (!this._enabled) {
                return;
            }

            dom.addEventOnce(this._node, 'mouseout.frost.tooltip', this._hideEvent);
            this.show().catch(_ => { });
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

            this.toggle().catch(_ => { });
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

        const arrow = dom.create('div', {
            class: this._settings.classes.arrow
        });

        dom.append(this._tooltip, arrow);

        const title = dom.getAttribute(this._node, 'title') || this._settings.title;
        const method = this._settings.html ? 'html' : 'text';

        const tooltipInner = dom.create('div', {
            [method]: this._settings.html && this._settings.sanitize ?
                this._settings.sanitize(title) :
                title,
            class: this._settings.classes.tooltipInner
        });

        dom.append(this._tooltip, tooltipInner);

        if (this._container) {
            dom.append(this._container, this._tooltip);
        } else {
            dom.before(this._node, this._tooltip);
        }

        this._popper = new Popper(
            this._tooltip,
            {
                reference: this._node,
                arrow: arrow,
                placement: this._settings.placement,
                position: this._settings.position,
                fixed: this._settings.fixed,
                spacing: this._settings.spacing,
                minContact: this._settings.minContact
            }
        )
    }

});
