const assert = require('assert');
const { exec } = require('../setup');
const { waitFor } = require('../helpers');

describe('Offcanvas', function() {

    afterEach(async function() {
        await exec(_ => {
            dom.removeClass(document.body, 'offcanvas-backdrop');
            dom.removeAttribute(document.body, 'style');
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

        it('creates a offcanvas', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const offcanvas1 = dom.findOne('#offcanvas1');
                    return UI.Offcanvas.init(offcanvas1) instanceof UI.Offcanvas;
                }),
                true
            );
        });

        it('creates a offcanvas (data-ui-toggle)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.click('#offcanvasToggle1');
                    return dom.getData('#offcanvas1', 'offcanvas') instanceof UI.Offcanvas;
                }),
                true
            );
        });

        it('creates a offcanvas (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#offcanvas1').offcanvas();
                    return dom.getData('#offcanvas1', 'offcanvas') instanceof UI.Offcanvas;
                }),
                true
            );
        });

        it('returns the offcanvas (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#offcanvas1').offcanvas() instanceof UI.Offcanvas;
                }),
                true
            );
        });

    });

    describe('#dispose', function() {

        it('removes the offcanvas', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const offcanvas1 = dom.findOne('#offcanvas1');
                    UI.Offcanvas.init(offcanvas1).dispose();
                    return dom.hasData(offcanvas1, 'offcanvas');
                }),
                false
            );
        });

        it('removes the offcanvas (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#offcanvas1').offcanvas('dispose');
                    return dom.hasData('#offcanvas1', 'offcanvas');
                }),
                false
            );
        });

        it('clears offcanvas memory', async function() {
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

        it('clears offcanvas memory when node is removed', async function() {
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
                    return UI.Offcanvas._current;
                }),
                null
            );
        });

    });

    describe('#show', function() {

        it('shows the offcanvas', async function() {
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

        it('shows the offcanvas (data-ui-toggle)', async function() {
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

        it('shows the offcanvas (query)', async function() {
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

        it('can be called multiple times', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1)
                    .show()
                    .show()
                    .show();
            });
        });

        it('can be called on shown modal', async function() {
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

        it('returns the offcanvas', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const offcanvas1 = dom.findOne('#offcanvas1');
                    return UI.Offcanvas.init(offcanvas1).show() instanceof UI.Offcanvas;
                }),
                true
            );
        });

        it('returns the offcanvas (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#offcanvas1').offcanvas('show') instanceof UI.Offcanvas;
                }),
                true
            );
        });

    });

    describe('#hide', function() {

        it('hides the offcanvas', async function() {
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

        it('hides the offcanvas (data-ui-dismiss)', async function() {
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

        it('hides the offcanvas (query)', async function() {
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

        it('does not remove the offcanvas after hiding', async function() {
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

        it('can be called multiple times', async function() {
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

        it('can be called on hidden offcanvas', async function() {
            await exec(async _ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).hide();
            });
        });

        it('returns the offcanvas', async function() {
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

        it('returns the offcanvas (query)', async function() {
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

        it('shows the offcanvas', async function() {
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

        it('shows the offcanvas (query)', async function() {
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

        it('can be called multiple times', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1)
                    .toggle()
                    .toggle()
                    .toggle();
            });
        });

        it('returns the offcanvas', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const offcanvas1 = dom.findOne('#offcanvas1');
                    return UI.Offcanvas.init(offcanvas1).toggle() instanceof UI.Offcanvas;
                }),
                true
            );
        });

        it('returns the offcanvas (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    return dom.query('#offcanvas1').offcanvas('toggle') instanceof UI.Offcanvas;
                }),
                true
            );
        });

    });

    describe('#toggle (hide)', function() {

        it('hides the offcanvas', async function() {
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

        it('hides the offcanvas (query)', async function() {
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

        it('can be called multiple times', async function() {
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

        it('returns the offcanvas', async function() {
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

        it('returns the offcanvas (query)', async function() {
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

        it('triggers show event', async function() {
            assert.strictEqual(
                await exec(async _ => {
                    return await new Promise(resolve => {
                        const offcanvas1 = dom.findOne('#offcanvas1');
                        dom.addEvent(offcanvas1, 'show.ui.offcanvas', _ => {
                            resolve(dom.getHTML(document.body));
                        })
                        UI.Offcanvas.init(offcanvas1).show();
                    });
                }),
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

        it('triggers shown event', async function() {
            assert.strictEqual(
                await exec(async _ => {
                    return await new Promise(resolve => {
                        const offcanvas1 = dom.findOne('#offcanvas1');
                        dom.addEvent(offcanvas1, 'shown.ui.offcanvas', _ => {
                            resolve(dom.getHTML(document.body));
                        })
                        UI.Offcanvas.init(offcanvas1).show();
                    });
                }),
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

        it('triggers hide event', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(async _ => {
                        return await new Promise(resolve => {
                            const offcanvas1 = dom.findOne('#offcanvas1');
                            dom.addEvent(offcanvas1, 'hide.ui.offcanvas', _ => {
                                resolve(dom.getHTML(document.body));
                            })
                            UI.Offcanvas.init(offcanvas1).hide();
                        });
                    }),
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

        it('triggers hidden event', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(async _ => {
                        return await new Promise(resolve => {
                            const offcanvas1 = dom.findOne('#offcanvas1');
                            dom.addEvent(offcanvas1, 'hidden.ui.offcanvas', _ => {
                                resolve(dom.getHTML(document.body));
                            })
                            UI.Offcanvas.init(offcanvas1).hide();
                        });
                    }),
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

        it('triggers show event (toggle)', async function() {
            assert.strictEqual(
                await exec(async _ => {
                    return await new Promise(resolve => {
                        const offcanvas1 = dom.findOne('#offcanvas1');
                        dom.addEvent(offcanvas1, 'show.ui.offcanvas', _ => {
                            resolve(dom.getHTML(document.body));
                        })
                        UI.Offcanvas.init(offcanvas1).toggle();
                    });
                }),
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

        it('triggers shown event (toggle)', async function() {
            assert.strictEqual(
                await exec(async _ => {
                    return await new Promise(resolve => {
                        const offcanvas1 = dom.findOne('#offcanvas1');
                        dom.addEvent(offcanvas1, 'shown.ui.offcanvas', _ => {
                            resolve(dom.getHTML(document.body));
                        })
                        UI.Offcanvas.init(offcanvas1).toggle();
                    });
                }),
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

        it('triggers hide event (toggle)', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(async _ => {
                        return await new Promise(resolve => {
                            const offcanvas1 = dom.findOne('#offcanvas1');
                            dom.addEvent(offcanvas1, 'hide.ui.offcanvas', _ => {
                                resolve(dom.getHTML(document.body));
                            })
                            UI.Offcanvas.init(offcanvas1).toggle();
                        });
                    }),
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

        it('triggers hidden event (toggle)', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(async _ => {
                        return await new Promise(resolve => {
                            const offcanvas1 = dom.findOne('#offcanvas1');
                            dom.addEvent(offcanvas1, 'hidden.ui.offcanvas', _ => {
                                resolve(dom.getHTML(document.body));
                            })
                            UI.Offcanvas.init(offcanvas1).toggle();
                        });
                    }),
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

        it('can be prevented from showing', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                dom.addEvent(offcanvas1, 'show.ui.offcanvas', _ => {
                    return false;
                })
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
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

        it('can be prevented from showing (prevent default)', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                dom.addEvent(offcanvas1, 'show.ui.offcanvas', e => {
                    e.preventDefault();
                })
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
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

        it('can be prevented from hiding', async function() {
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
                    dom.addEvent(offcanvas1, 'hide.ui.offcanvas', _ => {
                        return false;
                    })
                    UI.Offcanvas.init(offcanvas1).hide();
                });
            }).then(waitFor(125)).then(async _ => {
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

    });

    describe('duration option', function() {

        it('works with duration option on show', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1, { duration: 200 }).show();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#offcanvas1')),
                    true
                );
            });
        });

        it('works with duration option on show (data-ui-duration)', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                dom.setDataset(offcanvas1, 'uiDuration', 200);
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#offcanvas1')),
                    true
                );
            });
        });

        it('works with duration option on show (query)', async function() {
            await exec(_ => {
                dom.query('#offcanvas1')
                    .offcanvas({ duration: 200 })
                    .show();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#offcanvas1')),
                    true
                );
            });
        });

        it('works with duration option on hide', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1, { duration: 200 }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const offcanvas1 = dom.findOne('#offcanvas1');
                    UI.Offcanvas.init(offcanvas1).hide();
                });
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#offcanvas1')),
                    true
                );
            });
        });

        it('works with duration option on hide (data-ui-duration)', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                dom.setDataset(offcanvas1, 'uiDuration', 200);
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
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#offcanvas1')),
                    true
                );
            });
        });

        it('works with duration option on hide (query)', async function() {
            await exec(_ => {
                dom.query('#offcanvas1')
                    .offcanvas({ duration: 200 })
                    .show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.query('#offcanvas1')
                        .offcanvas('hide');
                });
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#offcanvas1')),
                    true
                );
            });
        });

    });

    describe('keyboard option', function() {

        it('hides the offcanvas on escape', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const event = new KeyboardEvent('keyup', {
                        bubbles: true,
                        code: 'Escape'
                    });
                    document.body.dispatchEvent(event);
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

        it('works with keyboard option', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1, { keyboard: false }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const event = new KeyboardEvent('keyup', {
                        bubbles: true,
                        code: 'Escape'
                    });
                    document.body.dispatchEvent(event);
                });
            }).then(waitFor(125)).then(async _ => {
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

        it('works with keyboard option (data-ui-keyboard)', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                dom.setDataset(offcanvas1, 'uiKeyboard', false);
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const event = new KeyboardEvent('keyup', {
                        bubbles: true,
                        code: 'Escape'
                    });
                    document.body.dispatchEvent(event);
                });
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas1" type="button"></button>' +
                    '<button id="offcanvasToggle1" data-ui-toggle="offcanvas" data-ui-target="#offcanvas2" type="button"></button>' +
                    '<div class="offcanvas offcanvas-start show" id="offcanvas1" data-ui-keyboard="false" aria-modal="true" style="">' +
                    '<button id="button1" data-ui-dismiss="offcanvas" type="button"></button>' +
                    '</div>' +
                    '<div class="offcanvas offcanvas-start" id="offcanvas2">' +
                    '<button id="button2" data-ui-dismiss="offcanvas" type="button"></button>' +
                    '</div>'
                );
            });
        });

        it('works with keyboard option (query)', async function() {
            await exec(_ => {
                dom.query('#offcanvas1')
                    .offcanvas({ keyboard: false })
                    .show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const event = new KeyboardEvent('keyup', {
                        bubbles: true,
                        code: 'Escape'
                    });
                    document.body.dispatchEvent(event);
                });
            }).then(waitFor(125)).then(async _ => {
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

    });

    describe('backdrop option', function() {

        it('adds backdrop to document body', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasClass(document.body, 'offcanvas-backdrop')),
                    true
                );
            });
        });

        it('works with backdrop option', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1, { backdrop: false }).show();
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasClass(document.body, 'offcanvas-backdrop')),
                    false
                );
            });
        });

        it('works with backdrop option (data-ui-backdrop)', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                dom.setDataset(offcanvas1, 'uiBackdrop', false);
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasClass(document.body, 'offcanvas-backdrop')),
                    false
                );
            });
        });

        it('works with backdrop option (query)', async function() {
            await exec(_ => {
                dom.query('#offcanvas1')
                    .offcanvas({ backdrop: false })
                    .show();
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasClass(document.body, 'offcanvas-backdrop')),
                    false
                );
            });
        });

        it('hides the offcanvas on document click (with backdrop)', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.click(document.body);
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

        it('does not hide the offcanvas on document click (without backdrop)', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1, { backdrop: false }).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.click(document.body);
                });
            }).then(waitFor(125)).then(async _ => {
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

    });

    describe('scroll option', function() {

        it('prevents scroll on document body', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getStyle(document.body, 'overflow')),
                    'hidden'
                );
            });
        });

        it('works with scroll option', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1, { scroll: true }).show();
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getStyle(document.body, 'overflow')),
                    ''
                );
            });
        });

        it('works with scroll option (data-ui-scroll)', async function() {
            await exec(_ => {
                const offcanvas1 = dom.findOne('#offcanvas1');
                dom.setDataset(offcanvas1, 'uiScroll', true);
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getStyle(document.body, 'overflow')),
                    ''
                );
            });
        });

        it('works with scroll option', async function() {
            await exec(_ => {
                dom.query('#offcanvas1')
                    .offcanvas({ scroll: true })
                    .show();
            }).then(waitFor(125)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getStyle(document.body, 'overflow')),
                    ''
                );
            });
        });

    });

    describe('scroll padding', function() {

        it('adds scroll padding to document body (vertical)', async function() {
            await exec(_ => {
                dom.setStyle(document.body, 'height', '2000px');
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getStyle(document.body, 'paddingRight');
                    }),
                    '15px'
                );
            });
        });

        it('adds scroll padding to document body (horizontal)', async function() {
            await exec(_ => {
                dom.setStyle(document.body, 'width', '2000px');
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getStyle(document.body, 'paddingBottom');
                    }),
                    '15px'
                );
            });
        });

        it('does not add padding if scrollbars are hidden (vertical)', async function() {
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
                        return dom.getStyle(document.body, 'paddingRight');
                    }),
                    ''
                );
            });
        });

        it('does not add padding if scrollbars are hidden (horizontal)', async function() {
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
                        return dom.getStyle(document.body, 'paddingBottom');
                    }),
                    ''
                );
            });
        });

        it('works with existing padding (vertical)', async function() {
            await exec(_ => {
                dom.setStyle(document.body, 'height', '2000px');
                dom.setStyle(document.body, 'paddingRight', '10px');
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getStyle(document.body, 'paddingRight');
                    }),
                    '25px'
                );
            });
        });

        it('works with existing padding (horizontal)', async function() {
            await exec(_ => {
                dom.setStyle(document.body, 'width', '2000px');
                dom.setStyle(document.body, 'paddingBottom', '10px');
                const offcanvas1 = dom.findOne('#offcanvas1');
                UI.Offcanvas.init(offcanvas1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getStyle(document.body, 'paddingBottom');
                    }),
                    '25px'
                );
            });
        });

        it('restores scroll padding to document body (vertical)', async function() {
            await exec(_ => {
                dom.setStyle(document.body, 'height', '2000px');
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
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getStyle(document.body, 'paddingRight');
                    }),
                    ''
                );
            });
        });

        it('restores scroll padding to document body (horizontal)', async function() {
            await exec(_ => {
                dom.setStyle(document.body, 'width', '2000px');
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
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getStyle(document.body, 'paddingBottom');
                    }),
                    ''
                );
            });
        });

        it('restores existing scroll padding to document body (vertical)', async function() {
            await exec(_ => {
                dom.setStyle(document.body, 'height', '2000px');
                dom.setStyle(document.body, 'paddingRight', '10px');
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
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getStyle(document.body, 'paddingRight');
                    }),
                    '10px'
                );
            });
        });

        it('restores existing scroll padding to document body (horizontal)', async function() {
            await exec(_ => {
                dom.setStyle(document.body, 'width', '2000px');
                dom.setStyle(document.body, 'paddingBottom', '10px');
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
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.stop('#offcanvas1');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => {
                        return dom.getStyle(document.body, 'paddingBottom');
                    }),
                    '10px'
                );
            });
        });

    });

});