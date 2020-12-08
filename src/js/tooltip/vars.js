// Tooltip default options
Tooltip.defaults = {
    template: '<div class="tooltip" role="tooltip">' +
        '<div class="tooltip-arrow"></div>' +
        '<div class="tooltip-inner"></div>' +
        '</div>',
    customClass: null,
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

// Tooltip QuerySet method
if (QuerySet) {
    QuerySet.prototype.tooltip = function(a, ...args) {
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

            const tooltip = Tooltip.init(node, settings);

            if (method) {
                tooltip[method](...args);
            }
        }

        return this;
    };
}

UI.Tooltip = Tooltip;
