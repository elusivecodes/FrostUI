import BaseComponent from './../base-component.js';
import { $ } from './../globals.js';
import { getTargetSelector } from './../helpers.js';

/**
 * Tab Class
 * @class
 */
export default class Tab extends BaseComponent {
    /**
     * New Tab constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [options] The options to create the Tab with.
     */
    constructor(node, options) {
        super(node, options);

        const selector = getTargetSelector(this._node);
        this._target = $.findOne(selector);
        this._siblings = $.siblings(this._node);
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
     */
    hide() {
        if (
            $.getDataset(this._target, 'ui-animating') ||
            !$.hasClass(this._target, 'active') ||
            !$.triggerOne(this._node, 'hide.ui.tab')
        ) {
            return;
        }

        this._hide();
    }

    /**
     * Hide any active Tabs, and show the current Tab.
     */
    show() {
        if (
            $.getDataset(this._target, 'ui-animating') ||
            $.hasClass(this._target, 'active') ||
            !$.triggerOne(this._node, 'show.ui.tab')
        ) {
            return;
        }

        const active = this._siblings.find((sibling) =>
            $.hasClass(sibling, 'active'),
        );

        if (!active) {
            this._show();
        } else {
            const activeTab = this.constructor.init(active);

            if (activeTab.animating) {
                return;
            }

            if (!$.triggerOne(active, 'hide.ui.tab')) {
                return;
            }

            $.addEventOnce(active, 'hidden.ui.tab', (_) => {
                this._show();
            });

            activeTab._hide();
        }
    }

    /**
     * Hide the current Tab (forcefully).
     */
    _hide() {
        $.setDataset(this._target, 'ui-animating', true);

        $.fadeOut(this._target, {
            duration: this._options.duration,
        }).then((_) => {
            $.removeClass(this._target, 'active');
            $.removeClass(this._node, 'active');
            $.removeDataset(this._target, 'ui-animating');
            $.setAttribute(this._node, 'aria-selected', false);
            $.triggerEvent(this._node, 'hidden.ui.tab');
        }).catch((_) => {
            $.removeDataset(this._target, 'ui-animating');
        });
    }

    /**
     * Show the current Tab (forcefully).
     */
    _show() {
        $.setDataset(this._target, 'ui-animating', true);

        $.addClass(this._target, 'active');
        $.addClass(this._node, 'active');

        $.fadeIn(this._target, {
            duration: this._options.duration,
        }).then((_) => {
            $.setAttribute(this._node, 'aria-selected', true);
            $.removeDataset(this._target, 'ui-animating');
            $.triggerEvent(this._node, 'shown.ui.tab');
        }).catch((_) => {
            $.removeDataset(this._target, 'ui-animating');
        });
    }
}
