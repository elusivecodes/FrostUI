// Default Collapse options
Collapse.defaults = {
    direction: 'bottom',
    duration: 250
};

Collapse._toggles = new WeakMap;

// Auto-initialize Collapse from data-ride
dom.addEventOnce(window, 'load', _ => {
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

            if (index) {
                return;
            }

            if (!method) {
                result = collapse;
            } else {
                result = collapse[method](...args);
            }
        });

        return result;
    };
}

UI.Collapse = Collapse;
