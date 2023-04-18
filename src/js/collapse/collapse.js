import BaseComponent from './../base-component.js';
import { $ } from './../globals.js';

/**
 * Collapse Class
 * @class
 */
export default class Collapse extends BaseComponent {
    /**
     * New Collapse constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [options] The options to create the Collapse with.
     */
    constructor(node, options) {
        super(node, options);

        const id = $.getAttribute(this._node, 'id');
        this._triggers = $.find(
            `[data-ui-toggle="collapse"][data-ui-target="#${id}"]`,
        );

        if (this._options.parent) {
            this._parent = $.closest(this._node, this._options.parent).shift();
        }
    }

    /**
     * Dispose the Collapse.
     */
    dispose() {
        this._triggers = null;
        this._parent = null;

        super.dispose();
    }

    /**
     * Hide the element.
     */
    hide() {
        if (
            $.getDataset(this._node, 'ui-animating') ||
            !$.hasClass(this._node, 'show') ||
            !$.triggerOne(this._node, 'hide.ui.collapse')
        ) {
            return;
        }

        $.setDataset(this._node, 'ui-animating', true);
        $.addClass(this._triggers, 'collapsed');
        $.addClass(this._triggers, 'collapsing');

        $.squeezeOut(this._node, {
            direction: this._options.direction,
            duration: this._options.duration,
        }).then((_) => {
            $.removeClass(this._node, 'show');
            $.removeClass(this._triggers, 'collapsing');
            $.setAttribute(this._triggers, 'aria-expanded', false);
            $.removeDataset(this._node, 'ui-animating');
            $.triggerEvent(this._node, 'hidden.ui.collapse');
        }).catch((_) => {
            $.removeDataset(this._node, 'ui-animating');
        });
    }

    /**
     * Show the element.
     */
    show() {
        if (
            $.getDataset(this._node, 'ui-animating') ||
            $.hasClass(this._node, 'show')
        ) {
            return;
        }

        const collapses = [];
        if (this._parent) {
            const siblings = $.find('.collapse.show', this._parent);

            for (const sibling of siblings) {
                const collapse = this.constructor.init(sibling);

                if (!$.isSame(this._parent, collapse._parent)) {
                    continue;
                }

                collapses.push(collapse);
            }
        }

        if (!$.triggerOne(this._node, 'show.ui.collapse')) {
            return;
        }

        for (const collapse of collapses) {
            collapse.hide();
        }

        $.setDataset(this._node, 'ui-animating', true);
        $.addClass(this._node, 'show');
        $.removeClass(this._triggers, 'collapsed');
        $.addClass(this._triggers, 'collapsing');

        $.squeezeIn(this._node, {
            direction: this._options.direction,
            duration: this._options.duration,
        }).then((_) => {
            $.removeClass(this._triggers, 'collapsing');
            $.setAttribute(this._triggers, 'aria-expanded', true);
            $.removeDataset(this._node, 'ui-animating');
            $.triggerEvent(this._node, 'shown.ui.collapse');
        }).catch((_) => {
            $.removeDataset(this._node, 'ui-animating');
        });
    }

    /**
     * Toggle the element.
     */
    toggle() {
        if ($.hasClass(this._node, 'show')) {
            this.hide();
        } else {
            this.show();
        }
    }
}
