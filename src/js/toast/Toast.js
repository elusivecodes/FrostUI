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
        dom.stop(this._node, true);
        dom.removeData(this._node, 'toast');
    }

    /**
     * Hide the Toast.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    hide() {
        return new Promise((resolve, reject) => {
            if (!dom.isVisible(this._node) || dom.getDataset(this._node, 'animating') === 'true') {
                return reject();
            }

            if (!DOM._triggerEvent(this._node, 'hide.frost.toast')) {
                return reject();
            }

            dom.setDataset(this._node, 'animating', 'true');

            return dom.fadeOut(this._node, {
                duration: this._settings.duration
            }).then(_ => {
                dom.hide(this._node);
                dom.triggerEvent(this._node, 'hidden.frost.toast');
                resolve();
            }).catch(_ =>
                reject()
            ).finally(_ =>
                dom.removeAttribute(this._node, 'data-animating')
            );
        });
    }

    /**
     * Show the Toast.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    show() {
        return new Promise((resolve, reject) => {
            if (dom.isVisible(this._node) || dom.getDataset(this._node, 'animating') === 'true') {
                return reject();
            }

            if (!DOM._triggerEvent(this._node, 'show.frost.toast')) {
                return reject();
            }

            dom.setDataset(this._node, 'animating', 'true');

            dom.show(this._node);
            return dom.fadeIn(this._node, {
                duration: this._settings.duration
            }).then(_ => {
                dom.triggerEvent(this._node, 'shown.frost.toast');
                resolve();
            }).catch(_ =>
                reject()
            ).finally(_ =>
                dom.removeAttribute(this._node, 'data-animating')
            );
        });
    }

}
