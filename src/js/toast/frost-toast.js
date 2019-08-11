// Default Toast options
Toast.defaults = {
    autohide: true,
    delay: 5000,
    duration: 100
};

// Auto-initialize Toast from data-toggle
dom.addEvent(window, 'load', _ => {
    const nodes = dom.find('[data-toggle="toast"]');

    for (const node of nodes) {
        new Toast(node);
    }
});

// Hide Toast from data-dismiss
dom.addEventDelegate(document, 'click', '[data-dismiss="toast"]', e => {
    e.preventDefault();

    const element = dom.closest(e.currentTarget, '.toast');
    const toast = dom.hasData(element, 'toast') ?
        dom.getData(element, 'toast') :
        new Toast(element);

    toast.hide();
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

            if (index || !method) {
                return;
            }

            result = toast[method](...args);
        });

        return method ?
            result :
            this;
    };
}

UI.Toast = Toast;
