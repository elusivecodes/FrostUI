const assert = require('assert');
const { exec } = require('../setup');
const { waitFor } = require('../helpers');

describe('Offcanvas/Dropdown', function() {

    afterEach(async function() {
        await exec(_ => {
            dom.removeClass(document.body, 'offcanvas-backdrop');
            dom.removeAttribute(document.body, 'style');
        });
    });

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<button class="btn btn-secondary" id="offcanvasToggle" data-ui-toggle="offcanvas" data-ui-target="#offcanvas" type="button"></button>' +
                '<div class="offcanvas offcanvas-start" id="offcanvas">' +
                '<button class="btn-close" id="button" data-ui-dismiss="offcanvas" type="button"></button>' +
                '<div>' +
                '<button class="btn btn-secondary" id="dropdownToggle" data-ui-toggle="dropdown" type="button"></button>' +
                '<div class="dropdown-menu" id="dropdown">' +
                '<button class="dropdown-item" id="dropdownItem1"></button>' +
                '<button class="dropdown-item" id="dropdownItem2"></button>' +
                '<button class="dropdown-item" id="dropdownItem3"></button>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        });
    });

    describe('user events', function() {

        it('hides the offcanvas and dropdown on document click when dropdown is open', async function() {
            await exec(_ => {
                const offcanvas = dom.findOne('#offcanvas');
                UI.Offcanvas.init(offcanvas).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const dropdownToggle = dom.findOne('#dropdownToggle');
                    UI.Dropdown.init(dropdownToggle).show();
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#dropdown');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.click(document.body);
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#dropdown') && dom.hasAnimation('#offcanvas')),
                    true
                );
            });
        });

        it('does not hide the offcanvas on escape when dropdown is open', async function() {
            await exec(_ => {
                const offcanvas = dom.findOne('#offcanvas');
                UI.Offcanvas.init(offcanvas).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const dropdownToggle = dom.findOne('#dropdownToggle');
                    UI.Dropdown.init(dropdownToggle).show();
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#dropdown');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const event = new KeyboardEvent('keyup', {
                        bubbles: true,
                        code: 'Escape'
                    });
                    document.body.dispatchEvent(event);
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#dropdown')),
                    true
                );
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#offcanvas')),
                    false
                );
            });
        });

    });

});