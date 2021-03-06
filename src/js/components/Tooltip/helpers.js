/**
 * Tooltip Helpers
 */

Object.assign(Tooltip.prototype, {

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

        if (!this._settings.noAttributes) {
            const id = UI.generateId(this.constructor.DATA_KEY);
            dom.setAttribute(this._tooltip, 'id', id);
            dom.setAttribute(this._node, 'aria-described-by', id);
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
                minContact: this._settings.minContact,
                noAttributes: this._settings.noAttributes
            }
        );

        window.requestAnimationFrame(_ => {
            this.update();
        });
    },

    /**
     * Stop the animations.
     */
    _stop() {
        if (this._enabled && this._animating) {
            dom.stop(this._tooltip);
            this._animating = false;
        }
    }

});
