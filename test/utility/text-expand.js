const assert = require('assert');
const { exec } = require('../setup');

describe('Text Expand', function() {

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<textarea class="input-filled text-expand" id="input"></textarea>'
            );
        });
    });

    describe('user events', function() {

        it('expands on change', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.setValue('#input', new Array(5).fill('').join("\r\n"));
                    dom.triggerEvent('#input', 'change');
                    return dom.height('#input');
                }),
                148
            );
        });

        it('contracts on change', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.setValue('#input', new Array(5).fill('').join("\r\n"));
                    dom.triggerEvent('#input', 'change');
                    dom.setValue('#input', '');
                    dom.triggerEvent('#input', 'change');
                    return dom.height('#input');
                }),
                70
            );
        });

        it('expands on user input', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.setValue('#input', new Array(5).fill('').join("\r\n"));
                    dom.triggerEvent('#input', 'input');
                    return dom.height('#input');
                }),
                148
            );
        });

        it('contracts on user input', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.setValue('#input', new Array(5).fill('').join("\r\n"));
                    dom.triggerEvent('#input', 'input');
                    dom.setValue('#input', '');
                    dom.triggerEvent('#input', 'input');
                    return dom.height('#input');
                }),
                70
            );
        });

    });

});