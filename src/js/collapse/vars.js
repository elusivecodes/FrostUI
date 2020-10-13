// Collapse default options
Collapse.defaults = {
    direction: 'bottom',
    duration: 250
};

// Collapse QuerySet method
if (QuerySet) {
    QuerySet.prototype.collapse = function(a, ...args) {
        let options, method;

        if (Core.isObject(a)) {
            options = a;
        } else if (Core.isString(a)) {
            method = a;
        }

        for (const node of this) {
            if (!Core.isElement(node)) {
                continue;
            }

            const collapse = Collapse.init(node, options);

            if (method) {
                collapse[method](...args);
            }
        }

        return this;
    };
}

UI.Collapse = Collapse;
