/**
 * Alert Class
 * @class
 */
class Alert {

    /**
     * New Alert constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Alert with.
     * @param {number} [settings.duration=250] The duration of the animation.
     * @returns {Alert} A new Alert object.
     */
    constructor(node, settings) {
        this._node = node;

        this._settings = Core.extend(
            {},
            this.constructor.defaults,
            dom.getDataset(this._node),
            settings
        );

        dom.setData(this._node, 'alert', this);
    }

    /**
     * Destroy the Alert.
     */
    destroy() {
        dom.removeData(this._node, 'alert');
    }

    /**
     * Close the Alert.
     */
    close() {
        if (
            this._animating ||
            !dom.triggerOne(this._node, 'close.frost.alert')
        ) {
            return;
        }

        this._animating = true;

        dom.fadeOut(this._node, {
            duration: this._settings.duration
        }).then(_ => {
            dom.triggerEvent(this._node, 'closed.frost.alert');
            dom.remove(this._node);
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });
    }

    /**
     * Initialize an Alert.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Alert with.
     * @param {number} [settings.duration=250] The duration of the animation.
     * @returns {Alert} A new Alert object.
     */
    static init(node, settings) {
        return dom.hasData(node, 'alert') ?
            dom.getData(node, 'alert') :
            new this(node, settings);
    }

}
