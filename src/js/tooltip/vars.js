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

UI.initComponent('tooltip', Tooltip);

UI.Tooltip = Tooltip;
