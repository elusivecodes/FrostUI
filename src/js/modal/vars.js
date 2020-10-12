// Modal default options
Modal.defaults = {
    duration: 500,
    backdrop: true,
    focus: true,
    show: false,
    keyboard: true
};

// Modal QuerySet method
if (QuerySet) {
    QuerySet.prototype.modal = function(a, ...args) {
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

            const modal = Modal.init(node, settings);

            if (method) {
                modal[method](...args);
            }
        }

        return this;
    };
}

UI.Modal = Modal;
