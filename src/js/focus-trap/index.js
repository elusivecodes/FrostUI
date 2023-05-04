import FocusTrap from './focus-trap.js';
import { initComponent } from './../helpers.js';

// FocusTrap default options
FocusTrap.defaults = {
    autoFocus: true,
};

// FocusTrap init
initComponent('focustrap', FocusTrap);

export default FocusTrap;
