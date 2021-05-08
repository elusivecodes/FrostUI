// Dropdown events
dom.addEventDelegate(document, 'click.ui.dropdown keyup.ui.dropdown', '[data-ui-toggle="dropdown"]', e => {
    if (e.code && e.code !== 'Space') {
        return;
    }

    e.preventDefault();

    const dropdown = Dropdown.init(e.currentTarget);
    dropdown.toggle();
});

dom.addEventDelegate(document, 'keydown.ui.dropdown', '[data-ui-toggle="dropdown"]', e => {
    switch (e.code) {
        case 'ArrowDown':
        case 'ArrowUp':
            e.preventDefault();

            const node = e.currentTarget;
            const dropdown = Dropdown.init(node);

            if (!dom.hasClass(dropdown._menuNode, 'show')) {
                dropdown.show();
            }

            const focusNode = dom.findOne('.dropdown-item:not([tabindex="-1"])', dropdown._menuNode);
            dom.focus(focusNode);
            break;
    }
});

dom.addEventDelegate(document, 'keydown.ui.dropdown', '.dropdown-menu.show .dropdown-item', e => {
    let focusNode;

    switch (e.code) {
        case 'ArrowDown':
            focusNode = dom.nextAll(e.currentTarget, '.dropdown-item:not([tabindex="-1"])').shift();
            break;
        case 'ArrowUp':
            focusNode = dom.prevAll(e.currentTarget, '.dropdown-item:not([tabindex="-1"])').pop();
            break;
        default:
            return;
    }

    e.preventDefault();

    dom.focus(focusNode);
});

dom.addEvent(document, 'click.ui.dropdown', e => {
    const target = UI.getClickTarget(e);
    const nodes = dom.find('.dropdown-menu.show');

    for (const node of nodes) {
        const toggle = dom.siblings(node, '[data-ui-toggle="dropdown"]').shift();
        const dropdown = Dropdown.init(toggle);
        const hasDescendent = dom.hasDescendent(dropdown._menuNode, target);
        const autoClose = dropdown._settings.autoClose;

        if (
            dom.isSame(dropdown._node, target) ||
            (
                hasDescendent &&
                (
                    dom.is(target, 'form') ||
                    dom.closest(target, 'form', dropdown._menuNode).length ||
                    autoClose === 'outside' ||
                    autoClose === false
                )
            ) ||
            (
                !hasDescendent &&
                !dom.isSame(dropdown._menuNode, target) &&
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

dom.addEvent(document, 'keyup.ui.dropdown', e => {
    if (!['Tab', 'Escape'].includes(e.code)) {
        return;
    }

    let stopped = false;
    const nodes = dom.find('.dropdown-menu.show');

    for (const node of nodes) {
        const toggle = dom.siblings(node, '[data-ui-toggle="dropdown"]').shift();
        const dropdown = Dropdown.init(toggle);

        if (
            (e.code === 'Tab' && dom.isSame(dropdown._node, e.target)) ||
            (
                dom.hasDescendent(dropdown._menuNode, e.target) &&
                (
                    e.code === 'Tab' ||
                    dom.is(e.target, 'form') ||
                    dom.closest(e.target, 'form', dropdown._menuNode).length
                )
            )
        ) {
            continue;
        }

        if (!stopped) {
            stopped = true;
            e.stopPropagation();
        }

        dropdown.hide();
    }
}, { capture: true });
