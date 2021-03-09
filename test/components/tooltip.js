const assert = require('assert');
const { exec } = require('../setup');
const { waitFor } = require('../helpers');

describe('Tooltip', function() {

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<button id="tooltipToggle1"></button>' +
                '<button id="tooltipToggle2"></button>'
            );
        });
    });

    describe('#init', function() {

        it('creates a tooltip', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                    return UI.Tooltip.init(tooltipToggle1) instanceof UI.Tooltip;
                }),
                true
            );
        });

        it('creates a tooltip (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#tooltipToggle1').tooltip();
                    return dom.getData('#tooltipToggle1', 'tooltip') instanceof UI.Tooltip;
                }),
                true
            );
        });

        it('creates multiple tooltips (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('button').tooltip();
                    return dom.find('button').every(node =>
                        dom.getData(node, 'tooltip') instanceof UI.Tooltip
                    );
                }),
                true
            );
        });

        it('returns the tooltip (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#tooltipToggle1').tooltip() instanceof UI.Tooltip;
                }),
                true
            );
        });

    });

    describe('#dispose', function() {

        it('removes the tooltip', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                    UI.Tooltip.init(tooltipToggle1).dispose();
                    return dom.hasData(tooltipToggle1, 'tooltip');
                }),
                false
            );
        });

        it('removes the tooltip (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#tooltipToggle1').tooltip('dispose');
                    return dom.hasData('#tooltipToggle1', 'tooltip');
                }),
                false
            );
        });

        it('removes multiple tooltips (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('button').tooltip('dispose');
                    return dom.find('button').some(node =>
                        dom.getData(node, 'tooltip') instanceof UI.Tooltip
                    );
                }),
                false
            );
        });

        it('clears tooltip memory', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                    const tooltip = UI.Tooltip.init(tooltipToggle1);
                    tooltip.dispose();

                    for (const key in tooltip) {
                        if (Core.isObject(tooltip[key]) && !Core.isFunction(tooltip[key])) {
                            return false;
                        }
                    }

                    return true;
                }),
                true
            );
        });

        it('clears tooltip memory when node is removed', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                    const tooltip = UI.Tooltip.init(tooltipToggle1);
                    dom.remove(tooltipToggle1);

                    for (const key in tooltip) {
                        if (Core.isObject(tooltip[key]) && !Core.isFunction(tooltip[key])) {
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
                    const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                    dom.setAttribute(tooltipToggle1, 'title', 'Test');
                    const tooltip = UI.Tooltip.init(tooltipToggle1);
                    tooltip.dispose();

                    return dom.getHTML(document.body);
                }),
                '<button id="tooltipToggle1" title="Test"></button>' +
                '<button id="tooltipToggle2"></button>'
            );
        });

    });

    describe('#show', function() {

        it('shows the tooltip', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('shows the tooltip (query)', async function() {
            await exec(_ => {
                dom.query('#tooltipToggle1').tooltip('show');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('shows multiple tooltips (query)', async function() {
            await exec(_ => {
                dom.query('button').tooltip('show');
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '<button id="tooltipToggle2" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(42px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>'
                );
            });
        });

        it('can be called multiple times', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1)
                    .show()
                    .show()
                    .show();
            });
        });

        it('can be called on shown tooltip', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                    UI.Tooltip.init(tooltipToggle1).show();
                });
            });
        });

        it('returns the tooltip', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                    return UI.Tooltip.init(tooltipToggle1).show() instanceof UI.Tooltip;
                }),
                true
            );
        });

        it('returns the tooltip (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#tooltipToggle1').tooltip('show') instanceof UI.Tooltip;
                }),
                true
            );
        });

    });

    describe('#hide', function() {

        it('hides the tooltip', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                    UI.Tooltip.init(tooltipToggle1).hide();
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('hides the tooltip (query)', async function() {
            await exec(_ => {
                dom.query('#tooltipToggle1').tooltip('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.query('#tooltipToggle1').tooltip('hide');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('hides multiple tooltips (query)', async function() {
            await exec(_ => {
                dom.query('button').tooltip('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                    dom.stop('#tooltipToggle2 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.query('button').tooltip('hide');
                });
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<button id="tooltipToggle2" data-ui-placement="right"></button>'
                );
            });
        });

        it('does not remove the tooltip after hiding', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                    UI.Tooltip.init(tooltipToggle1).hide();
                });
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getData('#tooltipToggle1', 'tooltip') instanceof UI.Tooltip),
                    true
                );
            });
        });

        it('can be called multiple times', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                    const tooltip = UI.Tooltip.init(tooltipToggle1);
                    tooltip.hide();
                    tooltip.hide();
                    tooltip.hide();
                });
            });
        });

        it('can be called on hidden tooltip', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1).hide();
            });
        });

        it('returns the tooltip', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                        return UI.Tooltip.init(tooltipToggle1).hide() instanceof UI.Tooltip;
                    }),
                    true
                );
            });
        });

        it('returns the tooltip (query)', async function() {
            await exec(_ => {
                dom.query('#tooltipToggle1').tooltip('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.query('#tooltipToggle1').tooltip('hide') instanceof UI.Tooltip;
                    }),
                    true
                );
            });
        });

    });

    describe('#toggle (show)', function() {

        it('shows the tooltip', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1).toggle();
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('shows the tooltip (query)', async function() {
            await exec(_ => {
                dom.query('#tooltipToggle1').tooltip('toggle');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('shows multiple tooltips (query)', async function() {
            await exec(_ => {
                dom.query('button').tooltip('toggle');
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '<button id="tooltipToggle2" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(42px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>'
                );
            });
        });

        it('can be called multiple times', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1)
                    .toggle()
                    .toggle()
                    .toggle();
            });
        });

        it('returns the tooltip', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                    return UI.Tooltip.init(tooltipToggle1).toggle() instanceof UI.Tooltip;
                }),
                true
            );
        });

        it('returns the tooltip (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#tooltipToggle1').tooltip('toggle') instanceof UI.Tooltip;
                }),
                true
            );
        });

    });

    describe('#toggle (hide)', function() {

        it('hides the tooltip', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                    UI.Tooltip.init(tooltipToggle1).toggle();
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('hide the tooltip (query)', async function() {
            await exec(_ => {
                dom.query('#tooltipToggle1').tooltip('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.query('#tooltipToggle1').tooltip('toggle');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('hide multiple tooltips (query)', async function() {
            await exec(_ => {
                dom.query('button').tooltip('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                    dom.stop('#tooltipToggle2 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.query('button').tooltip('toggle');
                });
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<button id="tooltipToggle2" data-ui-placement="right"></button>'
                );
            });
        });

        it('can be called multiple times', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                    UI.Tooltip.init(tooltipToggle1)
                        .toggle()
                        .toggle()
                        .toggle();
                });
            });
        });

        it('returns the tooltip', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                        return UI.Tooltip.init(tooltipToggle1).toggle() instanceof UI.Tooltip;
                    }),
                    true
                );
            });
        });

        it('returns the tooltip (query)', async function() {
            await exec(_ => {
                dom.query('#tooltipToggle1').tooltip('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.query('#tooltipToggle1').tooltip('toggle') instanceof UI.Tooltip;
                    }),
                    true
                );
            });
        });

    });

    describe('#disable', function() {

        it('disables the tooltip', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1)
                    .disable()
                    .show();
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1"></button>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('disables the tooltip (query)', async function() {
            await exec(_ => {
                dom.query('#tooltipToggle1')
                    .tooltip('disable')
                    .show();
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1"></button>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('disables multiple tooltips (query)', async function() {
            await exec(_ => {
                dom.query('button').tooltip('disable');
                dom.query('button').tooltip('show');
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1"></button>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('can be called on a disabled tooltip', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1)
                    .disable()
                    .disable();
            });
        });

        it('returns the tooltip', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                    return UI.Tooltip.init(tooltipToggle1).disable() instanceof UI.Tooltip;
                }),
                true
            );
        });

        it('returns the tooltip (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#tooltipToggle1').tooltip('disable') instanceof UI.Tooltip;
                }),
                true
            );
        });

    });

    describe('#enable', function() {

        it('enables the tooltip', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1)
                    .disable()
                    .enable()
                    .show();
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('enables the tooltip (query)', async function() {
            await exec(_ => {
                dom.query('#tooltipToggle1').tooltip('disable');
                dom.query('#tooltipToggle1')
                    .tooltip('enable')
                    .show();
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('enables multiple tooltips (query)', async function() {
            await exec(_ => {
                dom.query('button').tooltip('disable');
                dom.query('button').tooltip('enable');
                dom.query('button').tooltip('show');
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '<button id="tooltipToggle2" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(42px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>'
                );
            });
        });

        it('can be called on an enabled tooltip', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1).enable();
            });
        });

        it('returns the tooltip', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                    return UI.Tooltip.init(tooltipToggle1).disable().enable() instanceof UI.Tooltip;
                }),
                true
            );
        });

        it('returns the tooltip (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#tooltipToggle1').tooltip('disable');
                    return dom.query('#tooltipToggle1').tooltip('enable') instanceof UI.Tooltip;
                }),
                true
            );
        });

    });

    describe('#refresh', function() {

        it('refreshes the tooltip title', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                        dom.setDataset(tooltipToggle1, 'uiTitle', 'Test');
                        UI.Tooltip.init(tooltipToggle1).refresh();
                        return dom.getHTML(document.body);
                    }),
                    '<button id="tooltipToggle1" data-ui-placement="right" data-ui-title="Test"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 2px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 9px; left: 0px;"></div><div class="tooltip-inner">Test</div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('refreshes the tooltip title (query)', async function() {
            await exec(_ => {
                dom.query('#tooltipToggle1').tooltip('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        dom.query('#tooltipToggle1')
                            .setDataset('uiTitle', 'Test')
                            .tooltip('refresh');
                        return dom.getHTML(document.body);
                    }),
                    '<button id="tooltipToggle1" data-ui-placement="right" data-ui-title="Test"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 2px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 9px; left: 0px;"></div><div class="tooltip-inner">Test</div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('refreshes multiple tooltip titles (query)', async function() {
            await exec(_ => {
                dom.query('button').tooltip('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                    dom.stop('#tooltipToggle2 + .tooltip');
                });
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        dom.query('button')
                            .setDataset('uiTitle', 'Test')
                            .tooltip('refresh');
                        return dom.getHTML(document.body);
                    }),
                    '<button id="tooltipToggle1" data-ui-placement="right" data-ui-title="Test"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 2px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 9px; left: 0px;"></div><div class="tooltip-inner">Test</div></div>' +
                    '<button id="tooltipToggle2" data-ui-placement="right" data-ui-title="Test"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(42px, 2px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 9px; left: 0px;"></div><div class="tooltip-inner">Test</div></div>'
                );
            });
        });

        it('returns the tooltip', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                    return UI.Tooltip.init(tooltipToggle1).refresh() instanceof UI.Tooltip;
                }),
                true
            );
        });

        it('returns the tooltip (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#tooltipToggle1').tooltip('refresh') instanceof UI.Tooltip;
                }),
                true
            );
        });

    });

    describe('events', function() {

        it('triggers show event', async function() {
            assert.strictEqual(
                await exec(async _ => {
                    return await new Promise(resolve => {
                        const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                        dom.addEvent(tooltipToggle1, 'show.ui.tooltip', _ => {
                            resolve(dom.getHTML(document.body));
                        })
                        UI.Tooltip.init(tooltipToggle1).show();
                    });
                }),
                '<button id="tooltipToggle1"></button>' +
                '<button id="tooltipToggle2"></button>'
            );
        });

        it('triggers shown event', async function() {
            assert.strictEqual(
                await exec(async _ => {
                    return await new Promise(resolve => {
                        const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                        dom.addEvent(tooltipToggle1, 'shown.ui.tooltip', _ => {
                            resolve(dom.getHTML(document.body));
                        })
                        UI.Tooltip.init(tooltipToggle1).show();
                    });
                }),
                '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                '<button id="tooltipToggle2"></button>'
            );
        });

        it('triggers hide event', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(async _ => {
                        return await new Promise(resolve => {
                            const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                            dom.addEvent(tooltipToggle1, 'hide.ui.tooltip', _ => {
                                resolve(dom.getHTML(document.body));
                            })
                            UI.Tooltip.init(tooltipToggle1).hide();
                        });
                    }),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('triggers hidden event', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(async _ => {
                        return await new Promise(resolve => {
                            const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                            dom.addEvent(tooltipToggle1, 'hidden.ui.tooltip', _ => {
                                resolve(dom.getHTML(document.body));
                            })
                            UI.Tooltip.init(tooltipToggle1).hide();
                        });
                    }),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('can be prevented from showing', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                dom.addEvent(tooltipToggle1, 'show.ui.tooltip', _ => {
                    return false;
                })
                UI.Tooltip.init(tooltipToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1"></button>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('can be prevented from showing (prevent default)', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                dom.addEvent(tooltipToggle1, 'show.ui.tooltip', e => {
                    e.preventDefault();
                });
                UI.Tooltip.init(tooltipToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1"></button>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('can be prevented from hiding', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(async _ => {
                    const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                    dom.addEvent(tooltipToggle1, 'hide.ui.tooltip', _ => {
                        return false;
                    })
                    UI.Tooltip.init(tooltipToggle1).hide();
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('can be prevented from hiding (prevent default)', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(async _ => {
                    const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                    dom.addEvent(tooltipToggle1, 'hide.ui.tooltip', _ => {
                        return false;
                    })
                    UI.Tooltip.init(tooltipToggle1).hide();
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

    });

    describe('title option', function() {

        it('works with title option', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1, { title: 'Test' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 2px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 9px; left: 0px;"></div><div class="tooltip-inner">Test</div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('works with title option (data-ui-title)', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                dom.setDataset(tooltipToggle1, 'uiTitle', 'Test');
                UI.Tooltip.init(tooltipToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-title="Test" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 2px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 9px; left: 0px;"></div><div class="tooltip-inner">Test</div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('works with title option (title)', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                dom.setAttribute(tooltipToggle1, 'title', 'Test');
                UI.Tooltip.init(tooltipToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-original-title="Test" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 2px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 9px; left: 0px;"></div><div class="tooltip-inner">Test</div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('works with title option (query)', async function() {
            await exec(_ => {
                dom.query('#tooltipToggle1')
                    .tooltip({ title: 'Test' })
                    .show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 2px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 9px; left: 0px;"></div><div class="tooltip-inner">Test</div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('prioritizes dataset over setting', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                dom.setDataset(tooltipToggle1, 'uiTitle', 'Test');
                UI.Tooltip.init(tooltipToggle1, { title: 'Test 2' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-title="Test" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 2px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 9px; left: 0px;"></div><div class="tooltip-inner">Test</div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('prioritizes setting over attribute', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                dom.setAttribute(tooltipToggle1, 'title', 'Test 2');
                UI.Tooltip.init(tooltipToggle1, { title: 'Test' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-original-title="Test 2" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 2px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 9px; left: 0px;"></div><div class="tooltip-inner">Test</div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

    });

    describe('template option', function() {

        it('works with template option', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1, {
                    template: '<div class="tooltip" role="tooltip" data-test="Test"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
                }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-test="Test" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('works with template option (data-ui-template)', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                dom.setDataset(tooltipToggle1, 'uiTemplate', '<div class="tooltip" role="tooltip" data-test="Test"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>');
                UI.Tooltip.init(tooltipToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-template="<div class=&quot;tooltip&quot; role=&quot;tooltip&quot; data-test=&quot;Test&quot;><div class=&quot;tooltip-arrow&quot;></div><div class=&quot;tooltip-inner&quot;></div></div>" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-test="Test" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('works with template option (query)', async function() {
            await exec(_ => {
                dom.query('#tooltipToggle1').tooltip({
                    template: '<div class="tooltip" role="tooltip" data-test="Test"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
                }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-test="Test" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

    });

    describe('customClass option', function() {

        it('works with customClass option', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1, { customClass: 'test' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip test show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('works with customClass option (data-ui-custom-class)', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                dom.setDataset(tooltipToggle1, 'uiCustomClass', 'test');
                UI.Tooltip.init(tooltipToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-custom-class="test" data-ui-placement="right"></button>' +
                    '<div class="tooltip test show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('works with customClass option (query)', async function() {
            await exec(_ => {
                dom.query('#tooltipToggle1')
                    .tooltip({ customClass: 'test' })
                    .show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip test show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

    });

    describe('duration option', function() {

        it('works with duration option on show', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1, { duration: 200 }).show();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            });
        });

        it('works with duration option on show (data-ui-duration)', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                dom.setDataset(tooltipToggle1, 'uiDuration', 200);
                UI.Tooltip.init(tooltipToggle1).show();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            });
        });

        it('works with duration option on show (query)', async function() {
            await exec(_ => {
                dom.query('#tooltipToggle1')
                    .tooltip({ duration: 200 })
                    .show();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            });
        });

        it('works with duration option on hide', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1, { duration: 200 }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                    UI.Tooltip.init(tooltipToggle1).hide();
                });
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            });
        });

        it('works with duration option on hide (data-ui-duration)', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                dom.setDataset(tooltipToggle1, 'uiDuration', 200);
                UI.Tooltip.init(tooltipToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                    UI.Tooltip.init(tooltipToggle1).hide();
                });
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            });
        });

        it('works with duration option on hide (query)', async function() {
            await exec(_ => {
                dom.query('#tooltipToggle1')
                    .tooltip({ duration: 200 })
                    .show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.query('#tooltipToggle1').tooltip('hide');
                });
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            });
        });

    });

    describe('html option', function() {

        it('escapes html tags', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1, { title: '<b>Test</b>' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 2px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 9px; left: 0px;"></div><div class="tooltip-inner">&lt;b&gt;Test&lt;/b&gt;</div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('works with html option', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1, { title: '<b>Test</b>', html: true }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 2px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 9px; left: 0px;"></div><div class="tooltip-inner"><b>Test</b></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('works with html option (data-ui-html)', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                dom.setDataset(tooltipToggle1, 'uiHtml', true);
                UI.Tooltip.init(tooltipToggle1, { title: '<b>Test</b>' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-html="true" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 2px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 9px; left: 0px;"></div><div class="tooltip-inner"><b>Test</b></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('works with html option (query)', async function() {
            await exec(_ => {
                dom.query('#tooltipToggle1')
                    .tooltip({ title: '<b>Test</b>', html: true })
                    .show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 2px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 9px; left: 0px;"></div><div class="tooltip-inner"><b>Test</b></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

    });

    describe('trigger option', function() {

        it('shows on mouseover with hover trigger option', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1, { trigger: 'hover' });
                dom.triggerEvent(tooltipToggle1, 'mouseover');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            });
        });

        it('shows on focus with focus trigger option', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1, { trigger: 'focus' });
                dom.triggerEvent(tooltipToggle1, 'focus');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            });
        });

        it('shows on click with click trigger option', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1, { trigger: 'click' });
                dom.triggerEvent(tooltipToggle1, 'click');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            });
        });

        it('hides on mouseout with hover trigger option', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1, { trigger: 'hover' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.triggerEvent('#tooltipToggle1', 'mouseout');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            });
        });

        it('hides on blur with focus trigger option', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1, { trigger: 'focus' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.triggerEvent('#tooltipToggle1', 'blur');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            });
        });

        it('hides on click with click trigger option', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1, { trigger: 'click' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.triggerEvent('#tooltipToggle1', 'click');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            });
        });

        it('does not show on mouseover without hover trigger option', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1, { trigger: '' });
                dom.triggerEvent(tooltipToggle1, 'mouseover');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1"></button>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('does not show on focus without focus trigger option', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1, { trigger: '' });
                dom.triggerEvent(tooltipToggle1, 'focus');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1"></button>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('does not show on click without click trigger option', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1, { trigger: '' });
                dom.triggerEvent(tooltipToggle1, 'click');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1"></button>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('does not hide on mouseout without hover trigger option', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1, { trigger: '' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.triggerEvent(tooltipToggle1, 'mouseout');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('does not hide on blur without focus trigger option', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1, { trigger: '' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.triggerEvent(tooltipToggle1, 'blur');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('does not hide on click without click trigger option', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1, { trigger: '' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.triggerEvent(tooltipToggle1, 'click');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('works with trigger option (data-ui-trigger)', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                dom.setDataset(tooltipToggle1, 'uiTrigger', 'click');
                UI.Tooltip.init(tooltipToggle1);
                dom.triggerEvent(tooltipToggle1, 'click');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            });
        });

        it('works with trigger option (query)', async function() {
            await exec(_ => {
                dom.query('#tooltipToggle1').tooltip({ trigger: 'click' });
                dom.triggerEvent('#tooltipToggle1', 'click');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            });
        });

        it('works with multiple trigger options', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1, { trigger: 'hover focus' });
                dom.triggerEvent(tooltipToggle1, 'mouseover');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                await exec(_ => {
                    const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                    dom.triggerEvent(tooltipToggle1, 'blur');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#tooltipToggle1 + .tooltip')),
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
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1, { appendTo: '.test' }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('.test .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<button id="tooltipToggle2"></button>' +
                    '<div class="test">' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '</div>'
                );
            });
        });

        it('works with appendTo option (data-ui-append-to)', async function() {
            await exec(_ => {
                const test = dom.create('div', { class: 'test' });
                dom.append(document.body, test);
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                dom.setDataset(tooltipToggle1, 'uiAppendTo', '.test');
                UI.Tooltip.init(tooltipToggle1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('.test .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-append-to=".test" data-ui-placement="right"></button>' +
                    '<button id="tooltipToggle2"></button>' +
                    '<div class="test">' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '</div>'
                );
            });
        });

        it('works with appendTo option (query)', async function() {
            await exec(_ => {
                const test = dom.create('div', { class: 'test' });
                dom.append(document.body, test);
                dom.query('#tooltipToggle1')
                    .tooltip({ appendTo: '.test' })
                    .show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('.test .tooltip');
                });
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<button id="tooltipToggle2"></button>' +
                    '<div class="test">' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 11px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 0px; left: 0px;"></div><div class="tooltip-inner"></div></div>' +
                    '</div>'
                );
            });
        });

    });

    describe('sanitize option', function() {

        it('sanitizes html tags', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1, { title: '<b data-test="Test">Test</b>', html: true }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 2px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 9px; left: 0px;"></div><div class="tooltip-inner"><b>Test</b></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('works with sanitize option', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                UI.Tooltip.init(tooltipToggle1, { title: '<b data-test="Test">Test</b>', html: true, sanitize: false }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 2px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 9px; left: 0px;"></div><div class="tooltip-inner"><b data-test="Test">Test</b></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('works with sanitize option (data-ui-sanitize)', async function() {
            await exec(_ => {
                const tooltipToggle1 = dom.findOne('#tooltipToggle1');
                dom.setDataset(tooltipToggle1, 'uiSanitize', false);
                UI.Tooltip.init(tooltipToggle1, { title: '<b data-test="Test">Test</b>', html: true }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-sanitize="false" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 2px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 9px; left: 0px;"></div><div class="tooltip-inner"><b data-test="Test">Test</b></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

        it('works with sanitize option (query)', async function() {
            await exec(_ => {
                dom.query('#tooltipToggle1')
                    .tooltip({ title: '<b data-test="Test">Test</b>', html: true, sanitize: false })
                    .show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#tooltipToggle1 + .tooltip');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="tooltipToggle1" data-ui-placement="right"></button>' +
                    '<div class="tooltip show" role="tooltip" data-ui-placement="right" style="margin: 0px; position: absolute; top: 0px; right: initial; bottom: initial; left: 0px; transform: translate3d(26px, 2px, 0px);"><div class="tooltip-arrow" style="position: absolute; top: 9px; left: 0px;"></div><div class="tooltip-inner"><b data-test="Test">Test</b></div></div>' +
                    '<button id="tooltipToggle2"></button>'
                );
            });
        });

    });

});