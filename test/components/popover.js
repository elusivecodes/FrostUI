const assert = require('assert');
const { exec } = require('../setup');
const { waitFor } = require('../helpers');

describe('Popover', function() {

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
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

        it('creates multiple popovers (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('button').popover();
                    return dom.find('button').every(node =>
                        dom.getData(node, 'popover') instanceof UI.Popover
                    );
                }),
                true
            );
        });

        it('returns the popover (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#popoverToggle1').popover() instanceof UI.Popover;
                }),
                true
            );
        });

    });

    describe('#dispose', function() {

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

        it('removes the popover (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#popoverToggle1').popover('dispose');
                    return dom.hasData('#popoverToggle1', 'popover');
                }),
                false
            );
        });

        it('removes multiple popovers (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('button').popover('dispose');
                    return dom.find('button').some(node =>
                        dom.hasData(node, 'popover')
                    );
                }),
                false
            );
        });

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

        it('restores the title attribute', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const popoverToggle1 = dom.findOne('#popoverToggle1');
                    dom.setAttribute(popoverToggle1, 'title', 'Test');
                    const popover = UI.Popover.init(popoverToggle1);
                    popover.dispose();

                    return dom.getHTML(document.body);
                }),
                '<button class="btn btn-secondary" id="popoverToggle1" type="button" title="Test"></button>' +
                '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
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
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
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
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('shows multiple popovers (query)', async function() {
            await exec(_ => {
                dom.query('button').popover('show');
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="bottom" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(10px, 13px, 0px);"><div class="popover-arrow" style="position: absolute; top: -9px; left: 6px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>'
                );
            });
        });

        it('can be called multiple times', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1)
                    .show()
                    .show()
                    .show();
            });
        });

        it('can be called onn popover', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const popoverToggle1 = dom.findOne('#popoverToggle1');
                    UI.Popover.init(popoverToggle1).show();
                });
            });
        });

        it('returns the popover', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const popoverToggle1 = dom.findOne('#popoverToggle1');
                    return UI.Popover.init(popoverToggle1).show() instanceof UI.Popover;
                }),
                true
            );
        });

        it('returns the popover (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#popoverToggle1').popover('show') instanceof UI.Popover;
                }),
                true
            );
        });

    });

    describe('#hide', function() {

        it('hides the popover', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
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
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('hides the popover (query)', async function() {
            await exec(_ => {
                dom.query('#popoverToggle1').popover('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
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
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('hides multiple popovers (query)', async function() {
            await exec(_ => {
                dom.query('button').popover('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                    dom.stop('#popoverToggle2 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.query('button').popover('hide');
                });
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('does not remove the popover after hiding', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
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
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const popoverToggle1 = dom.findOne('#popoverToggle1');
                    UI.Popover.init(popoverToggle1)
                        .hide()
                        .hide()
                        .hide();
                });
            });
        });

        it('can be called on hidden popover', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1).hide();
            });
        });

        it('returns the popover', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        const popoverToggle1 = dom.findOne('#popoverToggle1');
                        return UI.Popover.init(popoverToggle1).hide() instanceof UI.Popover;
                    }),
                    true
                );
            });
        });

        it('returns the popover (query)', async function() {
            await exec(_ => {
                dom.query('#popoverToggle1').popover('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.query('#popoverToggle1').popover('hide') instanceof UI.Popover;
                    }),
                    true
                );
            });
        });

    });

    describe('#toggle (show)', function() {

        it('shows the popover', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1).toggle();
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('shows the popover (query)', async function() {
            await exec(_ => {
                dom.query('#popoverToggle1').popover('toggle');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('shows multiple popovers (query)', async function() {
            await exec(_ => {
                dom.query('button').popover('toggle');
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="bottom" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(10px, 13px, 0px);"><div class="popover-arrow" style="position: absolute; top: -9px; left: 6px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>'
                );
            });
        });

        it('can be called multiple times', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1)
                    .toggle()
                    .toggle()
                    .toggle();
            });
        });

        it('returns the popover', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const popoverToggle1 = dom.findOne('#popoverToggle1');
                    return UI.Popover.init(popoverToggle1).toggle() instanceof UI.Popover;
                }),
                true
            );
        });

        it('returns the popover (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#popoverToggle1').popover('toggle') instanceof UI.Popover;
                }),
                true
            );
        });

    });

    describe('#toggle (hide)', function() {

        it('hides the popover', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const popoverToggle1 = dom.findOne('#popoverToggle1');
                    UI.Popover.init(popoverToggle1).toggle();
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('hides the popover (query)', async function() {
            await exec(_ => {
                dom.query('#popoverToggle1').popover('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.query('#popoverToggle1').popover('toggle');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('hide multiple popovers (query)', async function() {
            await exec(_ => {
                dom.query('button').popover('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                    dom.stop('#popoverToggle2 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.query('button').popover('toggle');
                });
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('can be called multiple times', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const popoverToggle1 = dom.findOne('#popoverToggle1');
                    UI.Popover.init(popoverToggle1)
                        .toggle()
                        .toggle()
                        .toggle();
                });
            });
        });

        it('returns the popover', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        const popoverToggle1 = dom.findOne('#popoverToggle1');
                        return UI.Popover.init(popoverToggle1).toggle() instanceof UI.Popover;
                    }),
                    true
                );
            });
        });

        it('returns the popover (query)', async function() {
            await exec(_ => {
                dom.query('#popoverToggle1').popover('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.query('#popoverToggle1').popover('toggle') instanceof UI.Popover;
                    }),
                    true
                );
            });
        });

    });

    describe('#disable', function() {

        it('disables the popover', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1)
                    .disable()
                    .show();
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('disables the popover (query)', async function() {
            await exec(_ => {
                dom.query('#popoverToggle1')
                    .popover('disable')
                    .show();
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('disables multiple popovers (query)', async function() {
            await exec(_ => {
                dom.query('button').popover('disable');
                dom.query('button').popover('show');
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('can be called on a disabled popover', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1)
                    .disable()
                    .disable();
            });
        });

        it('returns the popover', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const popoverToggle1 = dom.findOne('#popoverToggle1');
                    return UI.Popover.init(popoverToggle1).disable() instanceof UI.Popover;
                }),
                true
            );
        });

        it('returns the popover (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#popoverToggle1').popover('disable') instanceof UI.Popover;
                }),
                true
            );
        });

    });

    describe('#enable', function() {

        it('enables the popover', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1)
                    .disable()
                    .enable()
                    .show();
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('enables the popover (query)', async function() {
            await exec(_ => {
                dom.query('#popoverToggle1').popover('disable');
                dom.query('#popoverToggle1')
                    .popover('enable')
                    .show();
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('enables multiple popovers (query)', async function() {
            await exec(_ => {
                dom.query('button').popover('disable');
                dom.query('button').popover('enable');
                dom.query('button').popover('show');
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="bottom" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(10px, 13px, 0px);"><div class="popover-arrow" style="position: absolute; top: -9px; left: 6px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>'
                );
            });
        });

        it('can be called on an enabled popover', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1).enable();
            });
        });

        it('returns the popover', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const popoverToggle1 = dom.findOne('#popoverToggle1');
                    return UI.Popover.init(popoverToggle1).enable().disable() instanceof UI.Popover;
                }),
                true
            );
        });

        it('returns the popover (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#popoverToggle1').popover('enable');
                    return dom.query('#popoverToggle1').popover('disable') instanceof UI.Popover;
                }),
                true
            );
        });

    });

    describe('#refresh', function() {

        it('refreshes the popover title', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        const popoverToggle1 = dom.findOne('#popoverToggle1');
                        dom.setDataset(popoverToggle1, 'uiTitle', 'Test');
                        UI.Popover.init(popoverToggle1).refresh();
                        return dom.getHTML(document.body);
                    }),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button" data-ui-title="Test"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="">Test</h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('refreshes the popover title (query)', async function() {
            await exec(_ => {
                dom.query('#popoverToggle1').popover('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        dom.query('#popoverToggle1')
                            .setDataset('uiTitle', 'Test')
                            .popover('refresh');
                        return dom.getHTML(document.body);
                    }),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button" data-ui-title="Test"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="">Test</h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('refreshes multiple popovers titles (query)', async function() {
            await exec(_ => {
                dom.query('button').popover('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .tooltip');
                    dom.stop('#popoverToggle2 + .tooltip');
                });
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        dom.query('button')
                            .setDataset('uiTitle', 'Test')
                            .popover('refresh');
                        return dom.getHTML(document.body);
                    }),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button" data-ui-title="Test"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="">Test</h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button" data-ui-title="Test"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="bottom" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(0px, 13px, 0px);"><div class="popover-arrow" style="position: absolute; top: -9px; left: 16px;"></div><h3 class="popover-header" style="">Test</h3><div class="popover-body"></div></div>'
                );
            });
        });

        it('refreshes the popover content', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        const popoverToggle1 = dom.findOne('#popoverToggle1');
                        dom.setDataset(popoverToggle1, 'uiContent', 'Test');
                        UI.Popover.init(popoverToggle1).refresh();
                        return dom.getHTML(document.body);
                    }),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button" data-ui-content="Test"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body">Test</div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('refreshes the popover content (query)', async function() {
            await exec(_ => {
                dom.query('#popoverToggle1').popover('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        dom.query('#popoverToggle1')
                            .setDataset('uiContent', 'Test')
                            .popover('refresh');
                        return dom.getHTML(document.body);
                    }),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button" data-ui-content="Test"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body">Test</div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('refreshes multiple popovers content (query)', async function() {
            await exec(_ => {
                dom.query('button').popover('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .tooltip');
                    dom.stop('#popoverToggle2 + .tooltip');
                });
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        dom.query('button')
                            .setDataset('uiContent', 'Test')
                            .popover('refresh');
                        return dom.getHTML(document.body);
                    }),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button" data-ui-content="Test"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body">Test</div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button" data-ui-content="Test"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="bottom" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(0px, 13px, 0px);"><div class="popover-arrow" style="position: absolute; top: -9px; left: 16px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body">Test</div></div>'
                );
            });
        });

        it('returns the popover', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const popoverToggle1 = dom.findOne('#popoverToggle1');
                    return UI.Popover.init(popoverToggle1).refresh() instanceof UI.Popover;
                }),
                true
            );
        });

        it('returns the popover (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#popoverToggle1').popover('refresh') instanceof UI.Popover;
                }),
                true
            );
        });

    });

    describe('events', function() {

        it('triggers event', async function() {
            assert.strictEqual(
                await exec(async _ => {
                    return await new Promise(resolve => {
                        const popoverToggle1 = dom.findOne('#popoverToggle1');
                        dom.addEvent(popoverToggle1, 'show.ui.Popover', _ => {
                            resolve(dom.getHTML(document.body));
                        })
                        UI.Popover.init(popoverToggle1).show();
                    });
                }),
                '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
            );
        });

        it('triggersn event', async function() {
            assert.strictEqual(
                await exec(async _ => {
                    return await new Promise(resolve => {
                        const popoverToggle1 = dom.findOne('#popoverToggle1');
                        dom.addEvent(popoverToggle1, 'shown.ui.Popover', _ => {
                            resolve(dom.getHTML(document.body));
                        })
                        UI.Popover.init(popoverToggle1).show();
                    });
                }),
                '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
            );
        });

        it('triggers hide event', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(async _ => {
                        return await new Promise(resolve => {
                            const popoverToggle1 = dom.findOne('#popoverToggle1');
                            dom.addEvent(popoverToggle1, 'hide.ui.Popover', _ => {
                                resolve(dom.getHTML(document.body));
                            })
                            UI.Popover.init(popoverToggle1).hide();
                        });
                    }),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('triggers hidden event', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(async _ => {
                        return await new Promise(resolve => {
                            const popoverToggle1 = dom.findOne('#popoverToggle1');
                            dom.addEvent(popoverToggle1, 'hidden.ui.Popover', _ => {
                                resolve(dom.getHTML(document.body));
                            })
                            UI.Popover.init(popoverToggle1).hide();
                        });
                    }),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('can be prevented froming', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                dom.addEvent(popoverToggle1, 'show.ui.Popover', _ => {
                    return false;
                })
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('can be prevented froming (prevent default)', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                dom.addEvent(popoverToggle1, 'show.ui.Popover', e => {
                    e.preventDefault();
                });
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('can be prevented from hiding', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(async _ => {
                    const popoverToggle1 = dom.findOne('#popoverToggle1');
                    dom.addEvent(popoverToggle1, 'hide.ui.Popover', _ => {
                        return false;
                    })
                    UI.Popover.init(popoverToggle1).hide();
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('can be prevented from hiding (prevent default)', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(async _ => {
                    const popoverToggle1 = dom.findOne('#popoverToggle1');
                    dom.addEvent(popoverToggle1, 'hide.ui.Popover', _ => {
                        return false;
                    })
                    UI.Popover.init(popoverToggle1).hide();
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

    });

    describe('title option', function() {

        it('works with title option', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { title: 'Test' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header">Test</h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('works with title option (data-ui-title)', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                dom.setDataset(popoverToggle1, 'uiTitle', 'Test');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button" data-ui-title="Test"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header">Test</h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('works with title option (query)', async function() {
            await exec(_ => {
                dom.query('#popoverToggle1')
                    .popover({ title: 'Test' })
                    .show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header">Test</h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('works with title option (title)', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                dom.setAttribute(popoverToggle1, 'title', 'Test');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button" data-ui-original-title="Test"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header">Test</h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('prioritizes dataset over setting', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                dom.setDataset(popoverToggle1, 'uiTitle', 'Test');
                UI.Popover.init(popoverToggle1, { title: 'Test 2' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button" data-ui-title="Test"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header">Test</h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('prioritizes setting over attribute', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                dom.setAttribute(popoverToggle1, 'title', 'Test 2');
                UI.Popover.init(popoverToggle1, { title: 'Test' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button" data-ui-original-title="Test 2"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header">Test</h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

    });

    describe('content option', function() {

        it('works with content option', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { content: 'Test' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body">Test</div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('works with content option (data-ui-content)', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                dom.setDataset(popoverToggle1, 'uiContent', 'Test');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button" data-ui-content="Test"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body">Test</div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('works with content option (query)', async function() {
            await exec(_ => {
                dom.query('#popoverToggle1')
                    .popover({ content: 'Test' })
                    .show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body">Test</div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('prioritizes dataset over setting', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                dom.setDataset(popoverToggle1, 'uiContent', 'Test');
                UI.Popover.init(popoverToggle1, { content: 'Test 2' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button" data-ui-content="Test"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body">Test</div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

    });

    describe('template option', function() {

        it('works with template option', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, {
                    template: '<div class="popover" role="tooltip" data-test="Test"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
                }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-test="Test" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('works with template option (data-ui-template)', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                dom.setDataset(popoverToggle1, 'uiTemplate', '<div class="popover" role="tooltip" data-test="Test"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button" data-ui-template="<div class=&quot;popover&quot; role=&quot;tooltip&quot; data-test=&quot;Test&quot;><div class=&quot;popover-arrow&quot;></div><h3 class=&quot;popover-header&quot;></h3><div class=&quot;popover-body&quot;></div></div>"></button>' +
                    '<div class="popover" role="tooltip" data-test="Test" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('works with template option (query)', async function() {
            await exec(_ => {
                dom.query('#popoverToggle1').popover({
                    template: '<div class="popover" role="tooltip" data-test="Test"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
                }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-test="Test" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

    });

    describe('customClass option', function() {

        it('works with customClass option', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { customClass: 'test' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover test" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('works with customClass option (data-ui-custom-class)', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                dom.setDataset(popoverToggle1, 'uiCustomClass', 'test');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button" data-ui-custom-class="test"></button>' +
                    '<div class="popover test" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('works with customClass option (query)', async function() {
            await exec(_ => {
                dom.query('#popoverToggle1')
                    .popover({ customClass: 'test' })
                    .show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover test" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

    });

    describe('duration option', function() {

        it('works with duration option on', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { duration: 200 }).show();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            });
        });

        it('works with duration option on (data-ui-duration)', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                dom.setDataset(popoverToggle1, 'uiDuration', 200);
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            });
        });

        it('works with duration option on (query)', async function() {
            await exec(_ => {
                dom.query('#popoverToggle1')
                    .popover({ duration: 200 })
                    .show();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            });
        });

        it('works with duration option on hide', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { duration: 200 }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const popoverToggle1 = dom.findOne('#popoverToggle1');
                    UI.Popover.init(popoverToggle1).hide();
                });
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            });
        });

        it('works with duration option on hide (data-ui-duration)', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                dom.setDataset(popoverToggle1, 'uiDuration', 200);
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const popoverToggle1 = dom.findOne('#popoverToggle1');
                    UI.Popover.init(popoverToggle1).hide();
                });
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            });
        });

        it('works with duration option on hide (query)', async function() {
            await exec(_ => {
                dom.query('#popoverToggle1')
                    .popover({ duration: 200 })
                    .show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.query('#popoverToggle1').popover('hide');
                });
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            });
        });

    });

    describe('html option', function() {

        it('escapes html tags in title', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { title: '<b>Test</b>' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header">&lt;b&gt;Test&lt;/b&gt;</h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('escapes html tags in content', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { content: '<b>Test</b>' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body">&lt;b&gt;Test&lt;/b&gt;</div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('works with html option for title', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { title: '<b>Test</b>', html: true }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header"><b>Test</b></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('works with html option for title (data-ui-html)', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                dom.setDataset(popoverToggle1, 'uiHtml', true);
                UI.Popover.init(popoverToggle1, { title: '<b>Test</b>' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button" data-ui-html="true"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header"><b>Test</b></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('works with html option for title (query)', async function() {
            await exec(_ => {
                dom.query('#popoverToggle1')
                    .popover({ title: '<b>Test</b>', html: true })
                    .show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header"><b>Test</b></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('works with html option for content', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { content: '<b>Test</b>', html: true }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"><b>Test</b></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('works with html option for content (data-ui-html)', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                dom.setDataset(popoverToggle1, 'uiHtml', true);
                UI.Popover.init(popoverToggle1, { content: '<b>Test</b>' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button" data-ui-html="true"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"><b>Test</b></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('works with html option for content (query)', async function() {
            await exec(_ => {
                dom.query('#popoverToggle1')
                    .popover({ content: '<b>Test</b>', html: true })
                    .show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"><b>Test</b></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

    });

    describe('trigger option', function() {

        it('shows on mouseover with hover trigger option', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { trigger: 'hover' });
                dom.triggerEvent(popoverToggle1, 'mouseover');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            });
        });

        it('shows on focus with focus trigger option', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { trigger: 'focus' });
                dom.triggerEvent(popoverToggle1, 'focus');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            });
        });

        it('shows on click with click trigger option', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { trigger: 'click' });
                dom.triggerEvent(popoverToggle1, 'click');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            });
        });

        it('hides on mouseout with hover trigger option', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { trigger: 'hover' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.triggerEvent('#popoverToggle1', 'mouseout');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            });
        });

        it('hides on blur with focus trigger option', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { trigger: 'focus' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.triggerEvent('#popoverToggle1', 'blur');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            });
        });

        it('hides on click with click trigger option', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { trigger: 'click' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.triggerEvent('#popoverToggle1', 'click');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            });
        });

        it('does not on mouseover without hover trigger option', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { trigger: '' });
                dom.triggerEvent(popoverToggle1, 'mouseover');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('does not on focus without focus trigger option', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { trigger: '' });
                dom.triggerEvent(popoverToggle1, 'focus');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('does not on click without click trigger option', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { trigger: '' });
                dom.triggerEvent(popoverToggle1, 'click');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('does not hide on mouseout without hover trigger option', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { trigger: '' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.triggerEvent(popoverToggle1, 'mouseout');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('does not hide on blur without focus trigger option', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { trigger: '' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.triggerEvent(popoverToggle1, 'blur');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('does not hide on click without click trigger option', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { trigger: '' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.triggerEvent(popoverToggle1, 'click');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('works with trigger option (data-ui-trigger)', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                dom.setDataset(popoverToggle1, 'uiTrigger', 'click');
                UI.Popover.init(popoverToggle1);
                dom.triggerEvent(popoverToggle1, 'click');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            });
        });

        it('works with trigger option (query)', async function() {
            await exec(_ => {
                dom.query('#popoverToggle1').popover({ trigger: 'click' });
                dom.triggerEvent('#popoverToggle1', 'click');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            });
        });

        it('works with multiple trigger options', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { trigger: 'hover focus' });
                dom.triggerEvent(popoverToggle1, 'mouseover');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                await exec(_ => {
                    const popoverToggle1 = dom.findOne('#popoverToggle1');
                    dom.triggerEvent(popoverToggle1, 'blur');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#popoverToggle1 + .popover')),
                    true
                );
            });
        });

    });

    describe('appendTo option', function() {

        it('works with appendTo option', async function() {
            await exec(_ => {
                const test = dom.create('div', { class: 'test' });
                dom.append(document.body, test);
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { appendTo: '.test' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('.test .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>' +
                    '<div class="test">' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '</div>'
                );
            });
        });

        it('works with appendTo option (data-ui-append-to)', async function() {
            await exec(_ => {
                const test = dom.create('div', { class: 'test' });
                dom.append(document.body, test);
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                dom.setDataset(popoverToggle1, 'uiAppendTo', '.test');
                UI.Popover.init(popoverToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('.test .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button" data-ui-append-to=".test"></button>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>' +
                    '<div class="test">' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '</div>'
                );
            });
        });

        it('works with appendTo option (query)', async function() {
            await exec(_ => {
                const test = dom.create('div', { class: 'test' });
                dom.append(document.body, test);
                dom.query('#popoverToggle1')
                    .popover({ appendTo: '.test' })
                    .show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('.test .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>' +
                    '<div class="test">' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"></div></div>' +
                    '</div>'
                );
            });
        });

    });

    describe('sanitize option', function() {

        it('sanitizes html tags in title', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { title: '<b data-test="test">Test</b>', html: true }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header"><b>Test</b></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('sanitizes html tags in content', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { content: '<b data-test="test">Test</b>', html: true }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"><b>Test</b></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('works with sanitize option for title', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { title: '<b data-test="test">Test</b>', html: true, sanitize: false }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header"><b data-test="test">Test</b></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('works with sanitize option for title (data-ui-sanitize)', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                dom.setDataset(popoverToggle1, 'uiSanitize', false);
                UI.Popover.init(popoverToggle1, { title: '<b data-test="test">Test</b>', html: true }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button" data-ui-sanitize="false"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header"><b data-test="test">Test</b></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('works with sanitize option for title (query)', async function() {
            await exec(_ => {
                dom.query('#popoverToggle1')
                    .popover({ title: '<b data-test="test">Test</b>', html: true, sanitize: false })
                    .show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header"><b data-test="test">Test</b></h3><div class="popover-body"></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('works with sanitize option for content', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                UI.Popover.init(popoverToggle1, { content: '<b data-test="test">Test</b>', html: true, sanitize: false }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"><b data-test="test">Test</b></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('works with sanitize option for content (data-ui-sanitize)', async function() {
            await exec(_ => {
                const popoverToggle1 = dom.findOne('#popoverToggle1');
                dom.setDataset(popoverToggle1, 'uiSanitize', false);
                UI.Popover.init(popoverToggle1, { content: '<b data-test="test">Test</b>', html: true }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button" data-ui-sanitize="false"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"><b data-test="test">Test</b></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

        it('works with sanitize option for content (query)', async function() {
            await exec(_ => {
                dom.query('#popoverToggle1')
                    .popover({ content: '<b data-test="test">Test</b>', html: true, sanitize: false })
                    .show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#popoverToggle1 + .popover');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button class="btn btn-secondary" id="popoverToggle1" type="button"></button>' +
                    '<div class="popover" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(21px, 0px, 0px);"><div class="popover-arrow" style="position: absolute; top: -5px; left: -19px;"></div><h3 class="popover-header" style="display: none;"></h3><div class="popover-body"><b data-test="test">Test</b></div></div>' +
                    '<button class="btn btn-secondary" id="popoverToggle2" type="button"></button>'
                );
            });
        });

    });

});