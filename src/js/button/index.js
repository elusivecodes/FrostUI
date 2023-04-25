import Button from './button.js';
import { $, document } from './../globals.js';
import { initComponent } from './../helpers.js';

// Button init
initComponent('button', Button);

// Button events
$.addEventDelegate(document, 'click.ui.button', '[data-ui-toggle="button"]', (e) => {
    e.preventDefault();

    const button = Button.init(e.currentTarget);
    button.toggle();
});

export default Button;
