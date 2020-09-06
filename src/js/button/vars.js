// Button default settings
Button.defaults = {};

// Button QuerySet method
if (QuerySet) {
    QuerySet.prototype.button = function(a, ...args) {
        let settings, method;

        if (Core.isObject(a)) {
            settings = a;
        } else if (Core.isString(a)) {
            method = a;
        }

        for (const node of this) {
            if (!Core.isElement(node)) {
                continue;
            }

            const button = Button.init(node, settings);

            if (method) {
                button[method](...args);
            }
        }

        return this;
    };
}

UI.Button = Button;
