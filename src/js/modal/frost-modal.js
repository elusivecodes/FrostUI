// Default Modal options
Modal.defaults = {
    duration: 250,
    backdrop: true,
    focus: true,
    show: true,
    keyboard: true
};

// Initialize Modal from data-toggle
dom.addEventDelegate(document, 'click', '[data-toggle="modal"]', e => {
    e.preventDefault();

    const target = dom.getDataset(e.currentTarget, 'target');
    const element = dom.findOne(target);

    if (dom.hasData(element, 'modal')) {
        dom.getData(element, 'modal').show();
    } else {
        new Modal(element);
    }
});

// Hide Modal from data-dismiss
dom.addEventDelegate(document, 'click', '[data-dismiss="modal"]', e => {
    e.preventDefault();

    const element = dom.closest(e.currentTarget, '.modal');
    const modal = dom.hasData(element, 'modal') ?
        dom.getData(element, 'modal') :
        new Modal(element);

    modal.hide();
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

            if (index || !method) {
                return;
            }

            result = modal[method](...args);
        });

        return method ?
            result :
            this;
    };
}

UI.Modal = Modal;
