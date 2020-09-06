// Collapse events
dom.addEventDelegate(document, 'click.frost.collapse', '[data-toggle="collapse"]', e => {
    e.preventDefault();

    const selector = UI.getTargetSelector(e.currentTarget);
    const targets = dom.find(selector);

    for (const target of targets) {
        const collapse = Collapse.init(target);
        collapse.toggle();
    }
});
