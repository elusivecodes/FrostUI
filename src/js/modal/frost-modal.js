// Default Modal options
Modal.defaults = {
    duration: 250,
    backdrop: true,
    focus: true,
    show: true,
    keyboard: true
};

Modal._toggles = new WeakMap;

// Auto-initialize Modal from data-toggle
dom.addEventOnce(window, 'load', _ => {
    const nodes = dom.find('[data-toggle="modal"]');

    for (const node of nodes) {
        Modal.fromToggle(node);
    }
});

// Add Modal QuerySet method
if (QuerySet) {
    QuerySet.prototype.modal = function(a, ...args) {
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

            const modal = dom.hasData(node, 'modal') ?
                dom.getData(node, 'modal') :
                new Modal(node, options);

            if (index) {
                return;
            }

            if (!method) {
                result = modal;
            } else {
                result = modal[method](...args);
            }
        });

        return result;
    };
}

UI.Modal = Modal;
