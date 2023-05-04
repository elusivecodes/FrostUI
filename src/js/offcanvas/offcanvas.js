import { getDirection } from './helpers.js';
import BaseComponent from './../base-component.js';
import FocusTrap from './../focus-trap/index.js';
import { $, document } from './../globals.js';
import { addScrollPadding, resetScrollPadding } from './../helpers.js';

/**
 * Offcanvas Class
 * @class
 */
export default class Offcanvas extends BaseComponent {
    /**
     * New Offcanvas constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [options] The options to create the Offcanvas with.
     */
    constructor(node, options) {
        super(node, options);

        if (this._options.scroll || this._options.backdrop) {
            this._focusTrap = FocusTrap.init(this._node);
        }
    }

    /**
     * Dispose the Offcanvas.
     */
    dispose() {
        if (this._focusTrap) {
            this._focusTrap.dispose();
            this._focusTrap = null;
        }

        this._activeTarget = null;

        super.dispose();
    }

    /**
     * Hide the Offcanvas.
     */
    hide() {
        if (
            $.getDataset(this._node, 'uiAnimating') ||
            !$.hasClass(this._node, 'show') ||
            !$.triggerOne(this._node, 'hide.ui.offcanvas')
        ) {
            return;
        }

        $.setDataset(this._node, { uiAnimating: true });

        if (this._focusTrap) {
            this._focusTrap.deactivate();
        }

        Promise.all([
            $.fadeOut(this._node, {
                duration: this._options.duration,
            }),
            $.dropOut(this._node, {
                duration: this._options.duration,
                direction: getDirection(this._node),
            }),
        ]).then((_) => {
            $.removeAttribute(this._node, 'aria-modal');
            $.setAttribute(this._node, { 'aria-hidden': true });

            $.removeClass(this._node, 'show');

            if (this._options.backdrop) {
                $.removeClass(document.body, 'offcanvas-backdrop');
            }

            if (!this._options.scroll) {
                resetScrollPadding();
                $.setStyle(document.body, { overflow: '' });
            }

            if (this._activeTarget) {
                $.focus(this._activeTarget);
                this._activeTarget = null;
            }

            $.removeDataset(this._node, 'uiAnimating');
            $.triggerEvent(this._node, 'hidden.ui.offcanvas');
        }).catch((_) => {
            $.removeDataset(this._node, 'uiAnimating');
        });
    }

    /**
     * Show the Offcanvas.
     */
    show() {
        if (
            $.getDataset(this._node, 'uiAnimating') ||
            $.hasClass(this._node, 'show') ||
            $.findOne('.offcanvas.show') ||
            !$.triggerOne(this._node, 'show.ui.offcanvas')
        ) {
            return;
        }

        $.setDataset(this._node, { uiAnimating: true });
        $.addClass(this._node, 'show');

        if (this._options.backdrop) {
            $.addClass(document.body, 'offcanvas-backdrop');
        }

        if (!this._options.scroll) {
            addScrollPadding();
            $.setStyle(document.body, { overflow: 'hidden' });
        }

        Promise.all([
            $.fadeIn(this._node, {
                duration: this._options.duration,
            }),
            $.dropIn(this._node, {
                duration: this._options.duration,
                direction: getDirection(this._node),
            }),
        ]).then((_) => {
            $.removeAttribute(this._node, 'aria-hidden');
            $.setAttribute(this._node, { 'aria-modal': true });

            if (this._focusTrap) {
                this._focusTrap.activate();
            }

            $.removeDataset(this._node, 'uiAnimating');
            $.triggerEvent(this._node, 'shown.ui.offcanvas');
        }).catch((_) => {
            $.removeDataset(this._node, 'uiAnimating');
        });
    }

    /**
     * Toggle the Offcanvas.
     */
    toggle() {
        if ($.hasClass(this._node, 'show')) {
            this.hide();
        } else {
            this.show();
        }
    }
}
