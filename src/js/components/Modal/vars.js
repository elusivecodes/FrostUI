// Modal default options
Modal.defaults = {
    duration: 250,
    backdrop: true,
    focus: true,
    show: false,
    keyboard: true
};

Modal.stack = new Set;

UI.initComponent('modal', Modal);

UI.Modal = Modal;