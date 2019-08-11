// Default Popper options
Popper.defaults = {
    placement: 'bottom',
    position: 'center',
    fixed: false,
    spacing: 0,
    width: 'auto',
    zIndex: 1000
};

Popper._poppers = new Map();

UI.Popper = Popper;
