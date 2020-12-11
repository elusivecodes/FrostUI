// Button events
dom.addEventDelegate(document, 'click.ui.button', '[data-ui-toggle="button"]', e => {
    e.preventDefault();

    const button = Button.init(e.currentTarget);
    button.toggle();
});
