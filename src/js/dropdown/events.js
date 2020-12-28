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
    Dropdown.autoHide(e.target);
});

dom.addEvent(document, 'keyup.ui.dropdown', e => {
    switch (e.code) {
        case 'Tab':
            Dropdown.autoHide(e.target, true);
            break;
        case 'Escape':
            Dropdown.autoHide();
            break;
    }
});
