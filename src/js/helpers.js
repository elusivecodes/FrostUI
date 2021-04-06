/**
 * Add scrollbar padding to the body.
 */
UI.addScrollPadding = _ => {
    const scrollSizeX = UI.getScrollbarSize(window, document, 'x');
    const scrollSizeY = UI.getScrollbarSize(window, document, 'y');

    if (scrollSizeX) {
        const currentPaddingRight = dom.getStyle(document.body, 'paddingRight');
        const paddingRight = dom.css(document.body, 'paddingRight');

        dom.setDataset(document.body, 'uiPaddingRight', currentPaddingRight);
        dom.setStyle(document.body, 'paddingRight', `${scrollSizeX + parseInt(paddingRight)}px`);
    }

    if (scrollSizeY) {
        const currentPaddingBottom = dom.getStyle(document.body, 'paddingBottom');
        const paddingBottom = dom.css(document.body, 'paddingBottom');

        dom.setDataset(document.body, 'uiPaddingBottom', currentPaddingBottom);
        dom.setStyle(document.body, 'paddingBottom', `${scrollSizeY + parseInt(paddingBottom)}px`);
    }
};

/**
 * Get the size of the scrollbar.
 * @returns {number} The scrollbar size.
 */
UI.calculateScrollbarSize = _ => {
    if (UI._scrollbarSize) {
        return UI._scrollbarSize;
    }

    const div = dom.create('div', {
        style: {
            width: '100px',
            height: '100px',
            overflow: 'scroll',
            position: 'absolute',
            top: '-9999px'
        }
    });
    dom.append(document.body, div);

    UI._scrollbarSize = dom.getProperty(div, 'offsetWidth') - dom.width(div);

    dom.detach(div);

    return UI._scrollbarSize;
};

/**
 * Get the scrollbar size for a given axis.
 * @param {HTMLElement|Window} node The input node.
 * @param {HTMLElement|Document} scrollNode The scroll node.
 * @param {string} [axis] The axis to check.
 * @returns {number} The scrollbar size.
 */
UI.getScrollbarSize = (node = window, scrollNode = document, axis) => {
    const method = axis === 'x' ? 'width' : 'height';
    const size = dom[method](node);
    const scrollSize = dom[method](scrollNode, DOM.SCROLL_BOX);

    if (size > scrollSize) {
        return UI.calculateScrollbarSize();
    }

    return 0;
};
/**
 * Reset body scrollbar padding.
 */
UI.resetScrollPadding = _ => {
    const paddingRight = dom.getDataset(document.body, 'uiPaddingRight');
    const paddingBottom = dom.getDataset(document.body, 'uiPaddingBottom');

    dom.setStyle(document.body, { paddingRight, paddingBottom });

    dom.removeDataset(document.body, 'uiPaddingRight');
    dom.removeDataset(document.body, 'uiPaddingBottom');
};