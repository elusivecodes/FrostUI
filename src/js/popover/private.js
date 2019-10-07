/**
 * Popover Private
 */

Object.assign(Popover.prototype, {

    /**
     * Attach events for the Popover.
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

            dom.addEventOnce(this._node, 'mouseout.frost.popover', this._hideEvent);

            this.show().catch(_ => { });
        };

        this._focusEvent = _ => {
            if (!this._enabled) {
                return;
            }

            dom.addEventOnce(this._node, 'blur.frost.popover', this._hideEvent);

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
            dom.addEvent(this._node, 'mouseover.frost.popover', this._hoverEvent);
        }

        if (this._triggers.includes('focus')) {
            dom.addEvent(this._node, 'focus.frost.popover', this._focusEvent);
        }

        if (this._triggers.includes('click')) {
            dom.addEvent(this._node, 'click.frost.popover', this._clickEvent);
        }
    },

    /**
     * Render the Popover element.
     */
    _render() {
        this._popover = dom.create('div', {
            class: this._settings.classes.popover,
            attributes: {
                role: 'tooltip'
            }
        });

        const arrow = dom.create('div', {
            class: this._settings.classes.arrow
        });


        this._popoverHeader = dom.create('h3', {
            class: this._settings.classes.popoverHeader
        });

        this._popoverBody = dom.create('div', {
            class: this._settings.classes.popoverBody
        });

        dom.append(this._popover, arrow);
        dom.append(this._popover, this._popoverHeader);
        dom.append(this._popover, this._popoverBody);

        this._popper = new Popper(
            this._popover,
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

        this._popper.update();
    }

});
