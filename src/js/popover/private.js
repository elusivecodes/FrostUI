/**
 * Popover Private
 */

Object.assign(Popover.prototype, {

    /**
     * Attach events for the Popover.
     */
    _events() {
        this._hideEvent = _ => {
            if (!this._enabled) {
                return;
            }

            this.hide().catch(_ => { });
        };

        this._hoverEvent = _ => {
            if (!this._enabled) {
                return;
            }

            this.show()
                .then(_ =>
                    dom.addEventOnce(this._node, 'mouseout.frost.popover', this._hideEvent)
                )
                .catch(_ => { });
        };

        this._focusEvent = _ => {
            if (!this._enabled) {
                return;
            }

            this.show()
                .then(_ =>
                    dom.addEventOnce(this._node, 'blur.frost.popover', this._hideEvent)
                )
                .catch(_ => { });
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
        dom.append(this._popover, arrow);

        const method = this._settings.html ? 'html' : 'text';

        const title = dom.getAttribute(this._node, 'title') || this._settings.title;
        if (title) {
            const popoverHeader = dom.create('h3', {
                [method]: this._settings.html && this._settings.sanitize ?
                    this._settings.sanitize(title) :
                    title,
                class: this._settings.classes.popoverHeader
            });
            dom.append(this._popover, popoverHeader);
        }

        const content = this._settings.content;
        if (content) {
            const popoverBody = dom.create('div', {
                [method]: this._settings.html && this._settings.sanitize ?
                    this._settings.sanitize(content) :
                    content,
                class: this._settings.classes.popoverBody
            });
            dom.append(this._popover, popoverBody);
        }

        if (this._container) {
            dom.append(this._container, this._popover);
        } else {
            dom.before(this._node, this._popover);
        }

        this._popper = new Popper(
            this._popover,
            this._node,
            {
                arrow: arrow,
                placement: this._settings.placement,
                position: this._settings.position,
                fixed: this._settings.fixed,
                spacing: this._settings.spacing,
                width: this._settings.width,
                zIndex: this._settings.zIndex
            }
        )
    }

});
