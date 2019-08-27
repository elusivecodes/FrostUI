/**
 * Tooltip Class
 * @class
 */
class Tooltip {

    /**
     * New Tooltip constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Tooltip with.
     * @returns {Tooltip} A new Tooltip object.
     */
    constructor(node, settings) {
        this._node = node;
        this._settings = {
            ...Tooltip.defaults,
            ...dom.getDataset(this._node),
            ...settings
        };

        if (this._settings.container) {
            this._container = dom.findOne(this._settings.container);
        }

        this._triggers = this._settings.trigger.split(' ');

        this._events();

        if (this._settings.enable) {
            this.enable();
        }

        dom.setData(this._node, 'tooltip', this);
    }

    /**
     * Destroy the Tooltip.
     */
    destroy() {
        if (this._tooltip) {
            this._popper.destroy();
            dom.remove(this._tooltip);
            this._tooltip = null;
            this._popper = null;
        }

        if (this._triggers.includes('hover')) {
            dom.removeEvent(this._node, 'mouseover.frost.tooltip', this._hoverEvent);
            dom.removeEvent(this._node, 'mouseout.frost.tooltip', this._hideEvent);
        }

        if (this._triggers.includes('focus')) {
            dom.removeEvent(this._node, 'focus.frost.tooltip', this._focusEvent);
            dom.removeEvent(this._node, 'blur.frost.tooltip', this._hideEvent);
        }

        if (this._triggers.includes('click')) {
            dom.removeEvent(this._node, 'click.frost.tooltip', this._clickEvent);
        }

        dom.removeData(this._node, 'tooltip', this);
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
     * @returns {Promise}
     */
    hide() {
        return new Promise((resolve, reject) => {
            if (!this._tooltip) {
                return reject();
            }

            if (!DOM._triggerEvent(this._node, 'hide.frost.tooltip')) {
                return reject();
            }

            dom.setDataset(this._tooltip, 'animating', 'true');

            dom.stop(this._tooltip);
            dom.fadeOut(this._tooltip, {
                duration: this._settings.duration
            }).then(_ => {
                this._popper.destroy();
                dom.remove(this._tooltip);
                this._tooltip = null;
                this._popper = null;

                dom.triggerEvent(this._node, 'hidden.frost.tooltip');
                resolve();
            }).catch(_ => {
                dom.removeAttribute(this._tooltip, 'data-animating');
                reject();
            });
        });
    }

    /**
     * Show the Tooltip.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    show() {
        return new Promise((resolve, reject) => {
            if (this._tooltip) {
                return reject();
            }

            if (!DOM._triggerEvent(this._node, 'show.frost.tooltip')) {
                return reject();
            }

            this._render();

            dom.setDataset(this._tooltip, 'animating', 'true');

            dom.addClass(this._tooltip, 'show');
            dom.fadeIn(this._tooltip, {
                duration: this._settings.duration
            }).then(_ => {
                dom.triggerEvent(this._node, 'shown.frost.tooltip');
                resolve();
            }).catch(_ =>
                reject()
            ).finally(_ =>
                dom.removeAttribute(this._popover, 'data-animating')
            );
        });
    }

    /**
     * Toggle the Tooltip.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    toggle() {
        return this._tooltip ?
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
