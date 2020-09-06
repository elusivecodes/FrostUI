// Modal events
dom.addEventDelegate(document, 'click.frost.modal', '[data-toggle="modal"]', e => {
    e.preventDefault();

    const target = UI.getTarget(e.currentTarget, '.modal');
    const modal = Modal.init(target);
    modal.show(e.currentTarget);
});

dom.addEventDelegate(document, 'click.frost.modal', '[data-dismiss="modal"]', e => {
    e.preventDefault();

    const target = UI.getTarget(e.currentTarget, '.modal');
    const modal = Modal.init(target);
    modal.hide();
});

dom.addEvent(document, 'click.frost.modal', e => {
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

dom.addEvent(document, 'keyup.frost.modal', e => {
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
