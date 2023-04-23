import { $, document } from './../globals.js';

// Text expand events
$.addEventDelegate(document, 'change.ui.expand input.ui.expand', '.text-expand', (e) => {
    const textArea = e.currentTarget;

    $.setStyle(textArea, { height: 'inherit' });

    let newHeight = $.height(textArea, { boxSize: $.SCROLL_BOX });
    newHeight += parseInt($.css(textArea, 'borderTop'));
    newHeight += parseInt($.css(textArea, 'borderBottom'));

    $.setStyle(textArea, { height: `${newHeight}px` });
});
