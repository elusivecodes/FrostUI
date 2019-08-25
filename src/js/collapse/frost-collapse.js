// Default Collapse options
Collapse.defaults = {
    direction: 'bottom',
    duration: 300
};

// Trigger Collapse from data-toggle
dom.addEventDelegate(document, 'click', '[data-toggle="collapse"]', e => {
    e.preventDefault();

    const collapse = dom.hasData(e.currentTarget, 'collapse') ?
        dom.getData(e.currentTarget, 'collapse') :
        new Collapse(e.currentTarget);

    collapse.toggle().catch(_ => { });
});

// Auto-initialize Collapse from data-toggle
dom.addEvent(window, 'load', _ => {
    const nodes = dom.find('[data-toggle="collapse"]');

    for (const node of nodes) {
        new Collapse(node);
    }
});

// Add Collapse QuerySet method
if (QuerySet) {
    QuerySet.prototype.collapse = function(a, ...args) {
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

            const collapse = dom.hasData(node, 'collapse') ?
                dom.getData(node, 'collapse') :
                new Collapse(node, options);

            if (index || !method) {
                return;
            }

            result = collapse[method](...args);
        });

        return method ?
            result :
            this;
    };
}

UI.Collapse = Collapse;
