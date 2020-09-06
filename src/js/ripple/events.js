// Ripple events
dom.addEventDelegate(document, 'mousedown.frost.ripple', '.ripple', e => {
    const pos = dom.position(e.currentTarget, true);

    UI.ripple(e.currentTarget, e.pageX - pos.x, e.pageY - pos.y);
});
