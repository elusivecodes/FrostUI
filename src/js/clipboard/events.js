// Clipboard events
dom.addEventDelegate(document, 'click', '[data-ui-toggle="clipboard"]', e => {
    e.preventDefault();

    const node = e.currentTarget;
    const settings = Core.extend(
        {
            action: 'copy',
            text: false
        },
        UI.getDataset(node)
    );

    if (!['copy', 'cut'].includes(settings.action)) {
        throw new Error('Invalid clipboard action');
    }

    let text, input;
    if (settings.text) {
        text = settings.text;
    } else {
        const target = UI.getTarget(node);
        if (dom.is(target, 'input, textarea')) {
            input = target;
        } else {
            text = dom.getText(target);
        }
    }

    const customText = !input;
    if (customText) {
        input = dom.create(
            'textarea',
            {
                class: 'visually-hidden position-fixed',
                value: text
            }
        );

        dom.append(document.body, input);
    }

    dom.select(input);

    if (dom.exec(settings.action)) {
        dom.triggerEvent(node, 'copied.ui.clipboard', {
            detail: {
                action: settings.action,
                text: dom.getValue(input)
            }
        });
    }

    if (customText) {
        dom.remove(input);
    }
});
