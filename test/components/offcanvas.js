const assert = require('assert');
const { exec } = require('../setup');
const { waitFor } = require('../helpers');

describe('Offcanvas', function() {

    afterEach(async function() {
        await exec(_ => {
            dom.removeClass(document.body, 'offcanvas-backdrop');
            dom.removeAttribute(document.body, 'style');
            UI.Offcanvas.current = null;
        });
    });

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas1" type="button"></button>' +
                '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas2" type="button"></button>' +
                '<div class="offcanvas offcanvas-start" id="offcanvas1">' +
                '<button id="button1" data-ui-dismiss="offcanvas" type="button"></button>' +
                '</div>' +
                '<div class="offcanvas offcanvas-start" id="offcanvas2">' +
                '<button id="button2" data-ui-dismiss="offcanvas" type="button"></button>' +
                '</div>'
            );
        });
    });

    describe('#init', function() {

        it.only('creates a offcanvas', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const offcanvas1 = dom.findOne('#offcanvas1');
                    return UI.Offcanvas.init(offcanvas1) instanceof UI.Offcanvas;
                }),
                true
            );
        });

        it.only('creates a offcanvas (data-ui-toggle)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.click('#offcanvasToggle1');
                    return dom.getData('#offcanvas1', 'offcanvas') instanceof UI.Offcanvas;
                }),
                true
            );
        });

        it.only('creates a offcanvas (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#offcanvas1').offcanvas();
                    return dom.getData('#offcanvas1', 'offcanvas') instanceof UI.Offcanvas;
                }),
                true
            );
        });

        it.only('returns the offcanvas (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#offcanvas1').offcanvas() instanceof UI.Offcanvas;
                }),
                true
            );
        });

    });

    describe('#dispose', function() {

        it.only('removes the offcanvas', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const offcanvas1 = dom.findOne('#offcanvas1');
                    UI.Offcanvas.init(offcanvas1).dispose();
                    return dom.hasData(offcanvas1, 'offcanvas');
                }),
                false
            );
        });

        it.only('removes the offcanvas (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#offcanvas1').offcanvas('dispose');
                    return dom.hasData('#offcanvas1', 'offcanvas');
                }),
                false
            );
        });

        it.only('clears offcanvas memory', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const offcanvas1 = dom.findOne('#offcanvas1');
                    const offcanvas = UI.Offcanvas.init(offcanvas1);
                    offcanvas.dispose();

                    for (const key in offcanvas) {
                        if (Core.isObject(offcanvas[key]) && !Core.isFunction(offcanvas[key])) {
                            return false;
                        }
                    }

                    return true;
                }),
                true
            );
        });

        it.only('clears offcanvas memory when node is removed', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const offcanvas1 = dom.findOne('#offcanvas1');
                    const offcanvas = UI.Offcanvas.init(offcanvas1);
                    dom.setHTML(document.body, '');
                    // dom.remove(offcanvas1);

                    for (const key in offcanvas) {
                        if (Core.isObject(offcanvas[key]) && !Core.isFunction(offcanvas[key])) {
                            return false;
                        }
                    }

                    return true;
                }),
                true
            );
            assert.strictEqual(
                await exec(_ => {
                    return UI.Offcanvas.current;
                }),
                null
            );
        });

    });

    describe('#show', function() {

        it.only('shows the offcanvas', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#offcanvas1')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas1" type="button"></button>' +
                    '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas2" type="button"></button>' +
                    '<div class="offcanvas offcanvas-start show" id="offcanvas1" aria-modal="true" style="">' +
                    '<button id="button1" data-ui-dismiss="offcanvas" type="button"></button>' +
                    '</div>' +
                    '<div class="offcanvas offcanvas-start" id="offcanvas2">' +
                    '<button id="button2" data-ui-dismiss="offcanvas" type="button"></button>' +
                    '</div>'
                );
            });
        });

        it.only('shows the offcanvas (data-ui-toggle)', async function() {
            await exec(_ => {
                dom.click('#offcanvasToggle1');
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#offcanvas1')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas1" type="button"></button>' +
                    '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas2" type="button"></button>' +
                    '<div class="offcanvas offcanvas-start show" id="offcanvas1" aria-modal="true" style="">' +
                    '<button id="button1" data-ui-dismiss="offcanvas" type="button"></button>' +
                    '</div>' +
                    '<div class="offcanvas offcanvas-start" id="offcanvas2">' +
                    '<button id="button2" data-ui-dismiss="offcanvas" type="button"></button>' +
                    '</div>'
                );
            });
        });

        it.only('shows the offcanvas (query)', async function() {
            await exec(_ => {
                dom.query('#offcanvas1').offcanvas('show');
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#offcanvas1')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas1" type="button"></button>' +
                    '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas2" type="button"></button>' +
                    '<div class="offcanvas offcanvas-start show" id="offcanvas1" aria-modal="true" style="">' +
                    '<button id="button1" data-ui-dismiss="offcanvas" type="button"></button>' +
                    '</div>' +
                    '<div class="offcanvas offcanvas-start" id="offcanvas2">' +
                    '<button id="button2" data-ui-dismiss="offcanvas" type="button"></button>' +
                    '</div>'
                );
            });
        });

        it.only('can be called multiple times', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1)
                    .show()
                    .show()
                    .show();
            });
        });

        it.only('can be called on shown modal', async function() {
            await exec(async _ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    UI.Offcanvas.init(offcanvas1).show();
                });
            });
        });

        it.only('returns the offcanvas', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const offcanvas1 = dom.findOne('#offcanvas1');
                    return UI.Offcanvas.init(offcanvas1).show() instanceof UI.Offcanvas;
                }),
                true
            );
        });

        it.only('returns the offcanvas (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#offcanvas1').offcanvas('show') instanceof UI.Offcanvas;
                }),
                true
            );
        });

    });

    describe('#hide', function() {

        it.only('hides the offcanvas', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const offcanvas1 = dom.findOne('#offcanvas1');
                    UI.Offcanvas.init(offcanvas1).hide();
                });
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#offcanvas1')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas1" type="button"></button>' +
                    '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas2" type="button"></button>' +
                    '<div class="offcanvas offcanvas-start" id="offcanvas1" aria-hidden="true" style="">' +
                    '<button id="button1" data-ui-dismiss="offcanvas" type="button"></button>' +
                    '</div>' +
                    '<div class="offcanvas offcanvas-start" id="offcanvas2">' +
                    '<button id="button2" data-ui-dismiss="offcanvas" type="button"></button>' +
                    '</div>'
                );
            });
        });

        it.only('hides the offcanvas (data-ui-dismiss)', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.click('#button1');
                });
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#offcanvas1')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas1" type="button"></button>' +
                    '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas2" type="button"></button>' +
                    '<div class="offcanvas offcanvas-start" id="offcanvas1" aria-hidden="true" style="">' +
                    '<button id="button1" data-ui-dismiss="offcanvas" type="button"></button>' +
                    '</div>' +
                    '<div class="offcanvas offcanvas-start" id="offcanvas2">' +
                    '<button id="button2" data-ui-dismiss="offcanvas" type="button"></button>' +
                    '</div>'
                );
            });
        });

        it.only('hides the offcanvas (query)', async function() {
            await exec(_ => {
                dom.query('#offcanvas1').offcanvas('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.query('#offcanvas1').offcanvas('hide');
                });
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#offcanvas1')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas1" type="button"></button>' +
                    '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas2" type="button"></button>' +
                    '<div class="offcanvas offcanvas-start" id="offcanvas1" aria-hidden="true" style="">' +
                    '<button id="button1" data-ui-dismiss="offcanvas" type="button"></button>' +
                    '</div>' +
                    '<div class="offcanvas offcanvas-start" id="offcanvas2">' +
                    '<button id="button2" data-ui-dismiss="offcanvas" type="button"></button>' +
                    '</div>'
                );
            });
        });

        it.only('does not remove the offcanvas after hiding', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const offcanvas1 = dom.findOne('#offcanvas1');
                    UI.Offcanvas.init(offcanvas1).hide();
                });
            }).then(waitFor(250)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getData('#offcanvas1', 'offcanvas') instanceof UI.Offcanvas),
                    true
                );
            });
        });

        it.only('can be called multiple times', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(async _ => {
                    const offcanvas1 = dom.findOne('#offcanvas1');
                    UI.Offcanvas.init(offcanvas1)
                        .hide()
                        .hide()
                        .hide();
                });
            });
        });

        it.only('can be called on hidden offcanvas', async function() {
            await exec(async _ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).hide();
            });
        });

        it.only('returns the offcanvas', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        const offcanvas1 = dom.findOne('#offcanvas1');
                        return UI.Offcanvas.init(offcanvas1).hide() instanceof UI.Offcanvas;
                    }),
                    true
                );
            });
        });

        it.only('returns the offcanvas (query)', async function() {
            await exec(_ => {
                dom.query('#offcanvas1').offcanvas('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.query('#offcanvas1').offcanvas('hide') instanceof UI.Offcanvas;
                    }),
                    true
                );
            });
        });

    });

    describe('#toggle (show)', function() {

        it.only('shows the offcanvas', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).toggle();
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#offcanvas1')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas1" type="button"></button>' +
                    '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas2" type="button"></button>' +
                    '<div class="offcanvas offcanvas-start show" id="offcanvas1" aria-modal="true" style="">' +
                    '<button id="button1" data-ui-dismiss="offcanvas" type="button"></button>' +
                    '</div>' +
                    '<div class="offcanvas offcanvas-start" id="offcanvas2">' +
                    '<button id="button2" data-ui-dismiss="offcanvas" type="button"></button>' +
                    '</div>'
                );
            });
        });

        it.only('shows the offcanvas (query)', async function() {
            await exec(_ => {
                dom.query('#offcanvas1').offcanvas('toggle');
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#offcanvas1')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas1" type="button"></button>' +
                    '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas2" type="button"></button>' +
                    '<div class="offcanvas offcanvas-start show" id="offcanvas1" aria-modal="true" style="">' +
                    '<button id="button1" data-ui-dismiss="offcanvas" type="button"></button>' +
                    '</div>' +
                    '<div class="offcanvas offcanvas-start" id="offcanvas2">' +
                    '<button id="button2" data-ui-dismiss="offcanvas" type="button"></button>' +
                    '</div>'
                );
            });
        });

        it.only('can be called multiple times', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1)
                    .toggle()
                    .toggle()
                    .toggle();
            });
        });

        it.only('returns the offcanvas', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const offcanvas1 = dom.findOne('#offcanvas1');
                    return UI.Offcanvas.init(offcanvas1).toggle() instanceof UI.Offcanvas;
                }),
                true
            );
        });

        it.only('returns the offcanvas (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#offcanvas1').offcanvas('toggle') instanceof UI.Offcanvas;
                }),
                true
            );
        });

    });

    describe('#toggle (hide)', function() {

        it.only('hides the offcanvas', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const offcanvas1 = dom.findOne('#offcanvas1');
                    UI.Offcanvas.init(offcanvas1).toggle();
                });
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#offcanvas1')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas1" type="button"></button>' +
                    '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas2" type="button"></button>' +
                    '<div class="offcanvas offcanvas-start" id="offcanvas1" aria-hidden="true" style="">' +
                    '<button id="button1" data-ui-dismiss="offcanvas" type="button"></button>' +
                    '</div>' +
                    '<div class="offcanvas offcanvas-start" id="offcanvas2">' +
                    '<button id="button2" data-ui-dismiss="offcanvas" type="button"></button>' +
                    '</div>'
                );
            });
        });

        it.only('hides the offcanvas (query)', async function() {
            await exec(_ => {
                dom.query('#offcanvas1').offcanvas('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.query('#offcanvas1').offcanvas('toggle');
                });
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#offcanvas1')),
                    true
                );
            }).then(waitFor(175)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas1" type="button"></button>' +
                    '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas2" type="button"></button>' +
                    '<div class="offcanvas offcanvas-start" id="offcanvas1" aria-hidden="true" style="">' +
                    '<button id="button1" data-ui-dismiss="offcanvas" type="button"></button>' +
                    '</div>' +
                    '<div class="offcanvas offcanvas-start" id="offcanvas2">' +
                    '<button id="button2" data-ui-dismiss="offcanvas" type="button"></button>' +
                    '</div>'
                );
            });
        });

        it.only('can be called multiple times', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(async _ => {
                    const offcanvas1 = dom.findOne('#offcanvas1');
                    UI.Offcanvas.init(offcanvas1)
                        .toggle()
                        .toggle()
                        .toggle();
                });
            });
        });

        it.only('returns the offcanvas', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        const offcanvas1 = dom.findOne('#offcanvas1');
                        return UI.Offcanvas.init(offcanvas1).toggle() instanceof UI.Offcanvas;
                    }),
                    true
                );
            });
        });

        it.only('returns the offcanvas (query)', async function() {
            await exec(_ => {
                dom.query('#offcanvas1').offcanvas('show');
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.query('#offcanvas1').offcanvas('toggle') instanceof UI.Offcanvas;
                    }),
                    true
                );
            });
        });

    });

    describe('events', function() {

    });

});