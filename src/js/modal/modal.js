import BaseComponent from './../base-component.js';
import { $, document } from './../globals.js';
import { addScrollPadding, resetScrollPadding } from './../helpers.js';

/**
 * Modal Class
 * @class
 */
export default class Modal extends BaseComponent {
    /**
     * New Modal constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} [options] The options to create the Modal with.
     */
    constructor(node, options) {
        super(node, options);

        this._dialog = $.child(this._node, '.modal-dialog').shift();

        if (this._options.show) {
            this.show();
        }
    }

    /**
     * Dispose the Modal.
     */
    dispose() {
        this._dialog = null;
        this._activeTarget = null;
        this._backdrop = null;

        super.dispose();
    }

    /**
     * Hide the Modal.
     */
    hide() {
        if (
            $.getDataset(this._dialog, 'uiAnimating') ||
            !$.hasClass(this._node, 'show') ||
            !$.triggerOne(this._node, 'hide.ui.modal')
        ) {
            return;
        }

        $.stop(this._dialog);
        $.setDataset(this._dialog, { uiAnimating: true });

        const stackSize = $.find('.modal.show').length - 1;

        Promise.all([
            $.fadeOut(this._dialog, {
                duration: this._options.duration,
            }),
            $.dropOut(this._dialog, {
                duration: this._options.duration,
                direction: 'top',
            }),
            $.fadeOut(this._backdrop, {
                duration: this._options.duration,
            }),
        ]).then((_) => {
            $.removeAttribute(this._node, 'aria-modal');
            $.setAttribute(this._node, { 'aria-hidden': true });

            resetScrollPadding(this._dialog);

            if (stackSize) {
                $.setStyle(this._node, { zIndex: '' });
            } else {
                if (this._scrollPadding) {
                    resetScrollPadding();
                    this._scrollPadding = false;
                }

                $.removeClass(document.body, 'modal-open');
            }

            $.removeClass(this._node, 'show');

            if (this._options.backdrop) {
                $.remove(this._backdrop);
                this._backdrop = null;
            }

            if (this._activeTarget) {
                $.focus(this._activeTarget);
                this._activeTarget = null;
            }

            $.removeDataset(this._dialog, 'uiAnimating');
            $.triggerEvent(this._node, 'hidden.ui.modal');
        }).catch((_) => {
            $.removeDataset(this._dialog, 'uiAnimating');
        });
    }

    /**
     * Show the Modal.
     */
    show() {
        if (
            $.getDataset(this._dialog, 'uiAnimating') ||
            $.hasClass(this._node, 'show') ||
            !$.triggerOne(this._node, 'show.ui.modal')
        ) {
            return;
        }

        $.setDataset(this._dialog, { uiAnimating: true });

        const stackSize = $.find('.modal.show').length;

        $.removeClass(document.body, 'modal-open');

        addScrollPadding(this._dialog);

        if (stackSize) {
            let zIndex = $.css(this._node, 'zIndex');
            zIndex = parseInt(zIndex);
            zIndex += stackSize * 20;

            $.setStyle(this._node, { zIndex });
        } else if (!$.findOne('.offcanvas.show')) {
            this._scrollPadding = true;
            addScrollPadding();
        }

        $.addClass(document.body, 'modal-open');

        $.addClass(this._node, 'show');

        if (this._options.backdrop) {
            this._backdrop = $.create('div', {
                class: 'modal-backdrop',
            });

            $.append(document.body, this._backdrop);

            if (stackSize) {
                let zIndex = $.css(this._backdrop, 'zIndex');
                zIndex = parseInt(zIndex);
                zIndex += stackSize * 20;

                $.setStyle(this._backdrop, { zIndex });
            }
        }

        Promise.all([
            $.fadeIn(this._dialog, {
                duration: this._options.duration,
            }),
            $.dropIn(this._dialog, {
                duration: this._options.duration,
                direction: 'top',
            }),
            $.fadeIn(this._backdrop, {
                duration: this._options.duration,
            }),
        ]).then((_) => {
            $.removeAttribute(this._node, 'aria-hidden');
            $.setAttribute(this._node, { 'aria-modal': true });

            if (this._options.focus) {
                $.focus(this._node);
            }

            $.removeDataset(this._dialog, 'uiAnimating');
            $.triggerEvent(this._node, 'shown.ui.modal');
        }).catch((_) => {
            $.removeDataset(this._dialog, 'uiAnimating');
        });
    }

    /**
     * Toggle the Modal.
     */
    toggle() {
        if ($.hasClass(this._node, 'show')) {
            this.hide();
        } else {
            this.show();
        }
    }
}
