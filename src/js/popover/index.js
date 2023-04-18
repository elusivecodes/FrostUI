import Popover from './popover.js';
import { $ } from './../globals.js';
import { initComponent } from './../helpers.js';

initComponent('popover', Popover);

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
    appendTo: null,
    sanitize: (input) => $.sanitize(input),
    trigger: 'click',
    placement: 'auto',
    position: 'center',
    fixed: false,
    spacing: 3,
    minContact: false,
    noAttributes: false,
};

export default Popover;
