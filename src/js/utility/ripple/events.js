// Ripple events
dom.addEventDelegate(document, 'mousedown.ui.ripple', '.ripple', e => {
    const target = e.currentTarget;
    const pos = dom.position(target, true);

    const width = dom.width(target);
    const height = dom.height(target);
    const scaleMultiple = Math.max(width, height) * 3;

    const isFixed = dom.isFixed(target);
    const mouseX = isFixed ? e.clientX : e.pageX;
    const mouseY = isFixed ? e.clientY : e.pageY;

    const ripple = dom.create('span', {
        class: 'ripple-effect',
        style: {
            left: mouseX - pos.x,
            top: mouseY - pos.y
        }
    });
    dom.append(target, ripple);

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
