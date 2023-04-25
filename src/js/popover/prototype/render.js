import { $ } from './../../globals.js';

/**
 * Render the Popover element.
 */
export function _render() {
    this._popover = $.parseHTML(this._options.template).shift();
    if (this._options.customClass) {
        $.addClass(this._popover, this._options.customClass);
    }
    this._arrow = $.findOne('.popover-arrow', this._popover);
    this._popoverHeader = $.findOne('.popover-header', this._popover);
    this._popoverBody = $.findOne('.popover-body', this._popover);
};
