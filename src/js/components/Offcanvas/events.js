// Offcanvas events
dom.addEventDelegate(document, 'click.ui.offcanvas', '[data-ui-toggle="offcanvas"]', e => {
    e.preventDefault();

    const target = UI.getTarget(e.currentTarget, '.offcanvas');
    const offcanvas = Offcanvas.init(target);
    offcanvas.show(e.currentTarget);
});

dom.addEventDelegate(document, 'click.ui.offcanvas', '[data-ui-dismiss="offcanvas"]', e => {
    e.preventDefault();

    const target = UI.getTarget(e.currentTarget, '.offcanvas');
    const offcanvas = Offcanvas.init(target);
    offcanvas.hide();
});

dom.addEvent(document, 'click.ui.offcanvas', e => {
    const target = UI.getClickTarget(e);

    if (dom.is(target, '[data-ui-dismiss]') || dom.findOne('.modal.show')) {
        return;
    }

    const nodes = dom.find('.offcanvas.show');

    if (!nodes.length) {
        return;
    }

    for (const node of nodes) {
        const offcanvas = Offcanvas.init(node);

        if (
            !offcanvas._settings.backdrop ||
            offcanvas._node === target ||
            dom.hasDescendent(offcanvas._node, target)
        ) {
            continue;
        }

        offcanvas.hide();
    }
});

dom.addEvent(document, 'keyup.ui.offcanvas', e => {
    if (e.code !== 'Escape' || dom.findOne('.modal.show')) {
        return;
    }

    const nodes = dom.find('.offcanvas.show');

    if (!nodes.length) {
        return;
    }

    for (const node of nodes) {
        const offcanvas = Offcanvas.init(node);

        if (!offcanvas._settings.keyboard) {
            return;
        }

        offcanvas.hide();
    }
});
