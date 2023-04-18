import Alert from './alert.js';
import { $, document } from './../globals.js';
import { getTarget, initComponent } from './../helpers.js';

initComponent('alert', Alert);

// Alert default options
Alert.defaults = {
    duration: 100,
};

// Alert events
$.addEventDelegate(document, 'click.ui.alert', '[data-ui-dismiss="alert"]', (e) => {
    e.preventDefault();

    const target = getTarget(e.currentTarget, '.alert');
    const alert = Alert.init(target);
    alert.close();
});

export default Alert;
