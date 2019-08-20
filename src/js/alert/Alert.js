/**
 * Alert Class
 * @class
 */
class Alert {

    /**
     * New Alert constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Alert with.
     * @returns {Alert} A new Alert object.
     */
    constructor(node, settings) {
        this._node = node;
        this._settings = {
            ...Alert.defaults,
            ...dom.getDataset(this._node),
            ...settings
        };

        dom.setData(this._node, 'alert', this);
    }

    /**
     * Destroy the Alert.
     */
    destroy() {
        dom.stop(this._node, true);
        dom.removeData(this._node, 'alert');
    }

    /**
     * Close the Alert.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    close() {
        return new Promise((resolve, reject) => {
            if (!DOM._triggerEvent(this._node, 'close.frost.alert')) {
                return reject();
            }

            if (dom.hasClass(this._node, 'closing')) {
                return reject();
            }

            dom.addClass(this._node, 'closing');
            dom.fadeOut(this._node, {
                duration: this._settings.duration
            }).then(_ => {
                dom.triggerEvent(this._node, 'closed.frost.alert');
                dom.remove(this._node);
                resolve();
            }).catch(_ =>
                reject()
            ).finally(_ => {
                this._animating = false;
            });
        });
    }

}
