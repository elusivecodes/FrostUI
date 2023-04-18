import { $, window } from './../globals.js';

let clickTarget;

// Track the target of mousedown events
$.addEvent(window, 'mousedown.ui', (e) => {
    clickTarget = e.target;
}, { capture: true });

$.addEvent(window, 'mouseup.ui', (_) => {
    setTimeout((_) => {
        clickTarget = null;
    }, 0);
}, { capture: true });

/**
 * Get a click event target.
 * @param {Event} e The click event.
 * @return {HTMLElement} The click event target.
 */
export function getClickTarget(e) {
    return clickTarget || e.target;
};
