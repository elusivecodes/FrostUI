import { getDirection } from './helpers.js';
import BaseComponent from './../base-component.js';
import { $, document } from './../globals.js';
import { addScrollPadding, resetScrollPadding } from './../helpers.js';

/**
 * Offcanvas Class
 * @class
 */
export default class Offcanvas extends BaseComponent {
    /**
     * Dispose the Offcanvas.
     */
    dispose() {
        this._activeTarget = null;

        super.dispose();
    }

    /**
     * Hide the Offcanvas.
     */
    hide() {
        if (
            $.getDataset(this._node, 'ui-animating') ||
            !$.hasClass(this._node, 'show') ||
            !$.triggerOne(this._node, 'hide.ui.offcanvas')
        ) {
            return;
        }

        $.setDataset(this._node, 'ui-animating', true);

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
            $.setAttribute(this._node, 'aria-hidden', true);

            $.removeClass(this._node, 'show');

            if (this._options.backdrop) {
                $.removeClass(document.body, 'offcanvas-backdrop');
            }

            if (!this._options.scroll) {
                resetScrollPadding();
                $.setStyle(document.body, 'overflow', '');
            }

            if (this._activeTarget) {
                $.focus(this._activeTarget);
                this._activeTarget = null;
            }

            $.removeDataset(this._node, 'ui-animating');
            $.triggerEvent(this._node, 'hidden.ui.offcanvas');
        }).catch((_) => {
            $.removeDataset(this._node, 'ui-animating');
        });
    }

    /**
     * Show the Offcanvas.
     */
    show() {
        if (
            $.getDataset(this._node, 'ui-animating') ||
            $.hasClass(this._node, 'show') ||
            $.findOne('.offcanvas.show') ||
            !$.triggerOne(this._node, 'show.ui.offcanvas')
        ) {
            return;
        }

        $.setDataset(this._node, 'ui-animating', true);
        $.addClass(this._node, 'show');

        if (this._options.backdrop) {
            $.addClass(document.body, 'offcanvas-backdrop');
        }

        if (!this._options.scroll) {
            addScrollPadding();
            $.setStyle(document.body, 'overflow', 'hidden');
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
            $.setAttribute(this._node, 'aria-modal', true);
            $.removeDataset(this._node, 'ui-animating');
            $.triggerEvent(this._node, 'shown.ui.offcanvas');
        }).catch((_) => {
            $.removeDataset(this._node, 'ui-animating');
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
