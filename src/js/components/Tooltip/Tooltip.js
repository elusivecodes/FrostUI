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
     * Dispose the Tooltip.
     */
    dispose() {
        if (this._popper) {
            this._popper.dispose();
            this._popper = null;
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

        this._modal = null;
        this._triggers = null;
        this._tooltip = null;
        this._tooltipInner = null;
        this._arrow = null;

        super.dispose();
    }

    /**
     * Disable the Tooltip.
     * @returns {Tooltip} The Tooltip.
     */
    disable() {
        this._enabled = false;

        return this;
    }

    /**
     * Enable the Tooltip.
     * @returns {Tooltip} The Tooltip.
     */
    enable() {
        this._enabled = true;

        return this;
    }

    /**
     * Hide the Tooltip.
     * @returns {Tooltip} The Tooltip.
     */
    hide() {
        if (!this._enabled) {
            return this;
        }

        if (this._animating) {
            dom.stop(this._tooltip);
        }

        if (
            !dom.isConnected(this._tooltip) ||
            !dom.triggerOne(this._node, 'hide.ui.tooltip')
        ) {
            return this;
        }

        this._animating = true;

        dom.fadeOut(this._tooltip, {
            duration: this._settings.duration
        }).then(_ => {
            this._popper.dispose();
            this._popper = null;

            dom.removeClass(this._tooltip, 'show');
            dom.detach(this._tooltip);
            dom.triggerEvent(this._node, 'hidden.ui.tooltip');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });

        return this;
    }

    /**
     * Refresh the Tooltip.
     * @returns {Tooltip} The Tooltip.
     */
    refresh() {
        let title;
        if (dom.hasDataset(this._node, 'uiTitle')) {
            title = dom.getDataset(this._node, 'uiTitle');
        } else if (this._settings.title) {
            title = this._settings.title;
        } else if (dom.hasAttribute(this._node, 'title')) {
            title = dom.getAttribute(this._node, 'title');
        }

        const method = this._settings.html ? 'setHTML' : 'setText';

        dom[method](
            this._tooltipInner,
            this._settings.html && this._settings.sanitize ?
                this._settings.sanitize(title) :
                title
        );

        return this;
    }

    /**
     * Show the Tooltip.
     * @returns {Tooltip} The Tooltip.
     */
    show() {
        if (!this._enabled) {
            return this;
        }

        if (this._animating) {
            dom.stop(this._tooltip);
        }

        if (
            dom.isConnected(this._tooltip) ||
            !dom.triggerOne(this._node, 'show.ui.tooltip')
        ) {
            return this;
        }

        this._animating = true;
        dom.addClass(this._tooltip, 'show');
        this.refresh();
        this._show();

        dom.fadeIn(this._tooltip, {
            duration: this._settings.duration
        }).then(_ => {
            dom.triggerEvent(this._node, 'shown.ui.tooltip');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });

        return this;
    }

    /**
     * Toggle the Tooltip.
     * @returns {Tooltip} The Tooltip.
     */
    toggle() {
        return dom.isConnected(this._tooltip) ?
            this.hide() :
            this.show();
    }

    /**
     * Update the Tooltip position.
     * @returns {Tooltip} The Tooltip.
     */
    update() {
        if (this._popper) {
            this._popper.update();
        }

        return this;
    }

}
