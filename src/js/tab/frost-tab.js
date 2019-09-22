// Default Tab options
Tab.defaults = {
    duration: 100
};

// Auto-initialize Tab from data-toggle
dom.addEventOnce(window, 'load', _ => {
    const nodes = dom.find('[data-toggle="tab"]');

    for (const node of nodes) {
        new Tab(node);
    }
});

// Add Tab QuerySet method
if (QuerySet) {
    QuerySet.prototype.tab = function(a, ...args) {
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

            const tab = dom.hasData(node, 'tab') ?
                dom.getData(node, 'tab') :
                new Tab(node, options);

            if (index) {
                return;
            }

            if (!method) {
                result = tab;
            } else {
                result = tab[method](...args);
            }
        });

        return result;
    };
}

UI.Tab = Tab;
