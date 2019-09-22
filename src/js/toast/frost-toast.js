// Default Toast options
Toast.defaults = {
    autohide: true,
    delay: 5000,
    duration: 100
};

// Auto-initialize Toast from data-toggle
dom.addEventOnce(window, 'load', _ => {
    const nodes = dom.find('[data-toggle="toast"]');

    for (const node of nodes) {
        new Toast(node);
    }
});

// Add Toast QuerySet method
if (QuerySet) {
    QuerySet.prototype.toast = function(a, ...args) {
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

            const toast = dom.hasData(node, 'toast') ?
                dom.getData(node, 'toast') :
                new Toast(node, options);

            if (index) {
                return;
            }

            if (!method) {
                result = toast;
            } else {
                result = toast[method](...args);
            }
        });

        return result;
    };
}

UI.Toast = Toast;
