import { $ } from './../../globals.js';

/**
 * Render the Tooltip element.
 */
export function _render() {
    this._tooltip = $.parseHTML(this._options.template).shift();
    if (this._options.customClass) {
        $.addClass(this._tooltip, this._options.customClass);
    }
    this._arrow = $.findOne('.tooltip-arrow', this._tooltip);
    this._tooltipInner = $.findOne('.tooltip-inner', this._tooltip);
};
