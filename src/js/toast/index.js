import Toast from './toast.js';
import { $, document } from './../globals.js';
import { getTarget, initComponent } from './../helpers.js';

// Toast default options
Toast.defaults = {
    autohide: true,
    delay: 5000,
    duration: 100,
};

// Toast init
initComponent('toast', Toast);

// Toast events
$.addEventDelegate(document, 'click.ui.toast', '[data-ui-dismiss="toast"]', (e) => {
    e.preventDefault();

    const target = getTarget(e.currentTarget, '.toast');
    const toast = Toast.init(target, { autohide: false });
    toast.hide();
});

export default Toast;
