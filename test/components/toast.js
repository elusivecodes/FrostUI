const assert = require('assert');
const { exec } = require('../setup');
const { waitFor } = require('../helpers');

describe('Toast', function() {

    beforeEach(async function() {
        await exec(_ => {
            dom.setHTML(
                document.body,
                '<div class="toast show" id="toast1">' +
                '<button id="button1" data-ui-dismiss="toast"></button>' +
                '</div>' +
                '<div class="toast show" id="toast2">' +
                '<button id="button2" data-ui-dismiss="toast"></button>' +
                '</div>'
            );
        });
    });

    describe('#init', function() {

        it('creates a toast', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const toast1 = dom.findOne('#toast1');
                    return UI.Toast.init(toast1) instanceof UI.Toast;
                }),
                true
            );
        });

        it('creates a toast (data-ui-toggle)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.click('#button1');
                    return dom.getData('#toast1', 'toast') instanceof UI.Toast;
                }),
                true
            );
        });

        it('creates a toast (query)', async function() {
            assert.strictEqual(
                await exec(_ => {
                    dom.query('#toast1').toast();
                    return dom.getData('#toast1', 'toast') instanceof UI.Toast;
                }),
                true
            );
        });

    });

    describe('#dispose', function() {

        it('clears toast memory', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const toast1 = dom.findOne('#toast1');
                    const toast = UI.Toast.init(toast1);
                    toast.dispose();

                    for (const key in toast) {
                        if (Core.isObject(toast[key]) && !Core.isFunction(toast[key])) {
                            return false;
                        }
                    }

                    return true;
                }),
                true
            );
        });

        it('removes the toast', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const toast1 = dom.findOne('#toast1');
                    UI.Toast.init(toast1).dispose();
                    return dom.hasData(toast1, 'toast');
                }),
                false
            );
        });

        it('clears toast memory when node is removed', async function() {
            assert.strictEqual(
                await exec(_ => {
                    const toast1 = dom.findOne('#toast1');
                    const toast = UI.Toast.init(toast1);
                    dom.remove(toast1);

                    for (const key in toast) {
                        if (Core.isObject(toast[key]) && !Core.isFunction(toast[key])) {
                            return false;
                        }
                    }

                    return true;
                }),
                true
            );
        });

    });

    describe('#hide', function() {

        it('hides the toast', async function() {
            await exec(_ => {
                const toast1 = dom.findOne('#toast1');
                UI.Toast.init(toast1).hide();
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#toast1')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="toast" id="toast1" style="display: none !important;">' +
                    '<button id="button1" data-ui-dismiss="toast"></button>' +
                    '</div>' +
                    '<div class="toast show" id="toast2">' +
                    '<button id="button2" data-ui-dismiss="toast"></button>' +
                    '</div>'
                );
            });
        });

        it('hides the toast (data-ui-dismiss)', async function() {
            await exec(_ => {
                dom.click('#button1');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#toast1')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="toast" id="toast1" style="display: none !important;">' +
                    '<button id="button1" data-ui-dismiss="toast"></button>' +
                    '</div>' +
                    '<div class="toast show" id="toast2">' +
                    '<button id="button2" data-ui-dismiss="toast"></button>' +
                    '</div>'
                );
            });
        });

        it('hides the toast (query)', async function() {
            await exec(_ => {
                dom.query('#toast1').toast('hide');
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#toast1')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="toast" id="toast1" style="display: none !important;">' +
                    '<button id="button1" data-ui-dismiss="toast"></button>' +
                    '</div>' +
                    '<div class="toast show" id="toast2">' +
                    '<button id="button2" data-ui-dismiss="toast"></button>' +
                    '</div>'
                );
            });
        });

        it('does not remove the toast after hiding', async function() {
            await exec(_ => {
                const toast1 = dom.findOne('#toast1');
                UI.Toast.init(toast1).hide();
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getData('#toast1', 'toast') instanceof UI.Toast),
                    true
                );
            });
        });

        it('can be called multiple times', async function() {
            await exec(async _ => {
                const toast1 = dom.findOne('#toast1');
                const toast = UI.Toast.init(toast1);
                toast.hide();
                toast.hide();
                toast.hide();
            });
        });

        it('can be called on hidden toast', async function() {
            await exec(async _ => {
                const toast1 = dom.findOne('#toast1');
                UI.Toast.init(toast1).show();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => dom.stop('#toast1'));
            }).then(waitFor(50)).then(async _ => {
                await exec(async _ => {
                    const toast1 = dom.findOne('#toast1');
                    UI.Toast.init(toast1).hide();
                });
            });
        });

    });

    describe('#show', function() {

        it('shows the toast', async function() {
            await exec(_ => {
                const toast1 = dom.findOne('#toast1');
                UI.Toast.init(toast1).hide();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => dom.stop('#toast1'));
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const toast1 = dom.findOne('#toast1');
                    UI.Toast.init(toast1).show();
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#toast1')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="toast show" id="toast1" style="">' +
                    '<button id="button1" data-ui-dismiss="toast"></button>' +
                    '</div>' +
                    '<div class="toast show" id="toast2">' +
                    '<button id="button2" data-ui-dismiss="toast"></button>' +
                    '</div>'
                );
            });
        });

        it('shows the toast (query)', async function() {
            await exec(_ => {
                const toast1 = dom.findOne('#toast1');
                UI.Toast.init(toast1).hide();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => dom.stop('#toast1'));
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.query('#toast1').toast('show');
                });
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#toast1')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="toast show" id="toast1" style="">' +
                    '<button id="button1" data-ui-dismiss="toast"></button>' +
                    '</div>' +
                    '<div class="toast show" id="toast2">' +
                    '<button id="button2" data-ui-dismiss="toast"></button>' +
                    '</div>'
                );
            });
        });

        it('can be called multiple times', async function() {
            await exec(_ => {
                const toast1 = dom.findOne('#toast1');
                UI.Toast.init(toast1).hide();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => dom.stop('#toast1'));
            }).then(waitFor(50)).then(async _ => {
                await exec(async _ => {
                    const toast1 = dom.findOne('#toast1');
                    const toast = UI.Toast.init(toast1);
                    toast.show();
                    toast.show();
                    toast.show();
                });
            });
        });

        it('can be called on shown toast', async function() {
            await exec(async _ => {
                const toast1 = dom.findOne('#toast1');
                UI.Toast.init(toast1).show();
            });
        });

    });

    describe('events', function() {

        it('triggers hide event', async function() {
            assert.strictEqual(
                await exec(async _ => {
                    return await new Promise(resolve => {
                        const toast1 = dom.findOne('#toast1');
                        dom.addEvent(toast1, 'hide.ui.toast', _ => {
                            resolve(dom.getHTML(document.body));
                        })
                        UI.Toast.init(toast1).hide();
                    });
                }),
                '<div class="toast show" id="toast1">' +
                '<button id="button1" data-ui-dismiss="toast"></button>' +
                '</div>' +
                '<div class="toast show" id="toast2">' +
                '<button id="button2" data-ui-dismiss="toast"></button>' +
                '</div>'
            );
        });

        it('triggers hidden event', async function() {
            assert.strictEqual(
                await exec(async _ => {
                    return await new Promise(resolve => {
                        const toast1 = dom.findOne('#toast1');
                        dom.addEvent(toast1, 'hidden.ui.toast', _ => {
                            resolve(dom.getHTML(document.body));
                        })
                        UI.Toast.init(toast1).hide();
                    });
                }),
                '<div class="toast" id="toast1" style="display: none !important;">' +
                '<button id="button1" data-ui-dismiss="toast"></button>' +
                '</div>' +
                '<div class="toast show" id="toast2">' +
                '<button id="button2" data-ui-dismiss="toast"></button>' +
                '</div>'
            );
        });

        it('triggers show event', async function() {
            await exec(_ => {
                const toast1 = dom.findOne('#toast1');
                UI.Toast.init(toast1).hide();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => dom.stop('#toast1'));
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(async _ => {
                        return await new Promise(resolve => {
                            const toast1 = dom.findOne('#toast1');
                            dom.addEvent(toast1, 'show.ui.toast', _ => {
                                resolve(dom.getHTML(document.body));
                            })
                            UI.Toast.init(toast1).show();
                        });
                    }),
                    '<div class="toast" id="toast1" style="display: none !important;">' +
                    '<button id="button1" data-ui-dismiss="toast"></button>' +
                    '</div>' +
                    '<div class="toast show" id="toast2">' +
                    '<button id="button2" data-ui-dismiss="toast"></button>' +
                    '</div>'
                );
            });
        });

        it('triggers shown event', async function() {
            await exec(_ => {
                const toast1 = dom.findOne('#toast1');
                UI.Toast.init(toast1).hide();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => dom.stop('#toast1'));
            }).then(waitFor(50)).then(async _ => {
                assert.strictEqual(
                    await exec(async _ => {
                        return await new Promise(resolve => {
                            const toast1 = dom.findOne('#toast1');
                            dom.addEvent(toast1, 'shown.ui.toast', _ => {
                                resolve(dom.getHTML(document.body));
                            })
                            UI.Toast.init(toast1).show();
                        });
                    }),
                    '<div class="toast show" id="toast1" style="">' +
                    '<button id="button1" data-ui-dismiss="toast"></button>' +
                    '</div>' +
                    '<div class="toast show" id="toast2">' +
                    '<button id="button2" data-ui-dismiss="toast"></button>' +
                    '</div>'
                );
            });
        });

        it('can be prevented from hiding', async function() {
            await exec(async _ => {
                const toast1 = dom.findOne('#toast1');
                dom.addEvent(toast1, 'hide.ui.toast', _ => {
                    return false;
                });
                UI.Toast.init(toast1).hide();
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="toast show" id="toast1">' +
                    '<button id="button1" data-ui-dismiss="toast"></button>' +
                    '</div>' +
                    '<div class="toast show" id="toast2">' +
                    '<button id="button2" data-ui-dismiss="toast"></button>' +
                    '</div>'
                );
            });
        });

        it('can be prevented from hiding (prevent default)', async function() {
            await exec(async _ => {
                const toast1 = dom.findOne('#toast1');
                dom.addEvent(toast1, 'hide.ui.toast', e => {
                    e.preventDefault();
                });
                UI.Toast.init(toast1).hide();
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="toast show" id="toast1">' +
                    '<button id="button1" data-ui-dismiss="toast"></button>' +
                    '</div>' +
                    '<div class="toast show" id="toast2">' +
                    '<button id="button2" data-ui-dismiss="toast"></button>' +
                    '</div>'
                );
            });
        });

        it('can be prevented from showing', async function() {
            await exec(_ => {
                const toast1 = dom.findOne('#toast1');
                UI.Toast.init(toast1).hide();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => dom.stop('#toast1'));
            }).then(waitFor(50)).then(async _ => {
                await exec(async _ => {
                    const toast1 = dom.findOne('#toast1');
                    dom.addEvent(toast1, 'show.ui.toast', _ => {
                        return false;
                    });
                    UI.Toast.init(toast1).show();
                });
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="toast" id="toast1" style="display: none !important;">' +
                    '<button id="button1" data-ui-dismiss="toast"></button>' +
                    '</div>' +
                    '<div class="toast show" id="toast2">' +
                    '<button id="button2" data-ui-dismiss="toast"></button>' +
                    '</div>'
                );
            });
        });

        it('can be prevented from showing (prevent default)', async function() {
            await exec(_ => {
                const toast1 = dom.findOne('#toast1');
                UI.Toast.init(toast1).hide();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => dom.stop('#toast1'));
            }).then(waitFor(50)).then(async _ => {
                await exec(async _ => {
                    const toast1 = dom.findOne('#toast1');
                    dom.addEvent(toast1, 'show.ui.toast', e => {
                        e.preventDefault();
                    });
                    UI.Toast.init(toast1).show();
                });
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="toast" id="toast1" style="display: none !important;">' +
                    '<button id="button1" data-ui-dismiss="toast"></button>' +
                    '</div>' +
                    '<div class="toast show" id="toast2">' +
                    '<button id="button2" data-ui-dismiss="toast"></button>' +
                    '</div>'
                );
            });
        });

    });

    describe('duration option', function() {

        it('works with duration option on hide', async function() {
            await exec(_ => {
                const toast1 = dom.findOne('#toast1');
                UI.Toast.init(toast1, { duration: 200 }).hide();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#toast1')),
                    true
                );
            });
        });

        it('works with duration option on hide (data-ui-duration)', async function() {
            await exec(_ => {
                const toast1 = dom.findOne('#toast1');
                dom.setDataset(toast1, 'uiDuration', 200);
                UI.Toast.init(toast1).hide();
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#toast1')),
                    true
                );
            });
        });

        it('works with duration option on hide (query)', async function() {
            await exec(_ => {
                dom.query('#toast1')
                    .toast({ duration: 200 })
                    .toast('hide');
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#toast1')),
                    true
                );
            });
        });

        it('works with duration option on show', async function() {
            await exec(_ => {
                const toast1 = dom.findOne('#toast1');
                UI.Toast.init(toast1, { duration: 200 }).hide();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => dom.stop('#toast1'));
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const toast1 = dom.findOne('#toast1');
                    UI.Toast.init(toast1).show();
                });
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#toast1')),
                    true
                );
            });
        });

        it('works with duration option on show (data-ui-duration)', async function() {
            await exec(_ => {
                const toast1 = dom.findOne('#toast1');
                dom.setDataset(toast1, 'uiDuration', 200);
                UI.Toast.init(toast1).hide();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => dom.stop('#toast1'));
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    const toast1 = dom.findOne('#toast1');
                    UI.Toast.init(toast1).show();
                });
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#toast1')),
                    true
                );
            });
        });

        it('works with duration option on show (query)', async function() {
            await exec(_ => {
                dom.query('#toast1')
                    .toast({ duration: 200 })
                    .hide()
                    .stop();
            }).then(waitFor(50)).then(async _ => {
                await exec(_ => {
                    dom.query('#toast1').toast('show');
                });
            }).then(waitFor(150)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#toast1')),
                    true
                );
            });
        });

    });

    describe('autohide option', function() {

        it('autohides by default', async function() {
            await exec(_ => {
                const toast1 = dom.findOne('#toast1');
                UI.Toast.init(toast1);
            }).then(waitFor(250)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#toast1')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="toast" id="toast1" style="display: none !important;">' +
                    '<button id="button1" data-ui-dismiss="toast"></button>' +
                    '</div>' +
                    '<div class="toast show" id="toast2">' +
                    '<button id="button2" data-ui-dismiss="toast"></button>' +
                    '</div>'
                );
            });
        });

        it('works with autohide option', async function() {
            await exec(_ => {
                const toast1 = dom.findOne('#toast1');
                UI.Toast.init(toast1, { autohide: false });
            }).then(waitFor(350)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="toast show" id="toast1">' +
                    '<button id="button1" data-ui-dismiss="toast"></button>' +
                    '</div>' +
                    '<div class="toast show" id="toast2">' +
                    '<button id="button2" data-ui-dismiss="toast"></button>' +
                    '</div>'
                );
            });
        });

        it('works with autohide option (data-ui-autohide)', async function() {
            await exec(_ => {
                const toast1 = dom.findOne('#toast1');
                dom.setDataset(toast1, 'uiAutohide', false);
                UI.Toast.init(toast1);
            }).then(waitFor(350)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="toast show" id="toast1" data-ui-autohide="false">' +
                    '<button id="button1" data-ui-dismiss="toast"></button>' +
                    '</div>' +
                    '<div class="toast show" id="toast2">' +
                    '<button id="button2" data-ui-dismiss="toast"></button>' +
                    '</div>'
                );
            });
        });

        it('works with autohide option (query)', async function() {
            await exec(_ => {
                dom.query('#toast1').toast({ autohide: false });
            }).then(waitFor(350)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="toast show" id="toast1">' +
                    '<button id="button1" data-ui-dismiss="toast"></button>' +
                    '</div>' +
                    '<div class="toast show" id="toast2">' +
                    '<button id="button2" data-ui-dismiss="toast"></button>' +
                    '</div>'
                );
            });
        });

    });

    describe('delay option', function() {

        it('works with delay option', async function() {
            await exec(_ => {
                const toast1 = dom.findOne('#toast1');
                UI.Toast.init(toast1, { delay: 300 });
            }).then(waitFor(350)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#toast1')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="toast" id="toast1" style="display: none !important;">' +
                    '<button id="button1" data-ui-dismiss="toast"></button>' +
                    '</div>' +
                    '<div class="toast show" id="toast2">' +
                    '<button id="button2" data-ui-dismiss="toast"></button>' +
                    '</div>'
                );
            });
        });

        it('works with delay option', async function() {
            await exec(_ => {
                const toast1 = dom.findOne('#toast1');
                UI.Toast.init(toast1, { delay: 300 });
            }).then(waitFor(350)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#toast1')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="toast" id="toast1" style="display: none !important;">' +
                    '<button id="button1" data-ui-dismiss="toast"></button>' +
                    '</div>' +
                    '<div class="toast show" id="toast2">' +
                    '<button id="button2" data-ui-dismiss="toast"></button>' +
                    '</div>'
                );
            });
        });

        it('works with delay option (data-ui-delay)', async function() {
            await exec(_ => {
                const toast1 = dom.findOne('#toast1');
                dom.setDataset(toast1, 'uiDelay', 300);
                UI.Toast.init(toast1);
            }).then(waitFor(350)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#toast1')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="toast" id="toast1" data-ui-delay="300" style="display: none !important;">' +
                    '<button id="button1" data-ui-dismiss="toast"></button>' +
                    '</div>' +
                    '<div class="toast show" id="toast2">' +
                    '<button id="button2" data-ui-dismiss="toast"></button>' +
                    '</div>'
                );
            });
        });

        it('works with delay option (query)', async function() {
            await exec(_ => {
                dom.query('#toast1').toast({ delay: 300 });
            }).then(waitFor(350)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.hasAnimation('#toast1')),
                    true
                );
            }).then(waitFor(100)).then(async _ => {
                assert.strictEqual(
                    await exec(_ => dom.getHTML(document.body)),
                    '<div class="toast" id="toast1" style="display: none !important;">' +
                    '<button id="button1" data-ui-dismiss="toast"></button>' +
                    '</div>' +
                    '<div class="toast show" id="toast2">' +
                    '<button id="button2" data-ui-dismiss="toast"></button>' +
                    '</div>'
                );
            });
        });

    });

});