const assert = require('assert');
const { exec } = require('../setup');

describe('Popper', function() {

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<button class="btn btn-secondary" id="button" type="button">Button</button>' +
                '<div class="badge" id="badge">Badge</div>'
            );
        });
    });

    describe('#init', function() {

        it('creates a popper', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const badge = dom.findOne('#badge');
                    return UI.Popper.init(badge, {
                        reference: dom.findOne('#button')
                    }) instanceof UI.Popper;
                }),
                true
            );
        });

        it('creates a popper (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#badge').popper({
                        reference: dom.findOne('#button')
                    });
                    return dom.getData('#badge', 'popper') instanceof UI.Popper;
                }),
                true
            );
        });

        it('returns the popper (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#badge').popper({
                        reference: dom.findOne('#button')
                    }) instanceof UI.Popper;
                }),
                true
            );
        });

    });

    describe('#dispose', function() {

        it('removes the alert', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const badge = dom.findOne('#badge');
                    UI.Popper.init(badge, {
                        reference: dom.findOne('#button')
                    }).dispose();
                    return dom.hasData(badge, 'popper');
                }),
                false
            );
        });

        it('removes the alert (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#badge').popper({
                        reference: dom.findOne('#button')
                    });
                    dom.query('#badge').popper('dispose');
                    return dom.hasData('#badge', 'popper');
                }),
                false
            );
        });

        it('clears alert memory', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const badge = dom.findOne('#badge');
                    const popper = UI.Popper.init(badge, {
                        reference: dom.findOne('#button')
                    });
                    popper.dispose();

                    for (const key in popper) {
                        if (Core.isObject(popper[key]) && !Core.isFunction(popper[key])) {
                            return false;
                        }
                    }

                    return true;
                }),
                true
            );
        });

        it('clears alert memory when node is removed', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const badge = dom.findOne('#badge');
                    const popper = UI.Popper.init(badge, {
                        reference: dom.findOne('#button')
                    });
                    dom.remove(badge);

                    for (const key in popper) {
                        if (Core.isObject(popper[key]) && !Core.isFunction(popper[key])) {
                            return false;
                        }
                    }

                    return true;
                }),
                true
            );
        });

    });

    describe('#update', function() {

        it('updates the popper', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const badge = dom.findOne('#badge');
                    const button = dom.findOne('#button');
                    const popper = UI.Popper.init(badge, {
                        reference: button
                    });

                    dom.setStyle(button, 'marginTop', '50px');
                    popper.update();

                    return dom.getStyle(badge, 'transform');
                }),
                'translate3d(4px, 84px, 0px)'
            );
        });

        it('updates the popper (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const button = dom.findOne('#button');
                    dom.query('#badge').popper({
                        reference: button
                    });
                    dom.setStyle(button, 'marginTop', '50px');
                    dom.query('#badge').popper('update');

                    return dom.getStyle(badge, 'transform');
                }),
                'translate3d(4px, 84px, 0px)'
            );
        });

    });

    describe('beforeUpdate option', function() {

        it('executes a callback before updating the popper', async function() {
            assert.strictEqual(
                await exec(_ => {
                    let result;
                    const badge = dom.findOne('#badge');
                    UI.Popper.init(badge, {
                        reference: dom.findOne('#button'),
                        beforeUpdate: _ => {
                            result = dom.getStyle(badge, 'transform');
                        }
                    });
                    return result;
                }),
                ''
            );
        });

        it('executes a callback after updating the popper (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    let result;
                    dom.query('#badge').popper({
                        reference: dom.findOne('#button'),
                        beforeUpdate: _ => {
                            result = dom.getStyle('#badge', 'transform');
                        }
                    });
                    return result;
                }),
                ''
            );
        });

        it('uses the node as the first argument', async function() {
            assert.strictEqual(
                await exec(_ => {
                    let result;
                    const badge = dom.findOne('#badge');
                    UI.Popper.init(badge, {
                        reference: dom.findOne('#button'),
                        beforeUpdate: node => {
                            result = dom.getAttribute(node, 'id');
                        }
                    });
                    return result;
                }),
                'badge'
            );
        });

        it('uses the reference as the second argument', async function() {
            assert.strictEqual(
                await exec(_ => {
                    let result;
                    const badge = dom.findOne('#badge');
                    UI.Popper.init(badge, {
                        reference: dom.findOne('#button'),
                        beforeUpdate: (node, referenceNode) => {
                            result = dom.getAttribute(referenceNode, 'id');
                        }
                    });
                    return result;
                }),
                'button'
            );
        });

        it('executes every time the popper is updated', async function() {
            assert.strictEqual(
                await exec(_ => {
                    let count = 0;
                    const badge = dom.findOne('#badge');
                    const popper = UI.Popper.init(badge, {
                        reference: dom.findOne('#button'),
                        beforeUpdate: _ => count++
                    });
                    popper.update();
                    popper.update();
                    popper.update();
                    return count;
                }),
                4
            );
        });

    });

    describe('afterUpdate option', function() {

        it('executes a callback after updating the popper', async function() {
            assert.strictEqual(
                await exec(_ => {
                    let result;
                    const badge = dom.findOne('#badge');
                    UI.Popper.init(badge, {
                        reference: dom.findOne('#button'),
                        afterUpdate: _ => {
                            result = dom.getStyle(badge, 'transform');
                        }
                    });
                    return result;
                }),
                'translate3d(4px, 34px, 0px)'
            );
        });

        it('executes a callback after updating the popper (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    let result;
                    dom.query('#badge').popper({
                        reference: dom.findOne('#button'),
                        afterUpdate: _ => {
                            result = dom.getStyle('#badge', 'transform');
                        }
                    });
                    return result;
                }),
                'translate3d(4px, 34px, 0px)'
            );
        });

        it('uses the node as the first argument', async function() {
            assert.strictEqual(
                await exec(_ => {
                    let result;
                    const badge = dom.findOne('#badge');
                    UI.Popper.init(badge, {
                        reference: dom.findOne('#button'),
                        afterUpdate: node => {
                            result = dom.getAttribute(node, 'id');
                        }
                    });
                    return result;
                }),
                'badge'
            );
        });

        it('uses the reference as the second argument', async function() {
            assert.strictEqual(
                await exec(_ => {
                    let result;
                    const badge = dom.findOne('#badge');
                    UI.Popper.init(badge, {
                        reference: dom.findOne('#button'),
                        afterUpdate: (node, referenceNode) => {
                            result = dom.getAttribute(referenceNode, 'id');
                        }
                    });
                    return result;
                }),
                'button'
            );
        });

        it('uses the placement as the third argument', async function() {
            assert.strictEqual(
                await exec(_ => {
                    let result;
                    const badge = dom.findOne('#badge');
                    UI.Popper.init(badge, {
                        reference: dom.findOne('#button'),
                        afterUpdate: (node, referenceNode, placement) => {
                            result = placement;
                        }
                    });
                    return result;
                }),
                'bottom'
            );
        });

        it('uses the position as the third argument', async function() {
            assert.strictEqual(
                await exec(_ => {
                    let result;
                    const badge = dom.findOne('#badge');
                    UI.Popper.init(badge, {
                        reference: dom.findOne('#button'),
                        afterUpdate: (node, referenceNode, placement, position) => {
                            result = position;
                        }
                    });
                    return result;
                }),
                'center'
            );
        });

        it('executes every time the popper is updated', async function() {
            assert.strictEqual(
                await exec(_ => {
                    let count = 0;
                    const badge = dom.findOne('#badge');
                    const popper = UI.Popper.init(badge, {
                        reference: dom.findOne('#button'),
                        afterUpdate: _ => count++
                    });
                    popper.update();
                    popper.update();
                    popper.update();
                    return count;
                }),
                4
            );
        });

    });

    describe('useGpu option', function() {

        it('uses margin offsets when not using gpu', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const badge = dom.findOne('#badge');
                    UI.Popper.init(badge, {
                        reference: dom.findOne('#button'),
                        useGpu: false
                    });
                    return dom.getStyle('#badge', 'margin');
                }),
                '34px 0px 0px 4px'
            );
        });

        it('uses margin offsets when not using gpu (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#badge').popper({
                        reference: dom.findOne('#button'),
                        useGpu: false
                    });
                    return dom.getStyle('#badge', 'margin');
                }),
                '34px 0px 0px 4px'
            );
        });

    });

});