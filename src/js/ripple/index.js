import { $, document } from './../globals.js';

// Ripple events
$.addEventDelegate(document, 'mousedown.ui.ripple', '.ripple', (e) => {
    const target = e.currentTarget;
    const pos = $.position(target, { offset: true });

    const width = $.width(target);
    const height = $.height(target);
    const scaleMultiple = Math.max(width, height) * 3;

    const isFixed = $.isFixed(target);
    const mouseX = isFixed ? e.clientX : e.pageX;
    const mouseY = isFixed ? e.clientY : e.pageY;

    const prevRipple = $.findOne(':scope > .ripple-effect', target);

    if (prevRipple) {
        $.remove(prevRipple);
    }

    const ripple = $.create('span', {
        class: 'ripple-effect',
        style: {
            left: mouseX - pos.x,
            top: mouseY - pos.y,
        },
    });
    $.append(target, ripple);

    const animation = $.animate(
        ripple,
        (node, progress) => {
            $.setStyle(node, {
                transform: 'scale(' + Math.floor(progress * scaleMultiple) + ')',
            });
        },
        {
            duration: 500,
        },
    );

    $.addEventOnce(document, 'mouseup.ui.ripple', (_) => {
        animation.finally((_) => {
            $.animate(
                ripple,
                (node, progress) => {
                    $.setStyle(node, {
                        opacity: 1 - Math.pow(progress, 2),
                    });
                },
                {
                    duration: 250,
                },
            ).finally((_) => {
                $.detach(ripple);
            });
        });
    });
});
