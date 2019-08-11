/**
 * Collapse Class
 * @class
 */
class Collapse {

    /**
     * New Collapse constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Collapse with.
     * @returns {Collapse} A new Collapse object.
     */
    constructor(node, settings) {
        this._node = node;
        this._settings = {
            ...Collapse.defaults,
            ...dom.getDataset(this._node),
            ...settings
        };

        this._target = dom.find(this._settings.target);

        this._visible = dom.isVisible(this._target);

        this._events();

        dom.setData(this._node, 'collapse', this);
    }

    /**
     * Destroy the Collapse.
     */
    destroy() {
        dom.stop(this._target, true);
        dom.removeEvent(this._node, 'click.frost.collapse', this._clickEvent);
        dom.removeData(this._node, 'collapse');
    }

    /**
     * Hide the target element.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    hide() {
        return new Promise((resolve, reject) => {
            if (!this._visible || this._animating || !DOM._triggerEvent(this._node, 'hide.frost.collapse')) {
                return reject();
            }

            this._animating = true;
            dom.squeezeOut(this._target, {
                dir: this._settings.direction,
                duration: this._settings.duration
            }).then(_ => {
                this._visible = false;
                dom.hide(this._target);
                dom.triggerEvent(this._node, 'hidden.frost.collapse');
                resolve();
            }).catch(_ =>
                reject()
            ).finally(_ => {
                this._animating = false;
            });
        });

    }

    /**
     * Show the target element.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    show() {
        return new Promise((resolve, reject) => {
            if (this._visible || this._animating || !DOM._triggerEvent(this._node, 'show.frost.collapse')) {
                return reject();
            }

            this._animating = true;
            this._visible = true;
            dom.show(this._target);
            dom.squeezeIn(this._target, {
                dir: this._settings.direction,
                duration: this._settings.duration
            }).then(_ => {
                dom.triggerEvent(this._node, 'shown.frost.collapse');
                resolve();
            }).catch(_ =>
                reject()
            ).finally(_ => {
                this._animating = false;
            });
        });
    }

    /**
     * Toggle the target element.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    toggle() {
        return this._visible ?
            this.hide() :
            this.show();
    }

}
