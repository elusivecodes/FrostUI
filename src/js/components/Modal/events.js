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
    const target = UI.getClickTarget(e);

    if (dom.is(target, '[data-ui-dismiss]')) {
        return;
    }

    const modal = Modal._topModal();

    if (
        !modal ||
        !modal._settings.backdrop ||
        (modal._node !== target && dom.hasDescendent(modal._node, target))
    ) {
        return;
    }

    if (modal._settings.backdrop === 'static') {
        modal._transform();
        return;
    }

    modal.hide();
});

dom.addEvent(window, 'keyup.ui.modal', e => {
    if (e.code !== 'Escape') {
        return;
    }

    const modal = Modal._topModal();

    if (!modal || !modal._settings.keyboard) {
        return;
    }

    if (modal._settings.backdrop === 'static') {
        modal._transform();
        return;
    }

    modal.hide();
});
