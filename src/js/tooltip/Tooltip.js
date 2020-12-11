/**
 * Tooltip Class
 * @class
 */
class Tooltip extends BaseComponent {

    /**
     * New Tooltip constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Tooltip with.
     * @returns {Tooltip} A new Tooltip object.
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
     * Destroy the Tooltip.
     */
    destroy() {
        if (this._popper) {
            this._popper.destroy();
        }

        dom.remove(this._tooltip);

        if (this._triggers.includes('hover')) {
            dom.removeEvent(this._node, 'mouseover.ui.tooltip');
            dom.removeEvent(this._node, 'mouseout.ui.tooltip');
        }

        if (this._triggers.includes('focus')) {
            dom.removeEvent(this._node, 'focus.ui.tooltip');
            dom.removeEvent(this._node, 'blur.ui.tooltip');
        }

        if (this._triggers.includes('click')) {
            dom.removeEvent(this._node, 'click.ui.tooltip');
        }

        if (this._modal) {
            dom.removeEvent(this._modal, 'hide.ui.modal');
        }

        super.destroy();
    }

    /**
     * Disable the Tooltip.
     */
    disable() {
        this._enabled = false;
    }

    /**
     * Enable the Tooltip.
     */
    enable() {
        this._enabled = true;
    }

    /**
     * Hide the Tooltip.
     */
    hide() {
        if (!this._enabled) {
            return;
        }

        if (this._animating) {
            dom.stop(this._tooltip);
        }

        if (
            !dom.isConnected(this._tooltip) ||
            !dom.triggerOne(this._node, 'hide.ui.tooltip')
        ) {
            return;
        }

        this._animating = true;

        dom.fadeOut(this._tooltip, {
            duration: this._settings.duration
        }).then(_ => {
            this._popper.destroy();
            dom.removeClass(this._tooltip, 'show');
            dom.detach(this._tooltip);
            dom.triggerEvent(this._node, 'hidden.ui.tooltip');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });
    }

    /**
     * Show the Tooltip.
     */
    show() {
        if (!this._enabled) {
            return;
        }

        if (this._animating) {
            dom.stop(this._tooltip);
        }

        if (
            dom.isConnected(this._tooltip) ||
            !dom.triggerOne(this._node, 'show.ui.tooltip')
        ) {
            return;
        }

        this._animating = true;
        dom.addClass(this._tooltip, 'show');
        this._show();

        dom.fadeIn(this._tooltip, {
            duration: this._settings.duration
        }).then(_ => {
            dom.triggerEvent(this._node, 'shown.ui.tooltip');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });
    }

    /**
     * Toggle the Tooltip.
     */
    toggle() {
        dom.isConnected(this._tooltip) ?
            this.hide() :
            this.show();
    }

    /**
     * Update the Tooltip position.
     */
    update() {
        if (!this._popper) {
            return;
        }

        this._popper.update();
    }

}
