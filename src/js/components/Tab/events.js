// Tab events
dom.addEventDelegate(document, 'click.ui.tab', '[data-ui-toggle="tab"]', e => {
    e.preventDefault();

    const tab = Tab.init(e.currentTarget);
    tab.show();
});
