const assert = require('assert');
const { exec } = require('../setup');
const { waitFor } = require('../helpers');

describe('Offcanvas/Modal', function() {

    afterEach(async function() {
        await exec(_ => {
            dom.removeClass(document.body, 'offcanvas-backdrop');
            dom.removeClass(document.body, 'modal-open');
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
                '<button class="btn btn-secondary" id="modalToggle" data-ui-toggle="modal" data-ui-target="#modal" type="button"></button>' +
                '</div>' +
                '<div class="modal" id="modal">' +
                '<div class="modal-dialog" id="modalDialog">' +
                '<button class="btn-close" id="button2" data-ui-dismiss="modal" type="button"></button>' +
                '</div>' +
                '</div>'
            );
        });
    });

    describe('user events', function() {

        it('does not hide the offcanvas on document click when modal is open', async function() {
            await exec(_ => {
                const offcanvas = dom.findOne('#offcanvas');
                UI.Offcanvas.init(offcanvas).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const modal = dom.findOne('#modal');
                    UI.Modal.init(modal).show();
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog');
                    dom.stop('.modal-backdrop');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.click(document.body);
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#modalDialog') && dom.hasAnimation('.modal-backdrop')),
                    true
                );
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#offcanvas')),
                    false
                );
            });
        });

        it('does not hide the offcanvas on escape when modal is open', async function() {
            await exec(_ => {
                const offcanvas = dom.findOne('#offcanvas');
                UI.Offcanvas.init(offcanvas).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const modal = dom.findOne('#modal');
                    UI.Modal.init(modal).show();
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#modalDialog');
                    dom.stop('.modal-backdrop');
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
                    await exec(_ => dom.hasAnimation('#modalDialog') && dom.hasAnimation('.modal-backdrop')),
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