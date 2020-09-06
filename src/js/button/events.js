// Button events
dom.addEventDelegate(document, 'click.frost.button', '[data-toggle="buttons"] > *, [data-toggle="button"]', e => {
    e.preventDefault();

    const button = Button.init(e.currentTarget);
    button.toggle();
});
