/**
 * Popover Helpers
 */

Object.assign(Popover.prototype, {

    /**
     * Render the Popover element.
     */
    _render() {
        this._popover = dom.parseHTML(this._settings.template).shift();
        if (this._settings.customClass) {
            dom.addClass(this._popover, this._settings.customClass);
        }
        this._arrow = dom.find('.popover-arrow', this._popover);
        this._popoverHeader = dom.find('.popover-header', this._popover);
        this._popoverBody = dom.find('.popover-body', this._popover);
    },

    /**
     * Update the Popover and append to the DOM.
     */
    _show() {
        if (this._settings.appendTo) {
            dom.append(this._settings.appendTo, this._popover);
        } else {
            dom.after(this._node, this._popover);
        }

        if (!this.constructor.noId) {
            const id = UI.generateId(this.constructor.DATA_KEY);
            dom.setAttribute(this._popover, 'id', id);
            dom.setAttribute(this._node, 'aria-described-by', id);
        }

        this._popper = new Popper(
            this._popover,
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

        window.requestAnimationFrame(_ => {
            this.update();
        });
    },

    /**
     * Stop the animations.
     */
    _stop() {
        if (this._enabled && this._animating) {
            dom.stop(this._popover);
            this._animating = false;
        }
    }


});
