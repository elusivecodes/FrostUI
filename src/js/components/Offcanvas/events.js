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
    const offcanvas = Offcanvas.current;

    if (
        dom.is(e.target, '[data-ui-dismiss="offcanvas"]') ||
        Modal.stack.size ||
        !offcanvas ||
        !offcanvas._settings.backdrop ||
        offcanvas._node === e.target ||
        dom.hasDescendent(offcanvas._node, e.target)
    ) {
        return;
    }

    offcanvas.hide();
}, { capture: true });

dom.addEvent(document, 'keyup.ui.offcanvas', e => {
    const offcanvas = Offcanvas.current;

    if (
        e.code !== 'Escape' ||
        Modal.stack.size ||
        !offcanvas ||
        !offcanvas._settings.keyboard
    ) {
        return;
    }

    offcanvas.hide();
}, { capture: true });
