// Ripple events
dom.addEventDelegate(document, 'mousedown.ui.ripple', '.ripple', e => {
    const pos = dom.position(e.currentTarget, true);

    const width = dom.width(e.currentTarget);
    const height = dom.height(e.currentTarget);
    const scaleMultiple = Math.max(width, height) * 3;

    const ripple = dom.create('span', {
        class: 'ripple-effect',
        style: {
            left: e.pageX - pos.x,
            top: e.pageY - pos.y
        }
    });
    dom.append(e.currentTarget, ripple);

    dom.animate(
        ripple,
        (node, progress) => {
            dom.setStyle(node, {
                transform: 'scale(' + Math.floor(progress * scaleMultiple) + ')',
                opacity: 1 - Math.pow(progress, 2)
            });
        },
        {
            duration: 1000
        }
    ).finally(_ => {
        dom.remove(ripple);
    })
});
