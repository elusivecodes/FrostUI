/**
 * Create a ripple effect on a node.
 * @param {HTMLElement} node The input node.
 * @param {number} x The x position to start the ripple from.
 * @param {number} y The y position to start the ripple from.
 * @param {number} [duration=1000] The duration of the ripple.
 */
UI.ripple = (node, x, y, duration = 1000) => {
    const width = dom.width(node);
    const height = dom.height(node);
    const scaleMultiple = Math.max(width, height) * 3;

    const ripple = dom.create('span', {
        class: 'ripple-effect',
        style: {
            left: x,
            top: y
        }
    });
    dom.append(node, ripple);

    dom.animate(
        ripple,
        (node, progress) => {
            dom.setStyle(node, {
                transform: 'scale(' + Math.floor(progress * scaleMultiple) + ')',
                opacity: 1 - Math.pow(progress, 2)
            });
        },
        {
            duration
        }
    ).finally(_ => {
        dom.remove(ripple);
    })
};
