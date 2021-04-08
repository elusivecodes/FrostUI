// Modal events
dom.addEventDelegate(document, 'click.ui.modal', '[data-ui-toggle="modal"]', e => {
    e.preventDefault();

    const target = UI.getTarget(e.currentTarget, '.modal');
    const modal = Modal.init(target);
    modal.show(e.currentTarget);
});

dom.addEventDelegate(document, 'click.ui.modal', '[data-ui-dismiss="modal"]', e => {
    e.preventDefault();

    const target = UI.getTarget(e.currentTarget, '.modal');
    const modal = Modal.init(target);
    modal.hide();
});

// Events must be attached to the window, so offcanvas events are triggered first
dom.addEvent(window, 'click.ui.modal', e => {
    let modal;
    for (modal of Modal._stack);

    if (
        !Modal._stack.size ||
        !modal._settings.backdrop ||
        modal._settings.backdrop === 'static' ||
        dom.is(e.target, '[data-ui-dismiss]') ||
        modal._node !== e.target && dom.hasDescendent(modal._node, e.target)
    ) {
        return;
    }

    modal.hide();
});

dom.addEvent(window, 'keyup.ui.modal', e => {
    let modal;
    for (modal of Modal._stack);

    if (
        e.code !== 'Escape' ||
        !modal ||
        !modal._settings.keyboard
    ) {
        return;
    }

    modal.hide();
});
