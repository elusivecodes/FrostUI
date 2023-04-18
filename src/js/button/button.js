import BaseComponent from './../base-component.js';
import { $ } from './../globals.js';

/**
 * Button Class
 * @class
 */
export default class Button extends BaseComponent {
    /**
     * Toggle the Button.
     */
    toggle() {
        $.toggleClass(this._node, 'active');

        const active = $.hasClass(this._node, 'active');
        $.setAttribute(this._node, 'aria-pressed', active);
    }
}
