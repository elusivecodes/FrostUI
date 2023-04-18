import { $ } from './../globals.js';

/**
 * Offcanvas Helpers
 */

/**
 * Get the slide animation direction.
 * @param {HTMLElement} node The offcanvas node.
 * @return {string} The animation direction.
 */
export function getDirection(node) {
    if ($.hasClass(node, 'offcanvas-end')) {
        return 'right';
    }

    if ($.hasClass(node, 'offcanvas-bottom')) {
        return 'bottom';
    }

    if ($.hasClass(node, 'offcanvas-start')) {
        return 'left';
    }

    return 'top';
};
