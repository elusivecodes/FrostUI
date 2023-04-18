import assert from 'node:assert/strict';
import { exec } from './../setup.js';
import { waitFor } from './../helpers.js';

describe('Ripple', function() {
    beforeEach(async function() {
        await exec((_) => {
            $.setHTML(
                document.body,
                '<button class="btn btn-secondary ripple" id="button"></button>',
            );
        });
    });

    describe('user events', function() {
        it('shows ripple effect on mousedown', async function() {
            assert.strictEqual(
                await exec((_) => {
                    $.triggerEvent('#button', 'mousedown');
                    return $.hasAnimation('#button .ripple-effect');
                }),
                true,
            );
        });

        it('removes ripple effect after animation completes', async function() {
            await exec((_) => {
                $.triggerEvent('#button', 'mousedown');
                $.triggerEvent('#button', 'mouseup');
            }).then(waitFor(800)).then(async function() {
                assert.strictEqual(
                    await exec((_) => {
                        return $.hasDescendent('#button', '.ripple-effect');
                    }),
                    false,
                );
            });
        });

        it('does not remove ripple effect until mouseup', async function() {
            await exec((_) => {
                $.triggerEvent('#button', 'mousedown');
            }).then(waitFor(800)).then(async function() {
                assert.strictEqual(
                    await exec((_) => {
                        return $.hasDescendent('#button', '.ripple-effect');
                    }),
                    true,
                );
            });
        });
    });
});
