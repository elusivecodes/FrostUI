// Alert events
dom.addEventDelegate(document, 'click.frost.alert', '[data-dismiss="alert"]', e => {
    e.preventDefault();

    const target = UI.getTarget(e.currentTarget, '.alert');
    const alert = Alert.init(target);
    alert.close();
});
