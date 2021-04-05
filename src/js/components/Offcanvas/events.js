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
    if (dom.is(e.target, '[data-ui-dismiss="offcanvas"]')) {
        return;
    }

    if (!Offcanvas.current) {
        return;
    }

    const offcanvas = Offcanvas.current;

    if (!offcanvas._settings.backdrop) {
        return;
    }

    if (offcanvas._node === e.target || dom.hasDescendent(offcanvas._node, e.target)) {
        return;
    }

    offcanvas.hide();
});

dom.addEvent(document, 'keyup.ui.offcanvas', e => {
    if (e.code !== 'Escape') {
        return;
    }

    if (!Offcanvas.current) {
        return;
    }

    const offcanvas = Offcanvas.current;

    if (!offcanvas._settings.keyboard) {
        return;
    }

    offcanvas.hide();
});
