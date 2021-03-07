/**
 * Get normalized UI data from a node.
 * @param {HTMLElement} node The input node.
 * @returns {object} The normalized data.
 */
UI.getDataset = node => {
    const dataset = dom.getDataset(node);

    const uiDataset = {};

    for (const key in dataset) {
        if (/ui[A-Z]/.test(key)) {
            const realKey = key.slice(2, 3).toLowerCase() + key.slice(3);
            uiDataset[realKey] = dataset[key];
        }
    }

    return uiDataset;
};

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
    dom.getDataset(node, 'uiTarget') || dom.getAttribute(node, 'href');

/**
 * Initialize a UI component.
 * @param {string} key The component key.
 * @param {class} component The component class.
 */
UI.initComponent = (key, component) => {
    component.DATA_KEY = key;
    component.REMOVE_EVENT = `remove.ui.${key}`;

    QuerySet.prototype[key] = function(a, ...args) {
        let settings, method, firstResult;

        if (Core.isObject(a)) {
            settings = a;
        } else if (Core.isString(a)) {
            method = a;
        }

        for (const [index, node] of [...this].entries()) {
            if (!Core.isElement(node)) {
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
