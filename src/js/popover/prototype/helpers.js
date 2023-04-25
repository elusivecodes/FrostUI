import { $ } from './../../globals.js';
import { generateId } from './../../helpers.js';
import Popper from './../../popper/popper.js';

/**
 * Update the Popover and append to the DOM.
 */
export function _show() {
    if (this._options.appendTo) {
        $.append(this._options.appendTo, this._popover);
    } else {
        $.after(this._node, this._popover);
    }

    if (!this._options.noAttributes) {
        const id = generateId(this.constructor.DATA_KEY);
        $.setAttribute(this._popover, { id });
        $.setAttribute(this._node, { 'aria-described-by': id });
    }

    this._popper = new Popper(
        this._popover,
        {
            reference: this._node,
            arrow: this._arrow,
            placement: this._options.placement,
            position: this._options.position,
            fixed: this._options.fixed,
            spacing: this._options.spacing,
            minContact: this._options.minContact,
            noAttributes: this._options.noAttributes,
        },
    );

    window.requestAnimationFrame((_) => {
        this.update();
    });
};

/**
 * Stop the animations.
 */
export function _stop() {
    if (this._enabled && $.getDataset(this._popover, 'uiAnimating')) {
        $.stop(this._popover);
        $.removeDataset(this._popover, 'uiAnimating');
    }
};
