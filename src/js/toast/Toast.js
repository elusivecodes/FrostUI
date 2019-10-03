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
            Toast.defaults,
            dom.getDataset(this._node),
            settings
        );

        this._dismiss = dom.find('[data-dismiss="toast"]', this._node);

        this._events();

        if (this._settings.autohide) {
            setTimeout(
                _ => {
                    this.hide().catch(_ => { });
                },
                this._settings.delay
            );
        }

        dom.setData(this._node, 'toast', this);
    }

    /**
     * Destroy the Toast.
     */
    destroy() {
        if (this._dismiss.length) {
            dom.removeEvent(this._dismiss, 'click.frost.toast', this._dismissEvent);
        }

        dom.removeData(this._node, 'toast');
    }

    /**
     * Hide the Toast.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    hide() {
        return new Promise((resolve, reject) => {
            if (!dom.isVisible(this._node) || dom.getDataset(this._node, 'animating')) {
                return reject();
            }

            if (!DOM._triggerEvent(this._node, 'hide.frost.toast')) {
                return reject();
            }

            dom.setDataset(this._node, 'animating', true);

            return dom.fadeOut(this._node, {
                duration: this._settings.duration
            }).then(_ => {
                dom.hide(this._node);

                dom.triggerEvent(this._node, 'hidden.frost.toast');

                resolve();
            }).catch(reject).finally(_ =>
                dom.removeDataset(this._node, 'animating')
            );
        });
    }

    /**
     * Show the Toast.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    show() {
        return new Promise((resolve, reject) => {
            if (dom.isVisible(this._node) || dom.getDataset(this._node, 'animating')) {
                return reject();
            }

            if (!DOM._triggerEvent(this._node, 'show.frost.toast')) {
                return reject();
            }

            dom.setDataset(this._node, 'animating', true);

            dom.show(this._node);

            return dom.fadeIn(this._node, {
                duration: this._settings.duration
            }).then(_ => {
                dom.triggerEvent(this._node, 'shown.frost.toast');

                resolve();
            }).catch(reject).finally(_ =>
                dom.removeDataset(this._node, 'animating')
            );
        });
    }

}
