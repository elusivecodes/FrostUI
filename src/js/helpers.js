import { $, document, window } from './globals.js';

let scrollbarSize;

/**
 * Add scrollbar padding to a node.
 * @param {HTMLElement} [node=document.body] The node.
 */
export function addScrollPadding(node = document.body) {
    const scrollSizeY = getScrollbarSize(window, document, 'y');
    const scrollSizeX = getScrollbarSize(window, document, 'x');

    if (scrollSizeY) {
        const currentPaddingRight = $.getStyle(node, 'paddingRight');
        const paddingRight = $.css(node, 'paddingRight');

        $.setDataset(node, 'ui-padding-right', currentPaddingRight);
        $.setStyle(node, 'paddingRight', `${scrollSizeY + parseInt(paddingRight)}px`);
    }

    if (scrollSizeX) {
        const currentPaddingBottom = $.getStyle(node, 'paddingBottom');
        const paddingBottom = $.css(node, 'paddingBottom');

        $.setDataset(node, 'ui-padding-bottom', currentPaddingBottom);
        $.setStyle(node, 'paddingBottom', `${scrollSizeX + parseInt(paddingBottom)}px`);
    }
};

/**
 * Get the size of the scrollbar.
 * @return {number} The scrollbar size.
 */
function calculateScrollbarSize() {
    if (scrollbarSize) {
        return scrollbarSize;
    }

    const div = $.create('div', {
        style: {
            width: '100px',
            height: '100px',
            overflow: 'scroll',
            position: 'absolute',
            top: '-9999px',
        },
    });
    $.append(document.body, div);

    scrollbarSize = $.getProperty(div, 'offsetWidth') - $.width(div);

    $.detach(div);

    return scrollbarSize;
};

/**
 * Create a wrapped version of a function that executes once per tick.
 * @param {function} callback Callback function to debounce.
 * @return {function} The wrapped function.
 */
export function debounce(callback) {
    let running;

    return (...args) => {
        if (running) {
            return;
        }

        running = true;

        Promise.resolve().then((_) => {
            callback(...args);
            running = false;
        });
    };
};

/**
 * Generate a unique element ID.
 * @param {string} [prefix] The ID prefix.
 * @return {string} The unique ID.
 */
export function generateId(prefix) {
    const id = `${prefix}${$.randomInt(10000, 99999)}`;

    if ($.findOne(`#${id}`)) {
        return generateId(prefix);
    }

    return id;
};

/**
 * Get normalized UI data from a node.
 * @param {HTMLElement} node The input node.
 * @return {object} The normalized data.
 */
export function getDataset(node) {
    const dataset = $.getDataset(node);

    return Object.fromEntries(
        Object.entries(dataset)
            .map(([key, value]) => [key.slice(2, 3).toLowerCase() + key.slice(3), value]),
    );
};

/**
 * Get position from a mouse/touch event.
 * @param {Event} e The mouse/touch event.
 * @return {object} The position.
 */
export function getPosition(e) {
    if ('touches' in e && e.touches.length) {
        return {
            x: e.touches[0].pageX,
            y: e.touches[0].pageY,
        };
    }

    return {
        x: e.pageX,
        y: e.pageY,
    };
};

/**
 * Get the scrollbar size for a given axis.
 * @param {HTMLElement|Window} [node=window] The input node.
 * @param {HTMLElement|Document} [scrollNode=document] The scroll node.
 * @param {string} [axis] The axis to check.
 * @return {number} The scrollbar size.
 */
export function getScrollbarSize(node = window, scrollNode = document, axis) {
    const method = axis === 'x' ? 'width' : 'height';
    const size = $[method](node);
    const scrollSize = $[method](scrollNode, { boxSize: $.SCROLL_BOX });

    if (scrollSize > size) {
        return calculateScrollbarSize();
    }

    return 0;
};

/**
 * Calculate the computed bounding rectangle of a node (minus scroll bars).
 * @param {HTMLElement|Window} node The input node.
 * @param {HTMLElement|Document} scrollNode The scroll node.
 * @return {object} The computed bounding rectangle of the node.
 */
export function getScrollContainer(node, scrollNode) {
    const isWindow = $.isWindow(node);
    const rect = isWindow ?
        getWindowContainer(node) :
        $.rect(node, { offset: true });

    const scrollSizeX = getScrollbarSize(node, scrollNode, 'x');
    const scrollSizeY = getScrollbarSize(node, scrollNode, 'y');

    if (scrollSizeX) {
        rect.height -= scrollSizeX;

        if (isWindow) {
            rect.bottom -= scrollSizeX;
        }
    }

    if (scrollSizeY) {
        rect.width -= scrollSizeY;

        if (isWindow) {
            rect.right -= scrollSizeY;
        }
    }

    return rect;
};

/**
 * Get a target from a node.
 * @param {HTMLElement} node The input node.
 * @param {string} [closestSelector] The default closest selector.
 * @return {HTMLElement} The target node.
 */
export function getTarget(node, closestSelector) {
    const selector = getTargetSelector(node);

    let target;

    if (selector && selector !== '#') {
        target = $.findOne(selector);
    } else if (closestSelector) {
        target = $.closest(node, closestSelector).shift();
    }

    if (!target) {
        throw new Error('Target not found');
    }

    return target;
};

/**
 * Get the target selector from a node.
 * @param {HTMLElement} node The input node.
 * @return {string} The target selector.
 */
export function getTargetSelector(node) {
    return $.getDataset(node, 'ui-target') || $.getAttribute(node, 'href');
};

/**
 * Get positions from a touch event.
 * @param {Event} e The touch event.
 * @return {array} The positions.
 */
export function getTouchPositions(e) {
    return Array.from(e.touches)
        .map((touch) => ({ x: touch.pageX, y: touch.pageY }));
};

/**
 * Calculate the computed bounding rectangle of a window.
 * @param {Window} node The window object.
 * @return {object} The computed bounding rectangle of the window.
 */
function getWindowContainer(node) {
    const scrollX = $.getScrollX(node);
    const scrollY = $.getScrollY(node);
    const width = $.width(node);
    const height = $.height(node);

    return {
        x: scrollX,
        y: scrollY,
        width,
        height,
        top: scrollY,
        right: scrollX + width,
        bottom: scrollY + height,
        left: scrollX,
    };
};

/**
 * Initialize a UI component.
 * @param {string} key The component key.
 * @param {class} component The component class.
 */
export function initComponent(key, component) {
    component.DATA_KEY = key;
    component.REMOVE_EVENT = `remove.ui.${key}`;

    $.QuerySet.prototype[key] = function(a, ...args) {
        let settings; let method; let firstResult;

        if ($.isObject(a)) {
            settings = a;
        } else if ($.isString(a)) {
            method = a;
        }

        for (const [index, node] of this.get().entries()) {
            if (!$.isElement(node)) {
                continue;
            }

            let result = component.init(node, settings);

            if (method) {
                result = result[method](...args);
            }

            if (index === 0) {
                firstResult = result;
            }
        }

        return firstResult;
    };
};

/**
 * Reset body scrollbar padding.
 * @param {HTMLElement} [node=document.body] The node.
 */
export function resetScrollPadding(node = document.body) {
    const paddingRight = $.getDataset(node, 'ui-padding-right');
    const paddingBottom = $.getDataset(node, 'ui-padding-bottom');

    $.setStyle(node, { paddingRight, paddingBottom });

    $.removeDataset(node, 'ui-padding-right');
    $.removeDataset(node, 'ui-padding-bottom');
};
