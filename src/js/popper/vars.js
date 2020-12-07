// Popper default options
Popper.defaults = {
    reference: null,
    container: null,
    arrow: null,
    afterUpdate: null,
    beforeUpdate: null,
    placement: 'bottom',
    position: 'center',
    fixed: false,
    spacing: 0,
    minContact: null,
    useGpu: true
};

PopperSet._poppers = [];
PopperSet._popperOverflows = new Map;

UI.Popper = Popper;
UI.PopperSet = PopperSet;
