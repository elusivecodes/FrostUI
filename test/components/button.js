const assert = require('assert');
const { exec } = require('../setup');

describe('Button', function() {

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<button id="button1" data-ui-toggle="button"></button>' +
                '<button id="button2" data-ui-toggle="button"></button>'
            );
        });
    });

    describe('#init', function() {

        it('creates a button', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const button1 = dom.findOne('#button1');
                    return UI.Button.init(button1) instanceof UI.Button;
                }),
                true
            );
        });

        it('creates a button (data-toggle)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.click('#button1');
                    return dom.getData('#button1', 'button') instanceof UI.Button;
                }),
                true
            );
        });

        it('creates a button (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#button1').button();
                    return dom.getData('#button1', 'button') instanceof UI.Button;
                }),
                true
            );
        });

    });

    describe('#dispose', function() {

        it('clears button memory', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const button1 = dom.findOne('#button1');
                    const button = UI.Button.init(button1);
                    button.dispose();

                    for (const key in button) {
                        if (Core.isObject(button[key]) && !Core.isFunction(button[key])) {
                            return false;
                        }
                    }

                    return true;
                }),
                true
            );
        });

        it('removes the button', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const button1 = dom.findOne('#button1');
                    UI.Button.init(button1).dispose();
                    return dom.hasData(button1, 'button');
                }),
                false
            );
        });

        it('clears button memory when node is removed', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const button1 = dom.findOne('#button1');
                    const button = UI.Button.init(button1);
                    dom.remove(button1);

                    for (const key in button) {
                        if (Core.isObject(button[key]) && !Core.isFunction(button[key])) {
                            return false;
                        }
                    }

                    return true;
                }),
                true
            );
        });

    });

    describe('#toggle', function() {

        it('toggles the button', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const button1 = dom.findOne('#button1');
                    UI.Button.init(button1).toggle();
                    return dom.getHTML(document.body);
                }),
                '<button id="button1" data-ui-toggle="button" class="active" aria-pressed="true"></button>' +
                '<button id="button2" data-ui-toggle="button"></button>'
            );
        });

        it('toggles the button (data-ui-toggle)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const button1 = dom.findOne('#button1');
                    dom.click(button1);
                    return dom.getHTML(document.body);
                }),
                '<button id="button1" data-ui-toggle="button" class="active" aria-pressed="true"></button>' +
                '<button id="button2" data-ui-toggle="button"></button>'
            );
        });

        it('toggles the button (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#button1').button('toggle');
                    return dom.getHTML(document.body);
                }),
                '<button id="button1" data-ui-toggle="button" class="active" aria-pressed="true"></button>' +
                '<button id="button2" data-ui-toggle="button"></button>'
            );
        });

        it('toggles the button off', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const button1 = dom.findOne('#button1');
                    const button = UI.Button.init(button1);
                    button.toggle();
                    button.toggle();
                    return dom.getHTML(document.body);
                }),
                '<button id="button1" data-ui-toggle="button" class="" aria-pressed="false"></button>' +
                '<button id="button2" data-ui-toggle="button"></button>'
            );
        });

    });

});