// Dropdown default options
Dropdown.defaults = {
    duration: 100,
    placement: 'bottom',
    position: 'start',
    fixed: false,
    spacing: 2,
    minContact: false
};

// Dropdown QuerySet method
if (QuerySet) {
    QuerySet.prototype.dropdown = function(a, ...args) {
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

            const dropdown = Dropdown.init(node, settings);

            if (method) {
                dropdown[method](...args);
            }
        }

        return this;
    };
}

UI.Dropdown = Dropdown;
