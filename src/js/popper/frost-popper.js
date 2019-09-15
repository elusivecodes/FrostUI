// Default Popper options
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

Popper._overflowTypes = ['overflow', 'overflowX', 'overflowY'];
Popper._overflowValues = ['auto', 'scroll'];

UI.Popper = Popper;
