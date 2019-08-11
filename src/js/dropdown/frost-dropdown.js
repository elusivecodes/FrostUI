// Default Dropdown options
Dropdown.defaults = {
    duration: 150,
    placement: 'bottom',
    position: 'start',
    fixed: false,
    spacing: 2,
    width: false,
    zIndex: 1000
};

// Auto-initialize Dropdown from data-toggle
dom.addEvent(window, 'load', _ => {
    const nodes = dom.find('[data-toggle="dropdown"]');

    for (const node of nodes) {
        new Dropdown(node);
    }
});

// Add Dropdown QuerySet method
if (QuerySet) {
    QuerySet.prototype.dropdown = function(a, ...args) {
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

            const dropdown = dom.hasData(node, 'dropdown') ?
                dom.getData(node, 'dropdown') :
                new Dropdown(node, options);

            if (index || !method) {
                return;
            }

            result = dropdown[method](...args);
        });

        return method ?
            result :
            this;
    };
}

UI.Dropdown = Dropdown;
