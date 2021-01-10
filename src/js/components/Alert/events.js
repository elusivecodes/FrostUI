// Alert events
dom.addEventDelegate(document, 'click.ui.alert', '[data-ui-dismiss="alert"]', e => {
    e.preventDefault();

    const target = UI.getTarget(e.currentTarget, '.alert');
    const alert = Alert.init(target);
    alert.close();
});
