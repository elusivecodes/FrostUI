/**
 * Toast Class
 * @class
 */
class Toast {

    /**
     * New Toast constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Toast with.
     * @param {Boolean} [autohide=true] Whether to hide the toast after initialization.
     * @param {number} [settings.delay=5000] The duration to wait before hiding the toast.
     * @param {number} [settings.duration=100] The duration of the animation.
     * @returns {Toast} A new Toast object.
     */
    constructor(node, settings) {
        this._node = node;

        this._settings = Core.extend(
            {},
            this.constructor.defaults,
            dom.getDataset(this._node),
            settings
        );

        if (this._settings.autohide) {
            setTimeout(
                _ => this.hide(),
                this._settings.delay
            );
        }

        dom.setData(this._node, 'toast', this);
    }

    /**
     * Destroy the Toast.
     */
    destroy() {
        dom.removeData(this._node, 'toast');
    }

    /**
     * Hide the Toast.
     */
    hide() {
        if (
            this._animating ||
            !dom.isVisible(this._node) ||
            !dom.triggerOne(this._node, 'hide.frost.toast')
        ) {
            return;
        }

        this._animating = true;

        dom.fadeOut(this._node, {
            duration: this._settings.duration
        }).then(_ => {
            dom.hide(this._node);
            dom.removeClass(this._node, 'show');
            dom.triggerEvent(this._node, 'hidden.frost.toast');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });
    }

    /**
     * Show the Toast.
     */
    show() {
        if (
            this._animating ||
            dom.isVisible(this._node) ||
            !dom.triggerOne(this._node, 'show.frost.toast')
        ) {
            return;
        }

        this._animating = true;
        dom.show(this._node);
        dom.addClass(this._node, 'show');

        dom.fadeIn(this._node, {
            duration: this._settings.duration
        }).then(_ => {
            dom.triggerEvent(this._node, 'shown.frost.toast');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });
    }

    /**
     * Initialize a Toast.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Toast with.
     * @param {Boolean} [autohide=true] Whether to hide the toast after initialization.
     * @param {number} [settings.delay=5000] The duration to wait before hiding the toast.
     * @param {number} [settings.duration=100] The duration of the animation.
     * @returns {Toast} A new Toast object.
     */
    static init(node, settings) {
        return dom.hasData(node, 'toast') ?
            dom.getData(node, 'toast') :
            new this(node, settings);
    }

}
