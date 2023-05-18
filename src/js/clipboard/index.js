import { $, document } from './../globals.js';
import { getDataset, getTarget } from './../helpers.js';

// Clipboard events
$.addEventDelegate(document, 'click', '[data-ui-toggle="clipboard"]', (e) => {
    e.preventDefault();

    const node = e.currentTarget;
    let { action = 'copy', text = null } = getDataset(node);

    if (!['copy', 'cut'].includes(action)) {
        throw new Error('Invalid clipboard action');
    }

    let input;
    if (!text) {
        const target = getTarget(node);
        if ($.is(target, 'input, textarea')) {
            input = target;
            text = $.getValue(input);
        } else {
            text = $.getText(target);
        }
    }

    const customText = !input;
    if (customText) {
        input = $.create(
            'textarea',
            {
                class: 'visually-hidden position-fixed',
                value: text,
            },
        );

        $.append(document.body, input);
    }

    $.select(input);

    if ($.exec(action)) {
        $.triggerEvent(node, 'copied.ui.clipboard', {
            data: {
                action: action,
                text,
            },
        });
    }

    if (customText) {
        $.detach(input);
    }
});
