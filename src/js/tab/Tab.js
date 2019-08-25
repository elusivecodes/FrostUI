/**
 * Tab Class
 * @class
 */
class Tab {

    /**
     * New Tab constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Tab with.
     * @returns {Tab} A new Tab object.
     */
    constructor(node, settings) {
        this._node = node;
        this._settings = {
            ...Tab.defaults,
            ...dom.getDataset(this._node),
            ...settings
        };

        if (!this._settings.target) {
            this._settings.target = dom.getAttribute(this._node, 'href');
        }

        this._target = dom.find(this._settings.target);

        this._events();

        dom.setData(this._node, 'tab', this);
    }

    /**
     * Destroy the Tab.
     */
    destroy() {
        dom.stop(this._target, true);
        dom.removeEvent(this._node, 'click.frost.tab', this._clickEvent);
        dom.removeData(this._node, 'tab');
    }

    /**
     * Hide the current Tab.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    hide() {
        return new Promise((resolve, reject) => {
            if (!dom.hasClass(this._target, 'active') || dom.getDataset(this._node, 'animating') === 'true') {
                return reject();
            }

            if (!DOM._triggerEvent(this._node, 'hide.frost.tab')) {
                return reject();
            }

            dom.setDataset(this._node, 'animating', 'true');

            dom.fadeOut(this._target, {
                duration: this._settings.duration
            }).then(_ => {
                dom.removeClass(this._target, 'active');
                dom.removeClass(this._node, 'active');
                dom.triggerEvent(this._node, 'hidden.frost.tab');
                resolve();
            }).catch(_ =>
                reject()
            ).finally(_ =>
                dom.removeAttribute(this._node, 'data-animating')
            );
        });
    }

    /**
     * Hide any active Tabs, and show the current Tab.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    show() {
        return new Promise((resolve, reject) => {
            if (dom.hasClass(this._target, 'active') || dom.getDataset(this._node, 'animating') === 'true') {
                return reject();
            }

            const activeTab = dom.siblings(this._node, '.active').shift();

            if (!dom.hasData(activeTab, 'tab')) {
                return reject();
            }

            dom.setDataset(this._node, 'animating', 'true');

            dom.getData(activeTab, 'tab').hide().then(_ => {
                if (!DOM._triggerEvent(this._node, 'show.frost.tab')) {
                    return reject();
                }

                dom.addClass(this._target, 'active');
                dom.addClass(this._node, 'active');
                return dom.fadeIn(this._target, {
                    duration: this._settings.duration
                });
            }).then(_ => {
                dom.triggerEvent(this._node, 'shown.frost.tab');
                resolve();
            }).catch(_ =>
                reject()
            ).finally(_ =>
                dom.removeAttribute(this._node, 'data-animating')
            );
        });
    }

}
