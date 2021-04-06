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

dom.addEvent(document, 'click.ui.modal', e => {
    let modal;
    for (modal of Modal.stack);

    if (
        dom.is(e.target, '[data-ui-dismiss="modal"]') ||
        !Modal.stack.size ||
        !modal._settings.backdrop ||
        modal._settings.backdrop === 'static' ||
        modal._node !== e.target && dom.hasDescendent(modal._node, e.target)
    ) {
        return;
    }

    modal.hide();
});

dom.addEvent(document, 'keyup.ui.modal', e => {
    let modal;
    for (modal of Modal.stack);

    if (
        e.code !== 'Escape' ||
        !modal ||
        !modal._settings.keyboard
    ) {
        return;
    }

    modal.hide();
});
