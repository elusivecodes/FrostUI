const assert = require('assert');
const { exec } = require('../setup');
const { waitFor } = require('../helpers');

describe('Popover', function() {

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<button id="popoverToggle1"></button>' +
                '<button id="popoverToggle2"></button>'
            );
        });
    });

    describe('#init', function() {

        it('creates a popover', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const popoverToggle1 = dom.findOne('#popoverToggle1');
                    return UI.Popover.init(popoverToggle1) instanceof UI.Popover;
                }),
                true
            );
        });

        it('creates a popover (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#popoverToggle1').popover();
                    return dom.getData('#popoverToggle1', 'popover') instanceof UI.Popover;
                }),
                true
            );
        });

    });

    describe('#dispose', function() {

        it('clears popover memory', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const popoverToggle1 = dom.findOne('#popoverToggle1');
                    const popover = UI.Popover.init(popoverToggle1);
                    popover.dispose();

                    for (const key in popover) {
                        if (Core.isObject(popover[key]) && !Core.isFunction(popover[key])) {
                            return false;
                        }
                    }

                    return true;
                }),
                true
            );
        });

        it('removes the popover', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const popoverToggle1 = dom.findOne('#popoverToggle1');
                    UI.Popover.init(popoverToggle1).dispose();
                    return dom.hasData(popoverToggle1, 'popover');
                }),
                false
            );
        });

        it('clears popover memory when node is removed', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const popoverToggle1 = dom.findOne('#popoverToggle1');
                    const popover = UI.Popover.init(popoverToggle1);
                    dom.remove(popoverToggle1);

                    for (const key in popover) {
                        if (Core.isObject(popover[key]) && !Core.isFunction(popover[key])) {
                            return false;
                        }
                    }

                    return true;
                }),
                true
            );
        });

    });

    describe('#show', function() {

        it('shows the popover', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="popoverToggle1" data-ui-placement="right"></button>' +
                    '<div class="popover show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(27px, 11px, 0px);"><div class="popover-arrow" style="position: absolute; top: 0px; left: 0px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '<button id="popoverToggle2"></button>'
                );
            });
        });

        it('shows the popover (query)', async function() {
            await exec(_ => {
                dom.query('#popoverToggle1').popover('show');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="popoverToggle1" data-ui-placement="right"></button>' +
                    '<div class="popover show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(27px, 11px, 0px);"><div class="popover-arrow" style="position: absolute; top: 0px; left: 0px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '<button id="popoverToggle2"></button>'
                );
            });
        });

        it('can be called multiple times', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                const popover = UI.Popover.init(popoverToggle1);
                popover.show();
                popover.show();
                popover.show();
            });
        });

        it('can be called on shown popover', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => dom.stop('#popoverToggle1 + .popover'));
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const popoverToggle1 = dom.findOne('#popoverToggle1');
                    UI.Popover.init(popoverToggle1).show();
                });
            });
        });

    });

    describe('#hide', function() {

        it('hides the popover', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => dom.stop('#popoverToggle1 + .popover'));
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const popoverToggle1 = dom.findOne('#popoverToggle1');
                    UI.Popover.init(popoverToggle1).hide();
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="popoverToggle1" data-ui-placement="right"></button>' +
                    '<button id="popoverToggle2"></button>'
                );
            });
        });

        it('hides the popover (query)', async function() {
            await exec(_ => {
                dom.query('#popoverToggle1').popover('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => dom.stop('#popoverToggle1 + .popover'));
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.query('#popoverToggle1').popover('hide');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="popoverToggle1" data-ui-placement="right"></button>' +
                    '<button id="popoverToggle2"></button>'
                );
            });
        });

        it('does not remove the popover after hiding', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => dom.stop('#popoverToggle1 + .popover'));
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const popoverToggle1 = dom.findOne('#popoverToggle1');
                    UI.Popover.init(popoverToggle1).hide();
                });
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getData('#popoverToggle1', 'popover') instanceof UI.Popover),
                    true
                );
            });
        });

        it('can be called multiple times', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => dom.stop('#popoverToggle1 + .popover'));
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const popoverToggle1 = dom.findOne('#popoverToggle1');
                    const popover = UI.Popover.init(popoverToggle1);
                    popover.hide();
                    popover.hide();
                    popover.hide();
                });
            });
        });

        it('can be called on hidden popover', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1).hide();
            });
        });

    });

});