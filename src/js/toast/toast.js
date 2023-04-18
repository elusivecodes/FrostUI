import BaseComponent from './../base-component.js';
import { $ } from './../globals.js';

/**
 * Toast Class
 * @class
 */
export default class Toast extends BaseComponent {
    /**
     * Hide the Toast.
     */
    hide() {
        if (
            $.getDataset(this._node, 'ui-animating') ||
            !$.isVisible(this._node) ||
            !$.triggerOne(this._node, 'hide.ui.toast')
        ) {
            return;
        }

        $.setDataset(this._node, 'ui-animating', true);

        $.fadeOut(this._node, {
            duration: this._options.duration,
        }).then((_) => {
            $.setStyle(this._node, 'display', 'none', { important: true });
            $.removeClass(this._node, 'show');
            $.removeDataset(this._node, 'ui-animating');
            $.triggerEvent(this._node, 'hidden.ui.toast');
        }).catch((_) => {
            $.removeDataset(this._node, 'ui-animating');
        });
    }

    /**
     * Show the Toast.
     */
    show() {
        if (
            $.getDataset(this._node, 'ui-animating') ||
            $.isVisible(this._node) ||
            !$.triggerOne(this._node, 'show.ui.toast')
        ) {
            return;
        }

        $.setDataset(this._node, 'ui-animating', true);
        $.setStyle(this._node, 'display', '');
        $.addClass(this._node, 'show');

        $.fadeIn(this._node, {
            duration: this._options.duration,
        }).then((_) => {
            $.removeDataset(this._node, 'ui-animating');
            $.triggerEvent(this._node, 'shown.ui.toast');

            if (this._options.autohide) {
                setTimeout(
                    (_) => this.hide(),
                    this._options.delay,
                );
            }
        }).catch((_) => {
            $.removeDataset(this._node, 'ui-animating');
        });
    }
}
