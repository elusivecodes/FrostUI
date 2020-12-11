// Text expand events
dom.addEventDelegate(document, 'input.ui.text-expand', '.text-expand', e => {
    const textArea = e.currentTarget;

    dom.setStyle(textArea, 'height', 'inherit');

    const borderTop = dom.css(textArea, 'borderTop');
    const borderBottom = dom.css(textArea, 'borderBottom');
    const height = dom.scrollHeight(textArea) + parseInt(borderTop) + parseInt(borderBottom);

    dom.setStyle(textArea, 'height', height);
});
