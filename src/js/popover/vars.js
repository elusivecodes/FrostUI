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

UI.initComponent('popover', Popover);

UI.Popover = Popover;
