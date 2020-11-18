// Alert default options
Alert.defaults = {
    duration: 100
};

// Alert QuerySet method
if (QuerySet) {
    QuerySet.prototype.alert = function(a, ...args) {
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

            const alert = Alert.init(node, settings);

            if (method) {
                alert[method](...args);
            }
        }

        return this;
    };
}

UI.Alert = Alert;
