const assert = require('assert');
const { exec } = require('../setup');

describe('Popper', function() {

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<button id="button" class="btn btn-secondary" role="button">Button</button>' +
                '<div class="badge" id="badge">Badge</div>'
            );
        });
    });

    describe('#init', function() {

        it.only('creates a popper', async function() {
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

        it.only('creates a popper (query)', async function() {
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

        it.only('returns the popper (query)', async function() {
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

        it.only('removes the alert', async function() {
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

        it.only('removes the alert (query)', async function() {
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

        it.only('updates the popper', async function() {
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
                'translate3d(8px, 87px, 0px)'
            );
        });

        it.only('updates the popper (query)', async function() {
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
                'translate3d(8px, 87px, 0px)'
            );
        });

    });

    describe('beforeUpdate option', function() {

        it.only('executes a callback before updating the popper', async function() {
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

        it.only('executes a callback after updating the popper (query)', async function() {
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

        it.only('uses the node as the first argument', async function() {
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

        it.only('uses the reference as the second argument', async function() {
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

        it.only('executes every time the popper is updated', async function() {
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

        it.only('executes a callback after updating the popper', async function() {
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
                'translate3d(8px, 37px, 0px)'
            );
        });

        it.only('executes a callback after updating the popper (query)', async function() {
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
                'translate3d(8px, 37px, 0px)'
            );
        });

        it.only('uses the node as the first argument', async function() {
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

        it.only('uses the reference as the second argument', async function() {
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

        it.only('uses the placement as the third argument', async function() {
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

        it.only('uses the position as the third argument', async function() {
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

        it.only('executes every time the popper is updated', async function() {
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

        it.only('uses margin offsets when not using gpu', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const badge = dom.findOne('#badge');
                    UI.Popper.init(badge, {
                        reference: dom.findOne('#button'),
                        useGpu: false
                    });
                    return dom.getStyle('#badge', 'margin');
                }),
                '37px 0px 0px 8px'
            );
        });

        it.only('uses margin offsets when not using gpu (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#badge').popper({
                        reference: dom.findOne('#button'),
                        useGpu: false
                    });
                    return dom.getStyle('#badge', 'margin');
                }),
                '37px 0px 0px 8px'
            );
        });

    });

    describe('container option', function() {

        it.only('constrains popper to container');
        it.only('constrains popper to container (query)');

    });

});

// container option