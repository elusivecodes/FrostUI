const assert = require('assert');
const { exec, screenshot } = require('../setup');

describe('popper container', function() {

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<div id="container" style="width: 50px; height: 50px;">' +
                '<button class="btn btn-secondary" id="button" type="button">Button</button>' +
                '</div>' +
                '<div class="badge" id="badge">Badge</div>'
            );
        });
    });

    describe('container option', function() {

        it('constrains popper to container', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const badge = dom.findOne('#badge');
                    UI.Popper.init(badge, {
                        reference: dom.findOne('#button'),
                        container: dom.findOne('#container')
                    });
                    return dom.getStyle(badge, 'transform');
                }),
                'translate3d(-6px, 34px, 0px)'
            );
        });

        it('constrains popper to container (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#badge').popper({
                        reference: dom.findOne('#button'),
                        container: dom.findOne('#container')
                    });
                    return dom.getStyle('#badge', 'transform');
                }),
                'translate3d(-6px, 34px, 0px)'
            );
        });

    });

});