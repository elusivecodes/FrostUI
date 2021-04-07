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
    const offcanvas = Offcanvas._current;

    if (
        !offcanvas ||
        !offcanvas._settings.backdrop ||
        offcanvas._node === e.target ||
        Modal._stack.size ||
        dom.is(e.target, '[data-ui-dismiss]') ||
        dom.hasDescendent(offcanvas._node, e.target)
    ) {
        return;
    }

    offcanvas.hide();
});

dom.addEvent(document, 'keyup.ui.offcanvas', e => {
    const offcanvas = Offcanvas._current;

    if (
        e.code !== 'Escape' ||
        !offcanvas ||
        !offcanvas._settings.keyboard ||
        Modal._stack.size
    ) {
        return;
    }

    offcanvas.hide();
});
