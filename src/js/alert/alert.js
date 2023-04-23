import BaseComponent from './../base-component.js';
import { $ } from './../globals.js';

/**
 * Alert Class
 * @class
 */
export default class Alert extends BaseComponent {
    /**
     * Close the Alert.
     */
    close() {
        if (
            $.getDataset(this._node, 'uiAnimating') ||
            !$.triggerOne(this._node, 'close.ui.alert')
        ) {
            return;
        }

        $.setDataset(this._node, { uiAnimating: true });

        $.fadeOut(this._node, {
            duration: this._options.duration,
        }).then((_) => {
            $.detach(this._node);
            $.removeDataset(this._node, 'uiAnimating');
            $.triggerEvent(this._node, 'closed.ui.alert');
            $.remove(this._node);
        }).catch((_) => {
            $.removeDataset(this._node, 'uiAnimating');
        });
    }
}
