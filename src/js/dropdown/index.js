import Dropdown from './dropdown.js';
import { $, document } from './../globals.js';
import { initComponent } from './../helpers.js';
import { getClickTarget } from './../click-target/index.js';

// Dropdown default options
Dropdown.defaults = {
    display: 'dynamic',
    duration: 100,
    placement: 'bottom',
    position: 'start',
    fixed: false,
    spacing: 3,
    minContact: false,
};

// Dropdown init
initComponent('dropdown', Dropdown);

// Dropdown events
$.addEventDelegate(document, 'click.ui.dropdown keyup.ui.dropdown', '[data-ui-toggle="dropdown"]', (e) => {
    if (e.code && e.code !== 'Space') {
        return;
    }

    e.preventDefault();

    const dropdown = Dropdown.init(e.currentTarget);
    dropdown.toggle();
});

$.addEventDelegate(document, 'keydown.ui.dropdown', '[data-ui-toggle="dropdown"]', (e) => {
    switch (e.code) {
        case 'ArrowDown':
        case 'ArrowUp':
            e.preventDefault();

            const node = e.currentTarget;
            const dropdown = Dropdown.init(node);

            if (!$.hasClass(dropdown._menuNode, 'show')) {
                dropdown.show();
            }

            const focusNode = $.findOne('.dropdown-item:not([tabindex="-1"])', dropdown._menuNode);
            $.focus(focusNode);
            break;
    }
});

$.addEventDelegate(document, 'keydown.ui.dropdown', '.dropdown-menu.show .dropdown-item', (e) => {
    let focusNode;

    switch (e.code) {
        case 'ArrowDown':
            focusNode = $.next(e.currentTarget, '.dropdown-item:not([tabindex="-1"])').shift();
            break;
        case 'ArrowUp':
            focusNode = $.prev(e.currentTarget, '.dropdown-item:not([tabindex="-1"])').pop();
            break;
        default:
            return;
    }

    e.preventDefault();

    $.focus(focusNode);
});

$.addEvent(document, 'click.ui.dropdown', (e) => {
    const target = getClickTarget(e);
    const nodes = $.find('.dropdown-menu.show');

    for (const node of nodes) {
        const toggle = $.siblings(node, '[data-ui-toggle="dropdown"]').shift();
        const dropdown = Dropdown.init(toggle);
        const hasDescendent = $.hasDescendent(dropdown._menuNode, target);
        const autoClose = dropdown._options.autoClose;

        if (
            $.isSame(dropdown._node, target) ||
            (
                hasDescendent &&
                (
                    $.is(target, 'form, input, textarea, select, option') ||
                    autoClose === 'outside' ||
                    autoClose === false
                )
            ) ||
            (
                !hasDescendent &&
                !$.isSame(dropdown._menuNode, target) &&
                (
                    autoClose === 'inside' ||
                    autoClose === false
                )
            )
        ) {
            continue;
        }

        dropdown.hide();
    }
}, { capture: true });

$.addEvent(document, 'keydown.ui.dropdown', (e) => {
    if (e.code !== 'Escape') {
        return;
    }

    let stopped = false;
    const nodes = $.find('.dropdown-menu.show');

    for (const node of nodes) {
        const toggle = $.siblings(node, '[data-ui-toggle="dropdown"]').shift();
        const dropdown = Dropdown.init(toggle);

        if (!stopped) {
            stopped = true;
            e.stopPropagation();
        }

        dropdown.hide();
    }
}, { capture: true });

$.addEvent(document, 'keyup.ui.dropdown', (e) => {
    if (e.code !== 'Tab') {
        return;
    }

    let stopped = false;
    const nodes = $.find('.dropdown-menu.show');

    for (const node of nodes) {
        const toggle = $.siblings(node, '[data-ui-toggle="dropdown"]').shift();
        const dropdown = Dropdown.init(toggle);

        if ($.hasDescendent(dropdown._menuNode, e.target)) {
            continue;
        }

        if (!stopped) {
            stopped = true;
            e.stopPropagation();
        }

        dropdown.hide();
    }
}, { capture: true });

export default Dropdown;
