// Text expand events
dom.addEventDelegate(document, 'change.ui.expand input.ui.expand', '.text-expand', e => {
    const textArea = e.currentTarget;

    dom.setStyle(textArea, 'height', 'inherit');

    const borderTop = dom.css(textArea, 'borderTop');
    const borderBottom = dom.css(textArea, 'borderBottom');
    const height = dom.height(textArea, DOM.SCROLL_BOX) + parseInt(borderTop) + parseInt(borderBottom);

    dom.setStyle(textArea, 'height', height);
});
