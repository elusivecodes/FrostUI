/**
 * Tooltip Class
 * @class
 */
class Tooltip {

    /**
     * New Tooltip constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Tooltip with.
     * @param {string} [settings.template] The HTML template for the tooltip.
     * @param {number} [settings.duration=100] The duration of the animation.
     * @param {Boolean} [settings.enable=true] Whether the tooltip is enabled.
     * @param {Boolean} [settings.html=false] Whether to allow HTML in the tooltip.
     * @param {function} [settings.sanitize] The HTML sanitization function.
     * @param {string} [settings.trigger=hover focus] The events to trigger the tooltip.
     * @param {string} [settings.placement=auto] The placement of the tooltip relative to the toggle.
     * @param {string} [settings.position=center] The position of the tooltip relative to the toggle.
     * @param {Boolean} [settings.fixed=false] Whether the tooltip position is fixed.
     * @param {number} [settings.spacing=2] The spacing between the tooltip and the toggle.
     * @param {number} [settings.minContact=false] The minimum amount of contact the tooltip must make with the toggle.
     * @returns {Tooltip} A new Tooltip object.
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

        dom.setData(this._node, 'tooltip', this);
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
            dom.removeEvent(this._node, 'mouseover.frost.tooltip');
            dom.removeEvent(this._node, 'mouseout.frost.tooltip');
        }

        if (this._triggers.includes('focus')) {
            dom.removeEvent(this._node, 'focus.frost.tooltip');
            dom.removeEvent(this._node, 'blur.frost.tooltip');
        }

        if (this._triggers.includes('click')) {
            dom.removeEvent(this._node, 'click.frost.tooltip');
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
     */
    hide() {
        if (this._animating) {
            dom.stop(this._tooltip);
        }

        if (
            !dom.isConnected(this._tooltip) ||
            !dom.triggerOne(this._node, 'hide.frost.tooltip')
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
            dom.triggerEvent(this._node, 'hidden.frost.tooltip');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });
    }

    /**
     * Show the Tooltip.
     */
    show() {
        if (this._animating) {
            dom.stop(this._tooltip);
        }

        if (
            dom.isConnected(this._tooltip) ||
            !dom.triggerOne(this._node, 'show.frost.tooltip')
        ) {
            return;
        }

        this._show();

        this._animating = true;
        dom.addClass(this._tooltip, 'show');

        dom.fadeIn(this._tooltip, {
            duration: this._settings.duration
        }).then(_ => {
            dom.triggerEvent(this._node, 'shown.frost.tooltip');
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
        if (this._popper) {
            this._popper.update();
        }
    }

    /**
     * Initialize a Tooltip.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Tooltip with.
     * @param {string} [settings.template] The HTML template for the tooltip.
     * @param {number} [settings.duration=100] The duration of the animation.
     * @param {Boolean} [settings.enable=true] Whether the tooltip is enabled.
     * @param {Boolean} [settings.html=false] Whether to allow HTML in the tooltip.
     * @param {function} [settings.sanitize] The HTML sanitization function.
     * @param {string} [settings.trigger=hover focus] The events to trigger the tooltip.
     * @param {string} [settings.placement=auto] The placement of the tooltip relative to the toggle.
     * @param {string} [settings.position=center] The position of the tooltip relative to the toggle.
     * @param {Boolean} [settings.fixed=false] Whether the tooltip position is fixed.
     * @param {number} [settings.spacing=2] The spacing between the tooltip and the toggle.
     * @param {number} [settings.minContact=false] The minimum amount of contact the tooltip must make with the toggle.
     * @returns {Tooltip} A new Tooltip object.
     */
    static init(node, settings) {
        return dom.hasData(node, 'tooltip') ?
            dom.getData(node, 'tooltip') :
            new this(node, settings);
    }

}
