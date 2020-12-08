// Popover default options
Popover.defaults = {
    template: '<div class="popover" role="tooltip">' +
        '<div class="popover-arrow"></div>' +
        '<h3 class="popover-header"></h3>' +
        '<div class="popover-body"></div>' +
        '</div>',
    customClass: null,
    duration: 100,
    enable: true,
    html: false,
    sanitize: input => dom.sanitize(input),
    trigger: 'click',
    placement: 'auto',
    position: 'center',
    fixed: false,
    spacing: 3,
    minContact: false
};

// Add Popover QuerySet method
if (QuerySet) {
    QuerySet.prototype.popover = function(a, ...args) {
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

            const popover = Popover.init(node, settings);

            if (method) {
                popover[method](...args);
            }
        }

        return this;
    };
}

UI.Popover = Popover;
