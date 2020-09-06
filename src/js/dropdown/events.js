// Dropdown events
dom.addEventDelegate(document, 'click.frost.dropdown keyup.frost.dropdown', '[data-toggle="dropdown"]', e => {
    if (e.key && e.key !== ' ') {
        return;
    }

    e.preventDefault();

    const dropdown = Dropdown.init(e.currentTarget);
    dropdown.toggle();
});

dom.addEventDelegate(document, 'keydown.frost.dropdown', '[data-toggle="dropdown"]', e => {
    switch (e.key) {
        case 'ArrowDown':
        case 'ArrowUp':
            e.preventDefault();

            const node = e.currentTarget;
            const dropdown = Dropdown.init(node);

            if (!dom.hasClass(dropdown._containerNode, 'open')) {
                dropdown.show();
            }

            const focusNode = dom.findOne('.dropdown-item:not([tabindex="-1"])', dropdown._menuNode);
            dom.focus(focusNode);
            break;
    }
});

dom.addEventDelegate(document, 'keydown.frost.dropdown', '.open > .dropdown-menu .dropdown-item', e => {
    let focusNode;

    switch (e.key) {
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

dom.addEvent(document, 'click.frost.dropdown', e => {
    Dropdown.autoHide(e.target);
});

dom.addEvent(document, 'keyup.frost.dropdown', e => {
    switch (e.key) {
        case 'Tab':
            Dropdown.autoHide(e.target, true);
        case 'Escape':
            Dropdown.autoHide();
    }
});
