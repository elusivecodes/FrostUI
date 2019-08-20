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
            if (!DOM._triggerEvent(this._node, 'hide.frost.collapse')) {
                return reject();
            }

            const targets = dom.find(this._settings.target)
                .filter(target => dom.hasClass(target, 'show') && !dom.hasClass('collapsing'));

            if (!targets.length) {
                return reject();
            }

            dom.addClass(targets, 'collapsing');
            dom.squeezeOut(targets, {
                direction: this._settings.direction,
                duration: this._settings.duration
            }).then(_ => {
                this._visible = false;
                dom.removeClass(targets, 'show collapsing');
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
            if (!DOM._triggerEvent(this._node, 'show.frost.collapse')) {
                return reject();
            }

            const targets = dom.find(this._settings.target)
                .filter(target => !dom.hasClass(target, 'show') && !dom.hasClass(target, 'collapsing'));

            if (!targets.length) {
                return reject();
            }

            dom.addClass(targets, 'show collapsing');
            dom.squeezeIn(targets, {
                direction: this._settings.direction,
                duration: this._settings.duration
            }).then(_ => {
                dom.removeClass(targets, 'collapsing');
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
        return new Promise((resolve, reject) => {
            if (!DOM._triggerEvent(this._node, 'show.frost.collapse')) {
                return reject();
            }

            const targets = dom.find(this._settings.target)
                .filter(target => !dom.hasClass(target, 'collapsing'));

            if (!targets.length) {
                return reject();
            }

            dom.addClass(targets, 'collapsing');

            const hidden = targets.filter(target => !dom.hasClass(target, 'show'));
            const visible = targets.filter(target => dom.hasClass(target, 'show'));
            const animations = targets.map(target => {
                const animation = dom.hasClass(target, 'show') ?
                    'squeezeOut' : 'squeezeIn';

                return dom[animation](target, {
                    direction: this._settings.direction,
                    duration: this._settings.duration
                });
            });

            dom.addClass(hidden, 'show')

            Promise.all(animations).then(_ => {
                dom.removeClass(visible, 'show');
                dom.removeClass(targets, 'collapsing');
                dom.triggerEvent(this._node, 'shown.frost.collapse');
                resolve();
            }).catch(_ =>
                reject()
            ).finally(_ => {
                this._animating = false;
            });
        });
    }

}
