/**
 * Popover Class
 * @class
 */
class Popover {

    /**
     * New Popover constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Popover with.
     * @param {object} [settings.classes] The CSS classes to style the popover.
     * @param {string} [settings.classes.popover=popover] The CSS classes for the popover.
     * @param {string} [settings.classes.popoverHeader=popover-header] The CSS classes for the popover header.
     * @param {string} [settings.classes.popoverBody=popover-body] The CSS classes for the popover body.
     * @param {string} [settings.classes.arrow=arrow] The CSS classes for the arrow.
     * @param {number} [settings.duration=100] The duration of the animation.
     * @param {Boolean} [settings.enable=true] Whether the popover is enabled.
     * @param {Boolean} [settings.html=false] Whether to allow HTML in the popover.
     * @param {function} [settings.sanitize] The HTML sanitization function.
     * @param {string} [settings.trigger=click] The events to trigger the popover.
     * @param {string} [settings.placement=auto] The placement of the popover relative to the toggle.
     * @param {string} [settings.position=center] The position of the popover relative to the toggle.
     * @param {Boolean} [settings.fixed=false] Whether the popover position is fixed.
     * @param {number} [settings.spacing=7] The spacing between the popover and the toggle.
     * @param {number} [settings.minContact=false] The minimum amount of contact the popover must make with the toggle.
     * @returns {Popover} A new Popover object.
     */
    constructor(node, settings) {
        this._node = node;

        this._settings = {
            ...Popover.defaults,
            ...dom.getDataset(this._node),
            ...settings
        };

        this._triggers = this._settings.trigger.split(' ');

        this._events();

        if (this._settings.enable) {
            this.enable();
        }

        dom.setData(this._node, 'popover', this);
    }

    /**
     * Destroy the Popover.
     */
    destroy() {
        if (this._popover) {
            this._popper.destroy();

            dom.remove(this._popover);

            this._popover = null;
            this._popper = null;
        }

        if (this._triggers.includes('hover')) {
            dom.removeEvent(this._node, 'mouseover.frost.popover', this._hoverEvent);
            dom.removeEvent(this._node, 'mouseout.frost.popover', this._hideEvent);
        }

        if (this._triggers.includes('focus')) {
            dom.removeEvent(this._node, 'focus.frost.popover', this._focusEvent);
            dom.removeEvent(this._node, 'blur.frost.popover', this._hideEvent);
        }

        if (this._triggers.includes('click')) {
            dom.removeEvent(this._node, 'click.frost.popover', this._clickEvent);
        }

        dom.removeData(this._node, 'popover', this);
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
     * @returns {Promise}
     */
    hide() {
        return new Promise((resolve, reject) => {
            if (!this._popover) {
                return reject();
            }

            if (!DOM._triggerEvent(this._node, 'hide.frost.popover')) {
                return reject();
            }

            dom.setDataset(this._popover, 'animating', true);

            dom.stop(this._popover);

            dom.fadeOut(this._popover, {
                duration: this._settings.duration
            }).then(_ => {
                this._popper.destroy();

                dom.remove(this._popover);

                this._popover = null;
                this._popper = null;

                dom.triggerEvent(this._node, 'hidden.frost.popover');

                resolve();
            }).catch(_ => {
                dom.removeDataset(this._popover, 'animating');

                reject()
            });
        });
    }

    /**
     * Show the Popover.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    show() {
        return new Promise((resolve, reject) => {
            if (this._popover) {
                return reject();
            }

            if (!DOM._triggerEvent(this._node, 'show.frost.popover')) {
                return reject();
            }

            this._render();

            dom.setDataset(this._popover, 'animating', true);

            dom.addClass(this._popover, 'show');

            dom.fadeIn(this._popover, {
                duration: this._settings.duration
            }).then(_ => {
                dom.triggerEvent(this._node, 'shown.frost.popover')

                resolve();
            }).catch(_ =>
                reject()
            ).finally(_ =>
                dom.removeDataset(this._popover, 'animating')
            );
        });
    }

    /**
     * Toggle the Popover.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    toggle() {
        return this._popover ?
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
