/**
 * Popover Class
 * @class
 */
class Popover extends BaseComponent {

    /**
     * New Popover constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Popover with.
     * @returns {Popover} A new Popover object.
     */
    constructor(node, settings) {
        super(node, settings);

        this._modal = dom.closest(this._node, '.modal').shift();

        this._triggers = this._settings.trigger.split(' ');

        this._render();
        this._events();

        if (this._settings.enable) {
            this.enable();
        }
    }

    /**
     * Dispose the Popover.
     */
    dispose() {
        if (this._popper) {
            this._popper.dispose();
            this._popper = null;
        }

        dom.remove(this._popover);

        if (this._triggers.includes('hover')) {
            dom.removeEvent(this._node, 'mouseover.ui.popover');
            dom.removeEvent(this._node, 'mouseout.ui.popover');
        }

        if (this._triggers.includes('focus')) {
            dom.removeEvent(this._node, 'focus.ui.popover');
            dom.removeEvent(this._node, 'blur.ui.popover');
        }

        if (this._triggers.includes('click')) {
            dom.removeEvent(this._node, 'click.ui.popover');
        }

        if (this._modal) {
            dom.removeEvent(this._modal, 'hide.ui.modal', this._hideModalEvent);
        }

        this._modal = null;
        this._triggers = null;
        this._popover = null;
        this._popoverHeader = null;
        this._popoverBody = null;

        super.dispose();
    }

    /**
     * Disable the Popover.
     * @returns {Popover} The Popover.
     */
    disable() {
        this._enabled = false;

        return this;
    }

    /**
     * Enable the Popover.
     * @returns {Popover} The Popover.
     */
    enable() {
        this._enabled = true;

        return this;
    }

    /**
     * Hide the Popover.
     * @returns {Popover} The Popover.
     */
    hide() {
        if (!this._enabled) {
            return this;
        }

        if (this._animating) {
            dom.stop(this._popover);
        }

        if (
            !dom.isConnected(this._popover) ||
            !dom.triggerOne(this._node, 'hide.ui.popover')
        ) {
            return this;
        }

        this._animating = true;

        dom.fadeOut(this._popover, {
            duration: this._settings.duration
        }).then(_ => {
            this._popper.dispose();
            this._popper = null;

            dom.removeClass(this._popover, 'show');
            dom.detach(this._popover);
            dom.triggerEvent(this._node, 'hidden.ui.popover');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });

        return this;
    }

    /**
     * Refresh the Popover.
     * @returns {Popover} The Popover.
     */
    refresh() {
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

        return this;
    }

    /**
     * Show the Popover.
     * @returns {Popover} The Popover.
     */
    show() {
        if (!this._enabled) {
            return this;
        }

        if (this._animating) {
            dom.stop(this._popover);
        }

        if (
            dom.isConnected(this._popover) ||
            !dom.triggerOne(this._node, 'show.ui.popover')
        ) {
            return this;
        }

        this._animating = true;
        dom.addClass(this._popover, 'show');
        this.refresh();
        this._show();

        dom.fadeIn(this._popover, {
            duration: this._settings.duration
        }).then(_ => {
            dom.triggerEvent(this._node, 'shown.ui.popover');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });

        return this;
    }

    /**
     * Toggle the Popover.
     * @returns {Popover} The Popover.
     */
    toggle() {
        return dom.isConnected(this._popover) ?
            this.hide() :
            this.show();
    }

    /**
     * Update the Popover position.
     * @returns {Popover} The Popover.
     */
    update() {
        if (this._popper) {
            this._popper.update();
        }

        return this;
    }

}
