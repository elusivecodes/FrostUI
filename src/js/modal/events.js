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
    const backdrop = dom.findOne('.modal-backdrop');

    if (!backdrop) {
        return;
    }

    const targets = dom.find('.modal.show');

    for (const target of targets) {
        if (target !== e.target && dom.hasDescendent(target, e.target)) {
            continue;
        }

        const modal = Modal.init(target);

        if (modal._settings.backdrop === 'static') {
            continue;
        }

        modal.hide();
    }
});

dom.addEvent(document, 'keyup.ui.modal', e => {
    if (e.key !== 'Escape') {
        return;
    }

    const targets = dom.find('.modal.show');

    for (const target of targets) {
        const modal = Modal.init(target);

        if (!modal._settings.keyboard) {
            continue;
        }

        modal.hide();
    }
});
