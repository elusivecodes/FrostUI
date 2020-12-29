/**
 * Tab Class
 * @class
 */
class Tab extends BaseComponent {

    /**
     * New Tab constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [settings] The options to create the Tab with.
     * @returns {Tab} A new Tab object.
     */
    constructor(node, settings) {
        super(node, settings);

        const selector = UI.getTargetSelector(this._node);
        this._target = dom.findOne(selector);
        this._siblings = dom.siblings(this._node);
    }

    /**
     * Dispose the Tab.
     */
    dispose() {
        this._target = null;
        this._siblings = null;

        super.dispose();
    }

    /**
     * Hide the current Tab.
     * @returns {Tab} The Tab.
     */
    hide() {
        if (
            this._animating ||
            !dom.hasClass(this._target, 'active') ||
            !dom.triggerOne(this._node, 'hide.ui.tab')
        ) {
            return this;
        }

        this._animating = true;

        dom.fadeOut(this._target, {
            duration: this._settings.duration
        }).then(_ => {
            dom.removeClass(this._target, 'active');
            dom.removeClass(this._node, 'active');
            dom.setAttribute(this._node, 'aria-selected', false);
            dom.triggerEvent(this._node, 'hidden.ui.tab');
        }).catch(_ => { }).finally(_ => {
            this._animating = false;
        });

        return this;
    }

    /**
     * Hide any active Tabs, and show the current Tab.
     * @returns {Tab} The Tab.
     */
    show() {
        if (
            this._animating ||
            dom.hasClass(this._target, 'active') ||
            !dom.triggerOne(this._node, 'show.ui.tab')
        ) {
            return this;
        }

        const active = this._siblings.find(sibling =>
            dom.hasClass(sibling, 'active')
        );

        let activeTab;
        if (active) {
            activeTab = this.constructor.init(active);
            if (activeTab._animating) {
                return this;
            }
        }

        if (!dom.triggerOne(this._node, 'show.ui.tab')) {
            return this;
        }

        const show = _ => {
            this._animating = true;
            dom.addClass(this._target, 'active');
            dom.addClass(this._node, 'active');

            dom.fadeIn(this._target, {
                duration: this._settings.duration
            }).then(_ => {
                dom.setAttribute(this._node, 'aria-selected', true);
                dom.triggerEvent(this._node, 'shown.ui.tab');
            }).catch(_ => { }).finally(_ => {
                this._animating = false;
            });
        };

        if (!activeTab) {
            show();

            return this;
        }

        if (!dom.triggerOne(active, 'hide.ui.tab')) {
            return this;
        }

        dom.addEventOnce(active, 'hidden.ui.tab', _ => {
            show();
        });

        activeTab.hide();

        return this;
    }

}
