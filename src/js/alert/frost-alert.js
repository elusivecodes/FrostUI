// Default Alert options
Alert.defaults = {
    duration: 100
};

// Auto-initialize Alert from data-toggle
dom.addEventOnce(window, 'load', _ => {
    const nodes = dom.find('[data-toggle="alert"]');

    for (const node of nodes) {
        new Alert(node);
    }
});

// Add Alert QuerySet method
if (QuerySet) {
    QuerySet.prototype.alert = function(a, ...args) {
        let options, method;
        if (Core.isObject(a)) {
            options = a;
        } else if (Core.isString(a)) {
            method = a;
        }

        let result;
        this.each((node, index) => {
            if (!Core.isElement(node)) {
                return;
            }

            const alert = dom.hasData(node, 'alert') ?
                dom.getData(node, 'alert') :
                new Alert(node, options);

            if (index) {
                return;
            }

            if (!method) {
                result = alert;
            } else {
                result = alert[method](...args);
            }
        });

        return result;
    };
}

UI.Alert = Alert;
