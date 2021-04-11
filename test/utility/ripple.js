const assert = require('assert');
const { exec } = require('../setup');
const { waitFor } = require('../helpers');

describe('Ripple', function() {

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<button class="btn btn-secondary ripple" id="button"></button>'
            );
        });
    });

    describe('user events', function() {

        it('shows ripple effect on mousedown', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.triggerEvent('#button', 'mousedown');
                    return dom.hasAnimation('#button .ripple-effect');
                }),
                true
            );
        });

        it('removes ripple effect after animation completes', async function() {
            await exec(_ => {
                dom.triggerEvent('#button', 'mousedown');
            }).then(waitFor(1050)).then(async function() {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.hasDescendent('#button', '.ripple-effect');
                    }),
                    false
                );
            });
        });

    });

});