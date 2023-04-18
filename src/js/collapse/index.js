import Collapse from './collapse.js';
import { $, document } from './../globals.js';
import { getTargetSelector, initComponent } from './../helpers.js';

initComponent('collapse', Collapse);

// Collapse default options
Collapse.defaults = {
    direction: 'bottom',
    duration: 250,
};

// Collapse events
$.addEventDelegate(document, 'click.ui.collapse', '[data-ui-toggle="collapse"]', (e) => {
    e.preventDefault();

    const selector = getTargetSelector(e.currentTarget);
    const targets = $.find(selector);

    for (const target of targets) {
        const collapse = Collapse.init(target);
        collapse.toggle();
    }
});

export default Collapse;
