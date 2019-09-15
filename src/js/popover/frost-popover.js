// Default Popover options
Popover.defaults = {
    classes: {
        popover: 'popover',
        popoverHeader: 'popover-header',
        popoverBody: 'popover-body',
        arrow: 'arrow'
    },
    duration: 100,
    enable: true,
    html: false,
    sanitize: input => dom.sanitize(input),
    trigger: 'click',
    placement: 'auto',
    position: 'center',
    fixed: false,
    spacing: 5,
    minContact: false
};

// Auto-initialize Popover from data-toggle
dom.addEvent(window, 'load', _ => {
    const nodes = dom.find('[data-toggle="popover"]');

    for (const node of nodes) {
        new Popover(node);
    }
});

// Add Popover QuerySet method
if (QuerySet) {
    QuerySet.prototype.popover = function(a, ...args) {
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

            const popover = dom.hasData(node, 'popover') ?
                dom.getData(node, 'popover') :
                new Popover(node, options);

            if (index || !method) {
                return;
            }

            result = popover[method](...args);
        });

        return method ?
            result :
            this;
    };
}

UI.Popover = Popover;
