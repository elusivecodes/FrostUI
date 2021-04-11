const assert = require('assert');
const { exec } = require('../setup');

describe('Button', function() {

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<button class="btn btn-secondary" id="button1" data-ui-toggle="button" type="button"></button>' +
                '<button class="btn btn-secondary" id="button2" data-ui-toggle="button" type="button"></button>'
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

        it('creates multiple buttons (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('button').button();
                    return dom.find('button').every(node =>
                        dom.getData(node, 'button') instanceof UI.Button
                    );
                }),
                true
            );
        });

        it('returns the button (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#button1').button() instanceof UI.Button;
                }),
                true
            );
        });

    });

    describe('#dispose', function() {

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

        it('removes the button (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#button1').button('dispose');
                    return dom.hasData('#button1', 'button');
                }),
                false
            );
        });

        it('removes multiple buttons (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('button').button('dispose');
                    return dom.find('button').some(node =>
                        dom.hasData(node, 'button')
                    );
                }),
                false
            );
        });

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
                '<button class="btn btn-secondary active" id="button1" data-ui-toggle="button" type="button" aria-pressed="true"></button>' +
                '<button class="btn btn-secondary" id="button2" data-ui-toggle="button" type="button"></button>'
            );
        });

        it('toggles the button (data-ui-toggle)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const button1 = dom.findOne('#button1');
                    dom.click(button1);
                    return dom.getHTML(document.body);
                }),
                '<button class="btn btn-secondary active" id="button1" data-ui-toggle="button" type="button" aria-pressed="true"></button>' +
                '<button class="btn btn-secondary" id="button2" data-ui-toggle="button" type="button"></button>'
            );
        });

        it('toggles the button (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#button1').button('toggle');
                    return dom.getHTML(document.body);
                }),
                '<button class="btn btn-secondary active" id="button1" data-ui-toggle="button" type="button" aria-pressed="true"></button>' +
                '<button class="btn btn-secondary" id="button2" data-ui-toggle="button" type="button"></button>'
            );
        });

        it('toggles multiple buttons (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('button').button('toggle');
                    return dom.getHTML(document.body);
                }),
                '<button class="btn btn-secondary active" id="button1" data-ui-toggle="button" type="button" aria-pressed="true"></button>' +
                '<button class="btn btn-secondary active" id="button2" data-ui-toggle="button" type="button" aria-pressed="true"></button>'
            );
        });

        it('toggles the button off', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const button1 = dom.findOne('#button1');
                    UI.Button.init(button1)
                        .toggle()
                        .toggle();
                    return dom.getHTML(document.body);
                }),
                '<button class="btn btn-secondary" id="button1" data-ui-toggle="button" type="button" aria-pressed="false"></button>' +
                '<button class="btn btn-secondary" id="button2" data-ui-toggle="button" type="button"></button>'
            );
        });

        it('returns the button', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const button1 = dom.findOne('#button1');
                    return UI.Button.init(button1).toggle() instanceof UI.Button;
                }),
                true
            );
        });

        it('returns the buttons (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#button1').button('toggle') instanceof UI.Button;
                }),
                true
            );
        });

    });

});