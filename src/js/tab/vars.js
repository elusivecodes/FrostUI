// Tab default options
Tab.defaults = {
    duration: 100
};

// Tab events
dom.addEventDelegate(document, 'click.frost.tab', '[data-toggle="tab"]', e => {
    e.preventDefault();

    const tab = Tab.init(e.currentTarget);
    tab.show();
});

// Tab QuerySet method
if (QuerySet) {
    QuerySet.prototype.tab = function(a, ...args) {
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

            const tab = Tab.init(node, settings);

            if (method) {
                tab[method](...args);
            }
        }

        return this;
    };
}

UI.Tab = Tab;
