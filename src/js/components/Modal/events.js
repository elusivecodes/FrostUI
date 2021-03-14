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
    if (dom.is(e.target, '[data-ui-dismiss="modal"]')) {
        return;
    }

    if (!Modal.stack.size) {
        return;
    }

    let modal;
    for (modal of Modal.stack);

    if (modal._settings.backdrop === 'static' || !modal._settings.backdrop) {
        return;
    }

    if (modal._node !== e.target && dom.hasDescendent(modal._node, e.target)) {
        return;
    }

    modal.hide();
});

dom.addEvent(document, 'keyup.ui.modal', e => {
    if (e.code !== 'Escape') {
        return;
    }

    if (!Modal.stack.size) {
        return;
    }

    let modal;
    for (modal of Modal.stack);

    if (!modal._settings.keyboard) {
        return;
    }

    modal.hide();
});
