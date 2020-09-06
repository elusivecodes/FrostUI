/**
 * Popover Class
 * @class
 */
class Popover {

    /**
     * New Popover constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Popover with.
     * @param {string} [settings.template] The HTML template for the popover.
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

        this._settings = Core.extend(
            {},
            this.constructor.defaults,
            dom.getDataset(this._node),
            settings
        );

        this._triggers = this._settings.trigger.split(' ');

        this._render();
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
        if (this._popper) {
            this._popper.destroy();
        }

        dom.remove(this._popover);

        if (this._triggers.includes('hover')) {
            dom.removeEvent(this._node, 'mouseover.frost.popover');
            dom.removeEvent(this._node, 'mouseout.frost.popover');
        }

        if (this._triggers.includes('focus')) {
            dom.removeEvent(this._node, 'focus.frost.popover');
            dom.removeEvent(this._node, 'blur.frost.popover');
        }

        if (this._triggers.includes('click')) {
            dom.removeEvent(this._node, 'click.frost.popover');
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
     */
    hide() {
        if (this._animating) {
            dom.stop(this._popover);
        }

        if (
            !dom.isConnected(this._popover) ||
            !dom.triggerOne(this._node, 'hide.frost.popover')
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
            dom.triggerEvent(this._node, 'hidden.frost.popover');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });
    }

    /**
     * Show the Popover.
     */
    show() {
        if (this._animating) {
            dom.stop(this._popover);
        }

        if (
            dom.isConnected(this._popover) ||
            !dom.triggerOne(this._node, 'show.frost.popover')
        ) {
            return;
        }

        this._show();

        this._animating = true;
        dom.addClass(this._popover, 'show');

        dom.fadeIn(this._popover, {
            duration: this._settings.duration
        }).then(_ => {
            dom.triggerEvent(this._node, 'shown.frost.popover');
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
        if (this._popper) {
            this._popper.update();
        }
    }

    /**
     * Initialize a Popover.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Popover with.
     * @param {string} [settings.template] The HTML template for the popover.
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
    static init(node, settings) {
        return dom.hasData(node, 'popover') ?
            dom.getData(node, 'popover') :
            new this(node, settings);
    }

}
