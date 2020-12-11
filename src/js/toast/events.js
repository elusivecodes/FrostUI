// Toast events
dom.addEventDelegate(document, 'click.ui.toast', '[data-ui-dismiss="toast"]', e => {
    e.preventDefault();

    const target = UI.getTarget(e.currentTarget, '.toast');
    const toast = Toast.init(target, { autohide: false });
    toast.hide();
});
