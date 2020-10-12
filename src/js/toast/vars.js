// Toast default options
Toast.defaults = {
    autohide: true,
    delay: 5000,
    duration: 250
};

// Auto-initialize Toast from data-toggle
dom.addEventDelegate(document, 'click.frost.toast', '[data-dismiss="toast"]', e => {
    e.preventDefault();

    const target = UI.getTarget(e.currentTarget, '.toast');
    const toast = Toast.init(target, { autohide: false });
    toast.hide();
});

// Toast QuerySet method
if (QuerySet) {
    QuerySet.prototype.toast = function(a, ...args) {
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

            const toast = Toast.init(node, settings);

            if (method) {
                toast[method](...args);
            }
        }

        return this;
    };
}

UI.Toast = Toast;
