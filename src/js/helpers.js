/**
 * Add scrollbar padding to the body.
 */
UI.addScrollPadding = (node = document.body) => {
    const scrollSizeY = UI.getScrollbarSize(window, document, 'y');
    const scrollSizeX = UI.getScrollbarSize(window, document, 'x');

    if (scrollSizeY) {
        const currentPaddingRight = dom.getStyle(node, 'paddingRight');
        const paddingRight = dom.css(node, 'paddingRight');

        dom.setDataset(node, 'uiPaddingRight', currentPaddingRight);
        dom.setStyle(node, 'paddingRight', `${scrollSizeY + parseInt(paddingRight)}px`);
    }

    if (scrollSizeX) {
        const currentPaddingBottom = dom.getStyle(node, 'paddingBottom');
        const paddingBottom = dom.css(node, 'paddingBottom');

        dom.setDataset(node, 'uiPaddingBottom', currentPaddingBottom);
        dom.setStyle(node, 'paddingBottom', `${scrollSizeX + parseInt(paddingBottom)}px`);
    }
};

/**
 * Generate a unique element ID.
 * @returns {string} The unique ID.
 */
UI.generateId = prefix => {
    const id = `${prefix}${Core.randomInt(10000, 99999)}`;

    if (dom.findOne(`#${id}`)) {
        return UI.generateId(prefix);
    }

    return id;
};

/**
 * Get a click event target.
 * @param {Event} e The click event.
 * @returns {HTMLElement} The click event target.
 */
UI.getClickTarget = e => {
    return UI._clickTarget || e.target;
};

/**
 * Get position from a mouse/touch event.
 * @param {Event} e The mouse/touch event.
 * @returns {object} The position.
 */
UI.getPosition = e => {
    if ('touches' in e && e.touches.length) {
        return {
            x: e.touches[0].pageX,
            y: e.touches[0].pageY
        };
    }

    return {
        x: e.pageX,
        y: e.pageY
    };
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

    if (scrollSize > size) {
        return UI._calculateScrollbarSize();
    }

    return 0;
};

/**
 * Get positions from a touch event.
 * @param {Event} e The touch event.
 * @returns {array} The positions.
 */
UI.getTouchPositions = e => {
    return [...e.touches].map(touch => ({
        x: touch.pageX,
        y: touch.pageY
    }));
};

/**
 * Reset body scrollbar padding.
 */
UI.resetScrollPadding = (node = document.body) => {
    const paddingRight = dom.getDataset(node, 'uiPaddingRight');
    const paddingBottom = dom.getDataset(node, 'uiPaddingBottom');

    dom.setStyle(node, { paddingRight, paddingBottom });

    dom.removeDataset(node, 'uiPaddingRight');
    dom.removeDataset(node, 'uiPaddingBottom');
};

/**
 * Get the size of the scrollbar.
 * @returns {number} The scrollbar size.
 */
UI._calculateScrollbarSize = _ => {
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
