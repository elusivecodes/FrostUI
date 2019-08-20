// Default Alert options
Alert.defaults = {
    duration: 100
};

// Remove Alert from data-dismiss
dom.addEventDelegate(document, 'click', '[data-dismiss="alert"]', e => {
    e.preventDefault();

    const element = dom.closest(e.currentTarget, '.alert').shift();
    const alert = dom.hasData(element, 'alert') ?
        dom.getData(element, 'alert') :
        new Alert(element);

    alert.close().catch(_ => { });
});

UI.Alert = Alert;
