// Default Tooltip options
Tooltip.defaults = {
    classes: {
        tooltip: 'tooltip',
        tooltipInner: 'tooltip-inner',
        arrow: 'arrow'
    },
    duration: 100,
    enable: true,
    html: false,
    trigger: 'hover focus',
    sanitize: input => dom.sanitize(input),
    placement: 'auto',
    position: 'center',
    fixed: false,
    spacing: 2,
    minContact: false
};

// Auto-initialize Tooltip from data-toggle
dom.addEvent(window, 'load', _ => {
    const nodes = dom.find('[data-toggle="tooltip"]');

    for (const node of nodes) {
        new Tooltip(node);
    }
});

// Add Tooltip QuerySet method
if (QuerySet) {
    QuerySet.prototype.tooltip = function(a, ...args) {
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

            const tooltip = dom.hasData(node, 'tooltip') ?
                dom.getData(node, 'tooltip') :
                new Tooltip(node, options);

            if (index || !method) {
                return;
            }

            result = tooltip[method](...args);
        });

        return method ?
            result :
            this;
    };
}

UI.Tooltip = Tooltip;
