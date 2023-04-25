import { getTopModal } from './helpers.js';
import Modal from './modal.js';
import { _zoom } from './prototype/helpers.js';
import { $, document, window } from './../globals.js';
import { getTarget, initComponent } from './../helpers.js';
import { getClickTarget } from './../click-target/index.js';

// Modal default options
Modal.defaults = {
    duration: 250,
    backdrop: true,
    focus: true,
    show: false,
    keyboard: true,
};

// Modal prototype
const proto = Modal.prototype;

proto._zoom = _zoom;

// Modal init
initComponent('modal', Modal);

// Modal events
$.addEventDelegate(document, 'click.ui.modal', '[data-ui-toggle="modal"]', (e) => {
    e.preventDefault();

    const target = getTarget(e.currentTarget, '.modal');
    const modal = Modal.init(target);
    modal._activeTarget = e.currentTarget;
    modal.show();
});

$.addEventDelegate(document, 'click.ui.modal', '[data-ui-dismiss="modal"]', (e) => {
    e.preventDefault();

    const target = getTarget(e.currentTarget, '.modal');
    const modal = Modal.init(target);
    modal.hide();
});

// Events must be attached to the window, so offcanvas events are triggered first
$.addEvent(window, 'click.ui.modal', (e) => {
    const target = getClickTarget(e);

    if ($.is(target, '[data-ui-dismiss]')) {
        return;
    }

    const modal = getTopModal();

    if (
        !modal ||
        !modal._options.backdrop ||
        (modal._node !== target && $.hasDescendent(modal._node, target))
    ) {
        return;
    }

    if (modal._options.backdrop === 'static') {
        modal._zoom();
        return;
    }

    modal.hide();
});

$.addEvent(window, 'keyup.ui.modal', (e) => {
    if (e.code !== 'Escape') {
        return;
    }

    const modal = getTopModal();

    if (!modal || !modal._options.keyboard) {
        return;
    }

    if (modal._options.backdrop === 'static') {
        modal._zoom();
        return;
    }

    modal.hide();
});

export default Modal;
