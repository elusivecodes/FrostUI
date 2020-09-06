// Popper default options
Popper.defaults = {
    reference: null,
    container: null,
    arrow: null,
    placement: 'bottom',
    position: 'center',
    fixed: false,
    spacing: 0,
    minContact: false,
    useGpu: true
};

PopperSet._poppers = [];
PopperSet._popperOverflows = new Map;

UI.Popper = Popper;
UI.PopperSet = PopperSet;
