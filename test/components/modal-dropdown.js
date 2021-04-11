const assert = require('assert');
const { exec } = require('../setup');
const { waitFor } = require('../helpers');

describe('Modal/Dropdown', function() {

    afterEach(async function() {
        await exec(_ => {
            dom.removeClass(document.body, 'modal-open');
            dom.removeAttribute(document.body, 'style');
        });
    });

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<button class="btn btn-secondary" id="modalToggle" data-ui-toggle="modal" data-ui-target="#modal" type="button"></button>' +
                '<div class="modal" id="modal">' +
                '<div class="modal-dialog" id="modalDialog">' +
                '<button class="btn-close" id="button" data-ui-dismiss="modal" type="button"></button>' +
                '<div>' +
                '<button class="btn btn-secondary" id="dropdownToggle" data-ui-toggle="dropdown" type="button"></button>' +
                '<div class="dropdown-menu" id="dropdown">' +
                '<button class="dropdown-item" id="dropdownItem1"></button>' +
                '<button class="dropdown-item" id="dropdownItem2"></button>' +
                '<button class="dropdown-item" id="dropdownItem3"></button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
        });
    });

    describe('user events', function() {

        it('hides the modal and dropdown on document click when dropdown is open', async function() {
            await exec(_ => {
                const modal = dom.findOne('#modal');
                UI.Modal.init(modal).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog');
                    dom.stop('.modal-backdrop');
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
                    await exec(_ => dom.hasAnimation('#dropdown') && dom.hasAnimation('#modalDialog') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
            });
        });

        it('does not hide the modal on escape when dropdown is open', async function() {
            await exec(_ => {
                const modal = dom.findOne('#modal');
                UI.Modal.init(modal).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog');
                    dom.stop('.modal-backdrop');
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
                    await exec(_ => dom.hasAnimation('#modalDialog')),
                    false
                );
            });
        });

    });

});