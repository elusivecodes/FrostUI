/**
 * Toast Class
 * @class
 */
class Toast {

    /**
     * New Toast constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Toast with.
     * @returns {Toast} A new Toast object.
     */
    constructor(node, settings) {
        this._node = node;
        this._settings = {
            ...Toast.defaults,
            ...dom.getDataset(this._node),
            ...settings
        };

        this._visible = dom.isVisible(this._node);

        if (this._settings.autohide) {
            setTimeout(
                _ => {
                    try {
                        this.hide();
                    } catch (e) { }
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
        dom.stop(this._node, true);
        dom.removeData(this._node, 'toast');
    }

    /**
     * Hide the Toast.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    hide() {
        return new Promise((resolve, reject) => {
            if (this._animating || !this._visible || !DOM._triggerEvent(this._node, 'hide.frost.toast')) {
                return reject();
            }

            this._animating = true;
            return dom.fadeOut(this._node, {
                duration: this._settings.duration
            }).then(_ => {
                this._visible = false;
                dom.hide(this._node);
                dom.triggerEvent(this._node, 'hidden.frost.toast');
                resolve();
            }).catch(_ =>
                reject()
            ).finally(_ => {
                this._animating = false;
            });
        });
    }

    /**
     * Show the Toast.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    show() {
        return new Promise((resolve, reject) => {
            if (this._animating || this._visible || !DOM._triggerEvent(this._node, 'show.frost.toast')) {
                return reject();
            }

            this._animating = true;
            this._visible = true;
            dom.show(this._node);
            return dom.fadeIn(this._node, {
                duration: this._settings.duration
            }).then(_ => {
                dom.triggerEvent(this._node, 'shown.frost.toast');
                resolve();
            }).catch(_ =>
                reject()
            ).finally(_ => {
                this._animating = false;
            });
        });
    }

}
