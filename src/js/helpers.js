/**
 * Get a target from a node.
 * @param {HTMLElement} node The input node.
 * @param {string} [closestSelector] The default closest selector.
 * @return {HTMLElement} The target node.
 */
UI.getTarget = (node, closestSelector) => {
    const selector = UI.getTargetSelector(node);

    let target;

    if (selector && selector !== '#') {
        target = dom.findOne(selector);
    } else if (closestSelector) {
        target = dom.closest(node, closestSelector).shift();
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
UI.getTargetSelector = node =>
    dom.getDataset(node, 'target') || dom.getAttribute(node, 'href');
