/**
 * Collapse Class
 * @class
 */
class Collapse {

    /**
     * New Collapse constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Collapse with.
     * @param {string} [settings.direction=bottom] The direction to collapse the targets from/to.
     * @param {number} [settings.duration=300] The duration of the animation.
     * @returns {Collapse} A new Collapse object.
     */
    constructor(node, settings) {
        this._node = node;

        this._settings = {
            ...Collapse.defaults,
            ...dom.getDataset(this._node),
            ...settings
        };

        this._targets = dom.find(this._settings.target);

        this._hasAccordion = this._targets.find(target => dom.getDataset(target, 'parent'));

        this._events();

        dom.setData(this._node, 'collapse', this);
    }

    /**
     * Destroy the Collapse.
     */
    destroy() {
        dom.removeEvent(this._node, 'click.frost.collapse', this._clickEvent);

        dom.removeData(this._node, 'collapse');
    }

    /**
     * Hide the target element.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    hide() {
        return new Promise((resolve, reject) => {
            const targets = this._targets
                .filter(target => dom.hasClass(target, 'show') && !dom.getDataset(target, 'animating'));

            if (!targets.length) {
                return reject();
            }

            if (!DOM._triggerEvent(this._node, 'hide.frost.collapse')) {
                return reject();
            }

            dom.setDataset(targets, 'animating', true);

            dom.squeezeOut(targets, {
                direction: this._settings.direction,
                duration: this._settings.duration
            }).then(_ => {
                dom.removeClass(targets, 'show');

                dom.triggerEvent(this._node, 'hidden.frost.collapse');

                resolve();
            }).catch(reject).finally(_ =>
                dom.removeDataset(targets, 'animating')
            );
        });
    }

    /**
     * Show the target element.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    show() {
        return new Promise((resolve, reject) => {
            const targets = this._targets
                .filter(target => dom.hasClass(target, 'show') && !dom.getDataset(target, 'animating'));

            if (!targets.length) {
                return reject();
            }

            const collapse = this._hideAccordion(hidden);

            if (!collapse) {
                return reject();
            }

            for (const node of collapse.nodes) {
                if (!DOM._triggerEvent(node, 'hide.frost.collapse')) {
                    return reject();
                }
            }

            if (!DOM._triggerEvent(this._node, 'show.frost.collapse')) {
                return reject();
            }

            targets.push(...collapse.targets);

            dom.setDataset(targets, 'animating', true);

            const animations = targets.map(target => {
                const animation = collapse.targets.includes(target) ?
                    'squeezeOut' : 'squeezeIn';

                return dom[animation](target, {
                    direction: this._settings.direction,
                    duration: this._settings.duration,
                    type: 'linear'
                });
            });

            dom.addClass(targets, 'show');

            Promise.all(animations).then(_ => {
                if (collapseTargets.length) {
                    dom.removeClass(collapse.targets, 'show');
                }

                if (collapse.nodes.length) {
                    dom.triggerEvent(collapseNodes, 'hidden.frost.collapse');
                }

                dom.triggerEvent(this._node, 'shown.frost.collapse');

                resolve();
            }).catch(reject).finally(_ =>
                dom.removeDataset(targets, 'animating')
            );
        });
    }

    /**
     * Toggle the target element.
     * @returns {Promise} A new Promise that resolves when the animation has completed.
     */
    toggle() {
        return new Promise((resolve, reject) => {
            const targets = [];
            const hidden = [];
            const visible = [];
            for (const target of this._targets) {
                if (dom.getDataset(target, 'animating')) {
                    continue;
                }

                targets.push(target);

                if (dom.hasClass(target, 'show')) {
                    visible.push(target);
                } else {
                    hidden.push(target);
                }
            }

            if (!targets.length) {
                return reject();
            }

            if (visible.length && !DOM._triggerEvent(this._node, 'hide.frost.collapse')) {
                return reject();
            }

            const collapse = this._hideAccordion(hidden);

            if (!collapse) {
                return reject();
            }

            for (const node of collapse.nodes) {
                if (!DOM._triggerEvent(node, 'hide.frost.collapse')) {
                    return reject();
                }
            }

            if (hidden.length && !DOM._triggerEvent(this._node, 'show.frost.collapse')) {
                return reject();
            }

            targets.push(...collapse.targets);

            dom.setDataset(targets, 'animating', true);

            const animations = targets.map(target => {
                const animation = visible.includes(target) || collapse.targets.includes(target) ?
                    'squeezeOut' : 'squeezeIn';

                return dom[animation](target, {
                    direction: this._settings.direction,
                    duration: this._settings.duration,
                    type: 'linear'
                });
            });

            dom.addClass(hidden, 'show')

            Promise.all(animations).then(_ => {
                if (collapse.targets.length) {
                    dom.removeClass(collapse.targets, 'show');
                }

                if (collapse.nodes.length) {
                    dom.triggerEvent(collapseNodes, 'hidden.frost.collapse');
                }

                if (visible.length) {
                    dom.removeClass(visible, 'show');
                    dom.triggerEvent(this._node, 'hidden.frost.collapse');
                }

                if (hidden.length) {
                    dom.triggerEvent(this._node, 'shown.frost.collapse');
                }

                resolve();
            }).catch(reject).finally(_ =>
                dom.removeDataset(targets, 'animating')
            );
        });
    }

}
