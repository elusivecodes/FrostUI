// Default Button options
Button.defaults = {};

// Auto-initialize Button from data-toggle
dom.addEventOnce(window, 'load', _ => {
    const nodes = dom.find('[data-toggle="buttons"] > *, [data-toggle="button"]');

    for (const node of nodes) {
        new Button(node);
    }
});

// Add Button QuerySet method
if (QuerySet) {
    QuerySet.prototype.button = function(a, ...args) {
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

            const button = dom.hasData(node, 'button') ?
                dom.getData(node, 'button') :
                new Button(node, options);

            if (index) {
                return;
            }

            if (!method) {
                result = button;
            } else {
                result = button[method](...args);
            }
        });

        return result;
    };
}

UI.Button = Button;
