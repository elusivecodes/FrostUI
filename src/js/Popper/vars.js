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
    useGpu: true,
    noAttributes: false
};

PopperSet._poppers = [];

UI.initComponent('popper', Popper);

UI.Popper = Popper;
UI.PopperSet = PopperSet;
