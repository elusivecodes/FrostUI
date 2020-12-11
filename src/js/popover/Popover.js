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
     * Destroy the Popover.
     */
    destroy() {
        if (this._popper) {
            this._popper.destroy();
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

        super.destroy();
    }

    /**
     * Disable the Popover.
     */
    disable() {
        this._enabled = false;
    }

    /**
     * Enable the Popover.
     */
    enable() {
        this._enabled = true;
    }

    /**
     * Hide the Popover.
     */
    hide() {
        if (!this._enabled) {
            return;
        }

        if (this._animating) {
            dom.stop(this._popover);
        }

        if (
            !dom.isConnected(this._popover) ||
            !dom.triggerOne(this._node, 'hide.ui.popover')
        ) {
            return;
        }

        this._animating = true;

        dom.fadeOut(this._popover, {
            duration: this._settings.duration
        }).then(_ => {
            this._popper.destroy();
            dom.removeClass(this._popover, 'show');
            dom.detach(this._popover);
            dom.triggerEvent(this._node, 'hidden.ui.popover');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });
    }

    /**
     * Show the Popover.
     */
    show() {
        if (!this._enabled) {
            return;
        }

        if (this._animating) {
            dom.stop(this._popover);
        }

        if (
            dom.isConnected(this._popover) ||
            !dom.triggerOne(this._node, 'show.ui.popover')
        ) {
            return;
        }

        this._animating = true;
        dom.addClass(this._popover, 'show');
        this._show();

        dom.fadeIn(this._popover, {
            duration: this._settings.duration
        }).then(_ => {
            dom.triggerEvent(this._node, 'shown.ui.popover');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });
    }

    /**
     * Toggle the Popover.
     */
    toggle() {
        dom.isConnected(this._popover) ?
            this.hide() :
            this.show();
    }

    /**
     * Update the Popover position.
     */
    update() {
        if (!this._popper) {
            return;
        }

        this._popper.update();
    }

}
