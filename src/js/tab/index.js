import Tab from './tab.js';
import { $, document } from './../globals.js';
import { initComponent } from './../helpers.js';

initComponent('tab', Tab);

// Tab default options
Tab.defaults = {
    duration: 100,
};

// Tab events
$.addEventDelegate(document, 'click.ui.tab', '[data-ui-toggle="tab"]', (e) => {
    e.preventDefault();

    const tab = Tab.init(e.currentTarget);
    tab.show();
});

export default Tab;
