// Default Button options
Button.defaults = {};

// Trigger Button from data-toggle
dom.addEventDelegate(document, 'click', '[data-toggle="buttons"] > .btn, [data-toggle="button"]', e => {
    e.preventDefault();

    const button = dom.hasData(e.currentTarget, 'button') ?
        dom.getData(e.currentTarget, 'button') :
        new Button(e.currentTarget);

    button.toggle();
});

UI.Button = Button;
