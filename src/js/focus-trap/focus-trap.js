import { addFocusTrap, removeFocusTrap } from './helpers.js';
import BaseComponent from './../base-component.js';

/**
 * FocusTrap Class
 * @class
 */
export default class FocusTrap extends BaseComponent {
    /**
     * New FocusTrap constructor.
     * @param {HTMLElement} node The input node.
     * @param {object} options The options to create the FocusTrap with.
     */
    constructor(node, options) {
        super(node, options);

        if (this._options.autoFocus) {
            $.focus(this._node);
        }
    }

    /**
     * Activate the FocusTrap.
     */
    activate() {
        if (this._active) {
            return;
        }

        addFocusTrap(this);
        this._active = true;
    }

    /**
     * Deactivate the FocusTrap.
     */
    deactivate() {
        if (!this._active) {
            return;
        }

        removeFocusTrap(this);
        this._active = false;
    }

    /**
     * Dispose the FocusTrap.
     */
    dispose() {
        this.deactivate();

        super.dispose();
    }
}
