/**
 * Tab Class
 * @class
 */
class Tab {

    /**
     * New Tab constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Tab with.
     * @param {number} [settings.duration=100] The duration of the animation.
     * @returns {Tab} A new Tab object.
     */
    constructor(node, settings) {
        this._node = node;

        this._settings = Core.extend(
            {},
            this.constructor.defaults,
            dom.getDataset(this._node),
            settings
        );

        const selector = UI.getTargetSelector(this._node);
        this._target = dom.findOne(selector);
        this._siblings = dom.siblings(this._node);

        dom.setData(this._node, 'tab', this);
    }

    /**
     * Destroy the Tab.
     */
    destroy() {
        dom.removeData(this._node, 'tab');
    }

    /**
     * Hide the current Tab.
     */
    hide() {
        if (
            this._animating ||
            !dom.hasClass(this._target, 'active') ||
            !dom.triggerOne(this._node, 'hide.frost.tab')
        ) {
            return;
        }

        this._animating = true;

        dom.fadeOut(this._target, {
            duration: this._settings.duration
        }).then(_ => {
            dom.removeClass(this._target, 'active');
            dom.removeClass(this._node, 'active');
            dom.setAttribute(this._node, 'aria-selected', false);
            dom.triggerEvent(this._node, 'hidden.frost.tab');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });
    }

    /**
     * Hide any active Tabs, and show the current Tab.
     */
    show() {
        if (
            this._animating ||
            dom.hasClass(this._target, 'active') ||
            !dom.triggerOne(this._node, 'show.frost.tab')
        ) {
            return;
        }

        const active = this._siblings.find(sibling =>
            dom.hasClass(sibling, 'active')
        );

        let activeTab;
        if (active) {
            activeTab = this.constructor.init(active);
            if (activeTab._animating) {
                return;
            }
        }

        if (!dom.triggerOne(this._node, 'show.frost.tab')) {
            return;
        }

        const show = _ => {
            this._animating = true;
            dom.addClass(this._target, 'active');
            dom.addClass(this._node, 'active');

            dom.fadeIn(this._target, {
                duration: this._settings.duration
            }).then(_ => {
                dom.setAttribute(this._node, 'aria-selected', true);
                dom.triggerEvent(this._node, 'shown.frost.tab');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });
        };

        if (!activeTab) {
            return show();
        }

        if (!dom.triggerOne(active, 'hide.frost.tab')) {
            return;
        }

        dom.addEventOnce(active, 'hidden.frost.tab', _ => {
            show();
        });

        activeTab.hide();
    }

    /**
     * Initialize a Tab.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Tab with.
     * @param {number} [settings.duration=100] The duration of the animation.
     * @returns {Tab} A new Tab object.
     */
    static init(node, settings) {
        return dom.hasData(node, 'tab') ?
            dom.getData(node, 'tab') :
            new this(node, settings);
    }

}
