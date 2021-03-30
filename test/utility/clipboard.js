const assert = require('assert');
const { exec } = require('../setup');

describe('Clipboard', function() {

    describe('copy action', function() {

        it('works with copy action (data-ui-text)', async function() {
            await exec(_ => {
                dom.setHTML(
                    document.body,
                    '<button id="button" data-ui-toggle="clipboard" data-ui-text="Test 1"></button>'
                );
            }).then(async function() {
                assert.strictEqual(
                    await exec(_ => {
                        dom.click('#button');
                        return navigator.clipboard.readText();
                    }),
                    'Test 1'
                );
            });
        });

        it('works with copy action (data-ui-target)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.setHTML(
                        document.body,
                        '<button id="button" data-ui-toggle="clipboard" data-ui-target="#test"></button>' +
                        '<div id="test">Test 2</div>'
                    );
                    dom.click('#button');
                    return navigator.clipboard.readText();
                }),
                'Test 2'
            );
        });

        it('works with copy action (input)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.setHTML(
                        document.body,
                        '<button id="button" data-ui-toggle="clipboard" data-ui-target="#test"></button>' +
                        '<input id="test" value="Test 3" />'
                    );
                    dom.click('#button');
                    return navigator.clipboard.readText();
                }),
                'Test 3'
            );
            assert.strictEqual(
                await exec(_ => {
                    return dom.getValue('#test');
                }),
                'Test 3'
            );
        });

        it('works with copy action (textarea)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.setHTML(
                        document.body,
                        '<button id="button" data-ui-toggle="clipboard" data-ui-target="#test"></button>' +
                        '<textarea id="test">Test 4</textarea>'
                    );
                    dom.click('#button');
                    return navigator.clipboard.readText();
                }),
                'Test 4'
            );
            assert.strictEqual(
                await exec(_ => {
                    return dom.getValue('#test');
                }),
                'Test 4'
            );
        });

    });

    describe('cut action', function() {

        it('works with cut action (input)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.setHTML(
                        document.body,
                        '<button id="button" data-ui-toggle="clipboard" data-ui-action="cut" data-ui-target="#test"></button>' +
                        '<input id="test" value="Test 5" />'
                    );
                    dom.click('#button');
                    return navigator.clipboard.readText();
                }),
                'Test 5'
            );
            assert.strictEqual(
                await exec(_ => {
                    return dom.getValue('#test');
                }),
                ''
            );
        });

        it('works with cut action (textarea)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.setHTML(
                        document.body,
                        '<button id="button" data-ui-toggle="clipboard" data-ui-action="cut" data-ui-target="#test"></button>' +
                        '<textarea id="test">Test 6</textarea>'
                    );
                    dom.click('#button');
                    return navigator.clipboard.readText();
                }),
                'Test 6'
            );
            assert.strictEqual(
                await exec(_ => {
                    return dom.getValue('#test');
                }),
                ''
            );
        });

        it('does not remove text content for elements', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.setHTML(
                        document.body,
                        '<button id="button" data-ui-toggle="clipboard" data-ui-action="cut" data-ui-target="#test"></button>' +
                        '<div id="test">Test 7</div>'
                    );
                    dom.click('#button');
                    return navigator.clipboard.readText();
                }),
                'Test 7'
            );
            assert.strictEqual(
                await exec(_ => {
                    return dom.getText('#test');
                }),
                'Test 7'
            );
        });

    });

    describe('events', function() {

        it('triggers copied event', async function() {
            assert.strictEqual(
                await exec(async _ => {
                    dom.setHTML(
                        document.body,
                        '<button id="button" data-ui-toggle="clipboard" data-ui-text="Test 8"></button>'
                    );
                    return new Promise(resolve => {
                        dom.addEvent('#button', 'copied.ui.clipboard', _ => {
                            resolve(navigator.clipboard.readText());
                        });
                        dom.click('#button');
                    });
                }),
                'Test 8'
            );
        });

    });

});