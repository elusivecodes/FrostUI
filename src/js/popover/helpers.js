/**
 * Popover Helpers
 */

Object.assign(Popover.prototype, {

    /**
     * Attach events for the Popover.
     */
    _events() {
        if (this._triggers.includes('hover')) {
            dom.addEvent(this._node, 'mouseover.ui.popover', _ => {
                this.show();
            });

            dom.addEvent(this._node, 'mouseout.ui.popover', _ => {
                this.hide();
            });
        }

        if (this._triggers.includes('focus')) {
            dom.addEvent(this._node, 'focus.ui.popover', _ => {
                this.show();
            });

            dom.addEvent(this._node, 'blur.ui.popover', _ => {
                this.hide();
            });
        }

        if (this._triggers.includes('click')) {
            dom.addEvent(this._node, 'click.ui.popover', e => {
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
        const method = this._settings.html ? 'setHTML' : 'setText';
        const title = dom.getAttribute(this._node, 'title') || this._settings.title;
        const content = this._settings.content;

        dom[method](
            this._popoverHeader,
            this._settings.html && this._settings.sanitize ?
                this._settings.sanitize(title) :
                title
        );

        if (!title) {
            dom.hide(this._popoverHeader);
        } else {
            dom.show(this._popoverHeader);
        }

        dom[method](
            this._popoverBody,
            this._settings.html && this._settings.sanitize ?
                this._settings.sanitize(content) :
                content
        );

        if (this._container) {
            dom.append(this._container, this._popover);
        } else {
            dom.before(this._node, this._popover);
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
    }

});
